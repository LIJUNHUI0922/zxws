// ============================================
// 底部导航栏 - 适配Android/iOS系统导航栏
// ============================================
(function() {
    'use strict';

    const tabBar = document.querySelector('.tab-bar');
    const app = document.querySelector('#app');
    if (!tabBar || !app) return;

    // 检测并应用系统导航栏高度
    function applyNavBarPadding() {
        let navHeight = 0;

        // 方法1: visualViewport API（最准确的动态检测）
        if (window.visualViewport) {
            const viewH = window.visualViewport.height;
            const winH = window.innerHeight;
            const diff = winH - viewH;
            if (diff > 5 && diff < 200) {
                navHeight = diff;
            }
        }

        // 方法2: Android - 使用紧凑的固定值
        const isAndroid = /android/i.test(navigator.userAgent);
        if (isAndroid && navHeight === 0) {
            navHeight = 28; // 紧凑值，与CSS配合
        }

        // 方法3: iOS安全区域
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS && navHeight === 0) {
            // 尝试读取env(safe-area-inset-bottom)
            // 注意：CSS env()无法从JS直接读取，这里用设备判断
            if (window.screen.height >= 812 && window.screen.width >= 375) {
                // iPhone X及以上
                navHeight = Math.max(navHeight, 34);
            }
        }

        // 限制合理范围
        if (navHeight < 0) navHeight = 0;
        if (navHeight > 100) navHeight = 30;

        // 应用到底部导航栏（紧凑模式）
        const totalPadding = 6 + Math.min(navHeight, 30);
        tabBar.style.paddingBottom = totalPadding + 'px';

        // 应用到页面容器
        const appPadding = 55 + Math.min(navHeight, 30);
        app.style.paddingBottom = appPadding + 'px';

        console.log('系统导航栏高度检测:', navHeight + 'px');
    }

    // 初始化 - 统一初始化所有功能
    function init() {
        // 适配底部导航栏
        applyNavBarPadding();
        
        // 初始化所有页面
        initScenarios();
        initVulnerabilities();
        initSearch();
        renderAboutPage();
        initSolutions();
        initCases();
        initLogAnalysis();
        
        console.log('专线卫士案例分析助手初始化完成');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 监听视口变化（浏览器工具栏显示/隐藏时触发）
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', applyNavBarPadding);
        window.visualViewport.addEventListener('scroll', applyNavBarPadding);
    }

    window.addEventListener('resize', applyNavBarPadding);
    window.addEventListener('orientationchange', () => setTimeout(applyNavBarPadding, 300));
})();

// 应用场景数据
const scenarios = [
    {
        id: 'government',
        name: '政务专网',
        icon: '🏛️',
        desc: '政府机关信息安全',
        challenge: '政务网络涉及大量敏感信息和国家机密，面临高级持续性威胁(APT)、数据泄露、内部威胁等多重安全挑战。',
        vulnerabilities: ['malware', 'apt', 'data-leak'],
        cases: [
            {
                id: 'gov-001',
                title: '某省政府政务外网防护案例',
                summary: '通过部署专线卫士，实现政务外网全面安全防护，拦截APT攻击12次，数据泄露事件0发生。',
                solution: '采用专线卫士增强版，部署下一代防火墙、入侵防御系统，结合云端威胁情报，实现实时防护。'
            },
            {
                id: 'gov-002',
                title: '某市政府部门勒索软件防御案例',
                summary: '某市政府部门遭受勒索软件攻击，通过专线卫士成功拦截，保护政府数据安全。',
                solution: '部署专线卫士增强版，启用行为分析引擎，实时监测异常文件加密行为。'
            },
            {
                id: 'gov-003',
                title: '某省政府网站Web攻击防护案例',
                summary: '某省政府网站遭受SQL注入和XSS攻击，通过专线卫士WAF模块成功防护。',
                solution: '部署专线卫士Web应用防护模块，启用OWASP Top 10防护规则。'
            }
        ]
    },
    {
        id: 'medical',
        name: '医疗行业',
        icon: '🏥',
        desc: '医院与医疗机构',
        challenge: '医疗行业面临患者隐私数据保护、医疗设备安全、勒索软件攻击等安全挑战，需要符合等保2.0要求。',
        vulnerabilities: ['ransomware', 'data-leak', 'malware'],
        cases: [
            {
                id: 'med-001',
                title: '某三甲医院网络安全升级案例',
                summary: '通过专线卫士医疗专用方案，实现HIS系统、PACS系统安全隔离，成功防御勒索软件攻击。',
                solution: '部署专线卫士增强版，实现医疗专网安全隔离，建立数据安全防护体系。'
            },
            {
                id: 'med-002',
                title: '某妇幼保健院数据防泄露案例',
                summary: '某妇幼保健院通过专线卫士数据防泄露模块，实现患者隐私数据全面保护。',
                solution: '部署专线卫士数据防泄露系统，建立敏感数据识别和外发审计机制。'
            },
            {
                id: 'med-003',
                title: '某县级医院远程访问安全案例',
                summary: '某县级医院通过专线卫士安全VPN，实现医生远程安全访问医院系统。',
                solution: '部署专线卫士安全VPN模块，启用多因素认证和端点安全评估。'
            }
        ]
    },
    {
        id: 'education',
        name: '教育行业',
        icon: '🎓',
        desc: '学校与教育机构',
        challenge: '教育行业面临学生隐私保护、在线教育平台安全、科研数据保护等安全挑战。',
        vulnerabilities: ['data-leak', 'web-attack', 'malware'],
        cases: [
            {
                id: 'edu-001',
                title: '某高校校园网安全改造案例',
                summary: '通过专线卫士教育专用方案，实现校园网安全升级，防护学生隐私数据，拦截网络攻击。',
                solution: '采用专线卫士优享版，部署校园网边界防护，建立安全认证体系。'
            },
            {
                id: 'edu-002',
                title: '某省教育厅DDoS攻击防护案例',
                summary: '某省教育厅网站遭受DDoS攻击，通过专线卫士成功防护，保障高考志愿填报系统稳定。',
                solution: '部署专线卫士DDoS防护模块，结合云端清洗服务，实现多层防护。'
            },
            {
                id: 'edu-003',
                title: '某高校科研数据保护案例',
                summary: '某高校通过专线卫士数据防泄露方案，实现科研数据全面保护，防止学术成果泄露。',
                solution: '部署专线卫士数据防泄露系统，建立科研数据分级保护机制。'
            }
        ]
    },
    {
        id: 'finance',
        name: '金融行业',
        icon: '🏦',
        desc: '银行与金融机构',
        challenge: '金融行业面临金融诈骗、DDoS攻击、交易数据篡改等高危安全威胁，需满足行业合规要求。',
        vulnerabilities: ['ddos', 'web-attack', 'data-leak', 'fraud'],
        cases: [
            {
                id: 'fin-001',
                title: '某商业银行网络安全防护案例',
                summary: '通过专线卫士金融专用方案，实现网银系统、支付平台全面安全防护，拦截DDoS攻击。',
                solution: '部署专线卫士增强版，建立金融级安全防护体系，满足等保三级要求。'
            },
            {
                id: 'fin-002',
                title: '某证券公司APT攻击防御案例',
                summary: '某证券公司通过专线卫士APT检测模块，成功发现并处置长期潜伏的APT攻击。',
                solution: '部署专线卫士APT防护系统，启用流量深度分析和沙箱检测。'
            },
            {
                id: 'fin-003',
                title: '某支付平台Web攻击防护案例',
                summary: '某支付平台通过专线卫士WAF模块，成功防护SQL注入和CC攻击，保障支付安全。',
                solution: '部署专线卫士Web应用防护系统，启用CC攻击防护和API安全保护。'
            }
        ]
    },
    {
        id: 'enterprise',
        name: '企业办公',
        icon: '🏢',
        desc: '企业专线网络',
        challenge: '企业办公网络面临商业机密泄露、员工上网行为管理、远程办公安全等挑战。',
        vulnerabilities: ['data-leak', 'malware', 'remote-access'],
        cases: [
            {
                id: 'ent-001',
                title: '某大型企业集团办公网安全案例',
                summary: '通过专线卫士企业方案，实现多分支机构安全互联，防护商业机密，管理员工上网行为。',
                solution: '采用专线卫士增强版，部署集中管理平台，实现全网安全可视化。'
            },
            {
                id: 'ent-002',
                title: '某制造企业远程办公安全案例',
                summary: '某制造企业通过专线卫士安全VPN，实现2000+员工远程安全办公，防护商业机密。',
                solution: '部署专线卫士安全VPN系统，启用多因素认证和会话监控审计。'
            },
            {
                id: 'ent-003',
                title: '某零售企业DDoS攻击防护案例',
                summary: '某零售企业通过专线卫士DDoS防护，成功防御黑色星期五期间的DDoS攻击，保障在线销售。',
                solution: '部署专线卫士DDoS防护系统，结合云端清洗服务，实现弹性防护。'
            }
        ]
    },
    {
        id: 'smart-city',
        name: '智慧城市',
        icon: '🌆',
        desc: '城市基础设施',
        challenge: '智慧城市面临物联网设备安全、城市数据保护、关键基础设施防护等新型安全挑战。',
        vulnerabilities: ['iot', 'data-leak', 'apt'],
        cases: [
            {
                id: 'city-001',
                title: '某智慧城市物联网安全案例',
                summary: '通过专线卫士物联网专用方案，实现城市物联网设备安全认证，防护关键基础设施。',
                solution: '部署专线卫士增强版，建立物联网安全防护体系，保障城市运行安全。'
            },
            {
                id: 'city-002',
                title: '某智慧城市视频监控安全案例',
                summary: '某智慧城市通过专线卫士物联网安全方案，实现10万+视频监控设备安全认证和管理。',
                solution: '部署专线卫士物联网安全防护系统，建立设备身份认证和异常行为监控。'
            },
            {
                id: 'city-003',
                title: '某智慧城市数据共享平台安全案例',
                summary: '某智慧城市通过专线卫士数据防泄露方案，实现跨部门数据共享安全，防止敏感数据泄露。',
                solution: '部署专线卫士数据防泄露系统，建立数据共享安全审计机制。'
            }
        ]
    }
];

// 漏洞类型数据
const vulnerabilities = [
    {
        id: 'malware',
        name: '恶意软件',
        icon: '🦠',
        severity: 'high',
        desc: '包括病毒、蠕虫、特洛伊木马、勒索软件等恶意代码，可窃取数据、破坏系统、勒索赎金。',
        detail: '恶意软件（Malware）是黑客攻击的主要手段之一。它通过植入用户系统，执行未经授权的操作，如窃取敏感信息、加密文件勒索赎金、破坏系统正常运行等。常见的恶意软件包括：病毒（感染文件）、蠕虫（自我复制传播）、木马（伪装合法软件）、勒索软件（加密文件勒索赎金）、间谍软件（窃取用户信息）等。恶意软件可通过电子邮件附件、恶意网站、移动存储设备、软件漏洞等多种途径传播。',
        solution: '专线卫士内置防病毒引擎，支持亿级变种病毒检测，可检测100层压缩文件；结合云端威胁情报，实时更新病毒库，实现已知和未知恶意软件的精准检测与清除。同时支持行为分析，可识别未知恶意软件的异常行为。',
        prevention: [
            '保持操作系统和应用程序更新',
            '不打开来历不明的邮件附件',
            '使用正规渠道下载软件',
            '定期备份重要数据',
            '部署专线卫士防病毒模块'
        ],
                cases: ['med-001', 'gov-001', 'ent-001']
    },
    {
        id: 'ransomware',
        name: '勒索软件',
        icon: '🔒',
        severity: 'critical',
        desc: '通过加密用户文件勒索赎金的恶意软件，对医疗、政府、企业等机构造成严重损失。',
        detail: '勒索软件（Ransomware）是一种特殊的恶意软件，它通过加密用户文件或锁定系统，向受害者勒索赎金。近年来，勒索软件攻击日益猖獗，尤其是针对医疗、政府、教育等机构的攻击，造成严重的数据丢失和业务中断。常见的勒索软件家族包括WannaCry、Ryuk、Conti等。勒索软件通常通过钓鱼邮件、远程桌面协议（RDP）漏洞、软件漏洞等途径传播。',
        solution: '专线卫士采用多层防护机制：1) 前置拦截已知勒索软件；2) 行为分析检测未知威胁；3) 文件完整性监控；4) 加密流量检测；5) 云端威胁情报联动，实现勒索软件全生命周期防护。同时提供应急响应支持，帮助机构在遭受攻击后快速恢复。',
        prevention: [
            '定期备份重要数据，并离线存储',
            '不要点击可疑链接或附件',
            '使用强密码并定期更换',
            '部署专线卫士防勒索模块',
            '制定勒索软件应急响应预案'
        ],
                cases: ['med-001', 'gov-002', 'fin-002']
    },
    {
        id: 'apt',
        name: '高级持续性威胁',
        icon: '🎯',
        severity: 'critical',
        desc: '有组织、有目标的长期网络攻击，通常采用多种攻击手段，难以发现和防御。',
        detail: '高级持续性威胁（APT，Advanced Persistent Threat）是由有组织、有资源的攻击者发起的、针对特定目标的、长期持续的网络攻击。APT攻击通常具有高度隐蔽性、针对性、持久性等特点，采用多种攻击手段（如鱼叉式网络钓鱼、零日漏洞利用、恶意软件植入等），目的是长期潜伏在目标网络中，窃取敏感信息或进行破坏。APT攻击通常由国家级黑客组织或专业黑客团队发起。',
        solution: '专线卫士APT防护方案：1) 流量深度分析；2) 异常行为检测；3) 威胁情报关联分析；4) 沙箱检测；5) 全流量记录与溯源，形成APT攻击发现、分析、处置的闭环。结合人工智能技术，提高APT攻击的检出率。',
        prevention: [
            '加强员工网络安全意识培训',
            '实施最小权限访问控制',
            '定期进行安全评估和渗透测试',
            '部署专线卫士APT检测模块',
            '建立安全事件应急响应机制'
        ],
                cases: ['gov-001', 'fin-002', 'city-003']
    },
    {
        id: 'data-leak',
        name: '数据泄露',
        icon: '📄',
        severity: 'high',
        desc: '敏感数据未经授权被访问、泄露或窃取，可能导致重大经济损失和声誉损害。',
        detail: '数据泄露（Data Leak）是指敏感数据（如个人信息、财务数据、商业机密等）未经授权被访问、泄露或窃取的事件。数据泄露可能由内部威胁（如员工误操作、恶意泄露）、外部攻击（如黑客入侵、钓鱼攻击）、系统漏洞（如未加密传输、弱访问控制）等原因引起。数据泄露可能导致重大经济损失、法律责任和声誉损害。',
        solution: '专线卫士数据防泄露方案：1) 敏感数据识别；2) 数据流转监控；3) 外发数据审计；4) 加密数据传输；5) 访问控制策略，全方位保护敏感数据不外泄。支持数据分类分级，对不同敏感级别的数据采取不同的防护措施。',
        prevention: [
            '实施数据分类分级管理',
            '加强员工数据安全意识培训',
            '使用加密技术保护敏感数据',
            '部署专线卫士数据防泄露模块',
            '制定数据安全事件应急响应预案'
        ],
                cases: ['gov-002', 'med-002', 'edu-001']
    },
    {
        id: 'ddos',
        name: 'DDoS攻击',
        icon: '🌊',
        severity: 'medium',
        desc: '通过大量恶意流量使目标系统瘫痪的攻击方式，影响业务连续性。',
        detail: '分布式拒绝服务攻击（DDoS，Distributed Denial of Service）是指通过控制大量僵尸主机，向目标系统发送海量恶意流量，使其资源耗尽而无法提供正常服务的攻击方式。DDoS攻击具有攻击源头分散、攻击流量巨大、难以防御等特点，是常见的网络攻击手段之一。DDoS攻击通常分为网络层攻击（如SYN Flood、UDP Flood）和应用层攻击（如HTTP Flood、CC攻击）。',
        solution: '专线卫士DDoS防护：1) 流量清洗；2) 异常流量检测；3) 攻击特征识别；4) 云端联动防护；5) 弹性扩容，保障业务在DDoS攻击下的连续性。支持多层级防护，从网络层到应用层全面防御DDoS攻击。',
        prevention: [
            '增加网络带宽冗余',
            '部署负载均衡设备',
            '使用内容分发网络（CDN）',
            '部署专线卫士DDoS防护模块',
            '与ISP合作，实现近源防护'
        ],
                cases: ['edu-002', 'fin-001', 'ent-003']
    },
    {
        id: 'web-attack',
        name: 'Web攻击',
        icon: '🕸️',
        severity: 'high',
        desc: '针对Web应用的攻击，包括SQL注入、XSS、CSRF等，可窃取数据或控制服务器。',
        detail: 'Web攻击是指针对Web应用程序的攻击，利用Web应用中的安全漏洞，如SQL注入、跨站脚本（XSS）、跨站请求伪造（CSRF）、不安全直接对象引用等，窃取数据、篡改网页、控制服务器等。Web攻击是常见的网络攻击手段之一，尤其是针对电商、金融、政务等网站的攻击。OWASP Top 10列出了最常见的Web应用安全风险。',
        solution: '专线卫士Web应用防护：1) SQL注入检测与阻断；2) XSS攻击防护；3) 网页木马检测；4) Web漏洞扫描与防护；5) CC攻击防护，全面保护Web应用安全。支持OWASP Top 10等常见Web攻击的防护。',
        prevention: [
            '使用参数化查询防止SQL注入',
            '对用户输入进行严格验证和过滤',
            '实施最小权限原则',
            '定期更新Web应用和组件',
            '部署专线卫士Web应用防火墙'
        ],
                cases: ['gov-003', 'edu-003', 'fin-003']
    },
    {
        id: 'iot',
        name: '物联网威胁',
        icon: '📱',
        severity: 'medium',
        desc: '针对物联网设备的攻击，可能导致设备被控制、数据被窃取或成为僵尸网络节点。',
        detail: '物联网威胁是指针对物联网（IoT）设备的攻击，由于物联网设备通常资源有限、安全设计不足、固件更新不及时等原因，容易成为攻击目标。物联网威胁包括：设备被控制、数据被窃取、设备被纳入僵尸网络、设备被用作攻击跳板等。随着物联网设备的普及，物联网威胁日益严重，已成为网络安全的重要挑战。',
        solution: '专线卫士物联网安全方案：1) 设备身份认证；2) 固件安全检测；3) 通信加密；4) 异常行为监控；5) 设备生命周期管理，保障物联网设备安全。支持物联网设备识别、接入控制、行为分析等功能。',
        prevention: [
            '修改物联网设备默认密码',
            '及时更新物联网设备固件',
            '将物联网设备隔离在独立网段',
            '禁用不必要的物联网设备功能',
            '部署专线卫士物联网安全模块'
        ],
                cases: ['city-001', 'city-002', 'med-003']
    },
    {
        id: 'remote-access',
        name: '远程访问风险',
        icon: '🏠',
        severity: 'medium',
        desc: '远程办公、VPN接入等带来的安全风险，包括未授权访问、中间人攻击等。',
        detail: '远程访问风险是指远程办公、VPN接入、云服务访问等带来的安全风险。随着远程办公的普及，远程访问风险日益突出。常见的远程访问风险包括：未授权访问、中间人攻击、端点安全不足、数据传输不加密、多因素认证缺失等。远程访问风险可能导致敏感数据泄露、系统被入侵等严重后果。',
        solution: '专线卫士远程办公安全方案：1) 多因素认证；2) 端点安全评估；3) 最小权限访问控制；4) 加密传输；5) 会话监控与审计，保障远程访问安全。支持零信任网络访问（ZTNA）模型，实现动态访问控制。',
        prevention: [
            '使用多因素认证（MFA）',
            '确保远程访问设备安全',
            '使用虚拟专用网络（VPN）加密传输',
            '实施最小权限访问控制',
            '部署专线卫士远程访问安全模块'
        ],
                cases: ['med-003', 'ent-002', 'fin-002']
    },
    {
        id: 'fraud',
        name: '金融诈骗',
        icon: '💰',
        severity: 'high',
        desc: '针对金融行业的诈骗行为，包括钓鱼网站、虚假交易、信用卡盗刷等。',
        detail: '金融诈骗是指针对金融行业的诈骗行为，包括钓鱼网站、虚假交易、信用卡盗刷、电信诈骗等。金融诈骗通常利用社会工程学手段，诱骗受害者提供敏感信息（如银行卡号、密码、验证码等），或直接诱骗受害者进行转账。金融诈骗是常见的网络犯罪之一，给个人和机构造成巨大经济损失。',
        solution: '专线卫士金融反欺诈方案：1) 钓鱼网站识别与阻断；2) 异常交易检测；3) 黑名单联动；4) 用户行为分析；5) 实时风险预警，有效防范金融诈骗。结合大数据和人工智能技术，提高金融诈骗的识别和拦截能力。',
        prevention: [
            '提高警惕，不轻信陌生信息',
            '不点击可疑链接或附件',
            '保护好个人敏感信息',
            '使用正规金融平台和支付渠道',
            '部署专线卫士金融反欺诈模块'
        ],
                cases: ['fin-003', 'ent-003', 'city-003']
    }
];

// 页面切换
function switchTab(tabName) {
    // 更新标签样式
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.page === tabName) {
            tab.classList.add('active');
        }
    });
    
    // 切换页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(tabName + '-page') || 
                      document.getElementById('home-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新页面标题
    updatePageTitle(tabName);
}

// 更新页面标题
function updatePageTitle(tabName) {
    const titles = {
        'home': '专线卫士',
        'scenarios': '应用场景',
        'cases': '典型案例',
        'solutions': '防护能力',
        'log-analysis': '日志分析',
        'vulns': '漏洞类型',
        'about': '关于',
        'agreement': '协议详情',
        'certificate': '证书详情'
    };
    
    // 可以在这里更新页面标题
    console.log('切换到：' + (titles[tabName] || '首页'));
}

// 返回上一页 - 智能返回
function goBack() {
    // 获取当前活动页面
    const activePage = document.querySelector('.page.active');
    if (!activePage) {
        switchTab('home');
        return;
    }
    
    const pageId = activePage.id;
    
    // 根据不同页面，返回到对应的上一级页面
    switch(pageId) {
        case 'scenario-page':
        case 'vuln-page':
        case 'solutions-page':
        case 'cases-page':
        case 'log-analysis-page':
            // 这些页面返回首页
            switchTab('home');
            break;
            
        case 'scenarios-page':
        case 'vulns-page':
            // 独立列表页也返回首页
            switchTab('home');
            break;
            
        case 'agreement-page':
        case 'certificate-page':
            // 协议和证书详情页返回"关于"页面
            switchTab('about');
            break;
            
        case 'about-page':
        default:
            // 关于页面或其他页面返回首页
            switchTab('home');
            break;
    }
}

// 查看场景详情 - 优化版
function viewScenario(scenarioId) {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    // 更新场景详情页内容
    document.getElementById('scenario-title').textContent = scenario.name;
    
    // 优化安全挑战展示
    const scenarioInfo = document.querySelector('.scenario-info');
    if (scenarioInfo) {
        scenarioInfo.innerHTML = `
            <div class="scenario-info-tech">
                <div class="info-header-tech">
                    <span class="info-icon-tech">⚠️</span>
                    <h3>安全挑战</h3>
                </div>
                <div class="info-content-tech">
                    <p>${scenario.challenge}</p>
                </div>
                <div class="info-stats-tech">
                    <div class="stat-pill-tech">
                        <span class="stat-label-tech">相关漏洞</span>
                        <span class="stat-value-tech">${scenario.vulnerabilities.length}类</span>
                    </div>
                    <div class="stat-pill-tech">
                        <span class="stat-label-tech">防护案例</span>
                        <span class="stat-value-tech">${scenario.cases.length}个</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 优化相关漏洞展示 - 按钮网格
    const vulnContainer = document.getElementById('scenario-vulnerabilities');
    if (vulnContainer) {
        vulnContainer.innerHTML = '';
        vulnContainer.className = 'vuln-button-grid';
        
        scenario.vulnerabilities.forEach(vulnId => {
            const vuln = vulnerabilities.find(v => v.id === vulnId);
            if (vuln) {
                const vulnButton = document.createElement('div');
                vulnButton.className = 'vuln-button';
                vulnButton.dataset.severity = vuln.severity;
                vulnButton.innerHTML = `
                    <div class="vuln-btn-icon">${vuln.icon}</div>
                    <div class="vuln-btn-name">${vuln.name}</div>
                    <div class="vuln-btn-severity ${vuln.severity}">${getSeverityText(vuln.severity)}</div>
                `;
                vulnButton.onclick = () => viewVulnerability(vulnId);
                vulnContainer.appendChild(vulnButton);
            }
        });
    }
    
    // 优化案例展示 - 卡片网格
    const caseContainer = document.getElementById('case-list');
    if (caseContainer) {
        caseContainer.innerHTML = '';
        caseContainer.className = 'case-grid-tech';
        
        scenario.cases.forEach(c => {
            const caseCard = document.createElement('div');
            caseCard.className = 'case-card-tech';
            caseCard.innerHTML = `
                <div class="case-header-tech">
                    <span class="case-icon-tech">📁</span>
                    <h4>${c.title}</h4>
                </div>
                <div class="case-body-tech">
                    <p>${c.summary.substring(0, 60)}...</p>
                </div>
                <div class="case-footer-tech">
                    <span class="case-tag-tech">查看详情 →</span>
                </div>
            `;
            caseCard.onclick = () => viewCase(c.id);
            caseContainer.appendChild(caseCard);
        });
    }
    
    // 优化解决方案展示
    const solutionCard = document.getElementById('solution-card');
    if (solutionCard && scenario.cases.length > 0) {
        solutionCard.innerHTML = `
            <div class="solution-tech">
                <div class="solution-header-tech">
                    <span class="solution-icon-tech">🛡️</span>
                    <h3>专线卫士解决方案</h3>
                </div>
                <div class="solution-content-tech">
                    <p class="solution-desc-tech">${scenario.cases[0].solution}</p>
                    <div class="solution-features-tech">
                        <div class="feature-item-tech">
                            <span class="feature-check-tech">✓</span>
                            <span>下一代防火墙</span>
                        </div>
                        <div class="feature-item-tech">
                            <span class="feature-check-tech">✓</span>
                            <span>入侵防御系统</span>
                        </div>
                        <div class="feature-item-tech">
                            <span class="feature-check-tech">✓</span>
                            <span>防病毒引擎</span>
                        </div>
                        <div class="feature-item-tech">
                            <span class="feature-check-tech">✓</span>
                            <span>上网行为管理</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 切换到场景详情页
    switchTab('scenario');
}

// 查看漏洞详情 - 优化版
function viewVulnerability(vulnId) {
    const vuln = vulnerabilities.find(v => v.id === vulnId);
    if (!vuln) return;
    
    // 更新漏洞详情页
    document.getElementById('vuln-title').textContent = vuln.name;
    
    const vulnDetail = document.getElementById('vuln-detail');
    vulnDetail.innerHTML = `
        <div class="vuln-detail-tech">
            <!-- 漏洞头部信息 -->
            <div class="vuln-header-tech">
                <div class="vuln-icon-large-tech">${vuln.icon}</div>
                <div class="vuln-title-section-tech">
                    <h2>${vuln.name}</h2>
                    <div class="vuln-meta-tech">
                        <span class="severity-badge-tech ${vuln.severity}">${getSeverityText(vuln.severity)}</span>
                        <span class="vuln-id-tech">ID: ${vuln.id}</span>
                    </div>
                </div>
            </div>
            
            <!-- 漏洞描述 -->
            <div class="vuln-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">📄</span>
                    <h3>漏洞描述</h3>
                </div>
                <div class="section-content-tech">
                    <p>${vuln.detail}</p>
                </div>
            </div>
            
            <!-- 防护方案 -->
            <div class="vuln-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">🛡️</span>
                    <h3>专线卫士防护方案</h3>
                </div>
                <div class="section-content-tech">
                    <div class="solution-box-tech">
                        <p>${vuln.solution}</p>
                    </div>
                </div>
            </div>
            
            <!-- 防护建议 -->
            <div class="vuln-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">💡</span>
                    <h3>防护建议</h3>
                </div>
                <div class="section-content-tech">
                    <div class="prevention-list-tech">
                        ${vuln.prevention.map((p, idx) => `
                            <div class="prevention-item-tech">
                                <span class="prevention-number-tech">${idx + 1}</span>
                                <p>${p}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- 相关案例 -->
            <div class="vuln-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">📁</span>
                    <h3>相关案例</h3>
                </div>
                <div class="section-content-tech">
                    <div class="related-cases-grid-tech">
                        ${vuln.cases.map(caseId => {
                            const c = findCaseById(caseId);
                            return c ? `
                                <div class="related-case-card-tech" onclick="viewCase('${caseId}')">
                                    <span class="case-icon-small-tech">📋</span>
                                    <p>${c.title}</p>
                                    <span class="case-arrow-tech">→</span>
                                </div>
                            ` : '';
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 切换到漏洞详情页
    switchTab('vuln');
}

// 查看案例详情（从场景页点击）
function viewCase(caseId) {
    // 复用 viewCaseDetail 的逻辑
    viewCaseDetail(caseId);
}

// 根据ID查找案例
function findCaseById(caseId) {
    for (const scenario of scenarios) {
        const c = scenario.cases.find(c => c.id === caseId);
        if (c) return c;
    }
    return null;
}

// 获取严重程度文本
function getSeverityText(severity) {
    const texts = {
        'critical': '严重',
        'high': '高危',
        'medium': '中危',
        'low': '低危'
    };
    return texts[severity] || severity;
}

// 初始化场景卡片
function initScenarios() {
    const container = document.getElementById('scenario-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    scenarios.forEach(scenario => {
        const card = document.createElement('div');
        card.className = 'scenario-card';
        card.dataset.id = scenario.id;
        card.innerHTML = `
            <div class="scenario-icon">${scenario.icon}</div>
            <div class="scenario-name">${scenario.name}</div>
            <div class="scenario-desc">${scenario.desc}</div>
        `;
        card.onclick = () => viewScenario(scenario.id);
        container.appendChild(card);
    });
}

// 初始化漏洞列表 - 按钮网格布局
function initVulnerabilities() {
    // 首页漏洞列表 - 按钮网格
    const container = document.getElementById('vulnerability-list');
    if (container) {
        container.innerHTML = '';
        container.className = 'vuln-button-grid';
        vulnerabilities.forEach(vuln => {
            const button = document.createElement('div');
            button.className = 'vuln-button';
            button.dataset.severity = vuln.severity;
            button.innerHTML = `
                <div class="vuln-btn-icon">${vuln.icon}</div>
                <div class="vuln-btn-name">${vuln.name}</div>
                <div class="vuln-btn-severity ${vuln.severity}">${getSeverityText(vuln.severity)}</div>
            `;
            button.onclick = () => viewVulnerability(vuln.id);
            container.appendChild(button);
        });
    }
    
    // 独立漏洞列表页 - 按钮网格
    const vulnListPage = document.getElementById('vuln-list-page');
    if (vulnListPage) {
        vulnListPage.innerHTML = '';
        vulnListPage.className = 'vuln-button-grid';
        vulnerabilities.forEach(vuln => {
            const button = document.createElement('div');
            button.className = 'vuln-button';
            button.dataset.severity = vuln.severity;
            button.innerHTML = `
                <div class="vuln-btn-icon">${vuln.icon}</div>
                <div class="vuln-btn-name">${vuln.name}</div>
                <div class="vuln-btn-severity ${vuln.severity}">${getSeverityText(vuln.severity)}</div>
            `;
            button.onclick = () => viewVulnerability(vuln.id);
            vulnListPage.appendChild(button);
        });
    }
    
    // 独立场景列表页
    const scenarioListPage = document.getElementById('scenario-list-page');
    if (scenarioListPage) {
        scenarioListPage.innerHTML = '';
        scenarios.forEach(scenario => {
            const card = document.createElement('div');
            card.className = 'scenario-card';
            card.dataset.id = scenario.id;
            card.innerHTML = `
                <div class="scenario-icon">${scenario.icon}</div>
                <div class="scenario-name">${scenario.name}</div>
                <div class="scenario-desc">${scenario.desc}</div>
            `;
            card.onclick = () => viewScenario(scenario.id);
            scenarioListPage.appendChild(card);
        });
    }
}

// 搜索功能
// 搜索功能 - 优化版（支持跳转到场景/漏洞详情页）
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    // 创建搜索结果下拉列表
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results-dropdown';
    searchResults.style.display = 'none';
    searchInput.parentNode.appendChild(searchResults);
    
    let debounceTimer;
    
    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase().trim();
        
        // 清除之前的定时器
        clearTimeout(debounceTimer);
        
        if (keyword.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // 防抖处理
        debounceTimer = setTimeout(() => {
            // 搜索场景
            const matchedScenarios = scenarios.filter(s => 
                s.name.toLowerCase().includes(keyword) || 
                s.challenge.toLowerCase().includes(keyword)
            );
            
            // 搜索漏洞
            const matchedVulnerabilities = vulnerabilities.filter(v => 
                v.name.toLowerCase().includes(keyword) || 
                v.desc.toLowerCase().includes(keyword)
            );
            
            // 搜索案例
            const matchedCases = allCases.filter(c => 
                c.title.toLowerCase().includes(keyword) || 
                c.summary.toLowerCase().includes(keyword)
            );
            
            // 渲染搜索结果
            let resultsHTML = '';
            
            if (matchedScenarios.length > 0) {
                resultsHTML += '<div class="search-results-section"><h4>应用场景</h4>';
                matchedScenarios.forEach(s => {
                    resultsHTML += `
                        <div class="search-result-item" onclick="viewScenario('${s.id}')">
                            <div class="result-icon">🏢</div>
                            <div class="result-info">
                                <h5>${s.name}</h5>
                                <p>${s.challenge.substring(0, 50)}...</p>
                            </div>
                        </div>
                    `;
                });
                resultsHTML += '</div>';
            }
            
            if (matchedVulnerabilities.length > 0) {
                resultsHTML += '<div class="search-results-section"><h4>漏洞类型</h4>';
                matchedVulnerabilities.forEach(v => {
                    resultsHTML += `
                        <div class="search-result-item" onclick="viewVulnerability('${v.id}')">
                            <div class="result-icon">⚠️</div>
                            <div class="result-info">
                                <h5>${v.name}</h5>
                                <p>${v.desc.substring(0, 50)}...</p>
                            </div>
                            <span class="severity ${v.severity}">${getSeverityText(v.severity)}</span>
                        </div>
                    `;
                });
                resultsHTML += '</div>';
            }
            
            if (matchedCases.length > 0) {
                resultsHTML += '<div class="search-results-section"><h4>典型案例</h4>';
                matchedCases.forEach(c => {
                    resultsHTML += `
                        <div class="search-result-item" onclick="viewCaseDetail('${c.id}')">
                            <div class="result-icon">📊</div>
                            <div class="result-info">
                                <h5>${c.title}</h5>
                                <p>${c.summary.substring(0, 50)}...</p>
                            </div>
                        </div>
                    `;
                });
                resultsHTML += '</div>';
            }
            
            if (resultsHTML === '') {
                resultsHTML = '<div class="search-no-results">未找到相关结果</div>';
            }
            
            searchResults.innerHTML = resultsHTML;
            searchResults.style.display = 'block';
        }, 300);
    });
    
    // 点击外部关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // 输入框获得焦点时显示结果
    searchInput.addEventListener('focus', function() {
        if (this.value.length >= 2 && searchResults.children.length > 0) {
            searchResults.style.display = 'block';
        }
    });
}

// 这部分初始化已被下方统一的DOMContentLoaded事件替代，保留此注释供参考

// 导出函数供HTML使用
window.switchTab = switchTab;
window.goBack = goBack;
window.viewScenario = viewScenario;
window.viewVulnerability = viewVulnerability;
window.showAgreement = showAgreement;
window.showCertificate = showCertificate;
window.closeModal = closeModal;

// 渲染关于页面
function renderAboutPage() {
    const aboutContent = document.getElementById('about-content');
    if (!aboutContent) return;
    
    aboutContent.innerHTML = `
        <div class="about-header-tech">
            <div class="about-logo-tech">🛡️</div>
            <h2 class="about-title-tech">专线卫士</h2>
            <p class="about-subtitle-tech">中国移动 & 启明星辰联合出品</p>
            <div class="version-badge-tech">v2.0.0</div>
            <div class="tech-line"></div>
        </div>
        
        <div class="about-section-tech">
            <div class="section-header-tech">
                <span class="section-icon-tech">ℹ️</span>
                <h3>产品介绍</h3>
            </div>
            <div class="about-info-tech">
                <p class="about-desc-tech">专线卫士是中国移动与启明星辰强强联合，共同推出的云安全产品。产品采用"云+边"架构，为企业专线提供全方位的网络安全防护。</p>
                <div class="info-grid-tech">
                    <div class="info-card-tech">
                        <div class="info-icon-tech">🏢</div>
                        <div class="info-detail-tech">
                            <span class="info-label-tech">开发商</span>
                            <span class="info-value-tech">启明星辰信息技术集团股份有限公司</span>
                        </div>
                    </div>
                    <div class="info-card-tech">
                        <div class="info-icon-tech">📡</div>
                        <div class="info-detail-tech">
                            <span class="info-label-tech">运营商</span>
                            <span class="info-value-tech">中国移动通信集团有限公司</span>
                        </div>
                    </div>
                    <div class="info-card-tech">
                        <div class="info-icon-tech">🚀</div>
                        <div class="info-detail-tech">
                            <span class="info-label-tech">产品版本</span>
                            <span class="info-value-tech">专线卫士 2.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="about-section-tech">
            <div class="section-header-tech">
                <span class="section-icon-tech">📄</span>
                <h3>相关协议</h3>
            </div>
            <div class="about-list-tech">
                <div class="about-list-item-tech" onclick="showAgreement('service')">
                    <div class="list-icon-tech">📄</div>
                    <div class="list-content-tech">
                        <h4>服务协议</h4>
                        <p>专线卫士服务使用条款</p>
                    </div>
                    <div class="list-arrow-tech">→</div>
                </div>
                <div class="about-list-item-tech" onclick="showAgreement('privacy')">
                    <div class="list-icon-tech">🔒</div>
                    <div class="list-content-tech">
                        <h4>隐私政策</h4>
                        <p>用户隐私保护协议</p>
                    </div>
                    <div class="list-arrow-tech">→</div>
                </div>
                <div class="about-list-item-tech" onclick="showAgreement('sla')">
                    <div class="list-icon-tech">📋</div>
                    <div class="list-content-tech">
                        <h4>服务等级协议(SLA)</h4>
                        <p>服务质量保证条款</p>
                    </div>
                    <div class="list-arrow-tech">→</div>
                </div>
            </div>
        </div>
        
        <div class="about-section-tech">
            <div class="section-header-tech">
                <span class="section-icon-tech">🏆</span>
                <h3>资质证书</h3>
            </div>
            <div class="about-list-tech">
                <div class="about-list-item-tech" onclick="showCertificate('iso27001')">
                    <div class="list-icon-tech">🏆</div>
                    <div class="list-content-tech">
                        <h4>ISO 27001 信息安全管理体系认证</h4>
                        <p>国际信息安全管理标准认证</p>
                    </div>
                    <div class="list-arrow-tech">→</div>
                </div>
                <div class="about-list-item-tech" onclick="showCertificate('iso9001')">
                    <div class="list-icon-tech">🏆</div>
                    <div class="list-content-tech">
                        <h4>ISO 9001 质量管理体系认证</h4>
                        <p>国际质量管理标准认证</p>
                    </div>
                    <div class="list-arrow-tech">→</div>
                </div>
                <div class="about-list-item-tech" onclick="showCertificate('cmmi')">
                    <div class="list-icon-tech">🏆</div>
                    <div class="list-content-tech">
                        <h4>CMMI 5级 认证</h4>
                        <p>软件能力成熟度最高等级</p>
                    </div>
                    <div class="list-arrow-tech">→</div>
                </div>
            </div>
        </div>
        
        <div class="about-section-tech">
            <div class="section-header-tech">
                <span class="section-icon-tech">📞</span>
                <h3>联系我们</h3>
            </div>
            <div class="contact-grid-tech">
                <div class="contact-card-tech">
                    <div class="contact-icon-tech">📞</div>
                    <h4>客服热线</h4>
                    <p>10086-8</p>
                </div>
                <div class="contact-card-tech">
                    <div class="contact-icon-tech">📧</div>
                    <h4>技术支持</h4>
                    <p>support@zxws.com</p>
                </div>
                <div class="contact-card-tech">
                    <div class="contact-icon-tech">🌐</div>
                    <h4>官方网站</h4>
                    <p>zxws.i139.cn</p>
                </div>
            </div>
        </div>
        
        <div class="about-footer-tech">
            <div class="footer-line-tech"></div>
            <p>© 2024 启明星辰信息技术集团股份有限公司</p>
            <p>中国移动通信集团有限公司 联合出品</p>
        </div>
    `;
}

// 显示协议详情 - 改为二级界面
function showAgreement(type) {
    const agreements = {
        service: {
            title: '服务协议',
            content: `
                <div class="agreement-section-tech">
                    <div class="agreement-meta-tech">
                        <span class="meta-icon-tech">📄</span>
                        <span>版本生效日期：2024年1月1日</span>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>一、服务内容</h3>
                        <p>专线卫士是中国移动与启明星辰联合推出的云安全服务，为用户提供全方位的网络安全防护。</p>
                        <ul>
                            <li><strong>入侵检测与防御(IPS)：</strong>实时监控网络流量，检测并阻断入侵行为</li>
                            <li><strong>防病毒(AV)：</strong>检测并清除病毒、木马、恶意软件</li>
                            <li><strong>Web应用防护(WAF)：</strong>防护SQL注入、XSS等Web攻击</li>
                            <li><strong>数据防泄露(DLP)：</strong>监控并防止敏感数据外发</li>
                            <li><strong>DDoS防护：</strong>检测并清洗DDoS攻击流量</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>二、用户权利与义务</h3>
                        <p><strong>2.1 用户权利</strong></p>
                        <ul>
                            <li>有权按照服务等级协议享受相应质量的服务</li>
                            <li>有权查询服务使用情况和费用明细</li>
                            <li>有权在服务不满意时申请退订</li>
                        </ul>
                        <p><strong>2.2 用户义务</strong></p>
                        <ul>
                            <li>应妥善保管账号信息，对账号下的所有行为负责</li>
                            <li>不得利用本服务从事违法违规活动</li>
                            <li>应按照约定支付服务费用</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>三、服务费用与支付</h3>
                        <p>服务费用按照双方签订的合同执行。用户可选择按月、按季度或按年支付。</p>
                        <p>如用户逾期未支付费用，中国移动有权暂停或终止服务。</p>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>四、隐私与数据保护</h3>
                        <p>我们高度重视用户隐私和数据安全。详细内容请参考《专线卫士隐私政策》。</p>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>五、免责声明</h3>
                        <p>因不可抗力（如自然灾害、网络运营商故障等）导致的服务中断，中国移动不承担责任。</p>
                    </div>
                    
                    <div class="agreement-footer-tech">
                        <p>本协议自用户签署之日起生效，有效期为服务提供期间。</p>
                    </div>
                </div>
            `
        },
        privacy: {
            title: '隐私政策',
            content: `
                <div class="agreement-section-tech">
                    <div class="agreement-meta-tech">
                        <span class="meta-icon-tech">🔒</span>
                        <span>版本生效日期：2024年1月1日</span>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>一、信息收集</h3>
                        <p>我们收集以下类型的信息：</p>
                        <ul>
                            <li><strong>账号信息：</strong>包括企业名称、联系人、联系电话、电子邮箱等</li>
                            <li><strong>使用数据：</strong>包括流量日志、安全事件日志、设备运行状态等</li>
                            <li><strong>设备信息：</strong>包括设备型号、MAC地址、IP地址等</li>
                            <li><strong>位置信息：</strong>企业注册地址和使用地址</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>二、信息使用</h3>
                        <p>收集的信息仅用于以下目的：</p>
                        <ul>
                            <li>提供和优化服务</li>
                            <li>安全威胁分析与预警</li>
                            <li>技术支持与故障排查</li>
                            <li>计费与账单管理</li>
                            <li>法律法规要求的目的</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>三、信息保护与存储</h3>
                        <p>我们采用业界领先的安全技术和管理措施保护用户数据安全：</p>
                        <ul>
                            <li>数据加密传输（TLS 1.3）</li>
                            <li>数据加密存储（AES-256）</li>
                            <li>访问权限控制</li>
                            <li>安全审计与监控</li>
                            <li>数据存储在中华人民共和国境内</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>四、信息共享与披露</h3>
                        <p>我们不会向第三方出售、出租或共享用户数据，除非：</p>
                        <ul>
                            <li>获得用户明确授权</li>
                            <li>法律法规要求</li>
                            <li>政府部门或司法机关要求</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>五、用户权利</h3>
                        <ul>
                            <li>有权查询、更正、删除个人数据</li>
                            <li>有权撤回数据使用授权</li>
                            <li>有权注销账号</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-footer-tech">
                        <p>如有任何隐私问题，请联系我们：privacy@zxws.com</p>
                    </div>
                </div>
            `
        },
        sla: {
            title: '服务等级协议(SLA)',
            content: `
                <div class="agreement-section-tech">
                    <div class="agreement-meta-tech">
                        <span class="meta-icon-tech">📋</span>
                        <span>版本生效日期：2024年1月1日</span>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>一、服务可用性</h3>
                        <p>专线卫士云服务可用性不低于 <strong>99.9%</strong>。</p>
                        <p>服务可用性计算公式：</p>
                        <p class="formula">可用性 = (总时间 - 不可用时间) / 总时间 × 100%</p>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>二、故障响应时间</h3>
                        <table class="sla-table-tech">
                            <tr>
                                <th>故障等级</th>
                                <th>响应时间</th>
                                <th>恢复时间</th>
                            </tr>
                            <tr>
                                <td>严重故障（P1）</td>
                                <td>30分钟内</td>
                                <td>4小时内</td>
                            </tr>
                            <tr>
                                <td>一般故障（P2）</td>
                                <td>2小时内</td>
                                <td>24小时内</td>
                            </tr>
                            <tr>
                                <td>轻微故障（P3）</td>
                                <td>8小时内</td>
                                <td>72小时内</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>三、技术支持服务</h3>
                        <ul>
                            <li><strong>7×24小时技术支持：</strong>全天候在线支持</li>
                            <li><strong>专属客户经理：</strong>为企业客户提供一对一服务</li>
                            <li><strong>定期巡检：</strong>每月进行一次系统健康检查</li>
                            <li><strong>安全培训：</strong>每年提供2次网络安全培训</li>
                        </ul>
                    </div>
                    
                    <div class="agreement-content-block-tech">
                        <h3>四、服务补偿</h3>
                        <p>如服务可用性未达到承诺标准，用户有权申请服务补偿：</p>
                        <table class="sla-table-tech">
                            <tr>
                                <th>可用性</th>
                                <th>补偿比例</th>
                            </tr>
                            <tr>
                                <td>99.0% - 99.9%</td>
                                <td>10%</td>
                            </tr>
                            <tr>
                                <td>95.0% - 99.0%</td>
                                <td>30%</td>
                            </tr>
                            <tr>
                                <td><95.0%</td>
                                <td>50%</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="agreement-footer-tech">
                        <p>本SLA自服务开通之日起生效。</p>
                    </div>
                </div>
            `
        }
    };
    
    const agreement = agreements[type];
    if (!agreement) return;
    
    // 渲染到协议详情页
    document.getElementById('agreement-title').textContent = agreement.title;
    document.getElementById('agreement-content').innerHTML = agreement.content;
    
    // 跳转到协议详情页
    switchTab('agreement');
}
// 显示证书详情 - 改为二级界面
function showCertificate(type) {
    const certificates = {
        iso27001: {
            title: 'ISO 27001 信息安全管理体系认证',
            content: `
                <div class="certificate-section-tech">
                    <div class="certificate-header-tech">
                        <div class="certificate-badge-tech">🏆</div>
                        <div class="certificate-meta-tech">
                            <p><strong>证书编号：</strong>ISMS-2024-001</p>
                            <p><strong>颁发机构：</strong>中国网络安全审查技术与认证中心(CNCA)</p>
                            <p><strong>有效期：</strong>2024年1月1日 - 2027年1月1日</p>
                            <p><strong>认证标准：</strong>ISO/IEC 27001:2022</p>
                        </div>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证范围</h3>
                        <p>专线卫士云安全服务的信息安全管理体系，包括：</p>
                        <ul>
                            <li>云服务基础设施的安全管理</li>
                            <li>安全威胁监测与响应</li>
                            <li>客户数据保护与隐私</li>
                            <li>安全事件管理与持续改进</li>
                        </ul>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证意义</h3>
                        <p>ISO 27001是国际公认的信息安全管理体系标准。获得此认证证明：</p>
                        <ul>
                            <li>专线卫士建立了系统化的信息安全管理体系</li>
                            <li>能够有效识别、评估和控制信息安全风险</li>
                            <li>客户数据得到全面保护</li>
                            <li>信息安全管理达到国际先进水平</li>
                        </ul>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证流程</h3>
                        <ol>
                            <li>准备阶段：建立信息安全管理体系文件</li>
                            <li>内部审核：进行内审和管理评审</li>
                            <li>第一阶段审核：审核体系文件</li>
                            <li>第二阶段审核：现场审核体系实施情况</li>
                            <li>认证决定：认证机构做出认证决定</li>
                            <li>监督审核：每年进行一次监督审核</li>
                            <li>再认证：三年后重新认证</li>
                        </ol>
                    </div>
                    
                    <div class="certificate-quote-tech">
                        <p>"ISO 27001认证是专线卫士信息安全管理的重要里程碑，证明我们的安全管理体系达到了国际标准要求。"</p>
                        <p class="quote-author">—— 启明星辰信息安全总监</p>
                    </div>
                </div>
            `
        },
        iso9001: {
            title: 'ISO 9001 质量管理体系认证',
            content: `
                <div class="certificate-section-tech">
                    <div class="certificate-header-tech">
                        <div class="certificate-badge-tech">🏆</div>
                        <div class="certificate-meta-tech">
                            <p><strong>证书编号：</strong>QMS-2024-002</p>
                            <p><strong>颁发机构：</strong>中国质量认证中心(CQC)</p>
                            <p><strong>有效期：</strong>2024年1月1日 - 2027年1月1日</p>
                            <p><strong>认证标准：</strong>ISO 9001:2015</p>
                        </div>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证范围</h3>
                        <p>专线卫士云安全服务的设计、开发、运维和服务，包括：</p>
                        <ul>
                            <li>安全产品设计开发</li>
                            <li>云服务运维管理</li>
                            <li>客户技术支持服务</li>
                            <li>持续改进与优化</li>
                        </ul>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证意义</h3>
                        <p>ISO 9001是国际公认的质量管理体系标准。获得此认证证明：</p>
                        <ul>
                            <li>专线卫士建立了规范的质量管理体系</li>
                            <li>产品和服务质量得到保障</li>
                            <li>客户满意度持续提升</li>
                            <li>质量管理达到国际先进水平</li>
                        </ul>
                    </div>
                    
                    <div class="certificate-quote-tech">
                        <p>"ISO 9001认证体现了专线卫士对产品质量的执着追求，为客户提供高质量的云安全服务。"</p>
                        <p class="quote-author">—— 启明星辰质量管理部经理</p>
                    </div>
                </div>
            `
        },
        cmmi: {
            title: 'CMMI 5级 认证',
            content: `
                <div class="certificate-section-tech">
                    <div class="certificate-header-tech">
                        <div class="certificate-badge-tech">🏆</div>
                        <div class="certificate-meta-tech">
                            <p><strong>证书编号：</strong>CMMI-2024-003</p>
                            <p><strong>颁发机构：</strong>CMMI研究院(CMMI Institute)</p>
                            <p><strong>有效期：</strong>2024年1月1日 - 2027年1月1日</p>
                            <p><strong>认证级别：</strong>CMMI-DEV V2.0 5级（优化级）</p>
                        </div>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证级别说明</h3>
                        <p>CMMI（Capability Maturity Model Integration）是软件能力成熟度模型集成，分为5个级别：</p>
                        <ul>
                            <li><strong>1级（初始级）：</strong>过程不可预测，依赖个人能力</li>
                            <li><strong>2级（已管理级）：</strong>过程有纪律，可重复</li>
                            <li><strong>3级（已定义级）：</strong>过程标准化，组织级统一</li>
                            <li><strong>4级（量化管理级）：</strong>过程可量化，数据驱动</li>
                            <li><strong>5级（优化级）：</strong>过程持续优化，创新改进</li>
                        </ul>
                        <p><strong>CMMI 5级是最高级别，标志着专线卫士的软件开发和服务能力达到国际领先水平。</strong></p>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证意义</h3>
                        <ul>
                            <li>软件开发过程规范化、标准化</li>
                            <li>产品质量和交付能力显著提升</li>
                            <li>风险管理和成本控制能力增强</li>
                            <li>客户满意度和信任度提高</li>
                        </ul>
                    </div>
                    
                    <div class="certificate-quote-tech">
                        <p>"CMMI 5级认证是对专线卫士软件开发能力的高度认可，证明了我们的软件开发过程达到了国际最高标准。"</p>
                        <p class="quote-author">—— 启明星辰研发总监</p>
                    </div>
                </div>
            `
        },
        security: {
            title: '网络安全产品认证',
            content: `
                <div class="certificate-section-tech">
                    <div class="certificate-header-tech">
                        <div class="certificate-badge-tech">🏆</div>
                        <div class="certificate-meta-tech">
                            <p><strong>证书编号：</strong>NSP-2024-004</p>
                            <p><strong>颁发机构：</strong>国家网络安全审查技术与认证中心</p>
                            <p><strong>有效期：</strong>2024年1月1日 - 2026年1月1日</p>
                            <p><strong>认证标准：</strong>GB/T 20281-2020《信息安全技术 防火墙技术要求和测试评价方法》</p>
                        </div>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证范围</h3>
                        <p>专线卫士防火墙、入侵检测与防御系统、Web应用防护系统等网络安全产品。</p>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证意义</h3>
                        <p>国家网络安全产品认证是网络安全产品的国家权威认证。获得此认证证明：</p>
                        <ul>
                            <li>专线卫士安全产品符合国家相关标准和要求</li>
                            <li>产品安全功能完整、性能可靠</li>
                            <li>产品研发和管理规范</li>
                            <li>产品可以合法销售和使用</li>
                        </ul>
                    </div>
                    
                    <div class="certificate-content-block-tech">
                        <h3>认证标准</h3>
                        <p>认证依据国家标准GB/T 20281-2020《信息安全技术 防火墙技术要求和测试评价方法》，该标准规定了防火墙的安全功能要求、性能要求、安全保障要求和测试评价方法。</p>
                    </div>
                    
                    <div class="certificate-quote-tech">
                        <p>"国家网络安全产品认证是专线卫士产品安全能力的有力证明，客户可以放心使用我们的产品。"</p>
                        <p class="quote-author">—— 启明星辰产品总监</p>
                    </div>
                </div>
            `
        }
    };
    
    const certificate = certificates[type];
    if (!certificate) return;
    
    // 渲染到证书详情页
    document.getElementById('certificate-title').textContent = certificate.title;
    document.getElementById('certificate-content').innerHTML = certificate.content;
    
    // 跳转到证书详情页
    switchTab('certificate');
}
// 显示模态框
function showModal(title, content) {
    // 移除已存在的模态框
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// 这部分初始化已被上方的统一DOMContentLoaded事件替代，保留此注释供参考

// 初始化日志分析页面
function initLogAnalysis() {
    const logAnalysisContent = document.getElementById('log-analysis-content');
    if (!logAnalysisContent) return;
    
    logAnalysisContent.innerHTML = `
        <div class="log-upload-section-tech">
            <div class="upload-header-tech">
                <div class="upload-icon-tech">📊</div>
                <h3 class="upload-title-tech">智能日志分析</h3>
                <p class="upload-desc-tech">上传您的日志文件，我们将智能分析其中存在的安全威胁和漏洞</p>
            </div>
            
            <div class="upload-area-tech" id="upload-area">
                <div class="upload-icon-large-tech">📁</div>
                <p class="upload-text-tech">点击或拖拽文件到此处上传</p>
                <div class="upload-hints-tech">
                    <span class="upload-hint-tech">📄 .log, .txt, .csv, .json</span>
                    <span class="upload-hint-tech">📦 最大 10MB</span>
                </div>
                <input type="file" id="log-file-input" accept=".log,.txt,.csv,.json" style="display: none;">
                <button class="upload-btn-tech" onclick="document.getElementById('log-file-input').click()">选择文件</button>
            </div>
            
            <div class="upload-progress-tech" id="upload-progress" style="display: none;">
                <div class="progress-bar-tech">
                    <div class="progress-fill-tech" id="progress-fill"></div>
                </div>
                <p class="progress-text-tech" id="progress-text">上传中...</p>
            </div>
        </div>
        
        <div class="vuln-types-guide-tech">
            <div class="guide-header-tech">
                <span class="guide-icon-tech">🛡️</span>
                <h3>可检测的漏洞类型 <span class="vuln-count-badge">19种</span></h3>
            </div>
            <div class="guide-grid-tech">
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech critical">🔴</div>
                    <div class="guide-info-tech">
                        <h5>勒索软件</h5>
                        <p class="vuln-severity">严重 · 文件加密勒索</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech critical">🔴</div>
                    <div class="guide-info-tech">
                        <h5>APT攻击</h5>
                        <p class="vuln-severity">严重 · 高级持续性威胁</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>SQL注入</h5>
                        <p class="vuln-severity">高危 · 数据库攻击</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>XSS攻击</h5>
                        <p class="vuln-severity">高危 · 跨站脚本</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>SSRF攻击</h5>
                        <p class="vuln-severity">高危 · 服务端请求伪造</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>XXE攻击</h5>
                        <p class="vuln-severity">高危 · XML外部实体</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>命令注入</h5>
                        <p class="vuln-severity">高危 · 系统命令执行</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>CC攻击</h5>
                        <p class="vuln-severity">高危 · 挑战黑洞攻击</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>恶意软件</h5>
                        <p class="vuln-severity">高危 · 病毒木马间谍软件</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>数据泄露</h5>
                        <p class="vuln-severity">高危 · 敏感数据外泄</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>权限提升</h5>
                        <p class="vuln-severity">高危 · 异常提权操作</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech high">🟠</div>
                    <div class="guide-info-tech">
                        <h5>钓鱼攻击</h5>
                        <p class="vuln-severity">高危 · 恶意链接伪造页</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech medium">🟡</div>
                    <div class="guide-info-tech">
                        <h5>CSRF攻击</h5>
                        <p class="vuln-severity">中危 · 跨站请求伪造</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech medium">🟡</div>
                    <div class="guide-info-tech">
                        <h5>目录遍历</h5>
                        <p class="vuln-severity">中危 · 非法路径访问</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech medium">🟡</div>
                    <div class="guide-info-tech">
                        <h5>文件包含</h5>
                        <p class="vuln-severity">中危 · LFI/RFI攻击</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech medium">🟡</div>
                    <div class="guide-info-tech">
                        <h5>DDoS攻击</h5>
                        <p class="vuln-severity">中危 · 流量攻击</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech medium">🟡</div>
                    <div class="guide-info-tech">
                        <h5>暴力破解</h5>
                        <p class="vuln-severity">中危 · 登录爆破</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech medium">🟡</div>
                    <div class="guide-info-tech">
                        <h5>物联网威胁</h5>
                        <p class="vuln-severity">中危 · IoT设备入侵</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech medium">🟡</div>
                    <div class="guide-info-tech">
                        <h5>内部威胁</h5>
                        <p class="vuln-severity">中危 · 异常内部操作</p>
                    </div>
                </div>
                <div class="guide-item-tech">
                    <div class="guide-icon-small-tech low">🟢</div>
                    <div class="guide-info-tech">
                        <h5>异常访问</h5>
                        <p class="vuln-severity">低危 · 异常状态码</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="analysis-result-tech" id="analysis-result" style="display: none;">
            <div class="result-header-tech">
                <span class="result-icon-tech">✅</span>
                <h3>分析结果</h3>
                <button class="result-close-tech" onclick="closeAnalysisResult()">×</button>
            </div>
            <div class="result-summary-tech" id="result-summary">
                <!-- 分析结果摘要 -->
            </div>
            <div class="result-details-tech" id="result-details">
                <!-- 详细分析结果 -->
            </div>
            <div class="result-chart-tech" id="result-chart">
                <!-- 可视化图表 -->
            </div>
            <div class="result-recommendations-tech" id="result-recommendations">
                <!-- 推荐方案 -->
            </div>
        </div>
        
        <div class="analysis-history-tech" id="analysis-history">
            <div class="history-header-tech">
                <span class="history-icon-tech">📜</span>
                <h3>历史分析记录</h3>
                <div class="history-actions-tech">
                    <button class="history-action-btn-tech" onclick="exportAnalysisHistory()" title="导出记录">📤 导出</button>
                    <button class="history-action-btn-tech" onclick="importAnalysisHistory()" title="导入记录">📥 导入</button>
                    <button class="history-action-btn-tech danger" onclick="clearAllHistory()" title="清空所有记录">🗑️ 清空</button>
                </div>
            </div>
            <div class="history-stats-tech" id="history-stats">
                <!-- 统计信息 -->
            </div>
            <div class="history-list-tech" id="history-list">
                <!-- 历史记录列表 -->
            </div>
        </div>
    `;
    
    // 绑定文件上传事件
    const fileInput = document.getElementById('log-file-input');
    const uploadArea = document.getElementById('upload-area');
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (this.files.length > 0) {
                uploadAndAnalyzeLog(this.files[0]);
            }
        });
    }
    
    // 拖拽上传
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            if (e.dataTransfer.files.length > 0) {
                uploadAndAnalyzeLog(e.dataTransfer.files[0]);
            }
        });
    }
}

// 上传并分析日志 - 真实分析
function uploadAndAnalyzeLog(file) {
    // 验证文件类型
    const allowedTypes = ['.log', '.txt', '.csv', '.json'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExt)) {
        alert('不支持的文件格式，请上传 .log, .txt, .csv 或 .json 文件');
        return;
    }
    
    // 验证文件大小（10MB）
    if (file.size > 10 * 1024 * 1024) {
        alert('文件大小超过10MB限制，请上传更小的文件');
        return;
    }
    
    // 显示上传进度
    const uploadProgress = document.getElementById('upload-progress');
    const uploadArea = document.getElementById('upload-area');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (uploadProgress) uploadProgress.style.display = 'block';
    if (uploadArea) uploadArea.style.display = 'none';
    
    // 模拟上传进度
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        if (progress > 90) {
            clearInterval(progressInterval);
        }
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.textContent = `上传中... ${progress}%`;
    }, 200);
    
    // 读取文件内容并分析
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const fileContent = e.target.result;
        
        // 模拟分析过程
        setTimeout(() => {
            clearInterval(progressInterval);
            if (progressFill) progressFill.style.width = '100%';
            if (progressText) progressText.textContent = '分析中...';
            
            // 分析日志内容
            setTimeout(() => {
                const analysisResult = analyzeLogContent(fileContent, file.name);
                
                if (uploadProgress) uploadProgress.style.display = 'none';
                if (uploadArea) uploadArea.style.display = 'block';
                
                // 显示分析结果
                displayAnalysisResult(analysisResult);
                
                // 保存到历史记录
                saveAnalysisHistory(analysisResult);
            }, 1500);
        }, 2000);
    };
    
    reader.onerror = function() {
        alert('文件读取失败，请重试');
        if (uploadProgress) uploadProgress.style.display = 'none';
        if (uploadArea) uploadArea.style.display = 'block';
    };
    
    reader.readAsText(file, 'UTF-8');
}

// 分析日志内容 - 真实分析
function analyzeLogContent(content, fileName) {
    const result = {
        fileName: fileName,
        fileSize: content.length,
        analysisTime: new Date().toLocaleString(),
        totalLines: content.split('\n').length,
        riskLevel: '低危',
        riskScore: 0,
        vulnerabilities: [],
        suspiciousEvents: [],
        recommendations: []
    };
    
    // 定义漏洞检测规则（覆盖首页全部常见漏洞类型）
    const vulnPatterns = [
        // ===== Web攻击类 =====
        {
            type: 'SQL注入',
            pattern: /(union\s+select|select.*from|insert\s+into|delete\s+from|update.*set|drop\s+table|'\s+or\s+'|'\s+and\s+'|admin'--|1=1|sleep\s*\(|benchmark\s*\()/gi,
            severity: 'high',
            description: '检测到可能的SQL注入攻击尝试'
        },
        {
            type: 'XSS攻击',
            pattern: /(<script>|javascript:|onerror\s*=|onload\s*=|alert\s*\(|document\.cookie|<iframe|eval\s*\(|document\.write)/gi,
            severity: 'high',
            description: '检测到跨站脚本攻击特征'
        },
        {
            type: 'CSRF攻击',
            pattern: /(csrf|cross.site.request.forgery|forged.request|unauthorized.action)/gi,
            severity: 'medium',
            description: '检测到可能的跨站请求伪造攻击'
        },
        {
            type: 'SSRF攻击',
            pattern: /(ssrf|server.side.request.forgery|internal\.|localhost|127\.0\.0\.1|0\.0\.0\.0)/gi,
            severity: 'high',
            description: '检测到可能的服务端请求伪造攻击'
        },
        {
            type: 'XXE攻击',
            pattern: /(<\?xml|<!DOCTYPE|ENTITY\s+.*SYSTEM|XXE|xml\.external)/gi,
            severity: 'high',
            description: '检测到可能的XML外部实体注入攻击'
        },
        {
            type: '目录遍历',
            pattern: /(\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e%5c|path\.traversal)/gi,
            severity: 'medium',
            description: '检测到目录遍历攻击尝试'
        },
        {
            type: '文件包含',
            pattern: /(include\s*\(|require\s*\(|file=\.\.\/|path=\.\.\/|LFI|RFI)/gi,
            severity: 'medium',
            description: '检测到文件包含攻击特征'
        },
        {
            type: '命令注入',
            pattern: /(;\s*cat\s+|;\s*ls\s+|;\s*id\s+|;\s*whoami\s+|\|\s*cat\s+|\|\s*ls\s+|`\s*.*`|\$\(.*\))/gi,
            severity: 'high',
            description: '检测到可能的命令注入攻击'
        },
        {
            type: 'CC攻击',
            pattern: /(GET|POST)\s+\/.*HTTP\/.*(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}).*(\d{2,}\/)/gi,
            severity: 'high',
            description: '检测到可能的CC攻击特征'
        },
        // ===== 恶意软件/勒索软件类 =====
        {
            type: '恶意软件',
            pattern: /(virus|malware|trojan|backdoor|rootkit|spyware|adware|worm\.|infected|malicious\.file|threat\.detected)/gi,
            severity: 'high',
            description: '检测到恶意软件相关威胁'
        },
        {
            type: '勒索软件',
            pattern: /(ransomware|encrypt|decrypt\.key|readme\.txt|restore\.files|\.locked|\.encrypted|\.crypto|\.cry|WannaCry|Ryuk|Conti|LockBit)/gi,
            severity: 'critical',
            description: '检测到可能的勒索软件活动'
        },
        // ===== APT攻击类 =====
        {
            type: 'APT攻击',
            pattern: /(apt\.|advanced\.persistent\.threat|spear.phish|watering\.hole|c2\.server|command\.and\.control|beacon|lateral\.movement|privilege\.escalation)/gi,
            severity: 'critical',
            description: '检测到可能的高级持续性威胁(APT)活动'
        },
        // ===== 数据泄露类 =====
        {
            type: '数据泄露',
            pattern: /(data\.leak|exfiltration|unauthorized\.access|sensitive\.data|personal\.info|credit\.card|id\.number|social\.security|export\.large\.file)/gi,
            severity: 'high',
            description: '检测到可能的数据泄露风险'
        },
        // ===== DDoS攻击类 =====
        {
            type: 'DDoS攻击',
            pattern: /(syn\.flood|udp\.flood|http\.flood|dos\.attack|ddos|high\.volume\.request|rate\.limit\.exceeded|botnet)/gi,
            severity: 'medium',
            description: '检测到可能的DDoS攻击特征'
        },
        // ===== 暴力破解/异常访问类 =====
        {
            type: '暴力破解',
            pattern: /(failed\s+login|authentication\s+failed|invalid\s+password|too\s+many\s+attempts|brute\s*force|password\s+guess)/gi,
            severity: 'medium',
            description: '检测到可能的暴力破解行为'
        },
        {
            type: '异常访问',
            pattern: /(\s+404\s+|\s+403\s+|\s+401\s+|\s+500\s+|\s+502\s+|\s+503\s+)/gi,
            severity: 'low',
            description: '检测到异常访问状态码'
        },
        {
            type: '权限提升',
            pattern: /(privilege\.escalation|sudo\s+|admin\s+access|root\s+access|unauthorized\.admin)/gi,
            severity: 'high',
            description: '检测到可能的权限提升尝试'
        },
        // ===== 物联网威胁类 =====
        {
            type: '物联网威胁',
            pattern: /(iot\.device|default\.password|camera\.hack|iot\.botnet|mirai|telnet\.attempt|iot\.vulnerability)/gi,
            severity: 'medium',
            description: '检测到可能的物联网设备威胁'
        },
        // ===== 钓鱼攻击类 =====
        {
            type: '钓鱼攻击',
            pattern: /(phishing|spear.phish|malicious\.link|fake\.login|credential\.harvest|deceptive\.site)/gi,
            severity: 'high',
            description: '检测到可能的钓鱼攻击活动'
        },
        // ===== 内部威胁类 =====
        {
            type: '内部威胁',
            pattern: /(insider\.threat|unusual\.access|after\.hours|bulk\.download|unauthorized\.share|data\.misuse)/gi,
            severity: 'medium',
            description: '检测到可能的内部威胁行为'
        }
    ];
    
    // 检测漏洞
    vulnPatterns.forEach(vuln => {
        const matches = content.match(vuln.pattern);
        if (matches && matches.length > 0) {
            result.vulnerabilities.push({
                type: vuln.type,
                count: matches.length,
                severity: vuln.severity,
                description: vuln.description,
                examples: matches.slice(0, 3)  // 取前3个示例
            });
        }
    });
    
    // 计算风险评分
    let score = 0;
    result.vulnerabilities.forEach(v => {
        if (v.severity === 'high') {
            score += v.count * 20;
        } else if (v.severity === 'medium') {
            score += v.count * 10;
        } else {
            score += v.count * 5;
        }
    });
    
    result.riskScore = Math.min(score, 100);
    
    // 确定风险等级
    if (result.riskScore >= 70) {
        result.riskLevel = '高危';
    } else if (result.riskScore >= 40) {
        result.riskLevel = '中危';
    } else if (result.riskScore > 0) {
        result.riskLevel = '低危';
    } else {
        result.riskLevel = '安全';
    }
    
    // 生成推荐方案
    if (result.vulnerabilities.length > 0) {
        result.vulnerabilities.forEach(v => {
            if (v.type === 'SQL注入') {
                result.recommendations.push('部署Web应用防火墙(WAF)防护SQL注入攻击');
                result.recommendations.push('使用参数化查询或预编译语句');
            } else if (v.type === 'XSS攻击') {
                result.recommendations.push('启用XSS防护过滤特殊字符');
                result.recommendations.push('设置HTTP Only Cookie');
            } else if (v.type === 'CSRF攻击') {
                result.recommendations.push('启用CSRF Token验证机制');
                result.recommendations.push('配置Referer/CORS策略');
            } else if (v.type === 'SSRF攻击') {
                result.recommendations.push('启用SSRF防护，限制内网访问');
                result.recommendations.push('配置URL白名单验证');
            } else if (v.type === 'XXE攻击') {
                result.recommendations.push('禁用XML外部实体解析');
                result.recommendations.push('使用JSON替代XML传输数据');
            } else if (v.type === '目录遍历') {
                result.recommendations.push('配置路径访问控制');
                result.recommendations.push('禁用目录列表功能');
            } else if (v.type === '文件包含') {
                result.recommendations.push('禁用动态文件包含功能');
                result.recommendations.push('使用白名单验证包含路径');
            } else if (v.type === '命令注入') {
                result.recommendations.push('避免使用系统命令执行函数');
                result.recommendations.push('对输入参数进行严格过滤');
            } else if (v.type === 'CC攻击') {
                result.recommendations.push('启用CC攻击防护');
                result.recommendations.push('配置访问频率限制');
            } else if (v.type === '恶意软件') {
                result.recommendations.push('部署专线卫士防病毒(AV)模块');
                result.recommendations.push('启用实时威胁情报联动检测');
            } else if (v.type === '勒索软件') {
                result.recommendations.push('部署专线卫士防勒索模块，启用文件完整性监控');
                result.recommendations.push('定期离线备份重要数据');
            } else if (v.type === 'APT攻击') {
                result.recommendations.push('部署专线卫士APT检测模块，启用流量深度分析');
                result.recommendations.push('结合威胁情报关联分析，建立应急响应机制');
            } else if (v.type === '数据泄露') {
                result.recommendations.push('部署专线卫士数据防泄露(DLP)模块');
                result.recommendations.push('启用敏感数据识别与外发审计');
            } else if (v.type === 'DDoS攻击') {
                result.recommendations.push('部署专线卫士DDoS防护模块');
                result.recommendations.push('配置流量清洗与异常流量检测');
            } else if (v.type === '暴力破解') {
                result.recommendations.push('启用账号锁定机制');
                result.recommendations.push('部署专线卫士入侵防御(IPS)');
            } else if (v.type === '权限提升') {
                result.recommendations.push('实施最小权限访问控制原则');
                result.recommendations.push('启用专线卫士特权账号监控');
            } else if (v.type === '物联网威胁') {
                result.recommendations.push('修改物联网设备默认密码');
                result.recommendations.push('部署专线卫士物联网安全模块');
            } else if (v.type === '钓鱼攻击') {
                result.recommendations.push('加强员工网络安全意识培训');
                result.recommendations.push('部署专线卫士邮件安全网关');
            } else if (v.type === '内部威胁') {
                result.recommendations.push('实施数据分类分级与访问控制');
                result.recommendations.push('部署专线卫士用户行为分析模块');
            }
        });
        
        // 去重
        result.recommendations = [...new Set(result.recommendations)];
    } else {
        result.recommendations.push('未检测到安全威胁，请继续保持良好安全习惯');
    }
    
    return result;
}

// 显示分析结果 - 优化版
function displayAnalysisResult(result) {
    const analysisResult = document.getElementById('analysis-result');
    const resultSummary = document.getElementById('result-summary');
    const resultDetails = document.getElementById('result-details');
    const resultChart = document.getElementById('result-chart');
    const resultRecommendations = document.getElementById('result-recommendations');
    
    if (!analysisResult || !resultSummary || !resultDetails || !resultRecommendations) return;
    
    // 显示分析结果显示区域
    analysisResult.style.display = 'block';
    
    // 显示结果摘要
    resultSummary.innerHTML = `
        <div class="result-summary-card-tech">
            <div class="summary-header-tech">
                <div class="summary-icon-tech">${result.riskLevel === '安全' ? '✅' : result.riskLevel === '低危' ? '⚠️' : result.riskLevel === '中危' ? '⚠️' : '🔴'}</div>
                <div class="summary-info-tech">
                    <h4>分析完成</h4>
                    <span class="risk-badge-tech ${result.riskLevel === '高危' ? 'high' : result.riskLevel === '中危' ? 'medium' : 'low'}">${result.riskLevel}</span>
                </div>
            </div>
            <div class="summary-meta-tech">
                <div class="meta-item-tech">
                    <span class="meta-label-tech">文件名</span>
                    <span class="meta-value-tech">${result.fileName}</span>
                </div>
                <div class="meta-item-tech">
                    <span class="meta-label-tech">文件大小</span>
                    <span class="meta-value-tech">${(result.fileSize / 1024).toFixed(2)} KB</span>
                </div>
                <div class="meta-item-tech">
                    <span class="meta-label-tech">总行数</span>
                    <span class="meta-value-tech">${result.totalLines}</span>
                </div>
                <div class="meta-item-tech">
                    <span class="meta-label-tech">分析时间</span>
                    <span class="meta-value-tech">${result.analysisTime}</span>
                </div>
            </div>
            <div class="risk-score-tech">
                <div class="score-circle-tech ${result.riskScore >= 70 ? 'high' : result.riskScore >= 40 ? 'medium' : 'low'}">
                    <span class="score-value-tech">${result.riskScore}</span>
                    <span class="score-label-tech">风险评分</span>
                </div>
            </div>
        </div>
    `;
    
    // 显示详细分析结果
    if (result.vulnerabilities.length > 0) {
        let detailsHTML = '<div class="details-header-tech"><h4>🔍 检测到的漏洞</h4></div>';
        
        result.vulnerabilities.forEach(v => {
            detailsHTML += `
                <div class="vuln-detail-card-tech">
                    <div class="vuln-detail-header-tech">
                        <div class="vuln-type-icon-tech">${v.severity === 'high' ? '🔴' : v.severity === 'medium' ? '🟠️' : '🟡'}</div>
                        <div class="vuln-type-info-tech">
                            <h5>${v.type}</h5>
                            <span class="vuln-severity-badge-tech ${v.severity}">${v.severity === 'high' ? '高危' : v.severity === 'medium' ? '中危' : '低危'}</span>
                        </div>
                        <div class="vuln-count-tech">
                            <span class="count-value-tech">${v.count}</span>
                            <span class="count-label-tech">次</span>
                        </div>
                    </div>
                    <div class="vuln-detail-desc-tech">
                        <p>${v.description}</p>
                    </div>
                    ${v.examples && v.examples.length > 0 ? `
                        <div class="vuln-examples-tech">
                            <div class="examples-header-tech">攻击示例：</div>
                            ${v.examples.map(ex => `
                                <div class="example-code-tech">${ex}</div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        resultDetails.innerHTML = detailsHTML;
    } else {
        resultDetails.innerHTML = `
            <div class="no-vuln-found-tech">
                <div class="no-vuln-icon-tech">✅</div>
                <h4>未检测到安全威胁</h4>
                <p>本次分析的日志文件中未发现已知漏洞攻击特征。</p>
            </div>
        `;
    }
    
    // 显示可视化图表（简单的柱状图）
    if (result.vulnerabilities.length > 0 && resultChart) {
        let chartHTML = '<div class="chart-header-tech"><h4>📊 漏洞分布</h4></div>';
        chartHTML += '<div class="chart-bar-container-tech">';
        
        result.vulnerabilities.forEach(v => {
            const barWidth = Math.min(v.count * 10, 100);
            chartHTML += `
                <div class="chart-bar-item-tech">
                    <div class="bar-label-tech">${v.type}</div>
                    <div class="bar-track-tech">
                        <div class="bar-fill-tech ${v.severity}" style="width: ${barWidth}%"></div>
                    </div>
                    <div class="bar-value-tech">${v.count}</div>
                </div>
            `;
        });
        
        chartHTML += '</div>';
        resultChart.innerHTML = chartHTML;
        resultChart.style.display = 'block';
    } else if (resultChart) {
        resultChart.style.display = 'none';
    }
    
    // 显示推荐方案
    if (result.recommendations.length > 0) {
        let recHTML = '<div class="rec-header-tech"><h4>💡 推荐方案</h4></div>';
        recHTML += '<div class="rec-list-tech">';
        
        result.recommendations.forEach(rec => {
            recHTML += `
                <div class="rec-item-tech">
                    <div class="rec-icon-tech">✓</div>
                    <div class="rec-text-tech">${rec}</div>
                </div>
            `;
        });
        
        recHTML += '</div>';
        resultRecommendations.innerHTML = recHTML;
    }
    
    // 滚动到分析结果区域
    analysisResult.scrollIntoView({ behavior: 'smooth' });
}

// 关闭分析结果
function closeAnalysisResult() {
    const analysisResult = document.getElementById('analysis-result');
    if (analysisResult) {
        analysisResult.style.display = 'none';
    }
}
// 防护能力数据
const solutions = [
    {
        id: 'ips',
        name: '入侵检测与防御(IPS)',
        icon: '🛡️',
        desc: '基于特征和行为的入侵检测与防御系统，实时阻断网络攻击。',
        features: ['5000+攻击特征库', '实时威胁情报更新', '低误报率', '自定义规则支持']
    },
    {
        id: 'av',
        name: '防病毒(AV)',
        icon: '🦠',
        desc: '云端杀毒引擎，支持亿级变种病毒检测。',
        features: ['云端病毒库实时更新', '支持100层压缩文件', '低系统资源占用', '病毒清除和隔离']
    },
    {
        id: 'waf',
        name: 'Web应用防护(WAF)',
        icon: '🌐',
        desc: 'Web应用防火墙，防护SQL注入、XSS等Web攻击。',
        features: ['OWASP Top 10防护', 'CC攻击防护', '网页防篡改', 'API安全保护']
    },
    {
        id: 'dlp',
        name: '数据防泄露(DLP)',
        icon: '🔒',
        desc: '数据防泄露系统，监控和保护敏感数据传输和存储。',
        features: ['敏感数据识别', '数据传输监控', '外发数据审计', '加密数据传输']
    },
    {
        id: 'vpn',
        name: '安全VPN',
        icon: '🔐',
        desc: '加密隧道技术，保障远程办公和分支机构安全接入。',
        features: ['国密算法支持', '多因素认证', '端点安全评估', '会话监控与审计']
    },
    {
        id: 'audit',
        name: '安全审计',
        icon: '📊',
        desc: '全面的安全审计和日志分析，满足等保合规要求。',
        features: ['日志集中管理', '异常行为分析', '合规审计报告', '实时告警通知']
    },
    {
        id: 'threat-intel',
        name: '威胁情报',
        icon: '🎯',
        desc: '云端威胁情报联动，实时更新攻击特征库。',
        features: ['全球威胁情报网络', '实时情报更新', '本地情报缓存', '情报关联分析']
    },
    {
        id: 'siem',
        name: '态势感知(SIEM)',
        icon: '👁️',
        desc: '安全信息与事件管理，全网安全态势可视化。',
        features: ['全网安全监控', '威胁关联分析', '安全态势大屏', '一键处置响应']
    }
];

// 典型案例数据（18个案例，每个漏洞类型3个）
const allCases = [
    {
        id: "gov-001",
        title: "某省政府政务外网APT攻击防御案例",
        scenario: "government",
        scenarioName: "政务专网",
        summary: "某省政府政务外网遭受境外APT组织长期渗透，通过专线卫士威胁情报与沙箱检测，成功发现并清除潜伏18个月的APT攻击。",
        background: "某省政府政务外网连接全省各级政府部门，承载公文传输、视频会议、数据共享等重要业务，存储大量敏感政务数据。2023年安全巡检中发现网络存在异常流量，疑似遭受APT攻击。",
        challenge: "1. APT攻击隐蔽性强，传统安全设备难以发现；2. 攻击已潜伏较长时间，影响范围不明；3. 政务数据敏感度高，不能中断业务进行处置；4. 需要满足等保三级合规要求。",
        solution: "部署专线卫士增强版，启用APT检测模块、威胁情报联动和沙箱分析功能。",
        solutionDetail: "1. 在省政务云数据中心部署专线卫士增强版核心设备；2. 启用流量深度分析，对全部南北向流量进行DPI检测；3. 接入启明星辰云端威胁情报，实时比对IOC指标；4. 部署沙箱检测系统，对可疑文件进行动态分析；5. 建立安全运营中心(SOC)，实现7×24小时威胁监控与响应。",
        process: ["安全评估：对政务外网进行全面安全评估，发现异常流量", "方案设计：制定APT检测与响应方案", "部署实施：部署专线卫士设备，配置威胁情报和沙箱检测", "威胁处置：发现并清除APT攻击，修复安全漏洞", "持续运营：建立常态化安全运营机制"],
        result: "成功清除潜伏18个月的APT攻击，修复12个安全漏洞，通过等保三级测评，获得国家网络安全主管部门表彰。",
        review: "专线卫士的APT检测能力超出预期，特别是威胁情报联动功能，帮助我们发现了传统安全设备无法检测的隐蔽攻击。现在我们的网络安全防护能力达到了国内领先水平。"
    },

    {
        id: "gov-002",
        title: "某市政府数据泄露防护案例",
        scenario: "government",
        scenarioName: "政务专网",
        summary: "某市政府通过专线卫士数据防泄露系统，实现政务数据全生命周期保护，成功阻止23起数据外发泄露事件。",
        background: "某市政府在推进数字政府建设过程中，大量政务数据需要在各部门间共享，同时也存在通过邮件、即时通讯工具等渠道外发的风险。2023年某相邻市政府发生数据泄露事件后，该市政府决定加强数据安全防护。",
        challenge: "1. 政务数据种类繁多，敏感级别不同，需要分类分级保护；2. 数据共享需求与数据安全要求存在矛盾；3. 工作人员安全意识不足，容易误操作导致泄露；4. 需要满足《数据安全法》合规要求。",
        solution: "部署专线卫士数据防泄露(DLP)系统，建立数据分类分级和保护机制。",
        solutionDetail: "1. 部署专线卫士DLP系统，对邮件、Web上传、移动存储、打印等渠道进行监控；2. 建立政务数据分类分级标准，对敏感数据进行标识和加密；3. 配置数据外发审批流程，重要数据外发需经审批；4. 开展数据安全培训，提升工作人员安全意识；5. 建立数据安全审计机制，对所有数据操作进行记录和审计。",
        process: ["数据梳理：对政务数据进行全面梳理，建立数据资产清单", "分类分级：制定数据分类分级标准，对敏感数据进行标识", "部署实施：部署专线卫士DLP系统，配置防护策略", "培训推广：开展数据安全培训，提升安全意识", "持续优化：根据运行情况持续优化防护策略"],
        result: "成功阻止23起数据外发泄露事件，政务数据0泄露，通过等保三级测评和数据安全评估，成为全省数据安全防护示范单位。",
        review: "专线卫士的数据防泄露系统非常实用，特别是数据分类分级功能，帮助我们建立了规范的数据安全管理体系。现在我们对数据安全更有信心了。"
    },

    {
        id: "gov-003",
        title: "某省政府网站Web攻击防护案例",
        scenario: "government",
        scenarioName: "政务专网",
        summary: "某省政府网站遭受大规模SQL注入和XSS攻击，通过专线卫士WAF模块成功防护，拦截攻击5000+次，保障政务网站安全运行。",
        background: "某省政府网站是政务公开和便民服务的重要窗口，日均访问量超过10万次。2024年3月起，网站频繁遭受SQL注入、XSS跨站脚本等Web攻击，导致部分页面异常，严重影响政府形象。",
        challenge: "1. Web攻击手段多样，传统防火墙难以有效防护；2. 网站需要对外开放，不能简单关闭服务；3. 攻击流量大，需要高性能防护设备；4. 需要满足网络安全等级保护要求。",
        solution: "部署专线卫士Web应用防护系统(WAF)，启用OWASP Top 10防护规则。",
        solutionDetail: "1. 在网站前端部署专线卫士WAF模块，对所有HTTP/HTTPS流量进行检测和过滤；2. 启用SQL注入防护规则，拦截非法SQL语句；3. 启用XSS防护规则，过滤恶意脚本；4. 配置CC攻击防护，限制异常访问频率；5. 建立攻击日志分析机制，定期生成安全报告。",
        process: ["攻击分析：对遭受的Web攻击进行详细分析，识别攻击特征", "方案设计：制定Web应用防护方案", "部署实施：部署专线卫士WAF模块，配置防护规则", "测试优化：进行渗透测试，验证防护效果", "持续运营：定期更新防护规则，持续监控攻击行为"],
        result: "成功拦截SQL注入攻击3200+次、XSS攻击1800+次，网站0篡改、0中断，通过网络安全评估。",
        review: "专线卫士的WAF模块防护效果非常好，部署后再也没有发生过网站被篡改的事件。特别是OWASP Top 10防护规则，覆盖了最常见的Web攻击手段。"
    },

    {
        id: "med-001",
        title: "某三甲医院勒索软件防御案例",
        scenario: "medical",
        scenarioName: "医疗行业",
        summary: "某三甲医院通过专线卫士行为分析引擎，成功拦截3次勒索软件攻击，保护HIS、PACS等核心系统安全，保障医疗业务连续运行。",
        background: "某三甲医院是一家集医疗、教学、科研为一体的大型综合性医院，拥有床位2000余张，日门诊量超过8000人次。医院运行HIS、PACS、LIS、EMR等多个核心业务系统，存储大量患者隐私数据和医疗记录。2023年以来，医疗行业勒索软件攻击事件频发，该医院决定加强安全防护。",
        challenge: "1. 勒索软件攻击日益猖獗，传统防病毒软件难以有效防护；2. HIS、PACS等系统不能中断，需要在业务不中断的情况下进行防护；3. 患者隐私数据保护要求高，需符合等保三级和《个人信息保护法》要求；4. 医疗设备众多，安全管理复杂。",
        solution: "部署专线卫士增强版，启用行为分析引擎和勒索软件防护模块。",
        solutionDetail: "1. 在核心交换机旁路部署专线卫士增强版设备；2. 启用行为分析引擎，实时监测异常文件加密行为；3. 启用勒索软件防护模块，对可疑加密行为进行拦截和隔离；4. 实现HIS、PACS、LIS等系统安全隔离，防止勒索软件横向传播；5. 建立数据备份机制，确保关键数据可恢复；6. 开展安全培训，提升医护人员安全意识。",
        process: ["现状评估：对医院网络和业务系统进行全面安全评估", "方案设计：制定医疗专网安全防护方案", "部署实施：部署专线卫士设备，配置勒索软件防护策略", "测试验证：进行模拟攻击测试，验证防护效果", "培训验收：开展医护人员安全培训，建立安全运维机制"],
        result: "成功拦截勒索软件攻击3次，核心业务系统0中断，患者隐私数据0泄露，通过等保三级测评。",
        review: "专线卫士的行为分析引擎非常强大，能够在勒索软件加密文件的初期就发现并拦截，真正做到了防患于未然。现在我们的网络安全防护能力大幅提升，患者可以更放心地就诊。"
    },

    {
        id: "med-002",
        title: "某妇幼保健院数据防泄露案例",
        scenario: "medical",
        scenarioName: "医疗行业",
        summary: "某妇幼保健院通过专线卫士数据防泄露系统，实现患者隐私数据全面保护，成功阻止15起数据外发风险事件，通过等保三级测评。",
        background: "某妇幼保健院年门诊量超过50万人次，存储大量孕产妇和新生儿的敏感医疗数据。随着《数据安全法》和《个人信息保护法》的实施，医院面临越来越严格的数据合规要求。2023年，医院发生一起疑似数据泄露事件，虽然未造成实际损失，但引起了院领导的高度重视。",
        challenge: "1. 患者隐私数据敏感度高，泄露后果严重；2. 医护人员需要正常使用数据，不能影响业务效率；3. 数据外发渠道多（邮件、微信、U盘等），难以全面管控；4. 需要满足等保三级和数据安全合规要求。",
        solution: "部署专线卫士数据防泄露(DLP)系统，建立患者数据分类分级和保护机制。",
        solutionDetail: "1. 部署专线卫士DLP系统，对邮件、Web上传、即时通讯、移动存储、打印等所有数据外发渠道进行监控；2. 建立患者数据分类分级标准，对患者姓名、身份证号、病历信息等敏感数据进行标识和加密；3. 配置数据外发审批流程，包含敏感信息的文件外发需经科室主任审批；4. 开展数据安全培训，提升医护人员数据保护意识；5. 建立数据安全审计机制，对所有数据操作进行记录和审计。",
        process: ["数据梳理：对患者数据进行全面梳理，建立数据资产清单", "分类分级：制定患者数据分类分级标准", "部署实施：部署专线卫士DLP系统，配置防护策略", "试点运行：选择2个科室进行试点，优化策略", "全面推广：在全院推广部署，开展培训"],
        result: "成功阻止15起数据外发风险事件，患者隐私数据0泄露，通过等保三级测评和数据安全评估。",
        review: "专线卫士的数据防泄露系统帮助我们建立了规范的数据安全管理体系，特别是数据标识和加密功能，确保了患者隐私数据的安全。现在我们对数据安全合规更有信心了。"
    },

    {
        id: "med-003",
        title: "某县级医院远程访问安全案例",
        scenario: "medical",
        scenarioName: "医疗行业",
        summary: "某县级医院通过专线卫士安全VPN系统，实现100+医生远程安全访问医院系统，0安全事件，医生工作效率提升30%。",
        background: "某县级医院在为提升医疗服务水平，需要支持医生远程查阅病历、开具处方、查看检查结果等。传统的VPN方案存在安全隐患，且管理复杂。医院需要一种安全、便捷、易管理的远程访问方案。",
        challenge: "1. 远程访问需要保证数据安全，防止数据泄露；2. 医生使用的设备多样化（手机、平板、电脑），需要支持多平台；3. 医生技术水平参差不齐，需要简单易用；4. 需要满足等保二级合规要求。",
        solution: "部署专线卫士安全VPN系统，启用多因素认证和端点安全评估。",
        solutionDetail: "1. 部署专线卫士安全VPN系统，支持手机、平板、电脑多平台接入；2. 启用多因素认证（用户名密码+短信验证码），提升认证安全性；3. 启用端点安全评估，检查接入设备是否安装杀毒软件、是否更新补丁等；4. 配置访问控制策略，不同角色医生只能访问授权的系统；5. 启用会话监控和审计，记录所有远程访问行为。",
        process: ["需求分析：了解医生远程访问需求和现有问题", "方案设计：制定远程访问安全方案", "部署实施：部署专线卫士安全VPN系统", "试点测试：选择部分医生进行试点测试", "全面推广：全院推广，开展使用培训"],
        result: "100+医生实现安全远程访问，0安全事件，医生工作效率提升30%，患者满意度显著提升。",
        review: "专线卫士的安全VPN系统非常好用，安装简单，连接快速，安全性高。现在我可以随时随地处理医疗业务，工作效率大大提升，患者等待时间也缩短了。"
    },

    {
        id: "edu-001",
        title: "某高校校园网数据防泄露案例",
        scenario: "education",
        scenarioName: "教育行业",
        summary: "某高校通过专线卫士数据防泄露方案，实现科研数据和学生隐私数据全面保护，成功阻止8起数据泄露风险事件。",
        background: "某高校拥有3万余名师生，校园网承载教学、科研、管理等重要业务。学校拥有大量科研项目数据和学生个人信息，数据安全防护要求高。2023年，某相邻高校发生学生数据泄露事件，该校决定加强数据安全防护。",
        challenge: "1. 学生个人信息保护要求高，需符合《个人信息保护法》要求；2. 科研数据涉及知识产权，需要重点保护；3. 校园网用户多、设备多，数据外发渠道复杂；4. 需要满足等保二级合规要求。",
        solution: "部署专线卫士数据防泄露(DLP)系统，建立数据分类分级保护机制。",
        solutionDetail: "1. 部署专线卫士DLP系统，对邮件、Web上传、云存储、移动存储等渠道进行监控；2. 建立数据分类分级标准，对学生信息、科研数据、财务数据等进行标识和加密；3. 配置数据外发审批流程，重要数据外发需经审批；4. 开展数据安全培训，提升师生数据保护意识；5. 建立数据安全审计机制。",
        process: ["数据梳理：对学校数据资产进行全面梳理", "方案设计：制定数据安全防护方案", "部署实施：部署专线卫士DLP系统", "培训推广：开展师生数据安全培训", "持续运营：建立常态化数据安全运营机制"],
        result: "成功阻止8起数据泄露风险事件，学生隐私数据0泄露，通过等保二级测评。",
        review: "专线卫士的数据防泄露系统帮助我们建立了规范的数据安全管理体系，特别是科研数据保护功能，有效防止了学术成果泄露。"
    },

    {
        id: "edu-002",
        title: "某省教育厅DDoS攻击防护案例",
        scenario: "education",
        scenarioName: "教育行业",
        summary: "某省教育厅高考志愿填报系统遭受DDoS攻击，通过专线卫士DDoS防护模块成功防御，保障志愿填报工作顺利完成。",
        background: "某省教育厅负责全省高考组织工作，高考志愿填报系统是社会高度关注的敏感系统。2024年6月高考志愿填报期间，系统遭受大规模DDoS攻击，峰值流量达30Gbps，导致系统响应缓慢，严重影响考生填报志愿。",
        challenge: "1. DDoS攻击流量大，需要高性能防护设备；2. 高考志愿填报时间敏感，不能长时间中断；3. 攻击发生在特殊时期，社会影响大；4. 需要快速响应和处置。",
        solution: "紧急启用专线卫士DDoS防护模块，结合云端清洗服务，实现多层防护。",
        solutionDetail: "1. 紧急启用专线卫士DDoS防护模块，对攻击流量进行实时检测和清洗；2. 联动云端清洗服务，将超大流量攻击引流到云端清洗；3. 配置防护策略，对异常流量进行限流和拦截；4. 建立7×24小时应急响应机制，确保安全事件快速处置；5. 事后优化防护策略，提升防护能力。",
        process: ["攻击发生：高考志愿填报系统遭受DDoS攻击", "紧急响应：启用专线卫士DDoS防护模块", "攻击清洗：成功清洗攻击流量，系统恢复正常", "持续优化：优化防护策略，提升防护能力", "总结评估：进行安全总结和评估，完善应急预案"],
        result: "成功防御DDoS攻击峰值30Gbps，高考志愿填报系统0中断，顺利完成志愿填报工作，获得省教育厅表彰。",
        review: "专线卫士的DDoS防护能力非常强大，在关键时刻保障了高考志愿填报系统的正常运行，得到了考生和家长的高度认可。"
    },

    {
        id: "edu-003",
        title: "某高校Web应用安全改造案例",
        scenario: "education",
        scenarioName: "教育行业",
        summary: "某高校通过专线卫士WAF模块，成功防护SQL注入和XSS攻击，保障教务系统和图书馆系统安全运行。",
        background: "某高校拥有教务系统、图书馆系统、科研管理系统等多个Web应用，面向师生提供服务。2023年安全扫描发现，多个系统存在SQL注入、XSS等安全漏洞，容易被攻击者利用。",
        challenge: "1. Web应用数量多，安全漏洞难以全面发现；2. 系统不能中断服务，需要在线防护；3. 攻击手段多样，需要全面防护；4. 需要满足等保二级要求。",
        solution: "部署专线卫士Web应用防护系统(WAF)，启用OWASP Top 10防护规则。",
        solutionDetail: "1. 在Web应用前端部署专线卫士WAF模块；2. 启用SQL注入防护规则，拦截非法SQL语句；3. 启用XSS防护规则，过滤恶意脚本；4. 启用CSRF防护规则，防止跨站请求伪造；5. 配置CC攻击防护，限制异常访问频率；6. 定期更新防护规则，应对新型攻击。",
        process: ["漏洞扫描：对Web应用进行全面安全扫描", "方案设计：制定Web应用防护方案", "部署实施：部署专线卫士WAF模块", "规则配置：配置防护规则，优化检测策略", "持续运营：定期更新规则，持续监控攻击"],
        result: "成功拦截Web攻击2000+次，Web应用0篡改、0中断，通过等保二级测评。",
        review: "专线卫士的WAF模块非常好用，部署后再也没有发生过Web应用被攻击的事件，师生对信息化服务的满意度显著提升。"
    },

    {
        id: "fin-001",
        title: "某商业银行DDoS攻击防护案例",
        scenario: "finance",
        scenarioName: "金融行业",
        summary: "某商业银行通过专线卫士DDoS防护系统，成功防御多次DDoS攻击，保障网上银行和手机银行7×24小时可用。",
        background: "某商业银行是一家区域性商业银行，拥有网上银行、手机银行、ATM网络等重要业务系统。随着互联网金融的发展，银行面临越来越多的DDoS攻击，严重影响业务连续性。2023年，该行网上银行系统多次遭受DDoS攻击，导致服务中断。",
        challenge: "1. DDoS攻击流量大，需要高性能防护设备；2. 金融业务对可用性要求高，不能长时间中断；3. 需要满足金融行业网络安全要求和等保三级要求；4. 需要快速检测和响应攻击。",
        solution: "部署专线卫士DDoS防护系统，结合云端清洗服务，实现多层、弹性防护。",
        solutionDetail: "1. 在银行数据中心出口部署专线卫士DDoS防护设备；2. 启用流量清洗功能，对攻击流量进行实时检测和清洗；3. 联动云端清洗服务，将超大流量攻击引流到云端清洗；4. 配置弹性防护策略，根据攻击规模自动调整防护资源；5. 建立7×24小时安全监控和应急响应机制。",
        process: ["需求分析：了解银行DDoS防护需求和现有问题", "方案设计：制定DDoS防护方案", "部署实施：部署专线卫士DDoS防护设备", "测试验证：进行DDoS攻击模拟测试", "持续运营：建立常态化安全运营机制"],
        result: "成功防御DDoS攻击20+次，峰值流量最高达80Gbps，网上银行可用性99.99%，通过金融行业安全评估。",
        review: "专线卫士的DDoS防护能力非常可靠，部署后再也没有发生过因DDoS攻击导致的服务中断。现在我们可以放心地开展互联网金融业务了。"
    },

    {
        id: "fin-002",
        title: "某证券公司APT攻击防御案例",
        scenario: "finance",
        scenarioName: "金融行业",
        summary: "某证券公司通过专线卫士APT检测系统，成功发现并处置长期潜伏的APT攻击，保护客户交易数据和资金安全。",
        background: "某证券公司是一家大型证券公司，拥有数百万客户，日均交易额超过百亿元。公司核心交易系统存储大量客户信息和交易数据，是黑客攻击的高价值目标。2023年安全评估中发现网络存在异常流量，疑似遭受APT攻击。",
        challenge: "1. APT攻击隐蔽性强，传统安全设备难以发现；2. 金融数据价值高，攻击动机强；3. 业务不能中断，需要在业务不中断的情况下进行处置；4. 需要满足金融行业网络安全要求。",
        solution: "部署专线卫士APT检测系统，启用流量深度分析和威胁情报联动。",
        solutionDetail: "1. 在核心交易系统前端部署专线卫士APT检测设备；2. 启用流量深度分析，对所有流量进行DPI检测；3. 接入启明星辰云端威胁情报，实时比对IOC指标；4. 部署沙箱检测系统，对可疑文件进行动态分析；5. 建立安全运营中心，实现7×24小时威胁监控与响应；6. 定期进行渗透测试，持续优化防护策略。",
        process: ["安全评估：对交易系统进行全面安全评估", "威胁发现：发现异常流量，疑似APT攻击", "方案设计：制定APT检测与处置方案", "部署实施：部署专线卫士APT检测系统", "威胁处置：成功处置APT攻击，修复安全漏洞"],
        result: "成功处置APT攻击2次，客户交易数据0泄露，通过金融行业安全评估和等保三级测评。",
        review: "专线卫士的APT检测能力超出预期，帮助我们发现了传统安全设备无法检测的隐蔽攻击。现在我们的网络安全防护能力达到了金融行业领先水平。"
    },

    {
        id: "fin-003",
        title: "某支付平台反欺诈案例",
        scenario: "finance",
        scenarioName: "金融行业",
        summary: "某支付平台通过专线卫士反欺诈系统，成功识别并拦截虚假交易和钓鱼网站，保护用户资金安全，拦截欺诈交易金额超过500万元。",
        background: "某支付平台拥有超过千万用户，日均交易笔数超过百万笔。随着业务快速发展，平台面临越来越多的金融诈骗威胁，包括钓鱼网站、虚假交易、信用卡盗刷等。2023年，平台发生多起用户资金被盗事件，引发用户投诉。",
        challenge: "1. 金融诈骗手段多样，需要智能识别；2. 交易量大，需要高性能处理；3. 误报率不能太高，避免影响正常用户；4. 需要满足金融行业合规要求。",
        solution: "部署专线卫士金融反欺诈系统，启用机器学习和大数据分析。",
        solutionDetail: "1. 部署专线卫士反欺诈系统，对接支付平台交易数据；2. 启用钓鱼网站识别功能，拦截恶意网站；3. 启用异常交易检测功能，识别虚假交易和盗刷行为；4. 启用用户行为分析，建立正常交易基线；5. 配置实时预警机制，发现可疑交易立即预警和拦截。",
        process: ["需求分析：了解支付平台反欺诈需求", "方案设计：制定金融反欺诈方案", "系统对接：对接支付平台交易数据", "规则配置：配置反欺诈规则和预警策略", "持续运营：持续优化规则，降低误报率"],
        result: "成功拦截欺诈交易金额超过500万元，误报率低于0.1%，用户满意度显著提升，通过金融行业安全评估。",
        review: "专线卫士的反欺诈系统非常智能，能够准确识别各种金融诈骗行为，误报率很低。现在我们用户的资金安全得到了有效保障。"
    },

    {
        id: "ent-001",
        title: "某大型企业集团数据防泄露案例",
        scenario: "enterprise",
        scenarioName: "企业办公",
        summary: "某大型企业集团通过专线卫士数据防泄露系统，实现商业机密全面保护，成功阻止12起数据外发风险事件，商业机密0泄露。",
        background: "某大型企业集团拥有员工上万人，业务范围涵盖多个领域，拥有大量商业机密和核心技术。随着数字化转型的推进，企业数据安全风险日益突出。2023年，企业发生一起疑似商业机密泄露事件，虽然未造成实质性损失，但引起了管理层的高度重视。",
        challenge: "1. 商业机密价值高，泄露后果严重；2. 员工数量多，数据外发渠道复杂；3. 业务需要正常使用数据，不能影响效率；4. 需要满足等保二级要求。",
        solution: "部署专线卫士数据防泄露(DLP)系统，建立数据分类分级保护机制。",
        solutionDetail: "1. 部署专线卫士DLP系统，对邮件、Web上传、即时通讯、移动存储、打印等所有数据外发渠道进行监控；2. 建立企业数据分类分级标准，对商业机密、核心技术、财务数据等进行标识和加密；3. 配置数据外发审批流程，包含敏感信息的文件外发需经审批；4. 开展数据安全培训；5. 建立数据安全审计机制。",
        process: ["数据梳理：对企业数据资产进行全面梳理", "分类分级：制定企业数据分类分级标准", "部署实施：部署专线卫士DLP系统", "培训推广：开展员工数据安全培训", "持续运营：建立常态化数据安全运营机制"],
        result: "成功阻止12起数据外发风险事件，商业机密0泄露，通过等保二级测评。",
        review: "专线卫士的数据防泄露系统帮助我们建立了规范的数据安全管理体系，有效保护了企业的核心资产。现在我们对企业数据安全更有信心了。"
    },

    {
        id: "ent-002",
        title: "某制造企业远程办公安全案例",
        scenario: "enterprise",
        scenarioName: "企业办公",
        summary: "某制造企业通过专线卫士安全VPN系统，实现2000+员工远程安全办公，0安全事件，工作效率提升25%。",
        background: "某制造企业拥有多个生产基地和研发中心，员工分布在全国各地。受疫情影响，企业大量员工需要远程办公，访问公司内部系统。传统VPN方案存在安全隐患，且性能不足，无法满足大规模远程办公需求。",
        challenge: "1. 远程办公人员多，需要高性能VPN系统；2. 需要保证数据安全，防止数据泄露；3. 员工使用的设备多样化，需要支持多平台；4. 需要满足等保二级要求。",
        solution: "部署专线卫士安全VPN系统，启用多因素认证和端点安全评估。",
        solutionDetail: "1. 部署专线卫士安全VPN系统，支持2000+并发连接；2. 启用多因素认证，提升认证安全性；3. 启用端点安全评估，检查接入设备安全状况；4. 配置访问控制策略，不同角色员工只能访问授权系统；5. 启用会话监控和审计。",
        process: ["需求分析：了解远程办公安全需求", "方案设计：制定远程办公安全方案", "部署实施：部署专线卫士安全VPN系统", "试点测试：选择部分员工进行试点", "全面推广：全公司推广，开展培训"],
        result: "2000+员工实现安全远程办公，0安全事件，工作效率提升25%。",
        review: "专线卫士的安全VPN系统性能强大，连接稳定，安全性高。现在我们的员工可以随时随地安全工作，工作效率大大提升。"
    },

    {
        id: "ent-003",
        title: "某零售企业DDoS攻击防护案例",
        scenario: "enterprise",
        scenarioName: "企业办公",
        summary: "某零售企业通过专线卫士DDoS防护系统，成功防御黑色星期五期间的DDoS攻击，保障在线销售0中断，销售额同比增长20%。",
        background: "某零售企业是国内知名零售品牌，拥有线上商城和线下门店。每年黑色星期五、双十一等促销活动期间，线上商城面临巨大的流量压力，同时也容易成为DDoS攻击的目标。2023年黑色星期五期间，企业线上商城遭受DDoS攻击，导致服务中断2小时，造成重大经济损失。",
        challenge: "1. 促销活动期间流量大，需要高性能防护；2. DDoS攻击会导致直接经济损失；3. 需要快速响应和处置；4. 防护成本不能太高。",
        solution: "部署专线卫士DDoS防护系统，结合云端清洗服务，实现弹性防护。",
        solutionDetail: "1. 在数据中心出口部署专线卫士DDoS防护设备；2. 联动云端清洗服务，将超大流量攻击引流到云端清洗；3. 配置弹性防护策略，根据攻击规模自动调整防护资源；4. 在促销活动前进行全面安全检查和压力测试；5. 建立7×24小时应急响应机制。",
        process: ["需求分析：了解在线销售DDoS防护需求", "方案设计：制定DDoS防护方案", "部署实施：部署专线卫士DDoS防护系统", "压力测试：进行压力测试，验证防护能力", "持续运营：建立常态化安全运营机制"],
        result: "成功防御DDoS攻击峰值100Gbps，在线销售0中断，黑色星期五销售额同比增长20%。",
        review: "专线卫士的DDoS防护能力非常可靠，在关键时刻保障了我们的在线销售业务。现在我们可以放心地开展促销活动了。"
    },

    {
        id: "city-001",
        title: "某智慧城市物联网设备安全认证案例",
        scenario: "smart-city",
        scenarioName: "智慧城市",
        summary: "某智慧城市通过专线卫士物联网安全系统，实现10万+物联网设备安全认证和管理，设备0被劫持，城市安全管理效率提升50%。",
        background: "某智慧城市项目涵盖智能交通、环境监测、公共安全等多个领域，部署了超过10万个物联网设备，包括摄像头、传感器、智能路灯等。由于物联网设备数量庞大、类型多样、分布广泛，安全管理面临巨大挑战。2023年，某相邻城市发生物联网设备被劫持参与DDoS攻击的事件，引起了该市的高度重视。",
        challenge: "1. 物联网设备数量庞大，难以全面管理；2. 设备类型多样，安全能力参差不齐；3. 设备分布广泛，物理安全难以保障；4. 需要满足等保三级要求。",
        solution: "部署专线卫士物联网安全系统，建立设备身份认证和异常行为监控机制。",
        solutionDetail: "1. 部署专线卫士物联网安全系统，对所有物联网设备进行身份认证；2. 建立设备指纹库，识别合法设备和非法设备；3. 启用异常行为监控，检测设备异常流量和异常行为；4. 配置设备访问控制策略，限制设备网络访问权限；5. 建立物联网安全运营中心，实现7×24小时监控。",
        process: ["设备盘点：对全市物联网设备进行全面盘点", "方案设计：制定物联网安全防护方案", "部署实施：部署专线卫士物联网安全系统", "设备认证：对所有物联网设备进行身份认证", "持续运营：建立常态化物联网安全运营机制"],
        result: "10万+物联网设备实现安全认证和管理，设备0被劫持，城市安全管理效率提升50%，通过等保三级测评。",
        review: "专线卫士的物联网安全系统帮助我们解决了物联网设备管理的难题，特别是设备身份认证功能，确保了只有合法设备才能接入网络。"
    },

    {
        id: "city-002",
        title: "某智慧城市视频监控安全案例",
        scenario: "smart-city",
        scenarioName: "智慧城市",
        summary: "某智慧城市通过专线卫士物联网安全方案，实现视频监控设备全面安全防护，成功阻止5起摄像头被劫持事件，保障城市安全。",
        background: "某智慧城市拥有超过5万个视频监控摄像头，覆盖主要道路、公共场所和重点区域。视频监控数据是城市安全管理的重要基础，但摄像头容易被黑客攻击和劫持，成为安全隐患。2023年，某城市发生摄像头被劫持参与DDoS攻击的事件，引起了该市的高度重视。",
        challenge: "1. 摄像头数量多、分布广，安全管理难度大；2. 摄像头安全能力弱，容易被攻击；3. 视频监控数据敏感，需要保护；4. 需要满足等保三级要求。",
        solution: "部署专线卫士物联网安全系统，建立视频监控设备安全防护机制。",
        solutionDetail: "1. 部署专线卫士物联网安全系统，对所有摄像头进行身份认证；2. 启用固件安全检测，及时发现摄像头安全漏洞；3. 启用异常行为监控，检测摄像头异常流量和异常行为；4. 配置摄像头访问控制策略，限制摄像头网络访问权限；5. 建立视频数据加密机制，保护视频数据的安全。",
        process: ["设备盘点：对所有摄像头进行全面盘点", "漏洞扫描：对摄像头进行安全漏洞扫描", "方案设计：制定视频监控安全防护方案", "部署实施：部署专线卫士物联网安全系统", "持续运营：建立常态化安全运营机制"],
        result: "成功阻止5起摄像头被劫持事件，视频监控数据0泄露，城市安全管理效率提升50%。",
        review: "专线卫士的物联网安全系统帮助我们建立了完善的视频监控安全防护体系，现在我们的城市安全管理更有保障了。"
    },

    {
        id: "city-003",
        title: "某智慧城市数据共享平台安全案例",
        scenario: "smart-city",
        scenarioName: "智慧城市",
        summary: "某智慧城市通过专线卫士数据防泄露和APT检测系统，实现跨部门数据共享安全，0泄露事件，通过等保三级测评。",
        background: "某智慧城市建设项目中，建立了统一的数据共享平台，实现公安、交通、环保、城管等部门的数据共享和协同。数据共享提升了城市管理效率，但也带来了数据安全风险。2023年，某相邻城市发生数据共享平台被攻击的事件，引起了该市的高度重视。",
        challenge: "1. 数据共享涉及多个部门，安全边界复杂；2. 数据敏感度高，需要重点保护；3. 面临APT攻击威胁，需要高级防护能力；4. 需要满足等保三级要求。",
        solution: "部署专线卫士数据防泄露和APT检测系统，建立数据共享安全防护体系。",
        solutionDetail: "1. 部署专线卫士数据防泄露系统，对数据共享平台的所有数据操作进行监控和审计；2. 部署专线卫士APT检测系统，对平台流量进行深度分析和威胁检测；3. 建立数据分类分级标准，对不同敏感级别的数据采取不同的防护措施；4. 配置数据访问控制策略，实现细粒度访问控制；5. 建立安全运营中心，实现7×24小时监控。",
        process: ["需求分析：了解数据共享平台安全需求", "方案设计：制定数据共享安全防护方案", "部署实施：部署专线卫士安全系统", "策略配置：配置数据防泄露和APT检测策略", "持续运营：建立常态化安全运营机制"],
        result: "数据共享0泄露事件，成功防御APT攻击尝试，通过等保三级测评，获得住建部表彰。",
        review: "专线卫士的数据防泄露和APT检测系统帮助我们建立了强大的数据共享安全防护体系，现在我们可以安全地开展跨部门数据共享了。"
    }

];


// 初始化防护能力页面
// 初始化防护能力页面 - 优化版
function initSolutions() {
    const solutionsList = document.getElementById('solutions-list');
    if (!solutionsList) return;
    
    solutionsList.innerHTML = '';
    solutionsList.className = 'solutions-grid-tech';
    
    solutions.forEach(solution => {
        const card = document.createElement('div');
        card.className = 'solution-card-tech';
        card.innerHTML = `
            <div class="solution-icon-wrapper-tech">
                <div class="solution-icon-large-tech">${solution.icon}</div>
            </div>
            <div class="solution-info-tech">
                <h3>${solution.name}</h3>
                <p class="solution-desc-tech">${solution.desc}</p>
                <div class="solution-features-grid-tech">
                    ${solution.features.map(f => `
                        <div class="feature-pill-tech">
                            <span class="feature-check-small-tech">✓</span>
                            <span>${f}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        solutionsList.appendChild(card);
    });
}

// 初始化典型案例页面 - 优化版
function initCases() {
    const casesList = document.getElementById('cases-list');
    if (!casesList) return;
    
    casesList.innerHTML = '';
    casesList.className = 'cases-grid-tech';
    
    allCases.forEach(caseItem => {
        const card = document.createElement('div');
        card.className = 'case-card-full-tech';
        card.innerHTML = `
            <div class="case-card-header-tech">
                <span class="case-scenario-icon-tech">${getScenarioIcon(caseItem.scenario)}</span>
                <div class="case-card-meta-tech">
                    <span class="case-scenario-badge-tech">${caseItem.scenarioName}</span>
                </div>
            </div>
            <div class="case-card-body-tech">
                <h4>${caseItem.title}</h4>
                <p class="case-summary-tech">${caseItem.summary.substring(0, 80)}...</p>
            </div>
            <div class="case-card-footer-tech">
                <button class="case-view-btn-tech" onclick="viewCase('${caseItem.id}')">
                    查看详情
                    <span>→</span>
                </button>
            </div>
        `;
        casesList.appendChild(card);
    });
}

// 查看案例详情
// 查看案例详情 - 优化版
// 查看案例详情 - 优化版
function viewCaseDetail(caseId) {
    const caseItem = allCases.find(c => c.id === caseId);
    if (!caseItem) return;
    
    // 显示在案例详情页
    const caseDetailContent = document.getElementById('case-detail-content');
    if (!caseDetailContent) return;
    
    caseDetailContent.innerHTML = `
        <div class="case-detail-tech">
            <!-- 案例头部 -->
            <div class="case-detail-header-tech">
                <div class="case-detail-icon-tech">${getScenarioIcon(caseItem.scenario)}</div>
                <div class="case-detail-title-tech">
                    <h2>${caseItem.title}</h2>
                    <div class="case-detail-meta-tech">
                        <span class="case-scenario-badge-tech">${caseItem.scenarioName}</span>
                        <span class="case-id-tech">ID: ${caseItem.id}</span>
                    </div>
                </div>
            </div>
            
            <!-- 案例背景 -->
            <div class="case-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">📋</span>
                    <h3>案例背景</h3>
                </div>
                <div class="section-content-tech">
                    <p>${caseItem.background || '该案例来自' + caseItem.scenarioName + '，展示了专线卫士在实际场景中的应用效果。'}</p>
                </div>
            </div>
            
            <!-- 安全挑战 -->
            <div class="case-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">⚠️</span>
                    <h3>安全挑战</h3>
                </div>
                <div class="section-content-tech">
                    <div class="challenge-box-tech">
                        <p>${caseItem.challenge || caseItem.summary}</p>
                    </div>
                </div>
            </div>
            
            <!-- 解决方案 -->
            <div class="case-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">🔧</span>
                    <h3>解决方案</h3>
                </div>
                <div class="section-content-tech">
                    <p>${caseItem.solutionDetail || caseItem.solution}</p>
                </div>
            </div>
            
            <!-- 实施过程 -->
            <div class="case-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">📊</span>
                    <h3>实施过程</h3>
                </div>
                <div class="section-content-tech">
                    <div class="process-timeline-tech">
                        ${(caseItem.process || ['需求分析', '方案设计', '部署实施', '测试验收']).map((p, idx) => `
                            <div class="timeline-item-tech">
                                <div class="timeline-marker-tech">${idx + 1}</div>
                                <div class="timeline-content-tech">
                                    <p>${p}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- 实施效果 -->
            <div class="case-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">✅</span>
                    <h3>实施效果</h3>
                </div>
                <div class="section-content-tech">
                    <div class="result-box-tech">
                        <p>${caseItem.result}</p>
                    </div>
                </div>
            </div>
            
            <!-- 客户评价 -->
            <div class="case-section-tech">
                <div class="section-header-tech">
                    <span class="section-icon-tech">💬</span>
                    <h3>客户评价</h3>
                </div>
                <div class="section-content-tech">
                    <div class="review-card-tech">
                        <div class="review-quote-tech">"</div>
                        <p class="review-text-tech">${caseItem.review || '专线卫士帮助我们有效提升了安全防护能力，值得推荐！'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 切换到案例详情页
    switchTab('case-detail');
}

// 获取场景图标
function getScenarioIcon(scenarioId) {
    const scenario = scenarios.find(s => s.id === scenarioId);
    return scenario ? scenario.icon : '📁';
}



// 加载历史分析记录
function loadAnalysisHistory() {
    const historyList = document.getElementById('history-list');
    const historyStats = document.getElementById('history-stats');
    if (!historyList) return;
    
    // 从localStorage加载历史记录
    const history = JSON.parse(localStorage.getItem('logAnalysisHistory') || '[]');
    
    // 更新统计信息
    if (historyStats) {
        const totalRecords = history.length;
        const highRiskCount = history.filter(h => h.riskLevel === '高危').length;
        const mediumRiskCount = history.filter(h => h.riskLevel === '中危').length;
        const lowRiskCount = history.filter(h => h.riskLevel === '低危' || h.riskLevel === '安全').length;
        
        historyStats.innerHTML = `
            <div class="stats-item-tech">
                <span class="stats-icon-tech">📊</span>
                <span class="stats-text-tech">共 ${totalRecords} 条记录</span>
            </div>
            <div class="stats-item-tech">
                <span class="stats-dot-tech high"></span>
                <span class="stats-text-tech">高危 ${highRiskCount}</span>
            </div>
            <div class="stats-item-tech">
                <span class="stats-dot-tech medium"></span>
                <span class="stats-text-tech">中危 ${mediumRiskCount}</span>
            </div>
            <div class="stats-item-tech">
                <span class="stats-dot-tech low"></span>
                <span class="stats-text-tech">低危/安全 ${lowRiskCount}</span>
            </div>
        `;
    }
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="no-history-tech"><div class="no-history-icon-tech">📭</div><p>暂无历史分析记录</p><p class="no-history-hint-tech">上传日志文件后，分析结果将自动保存在此处</p></div>';
        return;
    }
    
    let historyHTML = '';
    history.forEach((item, index) => {
        // 计算漏洞总数
        const vulnCount = item.vulnerabilities ? item.vulnerabilities.length : 0;
        const totalVulnCount = item.vulnerabilities ? item.vulnerabilities.reduce((sum, v) => sum + v.count, 0) : 0;
        
        // 格式化文件大小
        const fileSizeStr = item.fileSize ? (item.fileSize > 1024 * 1024 ? (item.fileSize / (1024 * 1024)).toFixed(2) + ' MB' : (item.fileSize / 1024).toFixed(2) + ' KB') : '未知';
        
        // 格式化时间
        let timeStr = item.analysisTime || '未知时间';
        
        historyHTML += `
            <div class="history-item-tech" onclick="viewHistoryDetail(${index})">
                <div class="history-item-left-tech">
                    <div class="history-icon-wrapper-tech">
                        <span class="history-icon-small-tech">📊</span>
                    </div>
                    <div class="history-info-tech">
                        <h5 class="history-filename-tech" title="${item.fileName}">${item.fileName}</h5>
                        <div class="history-meta-row-tech">
                            <span class="history-meta-tech">📅 ${timeStr}</span>
                            <span class="history-meta-tech">📦 ${fileSizeStr}</span>
                            ${item.totalLines ? `<span class="history-meta-tech">📄 ${item.totalLines} 行</span>` : ''}
                        </div>
                        <div class="history-meta-row-tech">
                            <span class="history-meta-tech">🔍 发现 ${vulnCount} 类漏洞，共 ${totalVulnCount} 次攻击</span>
                        </div>
                    </div>
                </div>
                <div class="history-item-right-tech">
                    <div class="history-risk-tech">
                        <span class="risk-badge-small-tech ${item.riskLevel === '高危' ? 'high' : item.riskLevel === '中危' ? 'medium' : item.riskLevel === '低危' ? 'low' : 'safe'}">${item.riskLevel}</span>
                    </div>
                    <div class="history-score-tech">
                        <span class="score-value-small-tech ${item.riskScore >= 70 ? 'high' : item.riskScore >= 40 ? 'medium' : 'low'}">${item.riskScore}</span>
                        <span class="score-label-small-tech">分</span>
                    </div>
                    <button class="history-delete-btn-tech" onclick="event.stopPropagation(); deleteHistoryItem(${index})" title="删除此记录">✕</button>
                </div>
            </div>
        `;
    });
    
    historyList.innerHTML = historyHTML;
}

// 保存分析记录到历史
function saveAnalysisHistory(result) {
    // 从localStorage加载历史记录
    const history = JSON.parse(localStorage.getItem('logAnalysisHistory') || '[]');
    
    // 添加新记录 - 保存所有必要字段
    history.unshift({
        fileName: result.fileName,
        fileSize: result.fileSize,
        totalLines: result.totalLines,
        analysisTime: result.analysisTime,
        riskLevel: result.riskLevel,
        riskScore: result.riskScore,
        vulnerabilities: result.vulnerabilities,
        recommendations: result.recommendations || [],
        suspiciousEvents: result.suspiciousEvents || []
    });
    
    // 只保留最近50条记录（从10条增加到50条）
    if (history.length > 50) {
        history.splice(50);
    }
    
    // 保存回localStorage
    localStorage.setItem('logAnalysisHistory', JSON.stringify(history));
    
    // 重新加载历史记录显示
    loadAnalysisHistory();
}

// 查看历史记录详情
function viewHistoryDetail(index) {
    // 从localStorage加载历史记录
    const history = JSON.parse(localStorage.getItem('logAnalysisHistory') || '[]');
    
    if (index >= 0 && index < history.length) {
        const item = history[index];
        displayAnalysisResult(item);
        // 滚动到分析结果区域
        const analysisResult = document.getElementById('analysis-result');
        if (analysisResult) {
            analysisResult.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// 删除单条历史记录
function deleteHistoryItem(index) {
    if (!confirm('确定要删除这条分析记录吗？')) return;
    
    const history = JSON.parse(localStorage.getItem('logAnalysisHistory') || '[]');
    
    if (index >= 0 && index < history.length) {
        history.splice(index, 1);
        localStorage.setItem('logAnalysisHistory', JSON.stringify(history));
        loadAnalysisHistory();
        alert('记录已删除');
    }
}

// 清空所有历史记录
function clearAllHistory() {
    const history = JSON.parse(localStorage.getItem('logAnalysisHistory') || '[]');
    if (history.length === 0) {
        alert('当前没有历史记录可清空');
        return;
    }
    
    if (!confirm(`确定要清空所有历史记录吗？\n共 ${history.length} 条记录将被删除，此操作不可恢复！`)) return;
    
    localStorage.removeItem('logAnalysisHistory');
    loadAnalysisHistory();
    alert('所有历史记录已清空');
}

// 导出历史记录为JSON文件
function exportAnalysisHistory() {
    const history = JSON.parse(localStorage.getItem('logAnalysisHistory') || '[]');
    
    if (history.length === 0) {
        alert('没有历史记录可导出');
        return;
    }
    
    // 生成Word兼容的HTML文档
    let html = generateAnalysisWordDocument(history);
    
    // 创建Blob并触发下载
    const blob = new Blob(['\ufeff' + html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `日志分析历史记录_${new Date().toISOString().slice(0,10)}.doc`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
    
    alert(`成功导出 ${history.length} 条分析记录（Word格式）`);
}

// 生成分析记录的Word文档HTML
function generateAnalysisWordDocument(history) {
    const now = new Date().toLocaleString();
    let rows = '';
    
    history.forEach((item, idx) => {
        const vulnList = (item.vulnerabilities || []).map(v => 
            `<tr>
                <td style="padding:6px 10px;border:1px solid #ddd;">${v.type}</td>
                <td style="padding:6px 10px;border:1px solid #ddd;text-align:center;">${v.count}</td>
                <td style="padding:6px 10px;border:1px solid #ddd;">${v.severity === 'high' ? '高危' : v.severity === 'medium' ? '中危' : '低危'}</td>
                <td style="padding:6px 10px;border:1px solid #ddd;">${v.description || ''}</td>
            </tr>`
        ).join('');
        
        const recList = (item.recommendations || []).map(r => 
            `<p style="margin:4px 0;padding-left:16px;">• ${r}</p>`
        ).join('');
        
        const fileSizeStr = item.fileSize ? (item.fileSize > 1024 * 1024 ? (item.fileSize / (1024*1024)).toFixed(2) + ' MB' : (item.fileSize/1024).toFixed(2) + ' KB') : '未知';
        
        const riskColor = item.riskLevel === '高危' ? '#ff4d4d' : item.riskLevel === '中危' ? '#ffa300' : item.riskLevel === '低危' ? '#00d4ff' : '#00ff88';
        
        rows += `
        <tr>
            <td colspan="4" style="padding:16px;background:#f0f8ff;border:2px solid #00aaff;">
                <h2 style="margin:0 0 12px 0;color:#003366;font-size:16px;">📊 分析记录 #${idx+1} — ${item.fileName || '未知文件'}</h2>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;margin-bottom:12px;border-collapse:collapse;">
                    <tr>
                        <td style="padding:4px 8px;color:#666;width:80px;"><strong>文件名：</strong></td>
                        <td style="padding:4px 8px;">${item.fileName || '未知'}</td>
                        <td style="padding:4px 8px;color:#666;width:80px;"><strong>文件大小：</strong></td>
                        <td style="padding:4px 8px;">${fileSizeStr}</td>
                    </tr>
                    <tr>
                        <td style="padding:4px 8px;color:#666;"><strong>分析时间：</strong></td>
                        <td style="padding:4px 8px;">${item.analysisTime || '未知'}</td>
                        <td style="padding:4px 8px;color:#666;"><strong>日志行数：</strong></td>
                        <td style="padding:4px 8px;">${item.totalLines || '未知'}</td>
                    </tr>
                    <tr>
                        <td style="padding:4px 8px;color:#666;"><strong>风险等级：</strong></td>
                        <td style="padding:4px 8px;"><span style="color:${riskColor};font-weight:bold;">${item.riskLevel || '未知'}</span></td>
                        <td style="padding:4px 8px;color:#666;"><strong>风险评分：</strong></td>
                        <td style="padding:4px 8px;"><span style="font-size:16px;font-weight:bold;color:${riskColor};">${item.riskScore != null ? item.riskScore : '—'}</span> / 100</td>
                    </tr>
                </table>
                
                ${(item.vulnerabilities || []).length > 0 ? `
                <h3 style="margin:12px 0 6px 0;color:#cc3300;font-size:13px;">🔍 检测到的漏洞（共 ${item.vulnerabilities.length} 类）</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;border-collapse:collapse;border:1px solid #ddd;">
                    <tr style="background:#ffe6e6;color:#cc3300;font-weight:bold;">
                        <td style="padding:6px 10px;border:1px solid #ddd;">漏洞类型</td>
                        <td style="padding:6px 10px;border:1px solid #ddd;text-align:center;">攻击次数</td>
                        <td style="padding:6px 10px;border:1px solid #ddd;text-align:center;">危险等级</td>
                        <td style="padding:6px 10px;border:1px solid #ddd;">描述</td>
                    </tr>
                    ${vulnList}
                </table>
                ` : '<p style="color:green;font-weight:bold;">✅ 未检测到安全威胁</p>'}
                
                ${(item.recommendations || []).length > 0 ? `
                <h3 style="margin:12px 0 6px 0;color:#006600;font-size:13px;">💡 推荐防护方案</h3>
                <div style="background:#f0fff0;padding:8px 12px;border-radius:6px;border:1px solid #c0ffc0;">
                    ${recList}
                </div>
                ` : ''}
            </td>
        </tr>`;
    });
    
    // 统计汇总
    const totalRecords = history.length;
    const highRisk = history.filter(h => h.riskLevel === '高危').length;
    const mediumRisk = history.filter(h => h.riskLevel === '中危').length;
    const lowRisk = history.filter(h => h.riskLevel === '低危' || h.riskLevel === '安全').length;
    const totalVulns = history.reduce((sum, h) => sum + (h.vulnerabilities ? h.vulnerabilities.length : 0), 0);
    
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>日志分析历史记录</title>
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        body { font-family: 'Microsoft YaHei', '微软雅黑', SimSun, Arial, sans-serif; font-size: 12px; }
        table { border-collapse: collapse; }
        .header { background: #003366; color: white; padding: 20px; }
        .summary-table td { padding: 8px 12px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin:0 0 8px 0;font-size:22px;">🛡️ 专线卫士 — 日志分析历史报告</h1>
        <p style="margin:0;opacity:0.8;">导出时间：${now} ｜ 共 ${totalRecords} 条分析记录</p>
    </div>
    
    <div style="padding:16px;">
        <h2 style="color:#003366;font-size:14px;margin:0 0 10px 0;">📈 汇总统计</h2>
        <table class="summary-table" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse;margin-bottom:20px;">
            <tr style="background:#f0f8ff;">
                <td style="padding:8px 12px;border:1px solid #ccc;"><strong>总分析次数</strong></td>
                <td style="padding:8px 12px;border:1px solid #ccc;text-align:center;font-size:18px;font-weight:bold;color:#003366;">${totalRecords}</td>
                <td style="padding:8px 12px;border:1px solid #ccc;"><strong>高危记录</strong></td>
                <td style="padding:8px 12px;border:1px solid #ccc;text-align:center;font-size:18px;font-weight:bold;color:#ff4d4d;">${highRisk}</td>
                <td style="padding:8px 12px;border:1px solid #ccc;"><strong>中危记录</strong></td>
                <td style="padding:8px 12px;border:1px solid #ccc;text-align:center;font-size:18px;font-weight:bold;color:#ffa300;">${mediumRisk}</td>
                <td style="padding:8px 12px;border:1px solid #ccc;"><strong>低危/安全</strong></td>
                <td style="padding:8px 12px;border:1px solid #ccc;text-align:center;font-size:18px;font-weight:bold;color:#00d4ff;">${lowRisk}</td>
                <td style="padding:8px 12px;border:1px solid #ccc;"><strong>漏洞总类数</strong></td>
                <td style="padding:8px 12px;border:1px solid #ccc;text-align:center;font-size:18px;font-weight:bold;color:#cc3300;">${totalVulns}</td>
            </tr>
        </table>
        
        <h2 style="color:#003366;font-size:14px;margin:0 0 10px 0;">📋 详细分析记录</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;border-collapse:collapse;">
            ${rows}
        </table>
        
        <div style="margin-top:30px;padding:12px 16px;background:#f5f5f5;border-top:2px solid #ccc;font-size:11px;color:#666;">
            <p style="margin:0;">本报告由 <strong>专线卫士防护案例分析助手</strong> 自动生成 ｜ 中国移动 × 启明星辰联合出品</p>
            <p style="margin:4px 0 0 0;">系统地址：<a href="https://f34e6e02612b4c34bcbd09cdcfc29f58.app.codebuddy.work">https://f34e6e02612b4c34bcbd09cdcfc29f58.app.codebuddy.work</a></p>
        </div>
    </div>
</body>
</html>`;
}

// 导入历史记录从JSON文件
function importAnalysisHistory() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const importData = JSON.parse(event.target.result);
                let recordsToImport = [];
                
                // 兼容两种格式：直接数组 或 {records: [...]} 格式
                if (Array.isArray(importData)) {
                    recordsToImport = importData;
                } else if (importData.records && Array.isArray(importData.records)) {
                    recordsToImport = importData.records;
                } else {
                    alert('JSON文件格式不正确，请检查文件内容');
                    return;
                }
                
                if (recordsToImport.length === 0) {
                    alert('导入文件中没有有效记录');
                    return;
                }
                
                // 验证每条记录是否有必要字段
                const validRecords = recordsToImport.filter(r => r.fileName && r.riskLevel);
                if (validRecords.length === 0) {
                    alert('导入文件中没有有效的分析记录（缺少必要字段）');
                    return;
                }
                
                // 合并到现有记录
                const existingHistory = JSON.parse(localStorage.getItem('logAnalysisHistory') || '[]');
                const mergedHistory = [...validRecords, ...existingHistory];
                
                // 去重（按文件名和分析时间）
                const uniqueHistory = [];
                const seen = new Set();
                mergedHistory.forEach(item => {
                    const key = `${item.fileName}_${item.analysisTime}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        uniqueHistory.push(item);
                    }
                });
                
                // 限制最多保存50条
                const finalHistory = uniqueHistory.slice(0, 50);
                
                localStorage.setItem('logAnalysisHistory', JSON.stringify(finalHistory));
                loadAnalysisHistory();
                
                alert(`成功导入 ${validRecords.length} 条记录（合并后共 ${finalHistory.length} 条）`);
            } catch (err) {
                alert('文件解析失败，请确保选择的是有效的JSON文件');
                console.error('导入失败:', err);
            }
        };
        reader.readAsText(file);
    };
    
    fileInput.click();
}
