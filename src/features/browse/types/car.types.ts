export interface CarFeatureGroup {
  category: string;
  options: string[];
}

export interface CarFinancing {
  down_payment: string | null;
  duration_months: number | null;
  monthly_installment: string | null;
}

export interface CarCoreInfo {
  brand: string;
  model: string;
  year: number;
  trim: string | null;
}

export interface CarSeller {
  name: string;
  image: string | null;
  phone: string;
}

export interface CarListing {
  id: number;
  car: CarCoreInfo;
  condition: "new" | "used";
  mileage_km: number;
  transmission: string;
  fuel_type: string;
  color: string;
  car_type: string | null;
  description: string | null;
  city: string;
  price: string;
  financing_available: boolean;
  financing: CarFinancing | null;
  features: CarFeatureGroup[];
  highlights: string[];
  is_imported: boolean;
  is_taxi: boolean;
  is_special_needs: boolean;
  contact_phone: string;
  whatsapp_allowed: boolean;
  images: string[];
  status: string;
  created_at: string;
  updated_at?: string;
}

export type CarDetails = {
  id: number;
  is_fav: boolean;
  car: {
    brand: string;
    model: string;
    year: number;
    trim: string;
    vehicle_type: string;
    vehicle_type_label: string;
    sub_type: string;
    sub_type_label: string;
    model_id: number;
    brand_id: number;
  };

  details: {
    condition: string;
    condition_label: string;
    mileage_km?: number;
    transmission: string;
    transmission_label: string;
    fuel_type: string;
    fuel_type_label?: string;
    color: string;
    color_label: string;
    is_imported: boolean;
    is_taxi: boolean;
    is_special_needs: boolean;
    power_hp: number;
    torque_nm: number;
    top_speed_kmh: number;
    fuel_tank_capacity_l: number;
    warranty_km: number;
    seats: number;
    drive_type: string;
    drive_type_label: string;
    cylinders: number;
    length_mm: string;
    width_mm: string;
    height_mm: string;
    wheelbase_mm: string;
  };

  description: string;
  city: string;
  city_id: number;
  price: string;

  financing_available: boolean;
  financing?: CarFinancing;

  features: {
    category: string;
    options: string[];
  }[];

  highlights: string[];

  contact_phone: string;
  whatsapp_allowed: boolean;

  images: string[];

  seller: CarSeller;

  status: string | null;
  status_label: string | null;

  created_at: string;
};
