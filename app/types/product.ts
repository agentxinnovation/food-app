// types/product.ts
export interface MenuItem {
  id: string;
  itemId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string | MenuCategory; // Allow both string and object
  preparationTime: number;
  isAvailable: boolean;
  isVegetarian: boolean;
  spiceLevel: "MILD" | "MEDIUM" | "HOT";
  nutritionInfo?: NutritionInfo;
  customizations?: CustomizationOption[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sortOrder: number;
}


export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: "RADIO" | "CHECKBOX" | "SELECT";
  required: boolean;
  options: CustomizationChoice[];
}

export interface CustomizationChoice {
  id: string;
  name: string;
  price: number; // additional price
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations?: {
    spiceLevel?: "MILD" | "MEDIUM" | "HOT";
    extras?: string[];
  };
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  deliveryFee: number;
  discountAmount: number;
  promoCode?: string;
}
