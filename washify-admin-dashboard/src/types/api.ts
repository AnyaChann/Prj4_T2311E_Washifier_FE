// API Response Types
export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
  timestamp?: string;
}

// Main Entity Types
export interface OrderResponse {
  id?: number;
  orderCode?: string;
  userId?: number;
  userName?: string;
  branchId?: number;
  branchName?: string;
  orderDate?: string;
  status?: string;
  totalAmount?: number;
  notes?: string;
  items?: OrderItemResponse[];
  payment?: PaymentResponse;
  shipment?: ShipmentResponse;
  promotionCodes?: string[];
}

export interface OrderItemResponse {
  id?: number;
  serviceId?: number;
  serviceName?: string;
  quantity?: number;
  price?: number;
  subtotal?: number;
}

export interface PaymentResponse {
  id?: number;
  orderId?: number;
  orderCode?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  paymentDate?: string;
  amount?: number;
  transactionId?: string;
  paymentUrl?: string;
  qrCode?: string;
}

export interface ShipmentResponse {
  id?: number;
  orderId?: number;
  userId?: number;
  userName?: string;
  shipperId?: number;
  shipperName?: string;
  shipperPhone?: string;
  address?: string;
  deliveryStatus?: string;
  deliveryDate?: string;
}

export interface UserResponse {
  id?: number;
  username?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  requireEmailVerificationForPasswordChange?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  branchId?: number;
  branchName?: string;
  roles?: Set<string>;
}

export interface BranchResponse {
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  managerName?: string;
  isActive?: boolean;
  createdAt?: string;
  deletedAt?: string;
}

export interface ServiceResponse {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  estimatedTime?: number;
  isActive?: boolean;
  deletedAt?: string;
}

export interface ShipperResponse {
  id?: number;
  name?: string;
  phone?: string;
  vehicleNumber?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ShipperRequest {
  fullName: string;
  phoneNumber: string;
  email?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  address?: string;
  isActive?: boolean;
}

export interface ShipperStatistics {
  shipperId?: number;
  shipperName?: string;
  totalShipments?: number;
  completedShipments?: number;
  activeShipments?: number;
  active?: boolean;
}

export interface PromotionResponse {
  id?: number;
  code?: string;
  description?: string;
  discountType?: string;
  discountValue?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  deletedAt?: string;
}

export interface NotificationResponse {
  id?: number;
  userId?: number;
  username?: string;
  title?: string;
  message?: string;
  type?: string;
  relatedId?: number;
  isRead?: boolean;
  readAt?: string;
  createdAt?: string;
}

export interface NotificationRequest {
  userId: number;
  title: string;
  message: string;
  type: NotificationTypeEnum;
  relatedId?: number;
}

export enum NotificationTypeEnum {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_PROCESSING = 'ORDER_PROCESSING',
  ORDER_READY = 'ORDER_READY',
  ORDER_DELIVERING = 'ORDER_DELIVERING',
  ORDER_COMPLETED = 'ORDER_COMPLETED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PROMOTION = 'PROMOTION',
  SYSTEM = 'SYSTEM',
  OTHER = 'OTHER'
}

// Pagination Types
export interface PageResponse<T> {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: T[];
  number?: number;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}

// Statistics and Dashboard Types
export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeShippers: number;
  pendingOrders: number;
  completedOrders: number;
  todayOrders: number;
  totalUsers: number;
  activeUsers: number;
  totalBranches: number;
  activeBranches: number;
  totalServices: number;
  activeServices: number;
}

export interface OrderStatus {
  PENDING: 'PENDING';
  CONFIRMED: 'CONFIRMED';
  PROCESSING: 'PROCESSING';
  READY: 'READY';
  DELIVERING: 'DELIVERING';
  COMPLETED: 'COMPLETED';
  CANCELLED: 'CANCELLED';
}