import type {
  ArticleRecord,
  DownloadItem,
  FaqItem,
  HeroSlide,
  NavItem,
  OdmCaseRecord,
  ProductCategory,
  ProductRecord,
  ServiceRecord,
  SolutionRecord,
  VideoItem,
} from '@/types/content';

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'Custom Smart Thermostat Solutions for Modern Heating Systems',
    headline:
      'Professional OEM/ODM manufacturer of WiFi thermostats, programmable thermostats, smart valves and heating control devices for smart home and HVAC applications.',
    ctaLabel: 'Read More',
    ctaHref: '/tailor-made-solution',
    visualType: 'oem',
    image: '/images/hero/slide-1.jpg',
    mobileImage: '/images/hero/slide-1-mobile.jpg',
  },
  {
    id: 'slide-2',
    eyebrow: 'Tailor-Made Heating Control Platform',
    headline:
      'BEOK Controls delivers modular thermostat hardware, PCB engineering, and connected HVAC control solutions for global distributors and brand partners.',
    ctaLabel: 'Explore Products',
    ctaHref: '/products',
    visualType: 'thermostats',
    image: '/images/hero/slide-2.jpg',
    mobileImage: '/images/hero/slide-2-mobile.jpg',
  },
  {
    id: 'slide-3',
    eyebrow: 'Multi-Zone Residential & Commercial Control',
    headline:
      'Complete heating control portfolio spanning gas boiler thermostats, underfloor heating controllers, smart radiator valves, thermal actuators and wiring centres.',
    ctaLabel: 'View Solutions',
    ctaHref: '/solutions',
    visualType: 'smart-hvac',
    image: '/images/hero/slide-1.jpg',
    mobileImage: '/images/hero/slide-2-mobile.jpg',
  },
];

export const categories: ProductCategory[] = [
  {
    slug: 'gas-boiler-thermostats',
    name: 'Gas Boiler Thermostats',
    shortName: 'Gas Boiler',
    application: 'Boiler heating',
    summary:
      'BEOK Controls gas boiler thermostats are designed for wall-hung boilers and central heating systems, supporting programmable scheduling, dry-contact relay control and wireless receiver pairings.',
    icon: 'boiler',
  },
  {
    slug: 'electric-underfloor-heating-thermostats',
    name: 'Electric Underfloor Heating Thermostats',
    shortName: 'Electric Floor',
    application: 'Electric floor heating',
    summary:
      'Engineered for electric heating mats, cables and films with dual internal/external floor sensor options, programmable weekly schedules and touch/rotary control interfaces.',
    icon: 'electric',
  },
  {
    slug: 'water-heating-thermostats',
    name: 'Water Heating Thermostats',
    shortName: 'Water Heating',
    application: 'Hydronic heating',
    summary:
      'Hydronic room thermostats built for water underfloor heating manifolds and actuator valves, balancing room comfort with multi-zone temperature control.',
    icon: 'water',
  },
  {
    slug: 'smart-radiator-valves',
    name: 'Smart Radiator Valves',
    shortName: 'Radiator Valves',
    application: 'Radiator control',
    summary:
      'Thermostatic radiator valve (TRV) controllers designed for individual room radiator regulation, schedule automation and connected gateway ecosystems.',
    icon: 'trv',
  },
  {
    slug: 'thermal-actuators',
    name: 'Thermal Actuators',
    shortName: 'Thermal Actuators',
    application: 'Manifold control',
    summary:
      'Electro-thermal manifold actuators designed for reliable open/close control of hydronic underfloor heating loops and radiator manifolds.',
    icon: 'actuator',
  },
  {
    slug: 'wiring-centres',
    name: 'Wiring Centres',
    shortName: 'Wiring Centres',
    application: 'Zone connections',
    summary:
      'Centralized multi-zone wiring centres coordinating room thermostats, thermal actuators, circulation pumps and boiler interlocks in structured hydronic systems.',
    icon: 'wiring',
  },
  {
    slug: 'smart-heating-controllers',
    name: 'Smart Heating Controllers',
    shortName: 'Smart Controllers',
    application: 'Heating control',
    summary:
      'Connected smart home and HVAC controllers supporting multi-zone orchestration, gateway integration and OEM/ODM protocol customization.',
    icon: 'controller',
  },
];

const pendingSpecs = (categoryLabel: string): [string, string][] => [
  ['Commercial Model Code', 'Pending verified BEOK model assignment'],
  ['Product Family', categoryLabel],
  ['Power Supply & Load Rating', 'To be confirmed in verified datasheet'],
  ['Control Output / Interface', 'To be confirmed per project region'],
  ['Wireless / Smart Protocol', 'Optional WiFi / RF / Zigbee — confirm per OEM brief'],
  ['Dimensions & Mounting', 'To be confirmed with mechanical drawing'],
  ['Compliance & Certifications', 'No certification files supplied yet; confirm target market'],
];

const defaultGallery = (main: string): string[] => [
  main,
  '/images/products/prod-detail-1.jpg',
  '/images/products/prod-detail-2.jpg',
  '/images/products/prod-detail-3.jpg',
];

export const products: ProductRecord[] = [
  // Gas Boiler Thermostats (4 models)
  {
    slug: 'gas-boiler-thermostats-concept',
    name: 'WiFi Gas Boiler Thermostat',
    eyebrow: 'programmable wifi boiler thermostat',
    category: 'gas-boiler-thermostats',
    application: 'Boiler heating',
    reference: 'BEOK-GB-CONCEPT-01',
    visual: 'boiler',
    variantStyle: 'white-square',
    image: '/images/products/prod-white-1.png',
    darkImage: '/images/products/dark-1.jpg',
    gallery: defaultGallery('/images/products/prod-white-1.png'),
    highlights: ['Touch LCD display layout', 'Weekly schedule concept', 'Dry-contact boiler control brief'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Discuss wall-hung gas boiler thermostat projects featuring connected app control and weekly temperature scheduling. Final electrical ratings, wiring diagrams and compliance documentation must be confirmed against approved BEOK Controls specifications.',
    specifications: pendingSpecs('Gas Boiler Thermostats'),
  },
  {
    slug: 'wireless-rf-gas-boiler-thermostat',
    name: 'Wireless RF Boiler Thermostat',
    eyebrow: 'wireless thermostat + receiver set',
    category: 'gas-boiler-thermostats',
    application: 'Boiler heating',
    reference: 'BEOK-GB-CONCEPT-02',
    visual: 'boiler',
    variantStyle: 'round-dial',
    image: '/images/products/prod-round-1.png',
    darkImage: '/images/products/dark-2.jpg',
    gallery: defaultGallery('/images/products/prod-round-1.png'),
    highlights: ['Desk stand & wall mount option', 'RF receiver pairing architecture', 'Battery / USB power brief'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Two-piece wireless boiler thermostat architecture combining a portable room controller with a boiler-side receiver for retrofit installations without rewiring. Exact RF frequency, range and relay ratings await approved datasheet confirmation.',
    specifications: pendingSpecs('Gas Boiler Thermostats'),
  },
  {
    slug: 'programmable-touch-boiler-thermostat',
    name: 'Programmable Touch Boiler Thermostat',
    eyebrow: 'glass-panel boiler heating controller',
    category: 'gas-boiler-thermostats',
    application: 'Boiler heating',
    reference: 'BEOK-GB-CONCEPT-03',
    visual: 'boiler',
    variantStyle: 'black-square',
    image: '/images/products/prod-black-1.png',
    darkImage: '/images/products/dark-3.jpg',
    gallery: defaultGallery('/images/products/prod-black-1.png'),
    highlights: ['Capacitive touch interface', 'Manual / Auto mode switching', 'OEM faceplate customization'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Slim dark-glass boiler thermostat concept built for modern residential interiors and OEM brand customization. Confirm switching voltage, enclosure color and regional wall-box dimensions during project scoping.',
    specifications: pendingSpecs('Gas Boiler Thermostats'),
  },
  {
    slug: 'rotary-knob-gas-boiler-thermostat',
    name: 'Rotary Knob Boiler Thermostat',
    eyebrow: 'tactile dial smart boiler controller',
    category: 'gas-boiler-thermostats',
    application: 'Boiler heating',
    reference: 'BEOK-GB-CONCEPT-04',
    visual: 'boiler',
    variantStyle: 'round-dial',
    image: '/images/products/prod-knob-1.png',
    darkImage: '/images/products/dark-4.jpg',
    gallery: defaultGallery('/images/products/prod-knob-1.png'),
    highlights: ['Precision rotary temperature dial', 'High-contrast LED readout', 'App & voice ecosystem brief'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Tactile rotary-dial thermostat concept designed for intuitive setpoint adjustment in gas boiler heating systems. Verified mechanical tolerances and firmware specifications will be provided upon commercial model confirmation.',
    specifications: pendingSpecs('Gas Boiler Thermostats'),
  },

  // Electric Underfloor Heating Thermostats (4 models)
  {
    slug: 'electric-underfloor-heating-thermostats-concept',
    name: 'WiFi Electric Underfloor Thermostat',
    eyebrow: 'smart electric floor heating controller',
    category: 'electric-underfloor-heating-thermostats',
    application: 'Electric floor heating',
    reference: 'BEOK-EUH-CONCEPT-01',
    visual: 'electric',
    variantStyle: 'white-square',
    image: '/images/products/prod-white-2.png',
    darkImage: '/images/products/dark-5.jpg',
    gallery: defaultGallery('/images/products/prod-white-2.png'),
    highlights: ['Air + floor NTC sensor support brief', 'High-load electric heating concept', 'Weekly 7-day programming'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Connected thermostat concept tailored for electric floor heating mats and cables with floor-temperature limiting. Exact maximum resistive current rating and sensor beta values must be verified from approved documentation.',
    specifications: pendingSpecs('Electric Underfloor Heating Thermostats'),
  },
  {
    slug: 'black-glass-electric-floor-thermostat',
    name: 'Black Glass Electric Floor Thermostat',
    eyebrow: 'flush-mount capacitive touch series',
    category: 'electric-underfloor-heating-thermostats',
    application: 'Electric floor heating',
    reference: 'BEOK-EUH-CONCEPT-02',
    visual: 'electric',
    variantStyle: 'black-square',
    image: '/images/products/prod-black-2.png',
    darkImage: '/images/products/dark-6.jpg',
    gallery: defaultGallery('/images/products/prod-black-2.png'),
    highlights: ['Dark tempered glass fascia', 'Child lock & frost protection brief', 'OEM logo silk-screen ready'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Minimalist dark-panel electric underfloor heating thermostat concept supporting OEM graphic branding and custom backlight behavior. Electrical specs require confirmation before ordering.',
    specifications: pendingSpecs('Electric Underfloor Heating Thermostats'),
  },
  {
    slug: 'rotary-electric-heating-thermostat',
    name: 'Rotary Electric Heating Thermostat',
    eyebrow: 'dial control electric floor thermostat',
    category: 'electric-underfloor-heating-thermostats',
    application: 'Electric floor heating',
    reference: 'BEOK-EUH-CONCEPT-03',
    visual: 'electric',
    variantStyle: 'round-dial',
    image: '/images/products/prod-knob-1.png',
    darkImage: '/images/products/dark-7.jpg',
    gallery: defaultGallery('/images/products/prod-knob-1.png'),
    highlights: ['Ergonomic rotary encoder', 'Dual-sensor protection logic', 'Custom UI color options'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Rotary-dial electric heating thermostat concept combining tactile manual adjustment with programmable comfort schedules. Technical specifications pending verified datasheet release.',
    specifications: pendingSpecs('Electric Underfloor Heating Thermostats'),
  },
  {
    slug: 'programmable-electric-floor-thermostat',
    name: 'Programmable Electric Floor Thermostat',
    eyebrow: 'standard digital floor heating control',
    category: 'electric-underfloor-heating-thermostats',
    application: 'Electric floor heating',
    reference: 'BEOK-EUH-CONCEPT-04',
    visual: 'electric',
    variantStyle: 'white-square',
    image: '/images/products/prod-prog-1.png',
    darkImage: '/images/products/dark-8.jpg',
    gallery: defaultGallery('/images/products/prod-prog-1.png'),
    highlights: ['Large backlit LCD display', 'Multi-period daily scheduling', 'Installer-friendly terminals'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Standalone programmable thermostat concept for residential and hospitality electric floor heating installations where local reliability is prioritized.',
    specifications: pendingSpecs('Electric Underfloor Heating Thermostats'),
  },

  // Water Heating Thermostats (4 models)
  {
    slug: 'water-heating-thermostats-concept',
    name: 'WiFi Water Underfloor Thermostat',
    eyebrow: 'hydronic room temperature controller',
    category: 'water-heating-thermostats',
    application: 'Hydronic heating',
    reference: 'BEOK-WH-CONCEPT-01',
    visual: 'water',
    variantStyle: 'white-square',
    image: '/images/products/prod-white-1.png',
    darkImage: '/images/products/dark-9.jpg',
    gallery: defaultGallery('/images/products/prod-white-1.png'),
    highlights: ['Actuator valve drive concept', 'Remote app scheduling brief', 'Multi-zone room control'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Room thermostat concept engineered for hydronic underfloor heating zones using electro-thermal actuators. Confirm actuator voltage and switching configuration with our technical team.',
    specifications: pendingSpecs('Water Heating Thermostats'),
  },
  {
    slug: 'hydronic-touch-room-thermostat',
    name: 'Hydronic Touch Room Thermostat',
    eyebrow: 'slim touch panel hydronic control',
    category: 'water-heating-thermostats',
    application: 'Hydronic heating',
    reference: 'BEOK-WH-CONCEPT-02',
    visual: 'water',
    variantStyle: 'black-square',
    image: '/images/products/prod-black-1.png',
    darkImage: '/images/products/dark-10.jpg',
    gallery: defaultGallery('/images/products/prod-black-1.png'),
    highlights: ['Capacitive touch buttons', 'Weekly energy-saving schedule', 'Compatible with wiring centres'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Dark-glass room thermostat concept for multi-room hydronic floor heating projects. Exact terminal layout and certification scope are pending verified release.',
    specifications: pendingSpecs('Water Heating Thermostats'),
  },
  {
    slug: 'wireless-hydronic-zone-thermostat',
    name: 'Wireless Hydronic Zone Thermostat',
    eyebrow: 'rf wireless room control for manifolds',
    category: 'water-heating-thermostats',
    application: 'Hydronic heating',
    reference: 'BEOK-WH-CONCEPT-03',
    visual: 'water',
    variantStyle: 'round-dial',
    image: '/images/products/prod-round-1.png',
    darkImage: '/images/products/dark-4.jpg',
    gallery: defaultGallery('/images/products/prod-round-1.png'),
    highlights: ['No wall-chase wiring needed', 'Pairs with RF wiring centre', 'Low-battery alert concept'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Wireless room sensor and thermostat concept designed for retrofit hydronic heating zones paired with multi-zone wireless receivers.',
    specifications: pendingSpecs('Water Heating Thermostats'),
  },
  {
    slug: 'programmable-water-heating-thermostat',
    name: 'Programmable Water Heating Thermostat',
    eyebrow: 'commercial & residential hydronic control',
    category: 'water-heating-thermostats',
    application: 'Hydronic heating',
    reference: 'BEOK-WH-CONCEPT-04',
    visual: 'water',
    variantStyle: 'white-square',
    image: '/images/products/prod-oem-1.png',
    darkImage: '/images/products/dark-1.jpg',
    gallery: defaultGallery('/images/products/prod-oem-1.png'),
    highlights: ['Clear segmented LCD readout', 'Frost protection & valve exercise brief', 'OEM packaging support'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Dependable programmable water heating thermostat concept suited to volume residential developments and distribution catalogs.',
    specifications: pendingSpecs('Water Heating Thermostats'),
  },

  // Smart Radiator Valves (2 models)
  {
    slug: 'smart-radiator-valves-concept',
    name: 'Zigbee Smart Radiator Valve (TRV)',
    eyebrow: 'connected thermostatic radiator valve',
    category: 'smart-radiator-valves',
    application: 'Radiator control',
    reference: 'BEOK-TRV-CONCEPT-01',
    visual: 'trv',
    variantStyle: 'valve',
    image: '/images/products/prod-trv-1.jpg',
    darkImage: '/images/products/dark-2.jpg',
    gallery: defaultGallery('/images/products/prod-trv-1.jpg'),
    highlights: ['Room-by-room radiator control', 'Gateway-connected scheduling brief', 'Multi-adapter valve ring concept'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Smart thermostatic radiator valve concept enabling independent room scheduling and remote control via compatible smart gateways. Mechanical thread adapters and battery life specifications await approved datasheets.',
    specifications: pendingSpecs('Smart Radiator Valves'),
  },
  {
    slug: 'led-wifi-radiator-valve',
    name: 'LED Digital Smart Radiator Valve',
    eyebrow: 'hidden-led display trv controller',
    category: 'smart-radiator-valves',
    application: 'Radiator control',
    reference: 'BEOK-TRV-CONCEPT-02',
    visual: 'trv',
    variantStyle: 'valve',
    image: '/images/products/prod-trv-2.png',
    darkImage: '/images/products/dark-3.jpg',
    gallery: defaultGallery('/images/products/prod-trv-2.png'),
    highlights: ['Rotary top cap & LED readout', 'Open-window detection concept', 'Child lock & boost mode brief'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Minimalist digital TRV actuator concept with rotary adjustment and bright front LED readout for residential radiator retrofits.',
    specifications: pendingSpecs('Smart Radiator Valves'),
  },

  // Thermal Actuators (2 models)
  {
    slug: 'thermal-actuators-concept',
    name: 'Normally Closed Thermal Actuator',
    eyebrow: 'manifold electro-thermal valve drive',
    category: 'thermal-actuators',
    application: 'Manifold control',
    reference: 'BEOK-ACT-CONCEPT-01',
    visual: 'actuator',
    variantStyle: 'actuator',
    image: '/images/products/prod-trv-2.png',
    darkImage: '/images/products/dark-5.jpg',
    gallery: defaultGallery('/images/products/prod-trv-2.png'),
    highlights: ['Visual stroke position indicator', 'Silent wax-element drive concept', 'Manifold ring adapter options'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Electro-thermal actuator concept for hydronic underfloor heating manifolds. Confirm operating voltage (24V / 230V), NC/NO state, stroke distance and M30x1.5 compatibility against verified product sheets.',
    specifications: pendingSpecs('Thermal Actuators'),
  },
  {
    slug: 'normally-open-thermal-actuator',
    name: 'Low-Power Manifold Thermal Actuator',
    eyebrow: 'compact 2-wire / 4-wire actuator brief',
    category: 'thermal-actuators',
    application: 'Manifold control',
    reference: 'BEOK-ACT-CONCEPT-02',
    visual: 'actuator',
    variantStyle: 'actuator',
    image: '/images/products/prod-trv-1.jpg',
    darkImage: '/images/products/dark-6.jpg',
    gallery: defaultGallery('/images/products/prod-trv-1.jpg'),
    highlights: ['Snap-on mounting ring concept', 'Optional auxiliary end-switch', 'IP-rated housing brief'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Compact thermal actuator concept designed for dense hydronic manifold cabinets and multi-zone wiring centre integration.',
    specifications: pendingSpecs('Thermal Actuators'),
  },

  // Wiring Centres (2 models)
  {
    slug: 'wiring-centres-concept',
    name: '8-Zone Hydronic Wiring Centre',
    eyebrow: 'centralized manifold control box',
    category: 'wiring-centres',
    application: 'Zone connections',
    reference: 'BEOK-WC-CONCEPT-01',
    visual: 'wiring',
    variantStyle: 'hub',
    image: '/images/products/prod-hub-1.png',
    darkImage: '/images/products/dark-7.jpg',
    gallery: defaultGallery('/images/products/prod-hub-1.png'),
    highlights: ['Multi-zone thermostat terminal bus', 'Pump & boiler interlock relay brief', 'LED zone status indicators'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Central wiring centre concept coordinating room thermostats, thermal actuators, circulation pumps and boiler demand signals. Confirm zone count, voltage and DIN-rail / wall mounting details per project.',
    specifications: pendingSpecs('Wiring Centres'),
  },
  {
    slug: 'wireless-multi-zone-wiring-centre',
    name: 'Wireless RF Multi-Zone Wiring Centre',
    eyebrow: 'rf receiver hub for hydronic zones',
    category: 'wiring-centres',
    application: 'Zone connections',
    reference: 'BEOK-WC-CONCEPT-02',
    visual: 'wiring',
    variantStyle: 'hub',
    image: '/images/products/prod-switch-1.png',
    darkImage: '/images/products/dark-8.jpg',
    gallery: defaultGallery('/images/products/prod-switch-1.png'),
    highlights: ['Pairs with wireless room thermostats', 'External antenna option brief', 'Time-delay pump protection concept'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Wireless multi-zone control hub concept simplifying hydronic underfloor heating installations where wall wiring to thermostats is impractical.',
    specifications: pendingSpecs('Wiring Centres'),
  },

  // Smart Heating Controllers (2 models)
  {
    slug: 'smart-heating-controllers-concept',
    name: 'Multi-Zone Smart Heating Hub',
    eyebrow: 'connected hvac gateway & controller',
    category: 'smart-heating-controllers',
    application: 'Heating control',
    reference: 'BEOK-SHC-CONCEPT-01',
    visual: 'controller',
    variantStyle: 'hub',
    image: '/images/products/prod-hub-1.png',
    darkImage: '/images/products/dark-9.jpg',
    gallery: defaultGallery('/images/products/prod-hub-1.png'),
    highlights: ['Centralized smart heating gateway', 'Zigbee / WiFi / BLE architecture brief', 'Cloud & OEM app ready'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Smart heating gateway and master controller concept bridging room thermostats, TRVs and wiring centres into unified mobile and BMS ecosystems.',
    specifications: pendingSpecs('Smart Heating Controllers'),
  },
  {
    slug: 'commercial-modbus-heating-controller',
    name: 'Commercial HVAC Smart Controller',
    eyebrow: 'bms-ready programmable hvac controller',
    category: 'smart-heating-controllers',
    application: 'Heating control',
    reference: 'BEOK-SHC-CONCEPT-02',
    visual: 'controller',
    variantStyle: 'black-square',
    image: '/images/products/prod-switch-2.png',
    darkImage: '/images/products/dark-10.jpg',
    gallery: defaultGallery('/images/products/prod-switch-2.png'),
    highlights: ['RS485 / Modbus protocol option brief', 'Multi-stage heating/cooling logic', 'Hotel & office keycard concept'],
    status: 'Concept placeholder — commercial model code and verified technical datasheet pending brand approval',
    description:
      'Commercial-grade smart HVAC controller concept for hotels, offices and institutional projects requiring centralized monitoring and custom firmware logic.',
    specifications: pendingSpecs('Smart Heating Controllers'),
  },
];

export const services: ServiceRecord[] = [
  {
    slug: 'smart-home-integration',
    name: 'Smart Home Integration',
    shortDesc: 'End-to-end WiFi, Zigbee, Matter-ready and cloud ecosystem integration for connected heating control brands.',
    description:
      'Integrate your thermostat and heating control lineup with leading smart home ecosystems, wireless protocols and voice platforms while maintaining reliable local heating logic.',
    icon: 'home',
    image: '/images/services/smart-home.jpg',
    deliverables: [
      'Protocol architecture selection (WiFi, Zigbee, RF433/868, RS485)',
      'Cloud platform & voice assistant integration planning',
      'Gateway pairing & multi-zone synchronization testing',
      'OTA firmware lifecycle and commissioning workflow design',
    ],
    odmExamples: [
      { slug: 'connected-gas-boiler-control-platform', title: 'Connected Gas Boiler Control Platform', subtitle: 'WiFi + RF Receiver Ecosystem', variant: 'round-dial', image: '/images/services/odm-1.png' },
      { slug: 'zigbee-multi-zone-hydronic-kit', title: 'Zigbee Multi-Zone Hydronic Kit', subtitle: 'Gateway + Room Thermostats + TRV', variant: 'hub', image: '/images/services/odm-2.png' },
      { slug: 'touch-glass-smart-home-thermostat', title: 'Touch Glass Smart Home Thermostat', subtitle: 'App & Voice Integration Concept', variant: 'black-square', image: '/images/services/odm-3.png' },
    ],
  },
  {
    slug: 'pcb-development',
    name: 'PCB Development',
    shortDesc: 'Custom mainboard schematic design, power/relay architecture, MCU firmware and EMC pre-compliance engineering.',
    description:
      'Develop tailored hardware mainboards covering power supply topologies, relay/triac outputs, dual NTC sensing, wireless RF layouts and low-power battery circuits.',
    icon: 'cpu',
    image: '/images/services/pcb.jpg',
    deliverables: [
      'Schematic capture & multi-layer PCB layout for regional safety clearances',
      'Relay, dry-contact, 0-10V or Modbus hardware interface customization',
      'Embedded MCU firmware & temperature control algorithm tuning',
      'Prototype bring-up, thermal profiling and reliability verification planning',
    ],
    odmExamples: [
      { slug: 'dual-sensor-electric-floor-mainboard', title: 'Dual-Sensor Electric Floor Mainboard', subtitle: 'High-Load Relay & Floor Limit Circuit', variant: 'white-square', image: '/images/services/odm-4.png' },
      { slug: 'ultra-low-power-battery-rf-pcb', title: 'Ultra-Low-Power Battery RF PCB', subtitle: 'Boiler Thermostat Hardware Platform', variant: 'round-dial', image: '/images/services/odm-5.png' },
      { slug: 'eight-zone-wiring-centre-control-board', title: '8-Zone Wiring Centre Control Board', subtitle: 'Actuator & Pump Interlock Architecture', variant: 'hub', image: '/images/services/odm-6.png' },
    ],
  },
  {
    slug: 'app-development',
    name: 'APP Development',
    shortDesc: 'Branded iOS/Android heating control apps, custom scheduling UI, multi-zone dashboards and installer tools.',
    description:
      'Deliver cohesive mobile and web user experiences tailored to your brand identity — from quick device onboarding and weekly heating schedules to multi-property management.',
    icon: 'smartphone',
    image: '/images/services/app.jpg',
    deliverables: [
      'White-label or custom mobile app UI/UX design for heating workflows',
      'Multi-room zoning, holiday mode and energy-usage views',
      'Device sharing, installer commissioning and fault notifications',
      'Localization framework and ongoing OS compatibility planning',
    ],
    odmExamples: [
      { slug: 'branded-smart-thermostat-mobile-app', title: 'Branded Smart Thermostat Mobile App', subtitle: 'iOS & Android Custom UI Skin', variant: 'white-square', image: '/images/services/odm-7.png' },
      { slug: 'commercial-multi-site-heating-dashboard', title: 'Commercial Multi-Site Heating Dashboard', subtitle: 'Centralized Zone Management', variant: 'black-square', image: '/images/services/odm-8.png' },
      { slug: 'quick-pair-installer-commissioning-flow', title: 'Quick-Pair Installer Commissioning Flow', subtitle: 'Bluetooth + WiFi Onboarding UX', variant: 'valve', image: '/images/services/odm-9.png' },
    ],
  },
  {
    slug: 'structural-design',
    name: 'Structural Design',
    shortDesc: 'Industrial ID styling, mechanical CAD engineering, display optics, wall-box fitment and tooling readiness.',
    description:
      'Create distinctive physical enclosures engineered for regional installation boxes (EU 86mm, UK, US/North America), accurate ambient sensing airflow and efficient mass assembly.',
    icon: 'layers',
    image: '/images/services/structural.jpg',
    deliverables: [
      'Industrial design concepts, CMF finishes and faceplate graphics',
      '3D mechanical CAD for snap-fit / screw-mount enclosures and rotary dials',
      'Airflow & thermal isolation modeling for internal temperature sensors',
      'DFM review, rapid CNC/SLA prototypes and mold-flow preparation',
    ],
    odmExamples: [
      { slug: 'rotary-multi-color-smart-thermostat-id', title: 'Rotary Multi-Color Smart Thermostat ID', subtitle: 'Precision Encoder & Bezel CAD', variant: 'round-dial', image: '/images/services/odm-10.png' },
      { slug: 'ultra-slim-flush-glass-wall-enclosure', title: 'Ultra-Slim Flush Glass Wall Enclosure', subtitle: 'EU / UK Back-Box Mechanical Fit', variant: 'black-square', image: '/images/services/odm-11.png' },
      { slug: 'ergonomic-trv-valve-housing', title: 'Ergonomic TRV Valve Housing', subtitle: 'Multi-Adapter Mechanical Collar', variant: 'valve', image: '/images/services/odm-12.png' },
    ],
  },
];

export const odmCases: OdmCaseRecord[] = services.flatMap((svc) =>
  svc.odmExamples.map((ex) => ({
    slug: ex.slug,
    title: ex.title,
    subtitle: ex.subtitle,
    serviceSlug: svc.slug,
    serviceName: svc.name,
    variant: ex.variant,
    image: ex.image,
    summary: `Concept ODM engineering case under BEOK Controls ${svc.name}: ${ex.subtitle}. Commercial electrical ratings, mechanical drawings and compliance test scope are defined against your signed project specification.`,
    scopePoints: [
      {
        label: 'Architecture & Heating Interface',
        detail: `Scoped for ${ex.subtitle} with relay, sensor or wireless interfaces confirmed during feasibility review.`,
      },
      {
        label: 'Control Logic & User Experience',
        detail: 'Supports configurable Auto/Manual scheduling, frost protection, keypad lock and brand-tailored UI behavior.',
      },
      {
        label: 'Mechanical & Regional Fitment',
        detail: 'Enclosure mounting plates, airflow sensor venting and terminal layouts tailored to target regional standards.',
      },
      {
        label: 'Validation & Documentation',
        detail: 'EVT/DVT prototype sign-off, wiring documentation and target-market compliance planning prior to mass release.',
      },
    ],
  })),
);

export const solutions: SolutionRecord[] = [
  {
    slug: 'underfloor-heating-solutions',
    name: 'Underfloor Heating Solutions',
    summary:
      'Smart thermostat solutions for electric and hydronic underfloor heating systems, featuring precise temperature control, programmable schedules and floor sensor protection.',
    description:
      'Design balanced underfloor heating control systems across residential apartments, villas and renovations. Combine room thermostats, floor-limit sensors, manifold thermal actuators and centralized wiring centres tailored to your market.',
    icon: 'grid',
    image: '/images/solutions/underfloor.jpg',
    requirements: [
      'Distinguish electric mat/cable loads versus hydronic manifold loops',
      'Confirm air + floor dual-sensor limiting for engineered wood or tile floors',
      'Specify wired 230V/24V or wireless RF zone communication architecture',
      'Align wall-box dimensions, faceplate finish and documentation language',
    ],
    recommendedCategories: ['electric-underfloor-heating-thermostats', 'water-heating-thermostats', 'wiring-centres'],
  },
  {
    slug: 'commercial-heating-control-solutions',
    name: 'Commercial Heating Control Solutions',
    summary:
      'Reliable thermostat and heating control solutions for offices, hotels, apartments and commercial buildings with centralized temperature management.',
    description:
      'Standardize room comfort and reduce energy waste across hospitality, office and multi-unit commercial buildings using lockable interfaces, occupancy schedules and BMS-ready control options.',
    icon: 'building',
    image: '/images/solutions/commercial.jpg',
    requirements: [
      'Define centralized monitoring protocol (Modbus / RS485 / cloud gateway)',
      'Specify setpoint limits, keypad/PIN lock and occupancy setback logic',
      'Confirm multi-zone hydraulic or electric load switching requirements',
      'Plan spare-parts lifecycle, commissioning guides and compliance files',
    ],
    recommendedCategories: ['smart-heating-controllers', 'wiring-centres', 'water-heating-thermostats'],
  },
  {
    slug: 'boiler-heating-solutions',
    name: 'Boiler Heating Solutions',
    summary:
      'Customized thermostat control solutions for gas boiler and water heating systems with APP control, energy-saving functions and smart temperature management.',
    description:
      'Pair wall-hung gas boilers with responsive wired or wireless RF room thermostats to prevent short-cycling, optimize daily comfort periods and simplify retrofit upgrades.',
    icon: 'flame',
    image: '/images/solutions/boiler.jpg',
    requirements: [
      'Confirm dry-contact (volt-free) or modulating boiler control interface',
      'Choose wired wall-mounted thermostat or portable wireless RF + receiver set',
      'Specify frost-protection thresholds and pump/valve exercise logic',
      'Confirm regional electrical standards and installer wiring diagrams',
    ],
    recommendedCategories: ['gas-boiler-thermostats', 'smart-radiator-valves', 'smart-heating-controllers'],
  },
  {
    slug: 'energy-saving-thermostat-solutions',
    name: 'Energy Saving Thermostat Solutions',
    summary:
      'Energy-efficient programmable thermostat solutions designed to optimize heating performance, reduce energy consumption and improve user comfort.',
    description:
      'Help residential and commercial users lower heating demand through room-by-room zoning, weekly scheduling, eco setback modes and connected radiator valve regulation.',
    icon: 'leaf',
    image: '/images/solutions/energy-saving.jpg',
    requirements: [
      'Map room-by-room heating zones and independent schedule profiles',
      'Evaluate smart TRVs and wireless thermostats for unzoned legacy buildings',
      'Define open-window detection, eco mode and holiday setback behaviors',
      'Align with regional energy-efficiency labeling requirements',
    ],
    recommendedCategories: ['smart-radiator-valves', 'gas-boiler-thermostats', 'electric-underfloor-heating-thermostats'],
  },
  {
    slug: 'smart-home-hvac-solutions',
    name: 'Smart Home HVAC Solutions',
    summary:
      'Integrated smart HVAC control systems designed for modern smart homes, supporting WiFi connectivity, voice control and intelligent automation.',
    description:
      'Unify heating, cooling and multi-room zoning into a cohesive smart home experience with intuitive wall interfaces, mobile control and gateway automation.',
    icon: 'home',
    image: '/images/solutions/smart-home.jpg',
    requirements: [
      'Select wireless ecosystem (WiFi, Zigbee gateway or multi-protocol hub)',
      'Define mobile app branding, scene triggers and multi-user permissions',
      'Ensure reliable local fallback control during internet interruptions',
      'Verify multi-language UX and regional cloud deployment needs',
    ],
    recommendedCategories: ['smart-heating-controllers', 'smart-radiator-valves', 'electric-underfloor-heating-thermostats'],
  },
  {
    slug: 'oem-odm-smart-thermostat-solutions',
    name: 'OEM/ODM Smart Thermostat Solutions',
    summary:
      'One-stop OEM/ODM customization services including ID design, PCB development, APP integration, prototyping and mass production for smart thermostat projects.',
    description:
      'Partner with BEOK Controls to build private-label or fully bespoke heating control products from initial specification brief through engineering validation and commercial launch.',
    icon: 'wrench',
    image: '/images/solutions/oem-odm.png',
    requirements: [
      'Clarify OEM private-label customization vs. full ODM hardware/tooling scope',
      'Share target market compliance needs, target unit volume and launch timeline',
      'Define packaging, user manual languages and aftermarket warranty support',
      'Establish prototype review gates before tooling and pilot production',
    ],
    recommendedCategories: ['gas-boiler-thermostats', 'electric-underfloor-heating-thermostats', 'water-heating-thermostats'],
  },
];

export const articleCategories = [
  'OEM/ODM Insights',
  'Buying Guides',
  'Smart Home & HVAC',
  'Heating Knowledge',
];

export const articles: ArticleRecord[] = [
  {
    slug: 'planning-a-thermostat-oem-project',
    title: 'How to Plan a Smart Thermostat OEM/ODM Project for Global Markets',
    category: 'OEM/ODM Insights',
    date: '2026.10.16',
    image: '/images/blog/art-1.jpg',
    excerpt:
      'Start with the heating system architecture, target market installation standards and branding scope to define realistic hardware, firmware and enclosure milestones.',
    tags: ['OEM/ODM', 'Thermostat Development', 'B2B Sourcing'],
    body: [
      'Successful OEM and ODM thermostat programs begin with a clear engineering brief rather than a generic feature checklist. Before discussing tooling or app customization, confirm which heating equipment the thermostat must control—gas boilers with volt-free relays, high-load electric underfloor heating mats, or low-current hydronic manifold actuators.',
      'Regional installation standards directly affect mechanical enclosure design. European 86×86mm or 60mm round flush boxes, UK back-boxes, and North American junction boxes require distinct mounting plates, terminal clearances, and creepage distances.',
      'Divide your specification into mandatory launch requirements (electrical load, temperature accuracy, sensor support, target market compliance) and brand differentiation (faceplate finish, rotary vs. capacitive touch UI, packaging, and white-label mobile app experience).',
    ],
  },
  {
    slug: 'thermostat-compatibility-checklist',
    title: 'B2B Smart Thermostat Buying Guide: Technical Compatibility Checklist',
    category: 'Buying Guides',
    date: '2026.10.15',
    image: '/images/blog/art-2.jpg',
    excerpt:
      'Verify power supply, relay ratings, NTC floor sensors, wall-box dimensions and certification scope before finalizing a wholesale or distributor order.',
    tags: ['Buying Guide', 'HVAC Compatibility', 'Distributors'],
    body: [
      'Selecting thermostats for distribution or HVAC contracting requires matching every electrical and mechanical detail to the target building stock. Two thermostats with identical front glass panels may house completely different internal relay architectures.',
      'Confirm five core parameters before requesting samples: supply voltage (mains AC, 24V, or battery/USB), switching load type (dry contact vs. high-current resistive load), external floor sensor resistance curve, communication protocol (WiFi, Zigbee, RF, or standalone), and applicable regional compliance files.',
      'Request verified wiring schematics and installation manuals for the exact model code under evaluation so installers can confirm compatibility on site without guesswork.',
    ],
  },
  {
    slug: 'connected-heating-projects',
    title: 'WiFi vs. Zigbee vs. RF: Choosing Connectivity for Smart Heating Systems',
    category: 'Smart Home & HVAC',
    date: '2026.10.14',
    image: '/images/blog/art-3.jpg',
    excerpt:
      'Compare direct WiFi thermostats, Zigbee gateway networks and RF wireless boiler receivers across residential retrofits and multi-zone commercial deployments.',
    tags: ['WiFi Thermostat', 'Zigbee', 'Smart Home HVAC'],
    body: [
      'Direct WiFi thermostats eliminate the need for a dedicated gateway, making them attractive for single-zone residential upgrades and retail channels. However, battery-powered devices generally perform better on low-power RF or Zigbee protocols.',
      'Zigbee architectures shine in multi-zone homes equipped with multiple smart radiator valves (TRVs) and room sensors, keeping local mesh responsiveness steady while centralizing cloud access through a single smart heating hub.',
      'RF wireless pairs remain the practical benchmark for gas boiler retrofits where routing new cable from the boiler cupboard to the living room is costly or disruptive.',
    ],
  },
  {
    slug: 'heating-zone-planning',
    title: 'Hydronic Underfloor Heating Zone Planning: Thermostats, Actuators & Wiring Centres',
    category: 'Heating Knowledge',
    date: '2026.09.22',
    image: '/images/blog/art-4.jpg',
    excerpt:
      'How room thermostats, electro-thermal manifold actuators and 8-zone wiring centres coordinate to deliver balanced multi-room hydronic heating.',
    tags: ['Underfloor Heating', 'Wiring Centre', 'Thermal Actuator'],
    body: [
      'In multi-room hydronic underfloor heating installations, individual room thermostats signal a centralized wiring centre whenever a zone falls below its target setpoint.',
      'The wiring centre energizes the corresponding thermal actuators on the manifold while coordinating boiler demand and circulation pump interlocks—preventing dead-heading when all manifold loops are closed.',
      'Documenting the number of loops per room, actuator voltage (24V vs. 230V), and normally-closed vs. normally-open logic early in project design prevents wiring mismatches during commissioning.',
    ],
  },
  {
    slug: 'enclosure-development',
    title: 'Thermostat Structural Design: Sensor Airflow, Thermal Isolation & Wall-Box Fit',
    category: 'OEM/ODM Insights',
    date: '2026.09.08',
    image: '/images/blog/art-5.jpg',
    excerpt:
      'Why internal heat dissipation from relays and backlights makes mechanical enclosure design critical for accurate ambient room temperature sensing.',
    tags: ['Structural Design', 'Industrial Design', 'ODM'],
    body: [
      'A thermostat enclosure is far more than cosmetic styling. Power conversion components, WiFi modules, display backlights and switching relays all generate localized heat inside a compact wall housing.',
      'Effective structural design places the internal ambient NTC sensor inside an isolated vent chamber away from heat sources, ensuring stable room temperature readings without excessive software offset drift.',
      'During ODM prototyping, always validate mechanical samples mounted inside actual regional wall boxes with realistic load current before approving steel mold cutting.',
    ],
  },
  {
    slug: 'requesting-product-documents',
    title: 'Private-Label Thermostat Sourcing: What Documentation to Confirm Before Ordering',
    category: 'Buying Guides',
    date: '2026.08.25',
    image: '/images/blog/art-6.jpg',
    excerpt:
      'A practical pre-order checklist covering datasheets, wiring diagrams, regional manuals, artwork proofs and pre-shipment inspection criteria.',
    tags: ['Private Label', 'Documentation', 'Quality Control'],
    body: [
      'Clear documentation protects both brand owners and manufacturing partners. Before releasing a purchase order, align on a single signed specification sheet tied to the exact model code and firmware version.',
      'Verify multi-language user manual layouts, wiring diagram accuracy, carton labeling, barcode placement and warranty terms in writing.',
      'For connected devices, also confirm mobile app onboarding instructions and regional cloud server expectations so end customers experience smooth setup right out of the box.',
    ],
  },
  {
    slug: 'smart-radiator-valves-retrofits',
    title: 'Smart Radiator Valves (TRVs) Explained: Room-by-Room Retrofit Heating Control',
    category: 'Heating Knowledge',
    date: '2026.08.11',
    image: '/images/blog/art-7.jpg',
    excerpt:
      'Understanding how thermostatic radiator valves upgrade existing wet radiator systems with scheduled room control and gateway automation.',
    tags: ['Smart Radiator Valve', 'TRV', 'Energy Saving'],
    body: [
      'Traditional radiator heating relies on a single central room thermostat, frequently overheating unused bedrooms while leaving north-facing spaces chilly.',
      'Smart thermostatic radiator valves mount directly onto compatible radiator valve bodies, regulating hot-water flow independently in every room according to daily occupancy schedules.',
      'When specifying TRVs for European or UK distribution, confirm included mechanical valve adapters, motor noise performance and battery replacement accessibility.',
    ],
  },
  {
    slug: 'bms-commercial-hvac-thermostats',
    title: 'Specifying Smart Thermostats for Hotels, Offices and Commercial Heating Projects',
    category: 'Smart Home & HVAC',
    date: '2026.07.29',
    image: '/images/blog/art-8.jpg',
    excerpt:
      'Key considerations for multi-unit deployments: keypad locks, setpoint limits, centralized scheduling and BMS integration.',
    tags: ['Commercial HVAC', 'Modbus', 'Energy Management'],
    body: [
      'Commercial heating projects prioritize durability, predictable occupant interaction and centralized energy oversight over consumer novelty features.',
      'Look for configurable min/max setpoint limits, tamper-resistant button locks, power-loss memory retention and optional RS485/Modbus or cloud gateway connectivity depending on the building management system.',
      'Standardizing on one modular thermostat platform across guest rooms and common areas streamlines installer training and long-term spare-parts inventory.',
    ],
  },
  {
    slug: 'pcb-reliability-testing-thermostats',
    title: 'PCB Engineering & Reliability Validation for Heating Control Hardware',
    category: 'OEM/ODM Insights',
    date: '2026.07.14',
    image: '/images/blog/art-9.jpg',
    excerpt:
      'Reviewing relay endurance, thermal cycling and electrical safety clearance practices in modern thermostat hardware development.',
    tags: ['PCB Development', 'Quality Assurance', 'Hardware'],
    body: [
      'Heating controls operate continuously across seasonal temperature swings and repetitive inductive or resistive switching cycles.',
      'Sound PCB engineering enforces generous mains-to-low-voltage creepage and clearance distances, clean surge-protection pathways and conservative relay derating relative to target regional loads.',
      'Define your reliability validation plan—covering thermal soak, switching endurance and ESD resilience—at the start of every ODM engagement.',
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    category: 'OEM & ODM',
    question: 'Are you a thermostat manufacturer supporting OEM and ODM customization?',
    answer:
      'BEOK Controls is structured as a B2B thermostat and heating control partner for distributors, HVAC contractors and brand owners. Prepare your product requirements, target market and customization brief so our team can confirm exact OEM/ODM engineering scope.',
  },
  {
    category: 'OEM & ODM',
    question: 'What customization options are covered under Tailor-Made Solution?',
    answer:
      'Our Tailor-Made Solution workflow covers four engineering pillars: Smart Home Integration (WiFi/Zigbee/RF/cloud), PCB Development (hardware & firmware), APP Development (branded mobile & dashboard interfaces), and Structural Design (industrial ID & mechanical CAD).',
  },
  {
    category: 'OEM & ODM',
    question: 'Can you develop a thermostat that is not listed in the standard catalog?',
    answer:
      'Yes—custom ODM development begins with a feasibility review of your heating system interface, target electrical ratings, mounting standard, connectivity protocol and projected volume. Use the inquiry form to prepare a project brief.',
  },
  {
    category: 'Products & Compatibility',
    question: 'How do I confirm compatibility with gas boilers, electric floors or hydronic manifolds?',
    answer:
      'Compatibility depends on the heat source control interface (dry-contact relay, resistive load rating, 24V/230V actuator drive) and regional wall-box dimensions. Always verify the exact commercial model datasheet with a qualified HVAC installer before purchasing.',
  },
  {
    category: 'Products & Compatibility',
    question: 'Are technical datasheets, wiring diagrams and certification files available?',
    answer:
      'Approved commercial datasheets, installation manuals and market-specific compliance documents are being finalized for publication on this portal. Request verified model documentation directly via our Contact Us inquiry form.',
  },
  {
    category: 'Ordering & Documentation',
    question: 'How do I request a price list, sample evaluation or MOQ details?',
    answer:
      'Because B2B pricing and MOQ depend on model selection, regional specifications and OEM customization scope, prepare an inquiry with your target product category, market and estimated volume so an accurate commercial quotation can be issued once live inquiry routing is connected.',
  },
  {
    category: 'Ordering & Documentation',
    question: 'How are product quality control and warranty terms handled?',
    answer:
      'Quality assurance standards, pre-shipment inspection criteria and commercial warranty terms are agreed in writing per project contract and verified product specification.',
  },
  {
    category: 'Ordering & Documentation',
    question: 'Does the online inquiry form transmit my message immediately?',
    answer:
      'Not yet—this development preview has not been connected to a live email/CRM backend (the inquiry API intentionally returns HTTP 503). Submitting the form validates your project details and lets you download a clean local inquiry draft.',
  },
];

export const downloads: DownloadItem[] = [
  {
    id: 'dl-gas-boiler',
    title: 'Gas Boiler Thermostat Series — User & Wiring Manual',
    category: 'Gas Boiler Thermostats',
    languages: 'English (Multi-language editions pending verified PDF upload)',
    type: 'Manual',
  },
  {
    id: 'dl-electric-floor',
    title: 'Electric Underfloor Heating Thermostat — Technical Datasheet',
    category: 'Electric Underfloor Heating Thermostats',
    languages: 'English (Approved datasheet PDF pending commercial release)',
    type: 'Datasheet',
  },
  {
    id: 'dl-water-heating',
    title: 'Hydronic Water Heating Thermostat — Installation Guide',
    category: 'Water Heating Thermostats',
    languages: 'English (Verified wiring schematic pending approval)',
    type: 'Wiring Guide',
  },
  {
    id: 'dl-trv',
    title: 'Smart Radiator Valve (TRV) — Quick Setup & Adapter Guide',
    category: 'Smart Radiator Valves',
    languages: 'English (Approved manual PDF pending supply)',
    type: 'Manual',
  },
  {
    id: 'dl-actuator',
    title: 'Electro-Thermal Manifold Actuator — Specification Sheet',
    category: 'Thermal Actuators',
    languages: 'English (Approved datasheet PDF pending supply)',
    type: 'Datasheet',
  },
  {
    id: 'dl-wiring-centre',
    title: 'Multi-Zone Hydronic Wiring Centre — Terminal Wiring Diagram',
    category: 'Wiring Centres',
    languages: 'English (Approved wiring PDF pending supply)',
    type: 'Wiring Guide',
  },
  {
    id: 'dl-smart-controller',
    title: 'Smart Heating Controller & Gateway — Integration Overview',
    category: 'Smart Heating Controllers',
    languages: 'English (Approved technical manual pending supply)',
    type: 'Manual',
  },
];

export const videos: VideoItem[] = [
  {
    id: 'vid-boiler-overview',
    title: 'WiFi Gas Boiler Thermostat — Hardware Overview',
    category: 'Product Showcase',
    duration: '01:45',
    visual: 'boiler',
    image: '/images/support/vid-1.jpg',
  },
  {
    id: 'vid-floor-overview',
    title: 'Electric Underfloor Heating Thermostat — UI & Display Walk-Through',
    category: 'Product Showcase',
    duration: '02:10',
    visual: 'electric',
    image: '/images/support/vid-2.jpg',
  },
  {
    id: 'vid-trv-unboxing',
    title: 'Smart Radiator Valve (TRV) — Mechanical Adapters Overview',
    category: 'Product Showcase',
    duration: '01:30',
    visual: 'trv',
    image: '/images/support/vid-3.png',
  },
  {
    id: 'vid-wiring-centre',
    title: '8-Zone Hydronic Wiring Centre — Terminal & Actuator Layout',
    category: 'Installation & Wiring',
    duration: '02:40',
    visual: 'wiring',
    image: '/images/support/vid-4.jpg',
  },
  {
    id: 'vid-rf-pairing',
    title: 'Wireless Boiler Thermostat & Receiver — Pairing Guide',
    category: 'Installation & Wiring',
    duration: '02:05',
    visual: 'boiler',
    image: '/images/support/vid-5.jpg',
  },
  {
    id: 'vid-floor-sensor',
    title: 'Floor NTC Sensor Installation & Temperature Limit Configuration',
    category: 'Installation & Wiring',
    duration: '01:55',
    visual: 'electric',
    image: '/images/support/vid-6.jpg',
  },
  {
    id: 'vid-app-setup',
    title: 'Smart Heating Mobile App — Onboarding & Weekly Scheduling',
    category: 'Technical Guides',
    duration: '03:12',
    visual: 'controller',
    image: '/images/support/vid-7.jpg',
  },
  {
    id: 'vid-oem-workflow',
    title: 'OEM/ODM Thermostat Customization Workflow Overview',
    category: 'Technical Guides',
    duration: '02:30',
    visual: 'water',
    image: '/images/support/vid-8.jpg',
  },
];

export const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Tailor-Made Solution',
    href: '/tailor-made-solution',
    previewSummary:
      'From ID styling, PCB engineering and mobile app customization to reliable verification, every OEM/ODM stage is structured for global heating brands.',
    children: [
      ...services.map((s) => ({
        name: s.name,
        href: `/tailor-made-solution/${s.slug}`,
        slug: s.slug,
        summary: s.shortDesc,
      })),
      {
        name: 'ODM Engineering Projects',
        href: '/odm',
        summary: 'Browse 12 concept ODM engineering architectures across hardware, enclosure, connectivity and app design.',
      },
    ],
  },
  {
    name: 'Products',
    href: '/products',
    previewSummary:
      'Explore BEOK Controls heating control categories spanning boiler, underfloor, radiator valve, manifold actuator and multi-zone smart controllers.',
    children: categories.map((c) => ({
      name: c.name,
      href: `/products/${c.slug}`,
      slug: c.slug,
      summary: c.summary,
    })),
  },
  {
    name: 'Solutions',
    href: '/solutions',
    previewSummary:
      'Application-engineered thermostat and zone control architectures for residential, commercial and OEM/ODM heating systems.',
    children: solutions.map((s) => ({
      name: s.name,
      href: `/solutions/${s.slug}`,
      slug: s.slug,
      summary: s.summary,
    })),
  },
  {
    name: 'Blog',
    href: '/blog',
    previewSummary:
      'Technical guides, buying checklists and HVAC industry insights for thermostat distributors, installers and OEM product teams.',
    children: articleCategories.map((name, i) => ({
      name,
      href: `/blog/category/${i + 1}`,
      summary: `Read BEOK Controls editorial guides in ${name}.`,
    })),
  },
  {
    name: 'Service & Support',
    href: '/support',
    previewSummary:
      'Access thermostat FAQs, product documentation directories, technical video guides and service terms.',
    children: [
      { name: 'Videos', href: '/support/videos', summary: 'Product overview, installation and technical setup video guides.' },
      { name: 'Thermostat FAQs', href: '/support/faqs', summary: 'Answers to common OEM/ODM, compatibility and documentation questions.' },
      { name: 'Terms of Service', href: '/support/terms', summary: 'Draft website terms of service pending legal review.' },
      { name: 'Downloads', href: '/support/downloads', summary: 'Structured catalog of user manuals, datasheets and wiring guides.' },
    ],
  },
  {
    name: 'About Us',
    href: '/about',
    previewSummary:
      'Learn about BEOK Controls brand positioning, engineering workflow advantages, career inquiries and global B2B contact channels.',
    children: [
      { name: 'Company Introduction', href: '/about', summary: 'Overview of BEOK Controls heating control mission and brand scope.' },
      { name: 'Our Advantages', href: '/about/advantages', summary: 'R&D engineering workflow, quality assurance pillars and OEM support.' },
      { name: 'Join Us', href: '/about/join-us', summary: 'Team culture and future talent opportunities.' },
      { name: 'Contact Us', href: '/contact', summary: 'Prepare a B2B sourcing or OEM/ODM project inquiry.' },
    ],
  },
];
