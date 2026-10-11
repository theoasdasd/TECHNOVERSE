import * as THREE from "three";

import {
    OrbitControls
} from "three/addons/controls/OrbitControls.js";

import {
    CSS2DRenderer,
    CSS2DObject
} from "three/addons/renderers/CSS2DRenderer.js";

import {
    technologies,
    fields
} from "./technologies.js";

import {
    openExperiment,
    closeExperiment
} from "./experiments.js";


// =====================================================
// SCENE
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x01030a);

scene.fog = new THREE.FogExp2(
    0x01030a,
    0.00032
);


// =====================================================
// CAMERA
// =====================================================

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    6000
);

camera.position.set(
    0,
    80,
    1350
);


// =====================================================
// WEBGL RENDERER
// =====================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);


// =====================================================
// CSS LABEL RENDERER
// =====================================================

const labelRenderer = new CSS2DRenderer();

labelRenderer.setSize(
    window.innerWidth,
    window.innerHeight
);

labelRenderer.domElement.style.position = "fixed";
labelRenderer.domElement.style.left = "0";
labelRenderer.domElement.style.top = "0";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.domElement.style.zIndex = "5";

document.body.appendChild(labelRenderer.domElement);


// =====================================================
// CONTROLS
// =====================================================

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 80;
controls.maxDistance = 2800;
controls.target.set(0, 0, 0);


// =====================================================
// LIGHTING
// =====================================================

scene.add(
    new THREE.AmbientLight(
        0x557799,
        1.8
    )
);

const centerLight = new THREE.PointLight(
    0x55ccff,
    16,
    1200
);

centerLight.position.set(0, 0, 0);
scene.add(centerLight);


// =====================================================
// BACKGROUND STAR FIELD
// =====================================================

function createBackgroundStars() {

    const count = 6500;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        const radius = 750 + Math.random() * 1500;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] =
            radius * Math.sin(phi) * Math.cos(theta);

        positions[i * 3 + 1] =
            radius * Math.cos(phi);

        positions[i * 3 + 2] =
            radius * Math.sin(phi) * Math.sin(theta);
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.35,
        transparent: true,
        opacity: 0.82,
        depthWrite: false
    });

    const stars = new THREE.Points(
        geometry,
        material
    );

    scene.add(stars);

    return stars;
}

const backgroundStars = createBackgroundStars();


// =====================================================
// CIVILIZATION CORE
// =====================================================

const coreGroup = new THREE.Group();
scene.add(coreGroup);

const core = new THREE.Mesh(
    new THREE.SphereGeometry(43, 64, 64),
    new THREE.MeshStandardMaterial({
        color: 0x1166ff,
        emissive: 0x087cff,
        emissiveIntensity: 4.8,
        metalness: 0.62,
        roughness: 0.18
    })
);

coreGroup.add(core);

const innerEnergy = new THREE.Mesh(
    new THREE.SphereGeometry(24, 40, 40),
    new THREE.MeshBasicMaterial({
        color: 0x9fe7ff,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false
    })
);

coreGroup.add(innerEnergy);

const coreShell = new THREE.Mesh(
    new THREE.SphereGeometry(61, 28, 28),
    new THREE.MeshBasicMaterial({
        color: 0x249cff,
        wireframe: true,
        transparent: true,
        opacity: 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false
    })
);

coreShell.renderOrder = 10;
coreGroup.add(coreShell);

const coreRings = [];

for (let i = 0; i < 3; i++) {

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
            68 + i * 14,
            0.8,
            10,
            220
        ),
        new THREE.MeshBasicMaterial({
            color: i === 1 ? 0x9a79ff : 0x55ccff,
            transparent: true,
            opacity: 0.42,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false
        })
    );

    ring.rotation.x = 0.5 + i * 0.35;
    ring.rotation.z = i * 0.6;
    ring.renderOrder = 11;

    coreGroup.add(ring);
    coreRings.push(ring);
}

const civilizationLabel = document.createElement("div");
civilizationLabel.className = "civilization-label";
civilizationLabel.textContent = "HUMAN CIVILIZATION";

const civilizationObject = new CSS2DObject(
    civilizationLabel
);

civilizationObject.position.set(0, 82, 0);
coreGroup.add(civilizationObject);


// =====================================================
// FIELD POSITIONS
// =====================================================

const fieldDirections = {
    math: new THREE.Vector3(0, 1, 0),
    biology: new THREE.Vector3(0, -1, 0),
    engineering: new THREE.Vector3(1, 0, 0),
    chemistry: new THREE.Vector3(-1, 0, 0),
    information: new THREE.Vector3(0, 0, 1),
    physics: new THREE.Vector3(0, 0, -1)
};

const FIELD_DISTANCE = 340;
const FIELD_RADIUS = 165;
const fieldObjects = {};


// =====================================================
// ORTHOGONAL BASIS
// =====================================================

function makeBasis(direction) {

    const helper =
        Math.abs(direction.y) < 0.85
            ? new THREE.Vector3(0, 1, 0)
            : new THREE.Vector3(1, 0, 0);

    const tangentA = new THREE.Vector3()
        .crossVectors(direction, helper)
        .normalize();

    const tangentB = new THREE.Vector3()
        .crossVectors(direction, tangentA)
        .normalize();

    return { tangentA, tangentB };
}


// =====================================================
// FIELD GALAXY
// =====================================================

function createFieldGalaxy(key, field, fieldOrder) {

    const group = new THREE.Group();

    const direction = fieldDirections[key]
        .clone()
        .normalize();

    const center = direction
        .clone()
        .multiplyScalar(FIELD_DISTANCE);

    group.position.copy(center);
    group.name = field.name;

    const basis = makeBasis(direction);

    const shell = new THREE.Mesh(
        new THREE.SphereGeometry(FIELD_RADIUS, 40, 40),
        new THREE.MeshBasicMaterial({
            color: field.color,
            transparent: true,
            opacity: 0.022,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
    );

    shell.renderOrder = 2;
    group.add(shell);

    const wire = new THREE.Mesh(
        new THREE.SphereGeometry(FIELD_RADIUS - 8, 26, 26),
        new THREE.MeshBasicMaterial({
            color: field.color,
            wireframe: true,
            transparent: true,
            opacity: 0.065,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false
        })
    );

    wire.renderOrder = 4;
    group.add(wire);

    const galaxyCore = new THREE.Mesh(
        new THREE.SphereGeometry(12, 28, 28),
        new THREE.MeshBasicMaterial({
            color: field.color,
            transparent: true,
            opacity: 0.92,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false
        })
    );

    galaxyCore.renderOrder = 5;
    group.add(galaxyCore);

    const galaxyGlow = new THREE.Mesh(
        new THREE.SphereGeometry(38, 24, 24),
        new THREE.MeshBasicMaterial({
            color: field.color,
            transparent: true,
            opacity: 0.065,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false
        })
    );

    galaxyGlow.renderOrder = 3;
    group.add(galaxyGlow);

    const galaxyRings = [];

    for (let i = 0; i < 3; i++) {

        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(
                55 + i * 30,
                0.65,
                8,
                160
            ),
            new THREE.MeshBasicMaterial({
                color: field.color,
                transparent: true,
                opacity: 0.16 - i * 0.03,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                depthTest: false
            })
        );

        const quaternion = new THREE.Quaternion();

        quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
        );

        ring.quaternion.copy(quaternion);
        ring.rotation.z = i * 0.55;
        ring.renderOrder = 4;

        group.add(ring);
        galaxyRings.push(ring);
    }

    const particleCount = 850;
    const positions = new Float32Array(
        particleCount * 3
    );

    for (let i = 0; i < particleCount; i++) {

        const radius =
            Math.pow(Math.random(), 0.56) * 145;

        const angle =
            Math.random() * Math.PI * 2;

        const thickness =
            (Math.random() - 0.5) * 34;

        const local = basis.tangentA
            .clone()
            .multiplyScalar(
                Math.cos(angle) * radius
            )
            .add(
                basis.tangentB
                    .clone()
                    .multiplyScalar(
                        Math.sin(angle) * radius
                    )
            )
            .add(
                direction
                    .clone()
                    .multiplyScalar(thickness)
            );

        positions[i * 3] = local.x;
        positions[i * 3 + 1] = local.y;
        positions[i * 3 + 2] = local.z;
    }

    const particleGeometry = new THREE.BufferGeometry();

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
        color: field.color,
        size: 1.9,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(
        particleGeometry,
        particleMaterial
    );

    particles.renderOrder = 3;
    group.add(particles);

    const title = document.createElement("div");
    title.className = "field-title";
    title.style.color = "#" + field.color.toString(16).padStart(6, "0");

    const titleMain = document.createElement("div");
    titleMain.className = "field-title-main";
    titleMain.textContent = field.name;

    const titleSub = document.createElement("div");
    titleSub.className = "field-title-sub";
    titleSub.textContent = key.toUpperCase();

    title.appendChild(titleMain);
    title.appendChild(titleSub);

    const titleObject = new CSS2DObject(title);
    titleObject.position.copy(
        direction.clone().multiplyScalar(184)
    );

    group.add(titleObject);
    scene.add(group);

    fieldObjects[key] = {
        group,
        direction,
        center,
        basis,
        particles,
        galaxyRings,
        color: field.color,
        fieldOrder,
        galaxyCore
    };
}

Object.entries(fields).forEach(
    ([key, field], index) => {
        createFieldGalaxy(key, field, index);
    }
);


// =====================================================
// TECHNOLOGY NODES
// =====================================================

const nodeMap = {};
const nodes = [];
const fieldCounters = {};
const fieldTotals = {};

Object.keys(fields).forEach(key => {
    fieldCounters[key] = 0;
    fieldTotals[key] = technologies.filter(tech => tech.field === key).length;
});

const INTRO_DURATION = 1.0;
const INTRO_STAGGER = 0.028;
const INTRO_START_OFFSET = 0.14;
const INTRO_FIELD_STAGGER = 0.18;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));


function getNodePosition(tech, index, total) {

    const fieldObject = fieldObjects[tech.field];

    // Vogel / golden-angle distribution: points fill the field galaxy
    // approximately uniformly instead of stacking into a few rings.
    const maxRadius = FIELD_RADIUS * 0.90;
    const minRadius = 24;
    const t = (index + 0.65) / Math.max(total, 1);
    const radius =
        minRadius +
        (maxRadius - minRadius) * Math.sqrt(t);

    const angle =
        index * GOLDEN_ANGLE +
        fieldObject.fieldOrder * 0.63;

    // Small deterministic depth variation keeps the galaxy volumetric
    // without destroying the clean circular distribution.
    const depthWave =
        Math.sin(index * 2.618 + fieldObject.fieldOrder) * 17 +
        Math.cos(index * 1.414) * 7;

    const position = fieldObject.center.clone();

    position.add(
        fieldObject.basis.tangentA
            .clone()
            .multiplyScalar(
                Math.cos(angle) * radius
            )
    );

    position.add(
        fieldObject.basis.tangentB
            .clone()
            .multiplyScalar(
                Math.sin(angle) * radius
            )
    );

    position.add(
        fieldObject.direction
            .clone()
            .multiplyScalar(depthWave)
    );

    return position;
}


function createTechnologyNode(tech) {

    const field = fields[tech.field];
    const fieldObject = fieldObjects[tech.field];

    if (!field || !fieldObject) {
        return;
    }

    const index = fieldCounters[tech.field];
    fieldCounters[tech.field]++;

    const globalIndex = nodes.length;
    const position = getNodePosition(tech, index, fieldTotals[tech.field]);

    const node = new THREE.Mesh(
        new THREE.SphereGeometry(5.7, 30, 30),
        new THREE.MeshStandardMaterial({
            color: field.color,
            emissive: field.color,
            emissiveIntensity: 2.8,
            metalness: 0.22,
            roughness: 0.18,
            transparent: true,
            opacity: 0
        })
    );

    // Nodes materialize from their field's galaxy core.
    node.position.copy(fieldObject.center);

    const label = document.createElement("div");
    label.className = "tech-label";
    label.textContent = tech.name;
    label.title = tech.name;
    label.style.opacity = "0";
    label.style.transition = "opacity 0.18s linear";

    const labelObject = new CSS2DObject(label);
    labelObject.position.set(0, -13, 0);
    node.add(labelObject);

    node.userData = {
        tech,
        basePosition: position.clone(),
        fieldCenter: fieldObject.center.clone(),
        floatPhase: index * 0.79,
        introDelay:
            INTRO_START_OFFSET +
            globalIndex * INTRO_STAGGER +
            fieldObject.fieldOrder * INTRO_FIELD_STAGGER,
        introProgress: 0,
        introFinished: false,
        halo: null,
        orbit: null,
        label
    };

    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(11, 22, 22),
        new THREE.MeshBasicMaterial({
            color: field.color,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false
        })
    );

    halo.renderOrder = 20;
    node.add(halo);
    node.userData.halo = halo;

    const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(8.5, 0.32, 6, 44),
        new THREE.MeshBasicMaterial({
            color: field.color,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false
        })
    );

    orbit.rotation.x = 0.7;
    orbit.rotation.z = index * 0.43;
    orbit.renderOrder = 21;

    node.add(orbit);
    node.userData.orbit = orbit;

    scene.add(node);
    nodes.push(node);
    nodeMap[tech.id] = node;
}

technologies.forEach(tech => {
    createTechnologyNode(tech);
});


// =====================================================
// KNOWLEDGE RELATIONS
// =====================================================

const relationGroup = new THREE.Group();
relationGroup.renderOrder = 50;
scene.add(relationGroup);

const relations = [];
const CURVE_SEGMENTS = 28;


function updateRelationGeometry(relation) {

    const start = relation.fromNode.position;
    const end = relation.toNode.position;

    const midpoint = start.clone().lerp(end, 0.5);

    const outward = midpoint.lengthSq() > 1
        ? midpoint.clone().normalize()
        : new THREE.Vector3(0, 1, 0);

    midpoint.add(outward.multiplyScalar(12));

    relation.curve.v0.copy(start);
    relation.curve.v1.copy(midpoint);
    relation.curve.v2.copy(end);

    const attribute = relation.line.geometry.getAttribute("position");

    for (let i = 0; i <= CURVE_SEGMENTS; i++) {

        const p = relation.curve.getPoint(
            i / CURVE_SEGMENTS
        );

        attribute.setXYZ(
            i,
            p.x,
            p.y,
            p.z
        );
    }

    attribute.needsUpdate = true;
}


function createRelation(fromNode, toNode, sourceTech) {

    const sameField =
        sourceTech.field ===
        toNode.userData.tech.field;

    const baseLineOpacity = sameField ? 0.23 : 0.11;
    const basePacketOpacity = 0.72;

    const lineMaterial = new THREE.LineBasicMaterial({
        color: sameField
            ? fields[sourceTech.field].color
            : 0x8db7ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePoints = new Array(CURVE_SEGMENTS + 1);

    for (let i = 0; i <= CURVE_SEGMENTS; i++) {
        linePoints[i] = new THREE.Vector3();
    }

    lineGeometry.setFromPoints(linePoints);

    const line = new THREE.Line(
        lineGeometry,
        lineMaterial
    );

    line.renderOrder = 50;
    line.frustumCulled = false;
    relationGroup.add(line);

    const packet = new THREE.Mesh(
        new THREE.SphereGeometry(1.9, 12, 12),
        new THREE.MeshBasicMaterial({
            color: sameField
                ? fields[sourceTech.field].color
                : 0xa8d9ff,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false
        })
    );

    packet.renderOrder = 51;
    relationGroup.add(packet);

    const relation = {
        line,
        packet,
        curve: new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3()
        ),
        fromNode,
        toNode,
        sameField,
        phase: Math.random(),
        baseLineOpacity,
        basePacketOpacity
    };

    relations.push(relation);

    updateRelationGeometry(relation);
}


function createRelations() {

    const created = new Set();

    technologies.forEach(tech => {

        const fromNode = nodeMap[tech.id];

        if (!fromNode) {
            return;
        }

        (tech.links || []).forEach(targetId => {

            const toNode = nodeMap[targetId];

            if (!toNode || fromNode === toNode) {
                return;
            }

            const a = tech.id < targetId
                ? tech.id
                : targetId;

            const b = tech.id < targetId
                ? targetId
                : tech.id;

            const key = a + "::" + b;

            if (created.has(key)) {
                return;
            }

            created.add(key);

            createRelation(
                fromNode,
                toNode,
                tech
            );
        });
    });
}

createRelations();


// =====================================================
// INITIAL CAMERA FRAMING
// =====================================================

function frameWholeUniverse() {

    let universeRadius = FIELD_DISTANCE + FIELD_RADIUS + 24;

    nodes.forEach(node => {

        if (!node.userData?.basePosition) {
            return;
        }

        universeRadius = Math.max(
            universeRadius,
            node.userData.basePosition.length() + 20
        );
    });

    universeRadius *= 1.15;

    const verticalFov = THREE.MathUtils.degToRad(camera.fov);

    const horizontalFov = 2 * Math.atan(
        Math.tan(verticalFov / 2) * camera.aspect
    );

    const limitingFov = Math.min(
        verticalFov,
        horizontalFov
    );

    const distance = universeRadius /
        Math.sin(limitingFov / 2);

    camera.position.set(
        0,
        distance * 0.055,
        distance
    );

    controls.target.set(0, 0, 0);
    controls.update();
}

frameWholeUniverse();


// =====================================================
// INTERACTION
// =====================================================

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);

let hoveredNode = null;
let selectedNode = null;
let focusedLabelIds = new Set();
let activeKnowledgePath = new Set();
let activeKnowledgePathEdges = new Set();

function makeEdgeKey(a, b) {
    return a < b ? `${a}::${b}` : `${b}::${a}`;
}

function updateMouse(event) {

    mouse.x =
        (event.clientX / window.innerWidth) * 2 - 1;

    mouse.y =
        -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", updateMouse);

renderer.domElement.style.cursor = "default";

function findNode(object) {

    let current = object;

    while (current && !current.userData.tech) {
        current = current.parent;
    }

    return current || null;
}

function getRelatedIds(techId) {

    const related = new Set();

    technologies.forEach(tech => {

        if (tech.id === techId) {
            (tech.links || []).forEach(id => {
                related.add(id);
            });
        }

        if ((tech.links || []).includes(techId)) {
            related.add(tech.id);
        }
    });

    related.delete(techId);

    return related;
}

function showInfo(tech) {
    const infoName = document.getElementById("infoName");
    const infoYear = document.getElementById("infoYear");
    const infoText = document.getElementById("infoText");
    const experimentLaunch = document.getElementById("experimentLaunch");
    const relationDetails = document.getElementById("relationDetails");

    if (infoName) infoName.textContent = tech.name;
    if (infoYear) infoYear.textContent = tech.year === "" || tech.year === undefined ? "" : "出现时间：" + formatYear(tech.year);
    if (infoText) {
        infoText.textContent = tech.description + (tech.impact ? "\n\n影响：\n" + tech.impact : "");
    }
    if (experimentLaunch) {
        const hasExperiment = Boolean(tech.experiment);
        experimentLaunch.hidden = !hasExperiment;
        experimentLaunch.disabled = !hasExperiment;
        experimentLaunch.textContent = hasExperiment ? "🧪 开启交互实验" : "";
        experimentLaunch.onclick = hasExperiment ? () => openExperiment(tech.experiment) : null;
    }

    if (relationDetails) {
        relationDetails.replaceChildren();
        const relatedIds = getRelatedIds(tech.id);
        if (!relatedIds.size) {
            relationDetails.hidden = true;
        } else {
            relationDetails.hidden = false;
            const heading = document.createElement("div");
            heading.className = "relation-details-title";
            heading.textContent = `关联科技 · ${relatedIds.size}`;
            const note = document.createElement("div");
            note.className = "relation-details-note";
            note.textContent = "连线表示本项目知识网络收录的关联，不等同于已证明的直接因果关系。点击一项可飞行定位。";
            const list = document.createElement("div");
            list.className = "relation-node-list";
            [...relatedIds]
                .map(id => technologies.find(item => item.id === id))
                .filter(Boolean)
                .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"))
                .slice(0, 10)
                .forEach(item => {
                    const button = document.createElement("button");
                    button.type = "button";
                    button.className = "relation-node-button";
                    const name = document.createElement("span");
                    name.textContent = item.name;
                    const meta = document.createElement("small");
                    const cross = item.field !== tech.field;
                    meta.textContent = cross ? `跨学科 · ${fields[item.field]?.name || item.field}` : `同学科 · ${fields[item.field]?.name || item.field}`;
                    button.append(name, meta);
                    button.addEventListener("click", () => flyToTechnology(nodeMap[item.id]));
                    list.appendChild(button);
                });
            relationDetails.append(heading, note, list);
        }
    }
}

function formatYear(year) {

    if (year < 0) {
        return Math.abs(year) + " BCE";
    }

    if (year === 0) {
        return "0 CE";
    }

    return year + " CE";
}

function clearSelection() {

    selectedNode = null;
    focusedLabelIds = new Set();
    closeExperiment();

    nodes.forEach(node => {

        node.material.opacity = 1;
        node.material.transparent = true;
        node.material.emissiveIntensity = 2.8;

        node.userData.halo.material.opacity = 0.10;
        node.userData.orbit.material.opacity = 0.38;

        node.scale.setScalar(1);
    });

    relations.forEach(relation => {

        relation.line.material.opacity =
            relation.baseLineOpacity;

        relation.packet.material.opacity =
            relation.basePacketOpacity;
    });

    showInfo({
        name: "Select Technology",
        year: "",
        description: "Click a technology node.",
        impact: ""
    });

    const experimentLaunch = document.getElementById("experimentLaunch");
    if (experimentLaunch) {
        experimentLaunch.hidden = true;
        experimentLaunch.disabled = true;
    }
}

function selectTechnology(node) {

    activeKnowledgePath.clear();
    activeKnowledgePathEdges.clear();
    selectedNode = node;

    const tech = node.userData.tech;
    const relatedIds = getRelatedIds(tech.id);
    focusedLabelIds = new Set(relatedIds);
    focusedLabelIds.add(tech.id);

    nodes.forEach(other => {

        const id = other.userData.tech.id;

        if (other === node) {

            other.material.opacity = 1;
            other.material.transparent = true;
            other.material.emissiveIntensity = 5.5;

            other.userData.halo.material.opacity = 0.38;
            other.userData.orbit.material.opacity = 0.9;

            other.scale.setScalar(1.35);

        } else if (relatedIds.has(id)) {

            other.material.opacity = 0.95;
            other.material.transparent = true;
            other.material.emissiveIntensity = 4.3;

            other.userData.halo.material.opacity = 0.25;
            other.userData.orbit.material.opacity = 0.65;

            other.scale.setScalar(1.12);

        } else {

            other.material.opacity = 0.12;
            other.material.transparent = true;
            other.material.emissiveIntensity = 0.35;

            other.userData.halo.material.opacity = 0.02;
            other.userData.orbit.material.opacity = 0.06;

            other.scale.setScalar(1);
        }
    });

    relations.forEach(relation => {

        const fromId = relation.fromNode.userData.tech.id;
        const toId = relation.toNode.userData.tech.id;

        const active =
            fromId === tech.id ||
            toId === tech.id;

        relation.line.material.opacity =
            active ? 0.88 : 0.018;

        relation.packet.material.opacity =
            active ? 1 : 0.015;
    });

    showInfo(tech);

    // Selecting a node never forces an experiment panel open.
    // The user explicitly launches an experiment from the info panel.
    closeExperiment();
}

window.addEventListener("click", event => {

    // Do not let UI clicks (info panel / experiment panel / title)
    // pass through to the 3D canvas interaction system.
    if (event.target.closest("#infoPanel, #experimentPanel, #title, #searchPanel")) {
        return;
    }

    updateMouse(event);

    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(
        nodes,
        true
    );

    if (hits.length === 0) {
        clearSelection();
        return;
    }

    const node = findNode(hits[0].object);

    if (!node) {
        return;
    }

    if (!node.userData.introFinished) {
        return;
    }

    if (selectedNode === node) {
        clearSelection();
        return;
    }

    selectTechnology(node);
});

function updateHover() {

    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(
        nodes,
        true
    );

    let node = null;

    if (hits.length > 0) {
        node = findNode(hits[0].object);
    }

    if (hoveredNode !== node) {

        if (
            hoveredNode &&
            hoveredNode !== selectedNode &&
            hoveredNode.userData.introFinished
        ) {
            hoveredNode.scale.setScalar(1);
        }

        hoveredNode = node;
    }

    if (
        hoveredNode &&
        hoveredNode !== selectedNode &&
        hoveredNode.userData.introFinished
    ) {
        hoveredNode.scale.setScalar(1.18);
        renderer.domElement.style.cursor = "pointer";
    } else {
        renderer.domElement.style.cursor = "default";
    }
}


// =====================================================
// ANIMATION
// =====================================================

const clock = new THREE.Clock();

// Camera flight state used by the technology search.
let activeCameraFlight = null;

function flyToTechnology(node) {
    if (!node) return;

    // If the node is still materializing, finish its entrance so the camera
    // flies toward a stable destination instead of a moving intermediate point.
    if (!node.userData.introFinished) {
        node.userData.introFinished = true;
        node.userData.introProgress = 1;
        node.userData.introDelay = clock.getElapsedTime() - INTRO_DURATION;
        node.position.copy(node.userData.basePosition);
        node.material.opacity = 1;
        node.userData.label.style.opacity = "0.88";
        node.userData.halo.material.opacity = 0.1;
        node.userData.orbit.material.opacity = 0.38;
        node.scale.setScalar(1);
    }

    selectTechnology(node);

    const destination = node.userData.basePosition.clone();
    let offset = camera.position.clone().sub(controls.target);
    if (offset.lengthSq() < 0.001) {
        offset.set(0.15, 0.12, 1);
    }
    offset.normalize();

    // Pull back enough to see the selected node and its immediate neighbors.
    const destinationCamera = destination.clone().addScaledVector(offset, 245);
    destinationCamera.y += 22;

    activeCameraFlight = {
        startedAt: clock.getElapsedTime(),
        duration: 1.25,
        fromCamera: camera.position.clone(),
        toCamera: destinationCamera,
        fromTarget: controls.target.clone(),
        toTarget: destination.clone()
    };

    controls.enabled = false;
    camera.lookAt(controls.target);
}

function updateCameraFlight(time) {
    if (!activeCameraFlight) return;

    const flight = activeCameraFlight;
    const raw = THREE.MathUtils.clamp(
        (time - flight.startedAt) / flight.duration,
        0,
        1
    );
    const eased = raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2;

    camera.position.lerpVectors(flight.fromCamera, flight.toCamera, eased);
    controls.target.lerpVectors(flight.fromTarget, flight.toTarget, eased);
    camera.lookAt(controls.target);

    if (raw >= 1) {
        camera.position.copy(flight.toCamera);
        controls.target.copy(flight.toTarget);
        camera.lookAt(controls.target);
        activeCameraFlight = null;
        controls.enabled = true;
        controls.update();
    }
}

function findShortestKnowledgePath(startId, endId) {
    if (!nodeMap[startId] || !nodeMap[endId]) return null;
    if (startId === endId) return [startId];
    const queue = [startId];
    const previous = new Map([[startId, null]]);
    while (queue.length) {
        const current = queue.shift();
        if (current === endId) break;
        const neighbors = new Set();
        const currentTech = technologies.find(t => t.id === current);
        (currentTech?.links || []).forEach(id => neighbors.add(id));
        technologies.forEach(t => {
            if ((t.links || []).includes(current)) neighbors.add(t.id);
        });
        for (const next of neighbors) {
            if (!nodeMap[next] || previous.has(next)) continue;
            previous.set(next, current);
            queue.push(next);
        }
    }
    if (!previous.has(endId)) return null;
    const path = [];
    for (let cur = endId; cur !== null; cur = previous.get(cur)) path.push(cur);
    return path.reverse();
}

function applyKnowledgePath(path) {
    activeKnowledgePath = new Set(path);
    activeKnowledgePathEdges = new Set();
    for (let i = 0; i < path.length - 1; i++) {
        activeKnowledgePathEdges.add(makeEdgeKey(path[i], path[i + 1]));
    }
    focusedLabelIds = new Set(path);
    const pathNodeSet = activeKnowledgePath;
    nodes.forEach(node => {
        const id = node.userData.tech.id;
        const onPath = pathNodeSet.has(id);
        node.material.opacity = onPath ? 1 : 0.10;
        node.material.transparent = true;
        node.material.emissiveIntensity = onPath ? 5.8 : 0.28;
        node.userData.halo.material.opacity = onPath ? 0.42 : 0.015;
        node.userData.orbit.material.opacity = onPath ? 0.95 : 0.04;
        node.scale.setScalar(onPath ? 1.25 : 0.86);
    });
    relations.forEach(relation => {
        const key = makeEdgeKey(relation.fromNode.userData.tech.id, relation.toNode.userData.tech.id);
        const onPath = activeKnowledgePathEdges.has(key);
        relation.line.material.opacity = onPath ? 0.98 : 0.012;
        relation.packet.material.opacity = onPath ? 1 : 0.008;
    });
}

function setupKnowledgePathPlanner() {
    const startSelect = document.getElementById("routeStart");
    const endSelect = document.getElementById("routeEnd");
    const findButton = document.getElementById("findKnowledgePath");
    const clearButton = document.getElementById("clearKnowledgePath");
    const result = document.getElementById("pathResult");
    if (!startSelect || !endSelect || !findButton || !clearButton || !result) return;

    const sorted = [...technologies].sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
    function fillSelect(select, placeholder) {
        select.replaceChildren();
        const first = document.createElement("option");
        first.value = "";
        first.textContent = placeholder;
        select.appendChild(first);
        sorted.forEach(tech => {
            const option = document.createElement("option");
            option.value = tech.id;
            option.textContent = `${tech.name} · ${fields[tech.field]?.name || tech.field}`;
            select.appendChild(option);
        });
    }
    fillSelect(startSelect, "选择起点科技…");
    fillSelect(endSelect, "选择终点科技…");
    startSelect.value = nodeMap.dna ? "dna" : "";
    endSelect.value = nodeMap.ai ? "ai" : "";

    findButton.addEventListener("click", () => {
        const startId = startSelect.value;
        const endId = endSelect.value;
        if (!startId || !endId) {
            result.textContent = "请先选择起点和终点。";
            return;
        }
        const path = findShortestKnowledgePath(startId, endId);
        if (!path) {
            result.textContent = "数据库中尚未找到这两项科技之间的关联路径。可以尝试更换节点，或补充科技关系数据。";
            activeKnowledgePath.clear(); activeKnowledgePathEdges.clear();
            if (selectedNode) selectTechnology(selectedNode);
            else clearSelection();
            return;
        }
        const targetId = path[Math.floor((path.length - 1) / 2)];
        const targetNode = nodeMap[targetId];
        if (targetNode) flyToTechnology(targetNode);
        applyKnowledgePath(path);
        const names = path.map(id => technologies.find(t => t.id === id)?.name || id);
        result.replaceChildren();
        const summary = document.createElement("div");
        summary.innerHTML = `<strong>找到 ${path.length - 1} 条关联边</strong> · 最短路径（按当前关系网计算）`;
        const route = document.createElement("div");
        route.className = "path-route-steps";
        names.forEach((name, index) => {
            const step = document.createElement("span");
            step.className = "path-step";
            step.textContent = name;
            route.appendChild(step);
            if (index < names.length - 1) {
                const arrow = document.createElement("span");
                arrow.textContent = "  →  ";
                arrow.style.color = "#72dfff";
                route.appendChild(arrow);
            }
        });
        result.append(summary, route);
    });

    clearButton.addEventListener("click", () => {
        activeKnowledgePath.clear(); activeKnowledgePathEdges.clear();
        if (selectedNode) selectTechnology(selectedNode);
        else clearSelection();
        result.textContent = "路径已清除。选择两个节点以规划新路径。";
    });
}

function setupTechnologySearch() {
    const input = document.getElementById("technologySearch");
    const resultsPanel = document.getElementById("searchResults");
    const summary = document.getElementById("searchSummary");
    const totalBadge = document.querySelector(".search-total");
    if (totalBadge) totalBadge.textContent = `${technologies.length} NODES`;
    if (!input || !resultsPanel) return;

    const starterIds = ["dna", "optics", "computer", "quantum", "ai"];

    function renderResults(rawQuery = "") {
        const query = rawQuery.trim().toLocaleLowerCase();
        let matches;

        if (!query) {
            matches = starterIds
                .map(id => technologies.find(tech => tech.id === id))
                .filter(Boolean);
        } else {
            matches = technologies
                .map(tech => {
                    const fieldName = fields[tech.field]?.name || "";
                    const searchable = `${tech.name} ${tech.id} ${fieldName} ${tech.description || ""}`.toLocaleLowerCase();
                    let rank = 4;
                    if (tech.name.toLocaleLowerCase() === query || tech.id.toLocaleLowerCase() === query) rank = 0;
                    else if (tech.name.toLocaleLowerCase().startsWith(query) || tech.id.toLocaleLowerCase().startsWith(query)) rank = 1;
                    else if (tech.name.toLocaleLowerCase().includes(query) || tech.id.toLocaleLowerCase().includes(query)) rank = 2;
                    else if (searchable.includes(query)) rank = 3;
                    return { tech, rank };
                })
                .filter(item => item.rank < 4)
                .sort((a, b) => a.rank - b.rank || a.tech.name.localeCompare(b.tech.name, "zh-CN"))
                .map(item => item.tech);
        }

        resultsPanel.replaceChildren();
        const shown = matches.slice(0, 8);

        if (summary) {
            summary.textContent = query
                ? `${matches.length} 个匹配节点 · 共 ${technologies.length} 个节点`
                : `快速入口 · 共 ${technologies.length} 个节点`;
        }

        if (!shown.length) {
            const empty = document.createElement("div");
            empty.className = "search-empty";
            empty.textContent = "没有找到匹配节点。试试中文名称或英文关键词。";
            resultsPanel.appendChild(empty);
            resultsPanel.hidden = false;
            return;
        }

        shown.forEach(tech => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "search-result";

            const copy = document.createElement("span");
            copy.className = "search-result-copy";
            const name = document.createElement("strong");
            name.textContent = tech.name;
            const meta = document.createElement("small");
            const yearLabel = tech.year === "" || tech.year === undefined
                ? "年代未注明"
                : formatYear(tech.year);
            meta.textContent = `${fields[tech.field]?.name || tech.field} · ${yearLabel}`;
            copy.append(name, meta);

            const arrow = document.createElement("span");
            arrow.className = "search-result-arrow";
            arrow.textContent = "↗";
            button.append(copy, arrow);
            button.addEventListener("click", () => {
                input.value = tech.name;
                resultsPanel.hidden = true;
                flyToTechnology(nodeMap[tech.id]);
            });
            resultsPanel.appendChild(button);
        });

        resultsPanel.hidden = false;
    }

    input.addEventListener("focus", () => renderResults(input.value));
    input.addEventListener("input", () => renderResults(input.value));
    input.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            resultsPanel.hidden = true;
            input.blur();
            return;
        }
        if (event.key === "Enter") {
            const first = resultsPanel.querySelector(".search-result");
            if (first) {
                event.preventDefault();
                first.click();
            }
        }
    });

    document.addEventListener("click", event => {
        if (!event.target.closest("#searchPanel")) {
            resultsPanel.hidden = true;
        }
    });

    if (summary) {
        summary.textContent = `${technologies.length} 个可探索科技节点`;
    }
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}

function easeOutBack(value) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}

setupTechnologySearch();
setupKnowledgePathPlanner();

function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();


    // -----------------------------
    // Civilization core
    // -----------------------------

    core.rotation.y = time * 0.12;

    core.scale.setScalar(
        1 + Math.sin(time * 2) * 0.032
    );

    innerEnergy.scale.setScalar(
        1 + Math.sin(time * 3) * 0.10
    );

    coreShell.rotation.y = -time * 0.05;

    coreShell.rotation.x =
        Math.sin(time * 0.16) * 0.18;

    coreRings[0].rotation.y = time * 0.27;
    coreRings[1].rotation.y = -time * 0.18;
    coreRings[2].rotation.y = time * 0.13;


    // -----------------------------
    // Six galaxies
    // -----------------------------

    Object.values(fieldObjects).forEach(fieldObject => {

        fieldObject.particles.rotation.z = time * 0.017;
        fieldObject.particles.rotation.y = time * 0.010;

        fieldObject.galaxyCore.scale.setScalar(
            1 + Math.sin(time * 2.2 + fieldObject.fieldOrder) * 0.06
        );

        fieldObject.galaxyRings.forEach((ring, index) => {

            ring.rotation.z =
                time * (0.022 + index * 0.010);
        });
    });


    // -----------------------------
    // Technology node entrance animation
    // -----------------------------

    nodes.forEach(node => {

        const data = node.userData;
        const base = data.basePosition;
        const center = data.fieldCenter;
        const phase = data.floatPhase;

        let intro =
            (time - data.introDelay) /
            INTRO_DURATION;

        intro = THREE.MathUtils.clamp(intro, 0, 1);
        data.introProgress = intro;

        if (!data.introFinished && intro >= 1) {
            data.introFinished = true;
            node.position.copy(base);
            node.material.opacity =
                selectedNode === node ? 1 : 1;
            node.material.transparent = true;
            data.label.style.opacity = "0.88";
        }

        if (!data.introFinished) {

            const eased = easeOutBack(intro);

            node.position.copy(center).lerp(
                base,
                eased
            );

            const spawnScale =
                THREE.MathUtils.lerp(0.035, 1, easeOutCubic(intro));

            const selectedScale =
                selectedNode === node
                    ? 1.35
                    : hoveredNode === node
                        ? 1.18
                        : 1;

            node.scale.setScalar(
                spawnScale * selectedScale
            );

            node.material.opacity =
                THREE.MathUtils.clamp(
                    easeOutCubic(intro),
                    0,
                    1
                );

            node.userData.halo.material.opacity =
                0.10 * intro;

            node.userData.orbit.material.opacity =
                0.38 * intro;

            data.label.style.opacity = String(
                0.88 * easeOutCubic(intro)
            );

        } else {

            node.position.x =
                base.x +
                Math.sin(time * 0.42 + phase) * 0.7;

            node.position.y =
                base.y +
                Math.sin(time * 0.72 + phase) * 2.2;

            node.position.z =
                base.z +
                Math.cos(time * 0.42 + phase) * 0.7;

            if (selectedNode === node) {
                node.scale.setScalar(1.35);
            } else if (hoveredNode === node) {
                node.scale.setScalar(1.18);
            } else {
                node.scale.setScalar(1);
            }

            if (selectedNode === null) {
                node.material.opacity = 1;
                node.material.emissiveIntensity = 2.8;
            }

            const halo = node.userData.halo;

            const defaultHalo =
                selectedNode === node
                    ? 0.38
                    : hoveredNode === node
                        ? 0.18
                        : 0.10;

            halo.material.opacity =
                defaultHalo *
                (
                    0.94 +
                    Math.sin(time * 1.35 + phase) * 0.06
                );

            halo.scale.setScalar(
                1 +
                Math.sin(time * 1.35 + phase) * 0.10
            );

            const orbit = node.userData.orbit;

            orbit.rotation.y = time * 0.72;
        }

        if (data.introFinished) {
            const orbit = node.userData.orbit;
            orbit.rotation.y = time * 0.72;

            // Fade labels at overview scale to reduce clutter. Search and
            // selecting a node bring its label and related labels back.
            const cameraDistance = camera.position.distanceTo(node.position);
            let labelOpacity;
            if (focusedLabelIds.has(data.tech.id) || hoveredNode === node) {
                labelOpacity = 0.98;
            } else {
                const near = 1 - THREE.MathUtils.smoothstep(cameraDistance, 470, 900);
                labelOpacity = 0.88 * near;
            }
            data.label.style.opacity = String(labelOpacity);
        }
    });


    // -----------------------------
    // Dynamic relations
    // -----------------------------

    relations.forEach(relation => {

        updateRelationGeometry(relation);

        const progress =
            (time * 0.065 + relation.phase) % 1;

        relation.packet.position.copy(
            relation.curve.getPoint(progress)
        );

        if (selectedNode === null) {

            const fromProgress =
                relation.fromNode.userData.introProgress;

            const toProgress =
                relation.toNode.userData.introProgress;

            const visibility = Math.min(
                fromProgress,
                toProgress
            );

            const eased = easeOutCubic(
                THREE.MathUtils.clamp(visibility, 0, 1)
            );

            relation.line.material.opacity =
                relation.baseLineOpacity * eased;

            relation.packet.material.opacity =
                relation.basePacketOpacity * eased;
        }
    });


    // -----------------------------
    // Stars
    // -----------------------------

    backgroundStars.rotation.y = time * 0.004;


    // -----------------------------
    // Interaction
    // -----------------------------

    updateHover();


    // -----------------------------
    // Render
    // -----------------------------

    if (activeCameraFlight) {
        updateCameraFlight(time);
    } else {
        controls.update();
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

animate();


// =====================================================
// RESIZE
// =====================================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    labelRenderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
