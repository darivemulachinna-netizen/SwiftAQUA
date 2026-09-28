export type WaterPurpose = 'house' | 'function';

export interface WaterProduct {
  id: string;
  name: string;
  category: WaterPurpose;
  tagline: string;
  capacityLitres: number;
  capacityLabel: string;
  idealFor: string;
  price: number;
  deliveryTimeEstimate: string;
  tdsPpm: number;
  phLevel: number;
  hardnessMgL: number;
  containerType: 'can' | 'mini-tanker' | 'tanker' | 'bulk-pack';
  features: string[];
  hoseLengthIncludedFt?: number;
  popular?: boolean;
}

export interface QualityMetric {
  id: string;
  name: string;
  symbol: string;
  measuredValue: number | string;
  unit: string;
  permissibleLimit: string;
  whoStandard: string;
  status: 'optimal' | 'good' | 'warning';
  description: string;
}

export interface LabBatchReport {
  batchId: string;
  testedAt: string;
  sourceAquifer: string;
  filtrationStages: string[];
  technicianName: string;
  chiefChemist: string;
  licenseNumber: string;
  overallRating: string;
  metrics: QualityMetric[];
  certifiedSealNumber: string;
}

export interface OrderItem {
  product: WaterProduct;
  quantity: number;
  purposeNote?: string;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  cityArea: string;
  deliveryDate: string;
  timeSlot: string;
  accessType: 'ground_floor' | 'overhead_tank' | 'sump' | 'event_stage';
  hoseLengthRequiredFt: number;
  paymentMethod: 'cod' | 'upi' | 'card' | 'phone_confirmation';
  notes?: string;
}

export interface ActiveOrder {
  orderId: string;
  placedAt: string;
  item: OrderItem;
  delivery: DeliveryDetails;
  status: 'confirmed' | 'tanker_assigned' | 'quality_tested' | 'out_for_delivery' | 'delivered';
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  estimatedArrivalMinutes: number;
  batchReport: LabBatchReport;
}
