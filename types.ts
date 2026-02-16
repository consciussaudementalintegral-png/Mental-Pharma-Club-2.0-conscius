
export enum UserRole {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  CUSTOMER = 'CUSTOMER'
}

export enum ProviderType {
  PSYCHIATRIST = 'PSYCHIATRIST',
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  GYM = 'GYM',
  PHARMACY = 'PHARMACY'
}

export enum OnboardingStatus {
  PENDING_DOCS = 'PENDING_DOCS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED'
}

export enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  AWAITING_PRESCRIPTION = 'AWAITING_PRESCRIPTION',
  AWAITING_PHARMACY_APPROVAL = 'AWAITING_PHARMACY_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED'
}

export interface ProviderProfile {
  id: string;
  type: ProviderType;
  name: string;
  email: string;
  documentNumber: string; // CRM/CRP/CNPJ
  documentUrl?: string;
  status: OnboardingStatus;
  bio?: string;
  specialties?: string[];
  rating: number;
  stripeConnectedAccountId?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // Para descontos de 70% em academias
  providerId: string;
  category: string;
  requiresPrescription: boolean;
}

export interface SplitInfo {
  total: number;
  stripeFee: number;
  consciusCommission: number; // Valor tributável pela Conscius
  providerShare: number; // Valor repassado diretamente
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  prescriptionUrl?: string;
  split: SplitInfo;
}

export interface SaaSMetrics {
  mrr: number;
  arr: number;
  churnRate: number;
  ltvCac: number;
  realProfit: number; // Lucro limpo após impostos sobre a comissão
  gmv: number;
}
