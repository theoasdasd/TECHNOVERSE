export const fields = 
{
    "math": {
        "name": "数学",
        "color": 16764762
    },
    "physics": {
        "name": "物理",
        "color": 5556735
    },
    "chemistry": {
        "name": "化学与材料",
        "color": 16737935
    },
    "biology": {
        "name": "生命科学",
        "color": 6549383
    },
    "engineering": {
        "name": "工程技术",
        "color": 16748877
    },
    "information": {
        "name": "信息科学",
        "color": 11174655
    }
}
;

export const technologies = 
[
    {
        "id": "number",
        "name": "数字与计数",
        "year": -3000,
        "field": "math",
        "description": "人类对数量进行系统表示和运算的早期数学基础。",
        "impact": "为测量、贸易、天文学和后续数学发展提供基础。",
        "links": [
            "arithmetic",
            "geometry",
            "algebra"
        ]
    },
    {
        "id": "arithmetic",
        "name": "算术",
        "year": -2000,
        "field": "math",
        "description": "研究数字的加减乘除以及数量运算，是最基础的计算方法。",
        "impact": "支撑商业、测量、工程和后续抽象数学。",
        "links": [
            "number",
            "algebra"
        ]
    },
    {
        "id": "geometry",
        "name": "几何学",
        "year": -300,
        "field": "math",
        "description": "研究空间、形状、距离以及它们之间关系的数学分支。",
        "impact": "影响建筑、测量、天文学和物理学。",
        "links": [
            "algebra",
            "analytic_geometry",
            "trigonometry"
        ]
    },
    {
        "id": "trigonometry",
        "name": "三角学",
        "year": -200,
        "field": "math",
        "description": "研究角、三角形以及周期关系的数学工具体系。",
        "impact": "广泛用于天文学、测量、工程和波动分析。",
        "links": [
            "geometry",
            "analytic_geometry",
            "physics_mechanics",
            "optics"
        ]
    },
    {
        "id": "algebra",
        "name": "代数学",
        "year": 820,
        "field": "math",
        "description": "用符号描述未知量、方程和数学结构。",
        "impact": "成为现代数学、物理和计算机科学的重要语言。",
        "links": [
            "analytic_geometry",
            "calculus",
            "linear_algebra",
            "number_theory"
        ]
    },
    {
        "id": "number_theory",
        "name": "数论",
        "year": 300,
        "field": "math",
        "description": "研究整数、素数以及整数结构与规律的数学分支。",
        "impact": "为密码学、编码和现代计算安全提供理论基础。",
        "links": [
            "algebra",
            "logic",
            "information_theory"
        ]
    },
    {
        "id": "analytic_geometry",
        "name": "解析几何",
        "year": 1637,
        "field": "math",
        "description": "用代数方法描述几何对象和空间关系。",
        "impact": "建立代数与几何之间的桥梁。",
        "links": [
            "calculus",
            "physics_mechanics"
        ]
    },
    {
        "id": "calculus",
        "name": "微积分",
        "year": 1687,
        "field": "math",
        "description": "研究变化、极限、导数和积分的数学体系。",
        "impact": "成为现代物理、工程和机器学习的重要数学基础。",
        "links": [
            "differential_equations",
            "physics_mechanics",
            "probability",
            "linear_algebra"
        ]
    },
    {
        "id": "probability",
        "name": "概率论",
        "year": 1654,
        "field": "math",
        "description": "研究随机现象和不确定性的数学工具。",
        "impact": "支撑统计学、风险分析和现代人工智能。",
        "links": [
            "statistics",
            "information_theory",
            "machine_learning"
        ]
    },
    {
        "id": "statistics",
        "name": "统计学",
        "year": 1800,
        "field": "math",
        "description": "从数据中提取规律、估计参数和检验假设。",
        "impact": "成为实验科学、数据分析和机器学习的重要基础。",
        "links": [
            "machine_learning",
            "computer",
            "probability"
        ]
    },
    {
        "id": "linear_algebra",
        "name": "线性代数",
        "year": 1840,
        "field": "math",
        "description": "研究向量、矩阵、线性变换和线性方程组。",
        "impact": "成为计算机图形学、物理和机器学习的核心工具。",
        "links": [
            "computer",
            "machine_learning",
            "quantum"
        ]
    },
    {
        "id": "logic",
        "name": "形式逻辑",
        "year": 1879,
        "field": "math",
        "description": "用形式系统描述推理规则和命题关系。",
        "impact": "影响数学基础、计算机理论和程序设计。",
        "links": [
            "binary",
            "computer",
            "number_theory"
        ]
    },
    {
        "id": "differential_equations",
        "name": "微分方程",
        "year": 1750,
        "field": "math",
        "description": "用含导数的方程描述连续变化过程。",
        "impact": "是力学、热学、流体、工程和控制理论的核心工具。",
        "links": [
            "calculus",
            "optimization",
            "physics_mechanics"
        ]
    },
    {
        "id": "optimization",
        "name": "优化理论",
        "year": 1940,
        "field": "math",
        "description": "研究如何在约束条件下寻找最佳或近似最佳方案。",
        "impact": "成为工程设计、运筹学和机器学习训练的核心方法。",
        "links": [
            "linear_algebra",
            "statistics",
            "machine_learning"
        ]
    },
    {
        "id": "graph_theory",
        "name": "图论",
        "year": 1736,
        "field": "math",
        "description": "研究节点、边以及网络结构之间关系的数学分支。",
        "impact": "应用于互联网、交通网络、社交网络和复杂系统。",
        "links": [
            "logic",
            "computer",
            "information_theory"
        ]
    },
    {
        "id": "information_theory",
        "name": "信息论",
        "year": 1948,
        "field": "math",
        "description": "研究信息量、编码、噪声和通信效率的数学理论。",
        "impact": "支撑通信、数据压缩、密码学和人工智能。",
        "links": [
            "statistics",
            "computer",
            "internet",
            "machine_learning"
        ]
    },
    {
        "id": "fourier_analysis",
        "name": "傅里叶分析",
        "year": 1822,
        "field": "math",
        "description": "用正弦和余弦等基本波分解复杂信号与周期过程。",
        "impact": "广泛用于信号处理、图像压缩、通信和物理学。",
        "links": [
            "calculus",
            "trigonometry",
            "optics",
            "information_theory"
        ]
    },
    {
        "id": "physics_mechanics",
        "name": "经典力学",
        "year": 1687,
        "field": "physics",
        "description": "研究物体运动、力和相互作用的经典理论。",
        "impact": "奠定现代物理和机械工程的基础。",
        "links": [
            "calculus",
            "steam",
            "thermodynamics"
        ],
        "experiment": {
            "type": "mechanics"
        }
    },
    {
        "id": "optics",
        "name": "光学",
        "year": 1609,
        "field": "physics",
        "description": "研究光的传播、反射、折射、成像和相互作用。",
        "impact": "推动望远镜、显微镜、激光和现代成像。",
        "links": [
            "telescope",
            "microscope",
            "laser",
            "trigonometry"
        ],
        "experiment": {
            "type": "optics"
        }
    },
    {
        "id": "telescope",
        "name": "望远镜",
        "year": 1608,
        "field": "physics",
        "description": "利用光学系统收集并放大远处天体发出的光。",
        "impact": "改变了人类观测宇宙和发展现代天文学的能力。",
        "links": [
            "optics",
            "astronomy"
        ]
    },
    {
        "id": "thermodynamics",
        "name": "热力学",
        "year": 1850,
        "field": "physics",
        "description": "研究热、功、能量和熵之间的关系。",
        "impact": "支撑蒸汽机、发动机和能源工程。",
        "links": [
            "steam",
            "engine",
            "differential_equations"
        ]
    },
    {
        "id": "electricity",
        "name": "电学",
        "year": 1800,
        "field": "physics",
        "description": "研究电荷、电势、电流和电场。",
        "impact": "成为现代电力和电子技术的基础。",
        "links": [
            "electromagnetism",
            "circuit",
            "electric_grid"
        ],
        "experiment": {
            "type": "circuit"
        }
    },
    {
        "id": "electromagnetism",
        "name": "电磁学",
        "year": 1865,
        "field": "physics",
        "description": "统一描述电场、磁场和电磁波。",
        "impact": "推动电机、无线电、通信和电子技术。",
        "links": [
            "radio",
            "electric_motor",
            "transistor"
        ]
    },
    {
        "id": "relativity",
        "name": "相对论",
        "year": 1905,
        "field": "physics",
        "description": "重新描述高速运动、时空和引力。",
        "impact": "改变现代物理学的时空观，并影响卫星导航。",
        "links": [
            "gps",
            "quantum",
            "gravitational_wave"
        ]
    },
    {
        "id": "quantum",
        "name": "量子力学",
        "year": 1925,
        "field": "physics",
        "description": "描述微观粒子行为的现代物理理论。",
        "impact": "支撑半导体、激光和量子技术。",
        "links": [
            "semiconductor",
            "laser",
            "transistor",
            "quantum_field"
        ]
    },
    {
        "id": "atom_model",
        "name": "原子模型",
        "year": 1911,
        "field": "physics",
        "description": "探索原子内部结构的理论模型，逐步从经典图像走向量子描述。",
        "impact": "连接经典物理、原子物理和量子理论。",
        "links": [
            "quantum",
            "atomic_theory"
        ]
    },
    {
        "id": "solid_state",
        "name": "固体物理",
        "year": 1940,
        "field": "physics",
        "description": "研究晶体、电子能带以及固体中的集体现象。",
        "impact": "为半导体、磁性材料和凝聚态电子学提供基础。",
        "links": [
            "quantum",
            "semiconductor",
            "integrated_circuit"
        ]
    },
    {
        "id": "quantum_field",
        "name": "量子场论",
        "year": 1940,
        "field": "physics",
        "description": "以量子场描述粒子及其相互作用的理论框架。",
        "impact": "成为现代高能粒子物理的重要理论基础。",
        "links": [
            "quantum",
            "particle_physics",
            "standard_model"
        ]
    },
    {
        "id": "particle_physics",
        "name": "粒子物理",
        "year": 1970,
        "field": "physics",
        "description": "研究基本粒子及其相互作用。",
        "impact": "建立现代物理的微观理论体系。",
        "links": [
            "quantum_field",
            "standard_model"
        ]
    },
    {
        "id": "standard_model",
        "name": "标准模型",
        "year": 1973,
        "field": "physics",
        "description": "描述夸克、轻子以及基本相互作用的一套量子场论框架。",
        "impact": "构成现代粒子物理的核心理论体系。",
        "links": [
            "particle_physics"
        ]
    },
    {
        "id": "nuclear",
        "name": "核物理",
        "year": 1942,
        "field": "physics",
        "description": "研究原子核结构、衰变以及核反应。",
        "impact": "推动核能、核医学和现代粒子物理。",
        "links": [
            "nuclear_energy",
            "nuclear_fission",
            "particle_physics"
        ]
    },
    {
        "id": "nuclear_fission",
        "name": "核裂变",
        "year": 1938,
        "field": "physics",
        "description": "重原子核裂变并释放大量能量的核反应过程。",
        "impact": "奠定裂变堆和核能利用的物理基础。",
        "links": [
            "nuclear",
            "nuclear_energy"
        ]
    },
    {
        "id": "fusion_energy",
        "name": "可控核聚变",
        "year": 1950,
        "field": "physics",
        "description": "研究让轻原子核在高温等离子体中发生聚变并释放能量的方法。",
        "impact": "被视为潜在的高能量密度低碳能源路线之一。",
        "links": [
            "nuclear",
            "plasma",
            "engineering_materials"
        ]
    },
    {
        "id": "plasma",
        "name": "等离子体物理",
        "year": 1920,
        "field": "physics",
        "description": "研究带电粒子组成的高温电离介质及其集体行为。",
        "impact": "支撑聚变能源、空间物理和等离子体工程。",
        "links": [
            "fusion_energy",
            "electromagnetism"
        ]
    },
    {
        "id": "gravitational_wave",
        "name": "引力波探测",
        "year": 2015,
        "field": "physics",
        "description": "直接探测由剧烈天体运动产生的时空扰动。",
        "impact": "开启利用引力波观测宇宙的新窗口。",
        "links": [
            "relativity"
        ]
    },
    {
        "id": "quantum_computing",
        "name": "量子计算",
        "year": 1980,
        "field": "physics",
        "description": "利用量子态和量子门进行信息处理的计算范式。",
        "impact": "连接量子物理、算法和新型计算机。",
        "links": [
            "quantum",
            "computer",
            "superconducting"
        ]
    },
    {
        "id": "fire_material",
        "name": "火与材料转化",
        "year": -400000,
        "field": "chemistry",
        "description": "利用火焰改变材料性质，是早期材料技术的重要经验。",
        "impact": "为陶瓷、冶金和化学技术奠定基础。",
        "links": [
            "ceramics",
            "metallurgy"
        ]
    },
    {
        "id": "ceramics",
        "name": "陶瓷",
        "year": -12000,
        "field": "chemistry",
        "description": "通过高温处理黏土等材料制造稳定制品。",
        "impact": "推动容器、建筑和材料工程。",
        "links": [
            "metallurgy",
            "glass"
        ]
    },
    {
        "id": "metallurgy",
        "name": "冶金",
        "year": -3000,
        "field": "chemistry",
        "description": "从矿石中提取和加工金属。",
        "impact": "推动青铜、铁器和工业文明。",
        "links": [
            "steel",
            "chemistry"
        ]
    },
    {
        "id": "steel",
        "name": "钢铁冶炼",
        "year": -1000,
        "field": "chemistry",
        "description": "通过熔炼与精炼获得具有工程性能的铁基材料。",
        "impact": "成为机械、建筑、铁路和现代工业的重要材料基础。",
        "links": [
            "metallurgy",
            "machine_tool",
            "bridge"
        ]
    },
    {
        "id": "glass",
        "name": "玻璃",
        "year": -1500,
        "field": "chemistry",
        "description": "利用硅酸盐材料制成透明固体。",
        "impact": "推动光学、建筑和科学仪器。",
        "links": [
            "optics",
            "microscope"
        ]
    },
    {
        "id": "chemistry",
        "name": "现代化学",
        "year": 1800,
        "field": "chemistry",
        "description": "以实验和定量方法研究物质组成与变化。",
        "impact": "连接物质世界与现代工业。",
        "links": [
            "periodic_table",
            "organic_chemistry",
            "electrochemistry"
        ]
    },
    {
        "id": "atomic_theory",
        "name": "原子理论",
        "year": 1803,
        "field": "chemistry",
        "description": "从原子层面解释物质组成和化学变化。",
        "impact": "建立现代化学的微观基础。",
        "links": [
            "periodic_table",
            "quantum",
            "atom_model"
        ]
    },
    {
        "id": "periodic_table",
        "name": "元素周期表",
        "year": 1869,
        "field": "chemistry",
        "description": "按照元素规律组织化学元素。",
        "impact": "建立现代元素分类框架。",
        "links": [
            "semiconductor",
            "organic_chemistry",
            "catalysis"
        ]
    },
    {
        "id": "organic_chemistry",
        "name": "有机化学",
        "year": 1850,
        "field": "chemistry",
        "description": "研究含碳化合物及其反应。",
        "impact": "支撑药物、材料和生命化学。",
        "links": [
            "polymer",
            "biology_molecular",
            "pharmaceuticals"
        ]
    },
    {
        "id": "polymer",
        "name": "高分子材料",
        "year": 1907,
        "field": "chemistry",
        "description": "利用长链分子构建具有特殊性能的材料。",
        "impact": "改变塑料、纤维和现代材料工业。",
        "links": [
            "engineering_materials",
            "composite_material"
        ]
    },
    {
        "id": "battery",
        "name": "化学电池",
        "year": 1800,
        "field": "chemistry",
        "description": "通过化学反应把化学能转化为电能。",
        "impact": "成为移动能源和现代电子设备的重要基础。",
        "links": [
            "electricity",
            "circuit",
            "lithium_battery"
        ]
    },
    {
        "id": "electrochemistry",
        "name": "电化学",
        "year": 1800,
        "field": "chemistry",
        "description": "研究化学反应与电能之间相互转换的过程。",
        "impact": "支撑电池、电解、腐蚀和电化学工业。",
        "links": [
            "battery",
            "lithium_battery",
            "electricity"
        ]
    },
    {
        "id": "catalysis",
        "name": "催化",
        "year": 1900,
        "field": "chemistry",
        "description": "利用催化剂改变反应速率和选择性而不被大量消耗。",
        "impact": "支撑炼油、化工、环保和绿色化学。",
        "links": [
            "chemistry",
            "fertilizer",
            "pharmaceuticals"
        ]
    },
    {
        "id": "fertilizer",
        "name": "合成氨与化肥",
        "year": 1913,
        "field": "chemistry",
        "description": "工业化制取氨并进一步制造氮肥。",
        "impact": "显著提升农业生产能力并改变现代人口承载力。",
        "links": [
            "catalysis",
            "chemistry"
        ]
    },
    {
        "id": "pharmaceuticals",
        "name": "现代药物化学",
        "year": 1900,
        "field": "chemistry",
        "description": "利用有机化学和生物学方法设计与合成药物分子。",
        "impact": "推动抗感染、慢病和靶向治疗的发展。",
        "links": [
            "organic_chemistry",
            "biology_molecular",
            "antibiotics"
        ]
    },
    {
        "id": "composite_material",
        "name": "复合材料",
        "year": 1950,
        "field": "chemistry",
        "description": "把不同材料组合成兼具多种性能的工程材料。",
        "impact": "广泛用于航空、汽车、风电和建筑。",
        "links": [
            "polymer",
            "engineering_materials",
            "aircraft"
        ]
    },
    {
        "id": "nanomaterials",
        "name": "纳米材料",
        "year": 1980,
        "field": "chemistry",
        "description": "研究尺寸处于纳米尺度时出现特殊性质的材料。",
        "impact": "推动电子、催化、能源和生物材料研究。",
        "links": [
            "atomic_theory",
            "semiconductor",
            "composite_material"
        ]
    },
    {
        "id": "lithium_battery",
        "name": "锂离子电池",
        "year": 1991,
        "field": "chemistry",
        "description": "通过锂离子在正负极之间可逆迁移实现高能量密度储能。",
        "impact": "成为智能设备、电动车和储能系统的重要能源技术。",
        "links": [
            "battery",
            "electrochemistry",
            "electric_grid"
        ]
    },
    {
        "id": "microscope",
        "name": "显微镜",
        "year": 1590,
        "field": "biology",
        "description": "利用光学系统放大微小结构。",
        "impact": "让人类第一次系统观察微观生命世界。",
        "links": [
            "optics",
            "cell_theory"
        ]
    },
    {
        "id": "cell_theory",
        "name": "细胞学说",
        "year": 1838,
        "field": "biology",
        "description": "提出细胞是生物体基本结构和功能单位。",
        "impact": "建立现代生命科学的重要框架。",
        "links": [
            "evolution",
            "genetics",
            "microscope"
        ]
    },
    {
        "id": "germ_theory",
        "name": "病原学说",
        "year": 1860,
        "field": "biology",
        "description": "解释微生物与疾病之间的关系。",
        "impact": "推动现代医学、卫生和疫苗技术。",
        "links": [
            "vaccine",
            "antibiotics"
        ]
    },
    {
        "id": "evolution",
        "name": "进化论",
        "year": 1859,
        "field": "biology",
        "description": "解释生物种群如何随着世代变化。",
        "impact": "提供统一的生命演化框架。",
        "links": [
            "genetics",
            "ecology"
        ]
    },
    {
        "id": "mendel",
        "name": "孟德尔遗传学",
        "year": 1866,
        "field": "biology",
        "description": "孟德尔通过豌豆实验发现遗传性状分离和组合的规律。",
        "impact": "建立经典遗传学基础，并成为现代遗传研究的起点之一。",
        "links": [
            "genetics"
        ]
    },
    {
        "id": "genetics",
        "name": "遗传学",
        "year": 1900,
        "field": "biology",
        "description": "研究遗传规律和遗传信息传递。",
        "impact": "成为现代育种和分子生物学基础。",
        "links": [
            "mendel",
            "dna",
            "genome"
        ]
    },
    {
        "id": "dna",
        "name": "DNA双螺旋",
        "year": 1953,
        "field": "biology",
        "description": "揭示DNA分子的双螺旋结构。",
        "impact": "推动分子生物学和基因工程。",
        "links": [
            "genetics",
            "gene_engineering",
            "biology_molecular"
        ],
        "experiment": {
            "type": "dna"
        }
    },
    {
        "id": "rna",
        "name": "RNA研究",
        "year": 1961,
        "field": "biology",
        "description": "研究RNA在遗传信息传递、调控和蛋白质合成中的作用。",
        "impact": "推动分子生物学、疫苗和RNA技术发展。",
        "links": [
            "dna",
            "biology_molecular"
        ]
    },
    {
        "id": "protein",
        "name": "蛋白质结构",
        "year": 1958,
        "field": "biology",
        "description": "研究蛋白质的氨基酸组成、折叠与三维结构。",
        "impact": "连接结构生物学、医学和人工智能预测。",
        "links": [
            "biology_molecular",
            "alphafold"
        ]
    },
    {
        "id": "biology_molecular",
        "name": "分子生物学",
        "year": 1950,
        "field": "biology",
        "description": "从分子层面研究生命过程和遗传信息。",
        "impact": "连接生物学、化学与医学。",
        "links": [
            "dna",
            "rna",
            "protein",
            "organic_chemistry"
        ]
    },
    {
        "id": "gene_engineering",
        "name": "基因工程",
        "year": 1973,
        "field": "biology",
        "description": "利用分子工具主动改变遗传物质。",
        "impact": "推动药物、农业和生物制造。",
        "links": [
            "dna",
            "crispr",
            "genome"
        ]
    },
    {
        "id": "crispr",
        "name": "CRISPR基因编辑",
        "year": 2012,
        "field": "biology",
        "description": "提供高精度修改DNA序列的工具。",
        "impact": "改变生命科学研究和未来生物技术。",
        "links": [
            "gene_engineering",
            "genome"
        ]
    },
    {
        "id": "vaccine",
        "name": "疫苗接种",
        "year": 1796,
        "field": "biology",
        "description": "利用免疫机制建立对疾病的保护。",
        "impact": "成为现代公共卫生的重要技术。",
        "links": [
            "germ_theory",
            "immunology"
        ]
    },
    {
        "id": "immunology",
        "name": "免疫学",
        "year": 1900,
        "field": "biology",
        "description": "研究免疫系统如何识别并处理外来物与异常细胞。",
        "impact": "支撑疫苗、免疫治疗和现代医学。",
        "links": [
            "vaccine",
            "neuroscience"
        ]
    },
    {
        "id": "antibiotics",
        "name": "抗生素",
        "year": 1928,
        "field": "biology",
        "description": "利用能抑制细菌生长的物质治疗细菌感染。",
        "impact": "显著降低多种感染性疾病的死亡率。",
        "links": [
            "germ_theory",
            "pharmaceuticals"
        ]
    },
    {
        "id": "genome",
        "name": "人类基因组计划",
        "year": 2003,
        "field": "biology",
        "description": "完成对人类基因组的大规模测序和整理。",
        "impact": "推动基因组学、精准医学和生物信息学。",
        "links": [
            "dna",
            "gene_engineering",
            "computer"
        ]
    },
    {
        "id": "ecology",
        "name": "生态学",
        "year": 1866,
        "field": "biology",
        "description": "研究生物与环境以及不同生物之间相互作用的科学。",
        "impact": "帮助理解生态系统、资源和环境变化。",
        "links": [
            "evolution",
            "statistics",
            "climate_science"
        ]
    },
    {
        "id": "neuroscience",
        "name": "神经科学",
        "year": 1900,
        "field": "biology",
        "description": "研究神经系统的结构、功能和信息处理机制。",
        "impact": "连接生物学、医学和脑机接口技术。",
        "links": [
            "cell_theory",
            "ai"
        ]
    },
    {
        "id": "alphafold",
        "name": "AlphaFold蛋白预测",
        "year": 2020,
        "field": "biology",
        "description": "利用人工智能预测蛋白质空间结构。",
        "impact": "展示AI改变生命科学研究方式的能力。",
        "links": [
            "protein",
            "ai",
            "machine_learning"
        ]
    },
    {
        "id": "wheel",
        "name": "轮子",
        "year": -3500,
        "field": "engineering",
        "description": "利用旋转结构提高运输效率。",
        "impact": "成为交通和机械工程的重要基础。",
        "links": [
            "mechanism",
            "vehicle"
        ]
    },
    {
        "id": "mechanism",
        "name": "机械机构",
        "year": 100,
        "field": "engineering",
        "description": "利用齿轮、连杆等结构传递力量和运动。",
        "impact": "为复杂机械系统奠定基础。",
        "links": [
            "steam",
            "engine",
            "machine_tool"
        ]
    },
    {
        "id": "bridge",
        "name": "桥梁工程",
        "year": -3000,
        "field": "engineering",
        "description": "通过结构设计跨越河流、峡谷和其他障碍。",
        "impact": "推动交通网络、建筑结构和材料工程发展。",
        "links": [
            "steel",
            "concrete"
        ]
    },
    {
        "id": "concrete",
        "name": "现代混凝土",
        "year": 1824,
        "field": "engineering",
        "description": "利用水泥与骨料形成可塑并硬化的工程材料。",
        "impact": "成为城市建筑、桥梁和基础设施的主要材料。",
        "links": [
            "ceramics",
            "bridge",
            "steel"
        ]
    },
    {
        "id": "steam",
        "name": "蒸汽机",
        "year": 1769,
        "field": "engineering",
        "description": "将蒸汽热能转化为机械功。",
        "impact": "推动第一次工业革命。",
        "links": [
            "thermodynamics",
            "steam_turbine",
            "engine"
        ]
    },
    {
        "id": "steam_turbine",
        "name": "蒸汽轮机",
        "year": 1884,
        "field": "engineering",
        "description": "利用高速蒸汽推动叶轮旋转并输出机械功。",
        "impact": "成为大型发电和工业动力系统的重要设备。",
        "links": [
            "steam",
            "electric_grid"
        ]
    },
    {
        "id": "engine",
        "name": "内燃机",
        "year": 1876,
        "field": "engineering",
        "description": "在发动机内部完成燃烧并输出机械功。",
        "impact": "推动汽车、航空和现代交通。",
        "links": [
            "vehicle",
            "aircraft",
            "thermodynamics"
        ]
    },
    {
        "id": "electric_motor",
        "name": "电动机",
        "year": 1834,
        "field": "engineering",
        "description": "将电能转化为机械运动。",
        "impact": "支撑现代自动化和电气化工业。",
        "links": [
            "factory",
            "vehicle",
            "electromagnetism"
        ]
    },
    {
        "id": "electric_grid",
        "name": "现代电网",
        "year": 1880,
        "field": "engineering",
        "description": "通过发电、输电和配电系统向大量用户稳定供电。",
        "impact": "建立现代工业和数字社会的能源基础设施。",
        "links": [
            "electricity",
            "battery",
            "factory"
        ]
    },
    {
        "id": "factory",
        "name": "现代工厂",
        "year": 1850,
        "field": "engineering",
        "description": "利用机械、能源和组织系统进行大规模生产。",
        "impact": "彻底改变现代生产方式。",
        "links": [
            "computer",
            "assembly_line",
            "machine_tool"
        ]
    },
    {
        "id": "assembly_line",
        "name": "流水线生产",
        "year": 1913,
        "field": "engineering",
        "description": "把复杂制造过程分成连续工序并组织化生产。",
        "impact": "大幅提高制造效率并塑造现代工业体系。",
        "links": [
            "factory",
            "robotics"
        ]
    },
    {
        "id": "machine_tool",
        "name": "机床",
        "year": 1800,
        "field": "engineering",
        "description": "利用机械系统精确切削、成形和加工材料。",
        "impact": "成为现代制造业的基础设备。",
        "links": [
            "mechanism",
            "steel",
            "factory"
        ]
    },
    {
        "id": "vehicle",
        "name": "汽车",
        "year": 1886,
        "field": "engineering",
        "description": "利用机械动力实现道路运输。",
        "impact": "改变城市、物流和个人交通。",
        "links": [
            "engine",
            "aircraft"
        ]
    },
    {
        "id": "aircraft",
        "name": "飞机",
        "year": 1903,
        "field": "engineering",
        "description": "利用空气动力实现持续飞行。",
        "impact": "建立现代航空交通。",
        "links": [
            "engine",
            "rocket"
        ]
    },
    {
        "id": "rocket",
        "name": "火箭",
        "year": 1944,
        "field": "engineering",
        "description": "利用反作用力获得高速推进。",
        "impact": "推动航天和深空探索。",
        "links": [
            "satellite",
            "space_station"
        ]
    },
    {
        "id": "satellite",
        "name": "人造卫星",
        "year": 1957,
        "field": "engineering",
        "description": "将人工航天器送入轨道运行。",
        "impact": "建立通信、遥感和导航基础设施。",
        "links": [
            "gps",
            "internet",
            "space_station"
        ]
    },
    {
        "id": "nuclear_energy",
        "name": "核能工程",
        "year": 1942,
        "field": "engineering",
        "description": "利用核反应释放高密度能量。",
        "impact": "建立一种全新的高能量密度能源路线。",
        "links": [
            "nuclear",
            "nuclear_fission",
            "electric_grid"
        ]
    },
    {
        "id": "engineering_materials",
        "name": "现代材料工程",
        "year": 1950,
        "field": "engineering",
        "description": "根据结构和性能设计工程材料。",
        "impact": "推动航空、电子和能源技术。",
        "links": [
            "polymer",
            "semiconductor",
            "composite_material"
        ]
    },
    {
        "id": "robotics",
        "name": "机器人技术",
        "year": 1960,
        "field": "engineering",
        "description": "把传感、控制和机械执行器结合成可编程机器系统。",
        "impact": "推动自动化制造、物流和服务机器人。",
        "links": [
            "assembly_line",
            "computer",
            "programming"
        ]
    },
    {
        "id": "cad",
        "name": "计算机辅助设计",
        "year": 1960,
        "field": "engineering",
        "description": "利用计算机建立、修改和分析工程设计模型。",
        "impact": "显著提升机械、建筑和产品开发效率。",
        "links": [
            "computer",
            "machine_tool",
            "3d_printing"
        ]
    },
    {
        "id": "3d_printing",
        "name": "三维打印",
        "year": 1980,
        "field": "engineering",
        "description": "根据数字模型逐层制造实体结构的增材制造技术。",
        "impact": "改变快速原型、小批量制造和复杂结构生产。",
        "links": [
            "cad",
            "polymer",
            "robotics"
        ]
    },
    {
        "id": "space_station",
        "name": "空间站",
        "year": 1971,
        "field": "engineering",
        "description": "在轨道上长期运行、进行科研和生活活动的航天器系统。",
        "impact": "推动长期载人航天和微重力研究。",
        "links": [
            "rocket",
            "satellite"
        ]
    },
    {
        "id": "writing",
        "name": "文字",
        "year": -3200,
        "field": "information",
        "description": "把语言和知识转化为可保存的符号系统。",
        "impact": "让知识能够跨越个体和世代积累。",
        "links": [
            "printing",
            "number"
        ]
    },
    {
        "id": "printing",
        "name": "印刷术",
        "year": 1040,
        "field": "information",
        "description": "利用版面复制大量相同文本。",
        "impact": "大幅降低知识传播成本。",
        "links": [
            "telegraph",
            "writing"
        ]
    },
    {
        "id": "telegraph",
        "name": "电报",
        "year": 1837,
        "field": "information",
        "description": "通过电信号快速传输编码信息。",
        "impact": "第一次大幅突破远距离通信速度限制。",
        "links": [
            "telephone",
            "radio"
        ]
    },
    {
        "id": "telephone",
        "name": "电话",
        "year": 1876,
        "field": "information",
        "description": "把声音转换成可传输信号。",
        "impact": "建立实时远距离语音通信。",
        "links": [
            "radio"
        ]
    },
    {
        "id": "radio",
        "name": "无线电",
        "year": 1895,
        "field": "information",
        "description": "利用电磁波进行无线信息传输。",
        "impact": "推动广播、雷达和现代无线通信。",
        "links": [
            "internet",
            "satellite",
            "electromagnetism"
        ]
    },
    {
        "id": "binary",
        "name": "二进制",
        "year": 1703,
        "field": "information",
        "description": "利用两个状态表示数字和信息。",
        "impact": "成为数字计算的核心表示方式。",
        "links": [
            "logic",
            "computer"
        ]
    },
    {
        "id": "logic_gate",
        "name": "逻辑门",
        "year": 1938,
        "field": "information",
        "description": "执行基本布尔逻辑运算的数字计算单元。",
        "impact": "构成数字计算机的基础。",
        "links": [
            "transistor",
            "computer"
        ]
    },
    {
        "id": "transistor",
        "name": "晶体管",
        "year": 1947,
        "field": "information",
        "description": "利用半导体材料控制电子流。",
        "impact": "奠定现代电子设备和集成电路基础。",
        "links": [
            "semiconductor",
            "integrated_circuit"
        ]
    },
    {
        "id": "semiconductor",
        "name": "半导体技术",
        "year": 1950,
        "field": "information",
        "description": "利用半导体材料制造可控电子器件。",
        "impact": "支撑芯片、传感器和现代计算硬件。",
        "links": [
            "transistor",
            "solid_state",
            "computer"
        ]
    },
    {
        "id": "integrated_circuit",
        "name": "集成电路",
        "year": 1958,
        "field": "information",
        "description": "将大量电子元件集成到单一芯片中。",
        "impact": "推动计算机和电子设备的微型化。",
        "links": [
            "transistor",
            "cpu",
            "gpu"
        ]
    },
    {
        "id": "computer",
        "name": "电子计算机",
        "year": 1945,
        "field": "information",
        "description": "利用电子元件自动执行复杂计算。",
        "impact": "开启现代信息时代。",
        "links": [
            "programming",
            "cpu",
            "database",
            "internet"
        ]
    },
    {
        "id": "programming",
        "name": "程序设计",
        "year": 1950,
        "field": "information",
        "description": "用形式化指令描述计算过程。",
        "impact": "让计算设备可以执行通用任务。",
        "links": [
            "computer",
            "programming_language",
            "operating_system"
        ]
    },
    {
        "id": "programming_language",
        "name": "高级编程语言",
        "year": 1957,
        "field": "information",
        "description": "用更接近人类思维的语法描述计算任务。",
        "impact": "降低软件开发门槛并推动软件工程发展。",
        "links": [
            "programming",
            "operating_system"
        ]
    },
    {
        "id": "operating_system",
        "name": "操作系统",
        "year": 1960,
        "field": "information",
        "description": "负责管理计算机硬件资源并为程序提供运行环境的软件系统。",
        "impact": "成为个人电脑、服务器和移动设备的基础软件层。",
        "links": [
            "computer",
            "programming",
            "cloud_computing"
        ]
    },
    {
        "id": "database",
        "name": "数据库",
        "year": 1970,
        "field": "information",
        "description": "系统化存储、检索和管理数据。",
        "impact": "成为现代软件和信息系统基础设施。",
        "links": [
            "internet",
            "machine_learning"
        ]
    },
    {
        "id": "internet",
        "name": "互联网",
        "year": 1983,
        "field": "information",
        "description": "将大量计算机网络连接成全球信息系统。",
        "impact": "改变通信、知识传播和社会组织。",
        "links": [
            "computer",
            "database",
            "ai",
            "fiber_optics"
        ]
    },
    {
        "id": "fiber_optics",
        "name": "光纤通信",
        "year": 1970,
        "field": "information",
        "description": "利用光在光纤中的传播传递信息。",
        "impact": "成为高速互联网和全球通信的重要基础。",
        "links": [
            "laser",
            "internet"
        ]
    },
    {
        "id": "machine_learning",
        "name": "机器学习",
        "year": 1997,
        "field": "information",
        "description": "让算法从数据中学习规律。",
        "impact": "成为现代人工智能的重要基础。",
        "links": [
            "statistics",
            "linear_algebra",
            "neural_network",
            "ai"
        ],
        "experiment": {
            "type": "neural"
        }
    },
    {
        "id": "ai",
        "name": "人工智能",
        "year": 2020,
        "field": "information",
        "description": "利用算法与计算能力执行感知、推理、生成等任务。",
        "impact": "正在影响科研、工业和创造活动。",
        "links": [
            "computer",
            "machine_learning",
            "transformer",
            "large_language_model",
            "alphafold"
        ]
    },
    {
        "id": "cpu",
        "name": "中央处理器CPU",
        "year": 1971,
        "field": "information",
        "description": "执行程序指令的通用计算核心。",
        "impact": "成为现代计算设备的核心组件。",
        "links": [
            "computer",
            "integrated_circuit",
            "gpu"
        ]
    },
    {
        "id": "gpu",
        "name": "图形处理器GPU",
        "year": 1999,
        "field": "information",
        "description": "适合大规模并行计算的处理器。",
        "impact": "推动人工智能、高性能计算和实时图形技术。",
        "links": [
            "cpu",
            "machine_learning",
            "integrated_circuit"
        ]
    },
    {
        "id": "neural_network",
        "name": "人工神经网络",
        "year": 1986,
        "field": "information",
        "description": "模拟生物神经系统结构的计算模型。",
        "impact": "成为深度学习的重要基础。",
        "links": [
            "machine_learning",
            "ai"
        ]
    },
    {
        "id": "transformer",
        "name": "Transformer架构",
        "year": 2017,
        "field": "information",
        "description": "基于注意力机制的深度学习架构。",
        "impact": "推动大语言模型和生成式人工智能。",
        "links": [
            "neural_network",
            "large_language_model",
            "ai"
        ]
    },
    {
        "id": "large_language_model",
        "name": "大语言模型",
        "year": 2018,
        "field": "information",
        "description": "以大规模文本数据训练、能够处理和生成自然语言的神经网络模型。",
        "impact": "成为生成式AI的重要技术基础，并改变人机交互方式。",
        "links": [
            "transformer",
            "ai",
            "generative_ai"
        ]
    },
    {
        "id": "generative_ai",
        "name": "生成式人工智能",
        "year": 2022,
        "field": "information",
        "description": "能够生成文本、图像、音频、代码等内容的人工智能系统。",
        "impact": "正在改变知识工作、创作和软件开发流程。",
        "links": [
            "large_language_model",
            "ai"
        ]
    },
    {
        "id": "astronomy",
        "name": "天文学",
        "year": -1000,
        "field": "physics",
        "description": "通过观测天体及其运动研究宇宙的科学。",
        "impact": "把数学、光学和物理连接到对宇宙尺度现象的研究。",
        "links": [
            "telescope",
            "optics",
            "geometry"
        ]
    },
    {
        "id": "circuit",
        "name": "电路",
        "year": 1800,
        "field": "physics",
        "description": "由电源、导线、负载和控制元件组成的闭合电流路径。",
        "impact": "把电学规律转化为可以构造和测量的工程系统。",
        "links": [
            "electricity",
            "battery",
            "logic_gate"
        ],
        "experiment": {
            "type": "circuit"
        }
    },
    {
        "id": "climate_science",
        "name": "气候科学",
        "year": 1900,
        "field": "physics",
        "description": "研究大气、海洋、陆地和冰冻圈长期变化及其相互作用。",
        "impact": "连接物理、化学、生物和环境数据，是理解全球气候系统的重要基础。",
        "links": [
            "thermodynamics",
            "ecology",
            "statistics"
        ]
    },
    {
        "id": "laser",
        "name": "激光",
        "year": 1960,
        "field": "physics",
        "description": "产生具有高方向性、高相干性和窄频谱特征的光。",
        "impact": "应用于通信、医学、制造、测量和科学研究。",
        "links": [
            "optics",
            "quantum",
            "fiber_optics"
        ]
    },
    {
        "id": "superconducting",
        "name": "超导",
        "year": 1911,
        "field": "physics",
        "description": "某些材料在足够低温条件下出现零电阻等特殊电磁性质的现象。",
        "impact": "推动高场磁体、医学成像、量子器件和前沿物理研究。",
        "links": [
            "quantum",
            "quantum_computing",
            "fusion_energy"
        ]
    },
    {
        "id": "gps",
        "name": "卫星导航系统",
        "year": 1990,
        "field": "information",
        "description": "利用卫星信号、原子钟与定位算法确定用户位置和时间。",
        "impact": "改变交通、测绘、通信和全球基础设施运行方式。",
        "links": [
            "satellite",
            "relativity",
            "information_theory"
        ]
    },
    {
        "id": "cloud_computing",
        "name": "云计算",
        "year": 2006,
        "field": "information",
        "description": "通过网络按需提供计算、存储和软件服务。",
        "impact": "让计算资源可以像基础设施一样弹性使用，支撑现代互联网与AI。",
        "links": [
            "operating_system",
            "internet",
            "computer",
            "ai"
        ]
    }
]
;
