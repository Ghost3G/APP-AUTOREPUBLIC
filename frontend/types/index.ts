export type UserRole =
  | 'admin'
  | 'responsable_showroom'
  | 'responsable_garage'
  | 'receptionniste'
  | 'technicien'
  | 'comptable';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Vehicle {
  id: number;
  vin: string;
  brand: string;
  model: string;
  year?: number;
  status: 'disponible' | 'reserve' | 'vendu';
  mileage: number;
  purchasePrice: number;
  salePrice: number;
  coverImage?: string;
}

export interface RepairTicket {
  id: number;
  vehicleId: number;
  reference: string;
  status: 'reception' | 'diagnostic' | 'en_cours' | 'termine' | 'livre';
  technician: string;
  estimatedCost: number;
}
