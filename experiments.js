let activeCleanup = null;
let activeAnimationToken = 0;

function getPanelElements() {
    return {
        panel: document.getElementById("experimentPanel"),
        title: document.getElementById("experimentTitle"),
        content: document.getElementById("experimentContent"),
    };
}

function makeSvgElement(tag, attrs = {}) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
}

function pathData(points) {
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

function stopExperiment() {
    activeAnimationToken++;
    if (typeof activeCleanup === "function") {
        activeCleanup();
    }
    activeCleanup = null;
}

function showPanel(titleText, builder) {
    stopExperiment();
    const { panel, title, content } = getPanelElements();
    if (!panel || !title || !content) return;
    panel.style.display = "block";
    panel.setAttribute("aria-hidden", "false");
    title.textContent = titleText;
    content.innerHTML = "";
    activeCleanup = builder(content) || null;
}

function buildDNA(container) {
    const complement = { A: "T", T: "A", G: "C", C: "G" };
    const originalBases = ["A", "T", "G", "C", "A", "C", "G", "T", "A", "G", "C", "T"];
    let bases = originalBases.slice();
    let unzip = 0;
    let replication = 0;
    let raf = 0;
    let disposed = false;

    container.innerHTML = `
        <div class="experiment-description">
            <div class="experiment-kicker">MOLECULAR BIOLOGY / DNA LAB</div>
            <div class="experiment-description-main">拖动解旋滑块观察两条链分开；也可以对选定位置进行替换、插入或缺失突变，再观察互补链如何随模板变化。</div>
        </div>
        <div class="experiment-visual dna-stage">
            <svg id="dnaSvg" viewBox="0 0 560 340" aria-label="DNA双螺旋与复制、突变示意图">
                <defs>
                    <linearGradient id="dnaA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fe8ff"/><stop offset="1" stop-color="#4f8cff"/></linearGradient>
                    <linearGradient id="dnaB" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0b2ff"/><stop offset="1" stop-color="#765cff"/></linearGradient>
                    <filter id="dnaGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <g opacity=".13"><path d="M55 42 H505 M55 98 H505 M55 154 H505 M55 210 H505 M55 266 H505" stroke="#7ccfff"/><path d="M110 25 V300 M170 25 V300 M230 25 V300 M290 25 V300 M350 25 V300 M410 25 V300 M470 25 V300" stroke="#7ccfff"/></g>
                <g id="dnaPairs"></g><path id="dnaBackbone1" fill="none" stroke="url(#dnaA)" stroke-width="6" stroke-linecap="round" filter="url(#dnaGlow)"/><path id="dnaBackbone2" fill="none" stroke="url(#dnaB)" stroke-width="6" stroke-linecap="round" filter="url(#dnaGlow)"/><g id="dnaLetters"></g><g id="dnaReplicaLeft"></g><g id="dnaReplicaRight"></g>
                <text x="280" y="325" fill="#9bdcff" font-size="12" text-anchor="middle" letter-spacing="2">COMPLEMENTARY BASE PAIRING</text>
            </svg>
        </div>
        <div class="experiment-readout-grid"><div><span>当前状态</span><strong id="dnaStatus">双链稳定</strong></div><div><span>序列（模板链）</span><strong id="dnaSequence" class="dna-sequence">ATGCACGTAGCT</strong></div></div>
        <label class="experiment-slider"><span>解旋程度</span><input id="dnaUnzip" type="range" min="0" max="100" value="0"><b id="dnaUnzipValue">0%</b></label>
        <div class="dna-mutation-controls">
            <label>碱基位置<select id="dnaPosition"></select></label>
            <label>变异方式<select id="dnaMutationType"><option value="substitution">替换</option><option value="insertion">插入</option><option value="deletion">缺失</option></select></label>
            <label id="dnaBaseLabel">替换为<select id="dnaNewBase"><option>A</option><option>T</option><option>G</option><option>C</option></select></label>
        </div>
        <div class="experiment-actions"><button id="dnaMutate" class="experiment-button secondary">应用突变</button><button id="dnaAuto" class="experiment-button secondary">自动解旋</button><button id="dnaReplicate" class="experiment-button primary">开始复制</button><button id="dnaReset" class="experiment-button ghost">全部重置</button></div>
        <div id="dnaMutationMessage" class="experiment-note"><strong>说明：</strong>这是用于观察序列变化的教学模型。突变不必然有害，也不能仅凭一个示意序列推断生物性状。</div>
    `;

    const pairs = container.querySelector("#dnaPairs");
    const letters = container.querySelector("#dnaLetters");
    const leftBackbone = container.querySelector("#dnaBackbone1");
    const rightBackbone = container.querySelector("#dnaBackbone2");
    const replicaLeft = container.querySelector("#dnaReplicaLeft");
    const replicaRight = container.querySelector("#dnaReplicaRight");
    const status = container.querySelector("#dnaStatus");
    const slider = container.querySelector("#dnaUnzip");
    const value = container.querySelector("#dnaUnzipValue");
    const sequenceRead = container.querySelector("#dnaSequence");
    const positionSelect = container.querySelector("#dnaPosition");
    const mutationType = container.querySelector("#dnaMutationType");
    const newBase = container.querySelector("#dnaNewBase");
    const message = container.querySelector("#dnaMutationMessage");

    function updatePositionOptions() {
        const priorIndex = Number(positionSelect.value || 0);
        const selectedIndex = Math.max(0, Math.min(priorIndex, bases.length - 1));
        positionSelect.replaceChildren();
        bases.forEach((_, index) => {
            const option = document.createElement("option");
            option.value = String(index);
            option.textContent = `第 ${index + 1} 位（${bases[index]}）`;
            positionSelect.appendChild(option);
        });
        positionSelect.value = String(selectedIndex);
    }

    function draw(now = 0) {
        pairs.replaceChildren(); letters.replaceChildren(); replicaLeft.replaceChildren(); replicaRight.replaceChildren();
        const separation = 28 + unzip * 0.62;
        const left = []; const right = [];
        bases.forEach((base, i) => {
            const y = 30 + i * (264 / Math.max(bases.length - 1, 1));
            const phase = i * 0.82 + now * 0.00035;
            const wave = Math.sin(phase) * 38;
            const lx = 280 + wave - separation;
            const rx = 280 - wave + separation;
            left.push({x:lx,y}); right.push({x:rx,y});
            pairs.appendChild(makeSvgElement("line", {
                x1:lx, y1:y, x2:rx, y2:y,
                stroke: unzip > 30 ? "#6384a8" : "#9bdcff",
                "stroke-width":Math.max(1.1,3.2-unzip*.021),
                opacity:Math.max(.08,1-unzip*.009)
            }));
            const lt = makeSvgElement("text", {x:lx-9,y:y+5,fill:"#7fe8ff","font-size":13,"font-weight":700,"text-anchor":"end"}); lt.textContent = base;
            const rightBase = complement[base];
            const rt = makeSvgElement("text", {x:rx+9,y:y+5,fill:"#ddb5ff","font-size":13,"font-weight":700,"text-anchor":"start"}); rt.textContent = rightBase;
            letters.append(lt, rt);
            if (replication > 0.03) {
                const p = replication;
                const l2 = lx - (23 + 33 * p); const r2 = rx + (23 + 33 * p);
                replicaLeft.appendChild(makeSvgElement("line", {x1:lx,y1:y,x2:l2,y2:y,stroke:"#8df2c4","stroke-width":3,"stroke-linecap":"round",opacity:Math.min(1,p*1.4)}));
                replicaRight.appendChild(makeSvgElement("line", {x1:rx,y1:y,x2:r2,y2:y,stroke:"#ffd278","stroke-width":3,"stroke-linecap":"round",opacity:Math.min(1,p*1.4)}));
                const ltx = makeSvgElement("text", {x:l2-7,y:y+5,fill:"#8df2c4","font-size":12,"font-weight":700,"text-anchor":"end"}); ltx.textContent = rightBase;
                const rtx = makeSvgElement("text", {x:r2+7,y:y+5,fill:"#ffd278","font-size":12,"font-weight":700,"text-anchor":"start"}); rtx.textContent = base;
                replicaLeft.appendChild(ltx); replicaRight.appendChild(rtx);
            }
        });
        leftBackbone.setAttribute("d", pathData(left)); rightBackbone.setAttribute("d", pathData(right));
        slider.value = String(Math.round(unzip)); value.textContent = `${Math.round(unzip)}%`;
        sequenceRead.textContent = bases.join("");
        status.textContent = replication > .98 ? "复制示意完成" : replication > .03 ? "复制进行中" : unzip > 94 ? "双链已充分解旋" : unzip > 5 ? "解旋中 · 碱基对分开" : "双链稳定";
    }

    function animateTo(targetU, targetR, ms) {
        const startU = unzip, startR = replication, start = performance.now();
        const token = ++activeAnimationToken;
        function tick(now) {
            if (disposed || token !== activeAnimationToken) return;
            const p = Math.min(1,(now-start)/ms); const e = 1-Math.pow(1-p,3);
            unzip = startU+(targetU-startU)*e; replication=startR+(targetR-startR)*e; draw(now);
            if(p<1) raf=requestAnimationFrame(tick);
        }
        raf=requestAnimationFrame(tick);
    }

    mutationType.addEventListener("change", () => {
        container.querySelector("#dnaBaseLabel").style.display = mutationType.value === "substitution" ? "grid" : "none";
    });
    container.querySelector("#dnaMutate").onclick = () => {
        const index = Math.max(0, Math.min(bases.length - 1, Number(positionSelect.value || 0)));
        const type = mutationType.value;
        if (type === "substitution") {
            bases[index] = newBase.value;
            message.innerHTML = `<strong>替换突变：</strong>第 ${index + 1} 位现在为 ${bases[index]}。互补链会按 A–T、C–G 规则同步示意。`;
        } else if (type === "insertion") {
            if (bases.length >= 13) {
                message.textContent = "当前模型最多显示 13 个碱基位置；重置后可再次实验。";
                return;
            }
            bases.splice(index, 0, newBase.value);
            message.innerHTML = `<strong>插入突变：</strong>在原第 ${index + 1} 位前插入了 ${newBase.value}，序列长度增加。`;
        } else {
            if (bases.length <= 6) {
                message.textContent = "当前模型至少保留 6 个位置；重置后可再次实验。";
                return;
            }
            const removed = bases.splice(index, 1)[0];
            message.innerHTML = `<strong>缺失突变：</strong>移除了原第 ${index + 1} 位的 ${removed}，后续位置前移。`;
        }
        unzip = 0; replication = 0; updatePositionOptions(); draw();
    };
    slider.addEventListener("input",()=>{ unzip=Number(slider.value); replication=0; draw(); });
    container.querySelector("#dnaAuto").onclick=()=>animateTo(unzip>90?0:100,0,1050);
    container.querySelector("#dnaReplicate").onclick=()=>animateTo(100,1,1350);
    container.querySelector("#dnaReset").onclick=()=>{
        bases=originalBases.slice(); unzip=0; replication=0; updatePositionOptions();
        message.innerHTML = "<strong>说明：</strong>已恢复原始示意序列。突变不必然有害，也不能仅凭一个示意序列推断生物性状。";
        draw();
    };
    updatePositionOptions();
    function idle(now){ if(disposed)return; if(replication===0&&unzip<2) draw(now); raf=requestAnimationFrame(idle); }
    raf=requestAnimationFrame(idle); draw();
    return ()=>{disposed=true;cancelAnimationFrame(raf);};
}

function buildOptics(container) {
    let objectDistance = 240;
    let focalLength = 110;
    let lensType = "convex";
    let disposed = false;
    let raf = 0;
    container.innerHTML = `
        <div class="experiment-description"><div class="experiment-kicker">OPTICS / LENS LAB</div><div class="experiment-description-main">切换凸透镜或凹透镜，调整物距和焦距；观察像的位置、正倒、大小与虚实如何变化。</div></div>
        <div class="experiment-visual"><svg id="opticsSvg" viewBox="0 0 560 310" aria-label="凸透镜与凹透镜成像规律示意图"></svg></div>
        <div class="experiment-readout-grid"><div><span>像距 v</span><strong id="opticsV">84.6</strong></div><div><span>成像性质</span><strong id="opticsNature">倒立实像</strong></div></div>
        <div class="optics-control-row"><label>透镜类型<select id="opticsType"><option value="convex">凸透镜（会聚）</option><option value="concave">凹透镜（发散）</option></select></label></div>
        <label class="experiment-slider"><span>物距 u</span><input id="opticsSlider" type="range" min="65" max="350" value="240"><b id="opticsValue">240</b></label>
        <label class="experiment-slider"><span>焦距 f</span><input id="opticsFocal" type="range" min="55" max="135" value="110"><b id="opticsFocalValue">110</b></label>
        <div class="experiment-note"><strong>薄透镜模型：</strong>1/f = 1/u + 1/v。凸透镜取 f 为正；凹透镜取 f 为负。像距 v 为正表示像在透镜另一侧，v 为负表示虚像与物体在同侧。示意图为定性展示，远离画布边界时像的位置会截断显示。</div>
    `;
    const svg=container.querySelector("#opticsSvg");
    const slider=container.querySelector("#opticsSlider");
    const focalSlider=container.querySelector("#opticsFocal");
    const typeSelect=container.querySelector("#opticsType");
    const vRead=container.querySelector("#opticsV");
    const natureRead=container.querySelector("#opticsNature");
    const val=container.querySelector("#opticsValue");
    const fVal=container.querySelector("#opticsFocalValue");

    function draw() {
        const W=560, H=310, axis=174, lensX=290, pxPerUnit=.55;
        const signedF = lensType === "convex" ? focalLength : -focalLength;
        const denominator = objectDistance - signedF;
        let imageDistance;
        if (Math.abs(denominator) < 1.5) imageDistance = Math.sign(signedF || 1) * 100000;
        else imageDistance = signedF * objectDistance / denominator;
        const magnification = -imageDistance / objectDistance;
        const atFocus = Math.abs(denominator) < 1.5;
        const isVirtual = atFocus || imageDistance < 0;
        const isUpright = magnification > 0;
        const isDiminished = Math.abs(magnification) < .95;
        const rawImageX = lensX + imageDistance * pxPerUnit;
        const imageX = Math.max(42, Math.min(520, rawImageX));
        const objX = Math.max(35, lensX - objectDistance * pxPerUnit);
        const objectH = 58;
        const rawImageH = objectH * Math.abs(magnification);
        const imageH = Math.min(120, Math.max(8, rawImageH)) * (isUpright ? 1 : -1);
        const objTop = axis - objectH;
        const imageTop = axis - imageH;
        const clipped = atFocus || rawImageX < 42 || rawImageX > 520 || rawImageH > 120;

        svg.replaceChildren();
        svg.appendChild(makeSvgElement("defs", {}));
        const defs=svg.querySelector("defs");
        defs.innerHTML=`<filter id="optGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><marker id="optArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ffd37b"/></marker>`;
        svg.appendChild(makeSvgElement("line",{x1:28,y1:axis,x2:532,y2:axis,stroke:"#8abde0",opacity:.48,"stroke-width":1.5}));
        // Focal points and principal axis marks.
        const fPx=Math.min(135*pxPerUnit, focalLength*pxPerUnit);
        [lensX-fPx,lensX+fPx].forEach((x,i)=>{
            svg.appendChild(makeSvgElement("line",{x1:x,y1:axis-9,x2:x,y2:axis+9,stroke:"#ffd979","stroke-width":2}));
            const label=makeSvgElement("text",{x,y:axis+24,fill:"#ffd979","font-size":11,"text-anchor":"middle"}); label.textContent=i===0?"F":"F′"; svg.appendChild(label);
        });
        // Lens body: convex is thick in the middle; concave is thin in the middle.
        const lensPath = lensType === "convex"
            ? `M ${lensX} 54 Q ${lensX+38} ${axis} ${lensX} 282 Q ${lensX-38} ${axis} ${lensX} 54 Z`
            : `M ${lensX-12} 54 Q ${lensX+12} ${axis} ${lensX-12} 282 L ${lensX+12} 282 Q ${lensX-12} ${axis} ${lensX+12} 54 Z`;
        svg.appendChild(makeSvgElement("path",{d:lensPath,fill:"rgba(96,217,255,.18)",stroke:"#8be9ff","stroke-width":2,filter:"url(#optGlow)"}));
        // Object arrow.
        svg.appendChild(makeSvgElement("line",{x1:objX,y1:axis,x2:objX,y2:objTop,stroke:"#ffd37b","stroke-width":4,"marker-end":"url(#optArrow)"}));
        const objLabel=makeSvgElement("text",{x:objX,y:axis+37,fill:"#ffd37b","font-size":11,"text-anchor":"middle"}); objLabel.textContent="物体"; svg.appendChild(objLabel);
        // Image arrow; virtual image is drawn dashed to show it's an apparent image.
        svg.appendChild(makeSvgElement("line",{x1:imageX,y1:axis,x2:imageX,y2:imageTop,stroke:isVirtual?"#8feac0":"#d6a7ff","stroke-width":4,"stroke-dasharray":isVirtual?"5 4":"none","marker-end":"url(#optArrow)",opacity:.94}));
        const imgLabel=makeSvgElement("text",{x:imageX,y:Math.max(20,Math.min(300,axis+37)),fill:isVirtual?"#8feac0":"#d6a7ff","font-size":11,"text-anchor":"middle"}); imgLabel.textContent=isVirtual?"虚像":"实像"; svg.appendChild(imgLabel);
        // One ray through the optical center.
        const rayEndX= imageX;
        svg.appendChild(makeSvgElement("line",{x1:objX,y1:objTop,x2:rayEndX,y2:imageTop,stroke:"#78dbff","stroke-width":1.7,opacity:.75}));
        if (isVirtual) {
            // Dashed backward extension: the rays appear to come from the virtual image.
            svg.appendChild(makeSvgElement("line",{x1:imageX,y1:imageTop,x2:lensX,y2:objTop,stroke:"#8feac0","stroke-width":1.5,"stroke-dasharray":"5 5",opacity:.68}));
            const outgoingEndX = 520;
            const outgoingEndY = axis + (lensType === "concave" ? 65 : -20);
            svg.appendChild(makeSvgElement("line",{x1:lensX,y1:objTop,x2:outgoingEndX,y2:outgoingEndY,stroke:"#8feac0","stroke-width":1.5,opacity:.72}));
        } else {
            svg.appendChild(makeSvgElement("polyline",{points:`${objX},${objTop} ${lensX},${objTop} ${imageX},${imageTop}`,fill:"none",stroke:"#ffb8ee","stroke-width":1.6,opacity:.85}));
        }
        const lensCaption=makeSvgElement("text",{x:lensX,y:25,fill:"#a9ecff","font-size":12,"text-anchor":"middle","letter-spacing":1}); lensCaption.textContent=lensType==="convex"?"凸透镜 · 会聚":"凹透镜 · 发散"; svg.appendChild(lensCaption);
        const u=objectDistance;
        val.textContent=String(u); fVal.textContent=String(focalLength);
        vRead.textContent=atFocus?"趋于 ±∞":`v = ${imageDistance.toFixed(1)}（${isVirtual ? "虚像·同侧" : "实像·异侧"}）`;
        let nature;
        if(atFocus) nature="接近焦点 · 像距很大";
        else if(lensType==="concave") nature="正立缩小虚像";
        else if(u>focalLength) nature=`倒立${isDiminished?"缩小":"放大"}实像`;
        else nature="正立放大虚像";
        natureRead.textContent=nature+(clipped?" · 图中截断":"");
    }
    slider.addEventListener("input",()=>{objectDistance=Number(slider.value);draw();});
    focalSlider.addEventListener("input",()=>{focalLength=Number(focalSlider.value);draw();});
    typeSelect.addEventListener("change",()=>{lensType=typeSelect.value;draw();});
    draw();
    return ()=>{disposed=true;cancelAnimationFrame(raf);};
}

function buildCircuit(container) {
    let voltage=6, resistance=6, switchOn=true, t=0, raf=0, disposed=false;
    container.innerHTML=`
        <div class="experiment-description"><div class="experiment-kicker">ELECTRICITY / 03</div><div class="experiment-description-main">调节电压和电阻，观察串联电路中的电流变化。</div></div>
        <div class="experiment-visual"><svg id="circuitSvg" viewBox="0 0 560 300" aria-label="串联电路实验"></svg></div>
        <div class="experiment-readout-grid"><div><span>电流</span><strong id="currentRead">1.00 A</strong></div><div><span>功率</span><strong id="powerRead">6.00 W</strong></div></div>
        <label class="experiment-slider"><span>电压</span><input id="voltageSlider" type="range" min="1" max="12" step="1" value="6"><b id="voltageValue">6 V</b></label>
        <label class="experiment-slider"><span>电阻</span><input id="resistanceSlider" type="range" min="1" max="20" step="1" value="6"><b id="resistanceValue">6 Ω</b></label>
        <div class="experiment-actions"><button id="switchButton" class="experiment-button primary">开关：接通</button></div>
        <div class="experiment-note"><strong>原理：</strong>在简单直流串联电路中，欧姆定律给出 I = U / R；功率可由 P = UI 估算。</div>
    `;
    const svg=container.querySelector("#circuitSvg"); const cur=container.querySelector("#currentRead"); const pow=container.querySelector("#powerRead"); const vs=container.querySelector("#voltageSlider"); const rs=container.querySelector("#resistanceSlider");
    function draw(){
        const I=switchOn?voltage/resistance:0, P=voltage*I;
        svg.innerHTML=`<rect x="0" y="0" width="560" height="300" fill="rgba(0,0,0,.04)"/><path d="M90 80 H205 M270 80 H470 V220 H90 V80" fill="none" stroke="#7ccfff" stroke-width="4" opacity=".75"/>`;
        svg.appendChild(makeSvgElement("rect",{x:55,y:120,width:35,height:80,rx:8,fill:"#27395f",stroke:"#91e4ff","stroke-width":2}));
        const bt=makeSvgElement("text",{x:72,y:112,fill:"#dff7ff","font-size":14,"text-anchor":"middle"});bt.textContent=`${voltage} V`;svg.appendChild(bt);
        svg.appendChild(makeSvgElement("polyline",{points:"205,80 228,65 250,80 270,65",fill:"none",stroke:"#ffd77b","stroke-width":4}));
        svg.appendChild(makeSvgElement("rect",{x:270,y:63,width:86,height:34,rx:8,fill:"#352b48",stroke:"#d5a4ff","stroke-width":2}));
        const rt=makeSvgElement("text",{x:313,y:85,fill:"#f1ddff","font-size":13,"text-anchor":"middle"});rt.textContent=`R = ${resistance} Ω`;svg.appendChild(rt);
        svg.appendChild(makeSvgElement("circle",{cx:440,cy:80,r:16,fill:switchOn?"#63ef87":"#5b6672",stroke:"#dff7ff","stroke-width":2}));
        const led=makeSvgElement("circle",{cx:450,cy:220,r:19,fill:switchOn?"#9cf4ff":"#35465a",stroke:"#91e4ff","stroke-width":2,opacity:switchOn?.95:.5});svg.appendChild(led);
        const lt=makeSvgElement("text",{x:450,y:255,fill:"#bcecff","font-size":12,"text-anchor":"middle"});lt.textContent="LOAD";svg.appendChild(lt);
        for(let i=0;i<8;i++){
            const p=((t*(0.6+I*0.35)+i/8)%1); let x,y;
            if(p<.5){x=90+(470-90)*(p*2);y=80;}else{x=470-(380)*(p-.5)*2;y=80+(220-80)*(p-.5)*2;}
            if(p>.88){x=470-(380)*(p-.88)/.12;y=220;}
            if(p>=.76&&p<.88){x=470-(380)*(p-.76)/.12;y=220;}
            svg.appendChild(makeSvgElement("circle",{cx:x,cy:y,r:3.5,fill:switchOn?"#9fe7ff":"#506079",filter:switchOn?"url(#glow)":"none"}));
        }
        cur.textContent=`${I.toFixed(2)} A`;pow.textContent=`${P.toFixed(2)} W`;
        container.querySelector("#voltageValue").textContent=`${voltage} V`;container.querySelector("#resistanceValue").textContent=`${resistance} Ω`;
    }
    vs.oninput=()=>{voltage=Number(vs.value);draw();}; rs.oninput=()=>{resistance=Number(rs.value);draw();};
    container.querySelector("#switchButton").onclick=()=>{switchOn=!switchOn;container.querySelector("#switchButton").textContent=`开关：${switchOn?"接通":"断开"}`;draw();};
    function loop(){if(disposed)return;t+=0.03;draw();raf=requestAnimationFrame(loop);} loop();
    return ()=>{disposed=true;cancelAnimationFrame(raf);};
}

function buildMechanics(container) {
    let force=6, mass=3, velocity=0, x=100, raf=0, disposed=false, last=performance.now();
    container.innerHTML=`
        <div class="experiment-description"><div class="experiment-kicker">MECHANICS / 04</div><div class="experiment-description-main">改变合力和质量，观察小车加速度和运动状态。</div></div>
        <div class="experiment-visual"><svg id="mechanicsSvg" viewBox="0 0 560 270" aria-label="牛顿第二定律实验"></svg></div>
        <div class="experiment-readout-grid"><div><span>加速度</span><strong id="accRead">2.00 m/s²</strong></div><div><span>速度</span><strong id="velRead">0.0 m/s</strong></div></div>
        <label class="experiment-slider"><span>合力</span><input id="forceSlider" type="range" min="-12" max="12" step="1" value="6"><b id="forceValue">6 N</b></label>
        <label class="experiment-slider"><span>质量</span><input id="massSlider" type="range" min="1" max="10" step="1" value="3"><b id="massValue">3 kg</b></label>
        <div class="experiment-actions"><button id="mechanicsReset" class="experiment-button ghost">重置小车</button></div>
        <div class="experiment-note"><strong>原理：</strong>牛顿第二定律可写成 F = ma；在合力方向不变时，质量越大，相同力产生的加速度越小。</div>
    `;
    const svg=container.querySelector("#mechanicsSvg"); const ar=container.querySelector("#accRead"); const vr=container.querySelector("#velRead"); const fs=container.querySelector("#forceSlider"); const ms=container.querySelector("#massSlider");
    function draw(){
        const acc=force/mass;
        svg.innerHTML=`<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#ffd36f"/></marker></defs><line x1="45" y1="210" x2="515" y2="210" stroke="#7ccfff" stroke-width="4" opacity=".55"/>`;
        svg.appendChild(makeSvgElement("rect",{x:x,y:170,width:72,height:40,rx:10,fill:"#203764",stroke:"#8bdfff","stroke-width":2}));
        svg.appendChild(makeSvgElement("circle",{cx:x+16,cy:214,r:8,fill:"#a9d9ff"}));svg.appendChild(makeSvgElement("circle",{cx:x+56,cy:214,r:8,fill:"#a9d9ff"}));
        const arrowX=x+72+(force>=0?38:-8); const a=makeSvgElement("line",{x1:x+72/2,y1:145,x2:arrowX,y2:145,stroke:"#ffd36f","stroke-width":4,"marker-end":"url(#arrow)"});svg.appendChild(a);
        const ft=makeSvgElement("text",{x:(x+72/2+arrowX)/2,y:133,fill:"#ffd36f","font-size":13,"text-anchor":"middle"});ft.textContent=`F = ${force} N`;svg.appendChild(ft);
        ar.textContent=`${acc.toFixed(2)} m/s²`;vr.textContent=`${velocity.toFixed(1)} m/s`;
        container.querySelector("#forceValue").textContent=`${force} N`;container.querySelector("#massValue").textContent=`${mass} kg`;
    }
    fs.oninput=()=>{force=Number(fs.value);draw();}; ms.oninput=()=>{mass=Number(ms.value);draw();}; container.querySelector("#mechanicsReset").onclick=()=>{velocity=0;x=100;last=performance.now();};
    function loop(now){if(disposed)return;const dt=Math.min(.035,(now-last)/1000);last=now;const a=force/mass;velocity+=a*dt;x+=velocity*dt*8;if(x<55){x=55;velocity=0;}if(x>430){x=430;velocity*=.5;}draw();raf=requestAnimationFrame(loop);} raf=requestAnimationFrame(loop); draw();
    return ()=>{disposed=true;cancelAnimationFrame(raf);};
}

function buildNeural(container) {
    let training=0, raf=0, disposed=false;
    container.innerHTML=`
        <div class="experiment-description"><div class="experiment-kicker">MACHINE LEARNING / 05</div><div class="experiment-description-main">观察一个极简神经网络在“训练”过程中逐渐形成稳定的信号通路。</div></div>
        <div class="experiment-visual"><svg id="neuralSvg" viewBox="0 0 560 280" aria-label="神经网络可视化实验"></svg></div>
        <div class="experiment-readout-grid"><div><span>训练进度</span><strong id="trainRead">0%</strong></div><div><span>输出置信度</span><strong id="confidenceRead">50%</strong></div></div>
        <label class="experiment-slider"><span>训练</span><input id="trainSlider" type="range" min="0" max="100" value="0"><b id="trainValue">0%</b></label>
        <div class="experiment-actions"><button id="trainButton" class="experiment-button primary">开始训练</button><button id="trainReset" class="experiment-button ghost">重置</button></div>
        <div class="experiment-note"><strong>原理：</strong>真实神经网络会通过调整权重，让输出逐渐更贴近目标。这里用可视化方式展示“权重变强”的概念，而非完整训练一个模型。</div>
    `;
    const svg=container.querySelector("#neuralSvg"); const slider=container.querySelector("#trainSlider"); const read=container.querySelector("#trainRead"); const conf=container.querySelector("#confidenceRead"); const val=container.querySelector("#trainValue");
    const layers=[[100,70,140,210],[275,60,130,200,240],[450,95,185]];
    const links=[];
    layers.slice(0,-1).forEach((layer,li)=>layer.forEach(y1=>layers[li+1].forEach(y2=>links.push({x1:li===0?100:275,y1,x2:li===0?275:450,y2}))));
    function draw(){
        svg.innerHTML=`<defs><filter id="neuralGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
        links.forEach((e,i)=>{const strength=0.12+0.78*(training/100)*(.55+.45*Math.sin(i*1.7)**2);svg.appendChild(makeSvgElement("line",{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,stroke: i%2?"#77dfff":"#b19aff","stroke-width":1.2+3.2*strength,opacity:strength,filter:training>55?"url(#neuralGlow)":"none"}));});
        layers.forEach((layer,li)=>layer.forEach((y,i)=>{const x=li===0?100:li===1?275:450;const active=(training/100)*(.65+.35*Math.sin(i*2+li)**2);svg.appendChild(makeSvgElement("circle",{cx:x,cy:y,r:li===1?15:17,fill:li===2?"#63ef87":"#263c69",stroke:li===2?"#8effb2":"#8bdfff","stroke-width":2,opacity:.5+.5*active,filter:active>.65?"url(#neuralGlow)":"none"}));}));
        ["输入","隐藏层","输出"].forEach((s,i)=>{const x=[100,275,450][i];const t=makeSvgElement("text",{x,y:255,fill:"#9bdcff","font-size":12,"text-anchor":"middle","letter-spacing":2});t.textContent=s;svg.appendChild(t);});
        const confidence=50+Math.round((training/100)*47); read.textContent=`${Math.round(training)}%`;conf.textContent=`${confidence}%`;val.textContent=`${Math.round(training)}%`; 
    }
    function animateTraining(){const start=performance.now();const token=++activeAnimationToken;function tick(now){if(disposed||token!==activeAnimationToken)return;training=Math.min(100,(now-start)/18);draw();if(training<100)raf=requestAnimationFrame(tick);}raf=requestAnimationFrame(tick);}
    slider.oninput=()=>{training=Number(slider.value);draw();}; container.querySelector("#trainButton").onclick=()=>animateTraining(); container.querySelector("#trainReset").onclick=()=>{activeAnimationToken++;training=0;draw();}; draw();
    return ()=>{disposed=true;cancelAnimationFrame(raf);};
}

export function openExperiment(exp) {
    if (!exp || !exp.type) return;
    switch (exp.type) {
        case "dna": showPanel("🧬 DNA 双螺旋实验", buildDNA); break;
        case "optics": showPanel("🔭 凸透镜成像实验", buildOptics); break;
        case "circuit": showPanel("⚡ 串联电路实验", buildCircuit); break;
        case "mechanics": showPanel("⚙️ 牛顿第二定律实验", buildMechanics); break;
        case "neural": showPanel("🧠 神经网络可视化实验", buildNeural); break;
        default: showPanel("🧪 交互实验", (container)=>{container.innerHTML=`<div class="experiment-fallback"><div class="experiment-fallback-icon">◌</div><div>这个实验模块还在制作中。</div></div>`;});
    }
}

export function closeExperiment() {
    const { panel } = getPanelElements();
    stopExperiment();
    if (panel) {
        panel.style.display = "none";
        panel.setAttribute("aria-hidden", "true");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("closeExperiment");
    if (button) button.addEventListener("click", closeExperiment);
});
