export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  featured: boolean;
  description?: string;
  specs?: {
    voltage?: string;
    temperature?: string;
    control?: string;
    display?: string;
  };
}

export const products: Product[] = [
  // Smart Controls
  {
    id: 'hn-zb100',
    title: 'HN-ZB100 Zigbee Smart Thermostat',
    slug: 'zigbee-smart-thermostat',
    category: 'Smart Controls',
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=400&fit=crop',
    featured: true,
    description: 'Smart Zigbee-enabled thermostat with touchscreen display',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'Zigbee 3.0',
      display: 'LCD Touchscreen'
    }
  },
  {
    id: 'hn-wf200',
    title: 'HN-WF200 WiFi Touch Thermostat',
    slug: 'wifi-touch-thermostat',
    category: 'Smart Controls',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: true,
    description: 'WiFi-connected smart thermostat with mobile app control',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'WiFi 2.4GHz',
      display: 'TFT Touchscreen'
    }
  },
  {
    id: 'hn-ts500',
    title: 'HN-TS500 Touchscreen Room Thermostat',
    slug: 'touchscreen-room-thermostat',
    category: 'Smart Controls',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop',
    featured: false,
    description: 'Premium touchscreen thermostat with weekly programming',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'Programmable',
      display: 'Color Touchscreen'
    }
  },

  // Programmable Thermostats
  {
    id: 'hn-lcd300',
    title: 'HN-LCD300 LCD Room Thermostat',
    slug: 'lcd-room-thermostat',
    category: 'Programmable',
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=400&fit=crop',
    featured: true,
    description: 'Digital LCD thermostat with 7-day programming',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: '7-Day Program',
      display: 'LCD Display'
    }
  },
  {
    id: 'hn-hp600',
    title: 'HN-HP600 Heat Pump Thermostat',
    slug: 'heat-pump-thermostat',
    category: 'Programmable',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop',
    featured: false,
    description: 'Specialized thermostat for heat pump systems',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'Heat Pump Mode',
      display: 'LCD Display'
    }
  },

  // Mechanical Thermostats
  {
    id: 'hn-knb400',
    title: 'HN-KNB400 Knob Room Thermostat',
    slug: 'knob-room-thermostat',
    category: 'Mechanical',
    image: 'https://images.unsplash.com/photo-1635241161466-541f065683ba?w=400&h=400&fit=crop',
    featured: true,
    description: 'Simple mechanical thermostat with rotary control',
    specs: {
      voltage: '230V AC',
      temperature: '5-30°C',
      control: 'Manual Knob',
      display: 'Analog Scale'
    }
  },

  // Actuators & Accessories
  {
    id: 'hn-act230',
    title: 'HN-ACT230 Thermal Actuator',
    slug: 'thermal-actuator',
    category: 'Actuators',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
    featured: false,
    description: 'Normally closed thermal actuator for manifold control',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: 'NC/NO',
      display: 'N/A'
    }
  },
  {
    id: 'hn-act24',
    title: 'HN-ACT24 Thermal Actuator 24V',
    slug: 'thermal-actuator-24v',
    category: 'Actuators',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
    featured: false,
    description: '24V thermal actuator for low voltage systems',
    specs: {
      voltage: '24V AC/DC',
      temperature: 'N/A',
      control: 'NC/NO',
      display: 'N/A'
    }
  },
  {
    id: 'hn-fs100',
    title: 'HN-FS100 Floor Sensor Kit',
    slug: 'floor-sensor-kit',
    category: 'Sensors',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: false,
    description: 'Floor temperature sensor with 3m cable',
    specs: {
      voltage: 'N/A',
      temperature: '-20 to 80°C',
      control: 'NTC Sensor',
      display: 'N/A'
    }
  },

  // Control Centers
  {
    id: 'hn-mcc800',
    title: 'HN-MCC800 Manifold Control Center',
    slug: 'manifold-control-center',
    category: 'Control Centers',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop',
    featured: false,
    description: '8-zone manifold control center with mixing valve',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: '8 Zones',
      display: 'LED Indicators'
    }
  },
  {
    id: 'hn-wc1200',
    title: 'HN-WC1200 Twelve Zone Wiring Center',
    slug: 'twelve-zone-wiring-center',
    category: 'Control Centers',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop',
    featured: false,
    description: '12-zone wiring center for multi-room control',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: '12 Zones',
      display: 'LED Indicators'
    }
  },
  {
    id: 'hn-gw300',
    title: 'HN-GW300 Heating Control Gateway',
    slug: 'heating-control-gateway',
    category: 'Gateways',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: false,
    description: 'Smart gateway for centralized heating control',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: 'WiFi/Zigbee',
      display: 'Web Interface'
    }
  },

  // Specialized Thermostats
  {
    id: 'hn-mb400',
    title: 'HN-MB400 Modbus Fan Coil Thermostat',
    slug: 'modbus-fan-coil-thermostat',
    category: 'Specialized',
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=400&fit=crop',
    featured: false,
    description: 'Modbus-enabled thermostat for fan coil units',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'Modbus RTU',
      display: 'LCD Display'
    }
  },
  {
    id: 'hn-oem500',
    title: 'HN-OEM500 OEM Glass Panel Thermostat',
    slug: 'oem-glass-panel-thermostat',
    category: 'Specialized',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop',
    featured: false,
    description: 'Customizable glass panel thermostat for OEM branding',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'Programmable',
      display: 'Glass Touch Panel'
    }
  },
  {
    id: 'hn-br200',
    title: 'HN-BR200 Boiler Receiver Module',
    slug: 'boiler-receiver-module',
    category: 'Receivers',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
    featured: false,
    description: 'Wireless receiver module for boiler control',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: 'RF 868MHz',
      display: 'LED Indicator'
    }
  },
  {
    id: 'hn-wt300',
    title: 'HN-WT300 Wireless Thermostat Kit',
    slug: 'wireless-thermostat-kit',
    category: 'Wireless',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: false,
    description: 'Complete wireless thermostat kit with receiver',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'RF 868MHz',
      display: 'LCD Display'
    }
  },
];

export const categories = Array.from(new Set(products.map(p => p.category)));

export const featuredProducts = products.filter(p => p.featured);

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getProductBySlug = (slug: string) => {
  return products.find(p => p.slug === slug);
};
