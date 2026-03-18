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
    features: string[];
    highlights: string[];
    is_imported: boolean;
    is_taxi: boolean;
    is_special_needs: boolean;
    contact_phone: string;
    whatsapp_allowed: boolean;
    images: string[];
    status: string;
    created_at: string;
}