export interface ProductSpec {
  voltage?: string;
  temperature?: string;
  control?: string;
  controlId?: string;
  display?: string;
  displayId?: string;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  image: string;
  featured: boolean;
  titleId: string;
  descriptionId?: string;
  specs?: ProductSpec;
}

export interface LocalizedProduct {
  id: string;
  slug: string;
  categoryId: string;
  category: string;
  image: string;
  featured: boolean;
  title: string;
  description?: string;
  specs?: {
    voltage?: string;
    temperature?: string;
    control?: string;
    display?: string;
  };
}

type FormatMessage = (descriptor: { id: string; defaultMessage?: string }) => string;

const toCategoryMessageId = (categoryId: string) => `product.category.${categoryId}`;

const localizeSpec = (specs: ProductSpec | undefined, formatMessage: FormatMessage) => {
  if (!specs) {
    return undefined;
  }

  return {
    voltage: specs.voltage,
    temperature: specs.temperature,
    control: specs.controlId ? formatMessage({ id: specs.controlId, defaultMessage: specs.control }) : specs.control,
    display: specs.displayId ? formatMessage({ id: specs.displayId, defaultMessage: specs.display }) : specs.display,
  };
};

export const getLocalizedCategoryName = (categoryId: string, formatMessage: FormatMessage) =>
  formatMessage({ id: toCategoryMessageId(categoryId), defaultMessage: categoryId });

export const localizeProduct = (product: Product, formatMessage: FormatMessage): LocalizedProduct => ({
  id: product.id,
  slug: product.slug,
  categoryId: product.categoryId,
  category: getLocalizedCategoryName(product.categoryId, formatMessage),
  image: product.image,
  featured: product.featured,
  title: formatMessage({ id: product.titleId, defaultMessage: product.id }),
  description: product.descriptionId ? formatMessage({ id: product.descriptionId }) : undefined,
  specs: localizeSpec(product.specs, formatMessage),
});

export const localizeProducts = (items: Product[], formatMessage: FormatMessage) =>
  items.map((item) => localizeProduct(item, formatMessage));

export const products: Product[] = [
  {
    id: 'hn-zb100',
    slug: 'zigbee-smart-thermostat',
    categoryId: 'smartControls',
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=400&fit=crop',
    featured: true,
    titleId: 'product.hn-zb100.title',
    descriptionId: 'product.hn-zb100.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      controlId: 'product.spec.control.zigbee3',
      displayId: 'product.spec.display.lcdTouchscreen',
    },
  },
  {
    id: 'hn-wf200',
    slug: 'wifi-touch-thermostat',
    categoryId: 'smartControls',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: true,
    titleId: 'product.hn-wf200.title',
    descriptionId: 'product.hn-wf200.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      controlId: 'product.spec.control.wifi24',
      displayId: 'product.spec.display.tftTouchscreen',
    },
  },
  {
    id: 'hn-ts500',
    slug: 'touchscreen-room-thermostat',
    categoryId: 'smartControls',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-ts500.title',
    descriptionId: 'product.hn-ts500.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      controlId: 'product.spec.control.programmable',
      displayId: 'product.spec.display.colorTouchscreen',
    },
  },
  {
    id: 'hn-lcd300',
    slug: 'lcd-room-thermostat',
    categoryId: 'programmable',
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=400&fit=crop',
    featured: true,
    titleId: 'product.hn-lcd300.title',
    descriptionId: 'product.hn-lcd300.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      controlId: 'product.spec.control.sevenDayProgram',
      displayId: 'product.spec.display.lcdDisplay',
    },
  },
  {
    id: 'hn-hp600',
    slug: 'heat-pump-thermostat',
    categoryId: 'programmable',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-hp600.title',
    descriptionId: 'product.hn-hp600.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      controlId: 'product.spec.control.heatPumpMode',
      displayId: 'product.spec.display.lcdDisplay',
    },
  },
  {
    id: 'hn-knb400',
    slug: 'knob-room-thermostat',
    categoryId: 'mechanical',
    image: 'https://images.unsplash.com/photo-1635241161466-541f065683ba?w=400&h=400&fit=crop',
    featured: true,
    titleId: 'product.hn-knb400.title',
    descriptionId: 'product.hn-knb400.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-30°C',
      controlId: 'product.spec.control.manualKnob',
      displayId: 'product.spec.display.analogScale',
    },
  },
  {
    id: 'hn-act230',
    slug: 'thermal-actuator',
    categoryId: 'actuators',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-act230.title',
    descriptionId: 'product.hn-act230.description',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: 'NC/NO',
      displayId: 'product.spec.na',
    },
  },
  {
    id: 'hn-act24',
    slug: 'thermal-actuator-24v',
    categoryId: 'actuators',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-act24.title',
    descriptionId: 'product.hn-act24.description',
    specs: {
      voltage: '24V AC/DC',
      temperature: 'N/A',
      control: 'NC/NO',
      displayId: 'product.spec.na',
    },
  },
  {
    id: 'hn-fs100',
    slug: 'floor-sensor-kit',
    categoryId: 'sensors',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-fs100.title',
    descriptionId: 'product.hn-fs100.description',
    specs: {
      voltage: 'N/A',
      temperature: '-20 to 80°C',
      controlId: 'product.spec.control.ntcSensor',
      displayId: 'product.spec.na',
    },
  },
  {
    id: 'hn-mcc800',
    slug: 'manifold-control-center',
    categoryId: 'controlCenters',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-mcc800.title',
    descriptionId: 'product.hn-mcc800.description',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      controlId: 'product.spec.control.eightZones',
      displayId: 'product.spec.display.ledIndicators',
    },
  },
  {
    id: 'hn-wc1200',
    slug: 'twelve-zone-wiring-center',
    categoryId: 'controlCenters',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-wc1200.title',
    descriptionId: 'product.hn-wc1200.description',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      controlId: 'product.spec.control.twelveZones',
      displayId: 'product.spec.display.ledIndicators',
    },
  },
  {
    id: 'hn-gw300',
    slug: 'heating-control-gateway',
    categoryId: 'gateways',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-gw300.title',
    descriptionId: 'product.hn-gw300.description',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: 'WiFi/Zigbee',
      displayId: 'product.spec.display.webInterface',
    },
  },
  {
    id: 'hn-mb400',
    slug: 'modbus-fan-coil-thermostat',
    categoryId: 'specialized',
    image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-mb400.title',
    descriptionId: 'product.hn-mb400.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'Modbus RTU',
      displayId: 'product.spec.display.lcdDisplay',
    },
  },
  {
    id: 'hn-oem500',
    slug: 'oem-glass-panel-thermostat',
    categoryId: 'specialized',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-oem500.title',
    descriptionId: 'product.hn-oem500.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      controlId: 'product.spec.control.programmable',
      displayId: 'product.spec.display.glassTouchPanel',
    },
  },
  {
    id: 'hn-br200',
    slug: 'boiler-receiver-module',
    categoryId: 'receivers',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-br200.title',
    descriptionId: 'product.hn-br200.description',
    specs: {
      voltage: '230V AC',
      temperature: 'N/A',
      control: 'RF 868MHz',
      displayId: 'product.spec.display.ledIndicator',
    },
  },
  {
    id: 'hn-wt300',
    slug: 'wireless-thermostat-kit',
    categoryId: 'wireless',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    featured: false,
    titleId: 'product.hn-wt300.title',
    descriptionId: 'product.hn-wt300.description',
    specs: {
      voltage: '230V AC',
      temperature: '5-35°C',
      control: 'RF 868MHz',
      displayId: 'product.spec.display.lcdDisplay',
    },
  },
];

export const categoryIds = Array.from(new Set(products.map((product) => product.categoryId)));

export const featuredProducts = products.filter((product) => product.featured);

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((product) => product.categoryId === categoryId);
};

export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};
