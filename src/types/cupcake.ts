export interface Cupcake {
  base: CupcakeBase;
  filling: CupcakeFilling | null;
  frosting: CupcakeFrosting;
  toppings: CupcakeTopping[];
}

export interface CupcakeBase {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface CupcakeFilling {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface CupcakeFrosting {
  id: string;
  name: string;
  color: string;
  style: FrostingStyle;
  description: string;
}

export interface CupcakeTopping {
  id: string;
  name: string;
  color: string;
  description: string;
  position?: { x: number; y: number }; // Optional positioning
}

export type FrostingStyle = 'swirl' | 'smooth' | 'textured' | 'drizzle';

// Default options data
export const baseFlavors: CupcakeBase[] = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    color: '#F5E9C9',
    description: 'Classic vanilla flavor with a light and fluffy texture'
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    color: '#3B2213',
    description: 'Rich chocolate flavor with a moist crumb'
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    color: '#A61B1B',
    description: 'Subtle cocoa flavor with a vibrant red color'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    color: '#F2E779',
    description: 'Bright citrus flavor with a tender crumb'
  },
  {
    id: 'funfetti',
    name: 'Funfetti',
    color: '#FFFFFF',
    description: 'Vanilla cake with colorful sprinkles baked inside'
  }
];

export const fillingOptions: CupcakeFilling[] = [
  {
    id: 'none',
    name: 'No Filling',
    color: 'transparent',
    description: 'Classic cupcake without filling'
  },
  {
    id: 'chocolate',
    name: 'Chocolate Ganache',
    color: '#2A1506',
    description: 'Rich and smooth chocolate filling'
  },
  {
    id: 'vanilla-custard',
    name: 'Vanilla Custard',
    color: '#FFF0AC',
    description: 'Smooth and creamy vanilla custard center'
  },
  {
    id: 'strawberry',
    name: 'Strawberry Jam',
    color: '#FF5A60',
    description: 'Sweet strawberry jam with real fruit pieces'
  },
  {
    id: 'lemon-curd',
    name: 'Lemon Curd',
    color: '#FDE151',
    description: 'Tangy and bright lemon curd'
  },
  {
    id: 'caramel',
    name: 'Caramel',
    color: '#C68E49',
    description: 'Sweet and buttery caramel center'
  }
];

export const frostingOptions: CupcakeFrosting[] = [
  {
    id: 'vanilla-buttercream',
    name: 'Vanilla Buttercream',
    color: '#FFF8E1',
    style: 'swirl',
    description: 'Classic sweet and creamy vanilla frosting'
  },
  {
    id: 'chocolate-buttercream',
    name: 'Chocolate Buttercream',
    color: '#4D2E19',
    style: 'swirl',
    description: 'Rich and decadent chocolate frosting'
  },
  {
    id: 'cream-cheese',
    name: 'Cream Cheese',
    color: '#FFF5EA',
    style: 'smooth',
    description: 'Tangy cream cheese frosting with a smooth finish'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    color: '#FFBCBC',
    style: 'swirl',
    description: 'Sweet strawberry frosting with a fruity flavor'
  },
  {
    id: 'mint',
    name: 'Mint',
    color: '#CCFFE5',
    style: 'swirl',
    description: 'Cool mint frosting with a refreshing taste'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    color: '#FFF59A',
    style: 'smooth',
    description: 'Bright lemon frosting with a zesty citrus flavor'
  },
  {
    id: 'caramel',
    name: 'Caramel',
    color: '#D9A566',
    style: 'drizzle',
    description: 'Sweet caramel frosting with buttery notes'
  }
];

export const toppingOptions: CupcakeTopping[] = [
  {
    id: 'chocolate-chips',
    name: 'Chocolate Chips',
    color: '#2A1506',
    description: 'Semi-sweet chocolate chips'
  },
  {
    id: 'sprinkles',
    name: 'Rainbow Sprinkles',
    color: '#MULTIPLE',
    description: 'Colorful sugar sprinkles'
  },
  {
    id: 'coconut',
    name: 'Coconut Shavings',
    color: '#FFFFFF',
    description: 'Sweet toasted coconut flakes'
  },
  {
    id: 'strawberry',
    name: 'Strawberry Slice',
    color: '#FF5A60',
    description: 'Fresh strawberry slice'
  },
  {
    id: 'blueberry',
    name: 'Blueberries',
    color: '#4A5AAD',
    description: 'Fresh blueberries'
  },
  {
    id: 'cherry',
    name: 'Maraschino Cherry',
    color: '#E4292E',
    description: 'Sweet maraschino cherry'
  },
  {
    id: 'candies',
    name: 'Chocolate Candies',
    color: '#MULTIPLE',
    description: 'Colorful chocolate candies'
  },
  {
    id: 'nuts',
    name: 'Chopped Nuts',
    color: '#C68E49',
    description: 'Crunchy chopped nuts'
  }
];