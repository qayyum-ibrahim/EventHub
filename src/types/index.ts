export type UserRole = "student" | "organizer";
export type OrganizerStatus = "pending" | "rejected" | null;
export type CurrentMode = "student" | "organizer";
export type PayoutStatus = "pending" | "paid" | "rejected";
export type University = {
  name: string;
  type?: string;
  location?: string;
};
export type ImageType = {
  url: string;
  imageId: string;
  type: string;
  filename: string;
};
export type EventCategory =
  | "academic"
  | "entertainment"
  | "religious"
  | "sports"
  | "social"
  | "music"
  | "arts"
  | "gaming"
  | "other";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  faculty?: string;
  level?: string;
  role: UserRole;
  isOrganizer: boolean;
  organizerStatus: OrganizerStatus;
  currentMode: CurrentMode;
  bankDetails: BankDetails;
  avatar: ImageType;
  university: {
    name: string;
    type?: string;
    location?: string;
  };
  department?: string;
  emailPreferences: {
    receiveMarketing: boolean;
    eventReminders: boolean;
    platformUpdates: boolean;
  };
  privacySettings: {
    showFullNameOnTickets: boolean;
    showSocialHandle: boolean;
  };
  accountDeletion: {
    requested: boolean;
    requestedAt?: string; // or Date
  };
  emailVerified: boolean;
  createdAt: string; // or Date
  updatedAt: string; // or Date
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  price: number;
  currency: string;
  totalTickets: number;
  soldTickets: number;
  category: EventCategory;
  image: {
    url: string;
    imageId: string;
    type: string;
    filename: string;
  };
  organizerId: string;
  organizerName: string;
  status: "upcoming" | "past";
  isPublished: boolean;
  createdAt: string;
  ticketsSold?: number;
  percentSold?: number;
  revenue?: number;
  maxRevenue?: number;
}

export interface PaymentSession {
  eventId: string;
  quantity: number;
  totalAmount: number;
  paystackFee: number;
  grandTotal: number;
  event: Event;
}

export type Ticket = {
  id: string;
  attendee: {
    name: string;
    email: string;
  };
  buyer: {
    name: string;
    email: string;
  };
  event: {
    id: string;
    title: string;
    date: string; // e.g. "2025-10-01"
    time: string;
    location: string;
    status: "upcoming" | "past";
  };
  price: number;
  qrCode: string;
  qrCodeImage: {
    url: string;
    imageId: string;
    type: string;
    filename: string;
  };
  used: boolean;
  purchaseDate: string; // e.g. "2025-07-23"
};

export type OrganizerTransactionSummary = {
  id: string;
  title: string;
  date: string;
  ticketsSold: number;
  totalTickets: number;
  percentSold: number;
  revenue: number;
  maxRevenue: number;
  status: "Active Sales" | "Sales Ended";
};

export interface PaymentSession {
  eventId: string;
  quantity: number;
  totalAmount: number;
  paystackFee: number;
  grandTotal: number;
  event: Event;
}

export interface BankDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  saveAt?: Date;
}

export interface Payout {
  _id: string;
  organizer: User;
  amountRequested: number;
  serviceFee: number;
  netAmount: number;
  status: PayoutStatus;
  dateRequested: string; // ISO string
  withdrawalMethod: "bank_transfer";
  events: Event[];
  bankDetails: BankDetails;
  isEmailVerified: boolean;
}

export interface OrganizerProfile {
  id: string;
  userId: string;
  completedEvents: number;
  isAutoPayoutEnabled: boolean;
  isEligibleForAutoPayout: boolean;
  bankDetails?: BankDetails;
  payoutMethod: "automatic" | "manual";
}

export interface WithdrawalDataType {
  amount: number;
  selectedEvents: string[];
  maxAmount: number;
  serviceFee?: number;
  finalAmount?: number;
}

export interface BankAccountDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
}

export interface TicketResponse {
  success: boolean;
  count: number;
  tickets: Ticket[];
}

export type Transaction = {
  id: string;
  buyer: {
    name: string;
    email: string;
  };
  event: {
    title: string;
    status: "upcoming" | "past";
  };
  quantity: number;
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
  date: string; // Format: "YYYY-MM-DD"
  time: string;
  status: "upcoming" | "past";
  paymentGateway: "paystack" | "flutterwave";
  reference: string;
};

export interface EventComment {
  _id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  comment: string;
  timestamp: string;
  likes: number;
  likedBy: string[];
  replies?: EventComment[];
}

export interface EventAttendee {
  _id: string;
  name: string;
  avatar: string;
  university: string;
  ticketsPurchased: number;
}

export interface EventSocial {
  eventId: string;
  likes: number;
  likedBy: string[];
  shares: number;
  comments: EventComment[];
  attendees: EventAttendee[];
}

export type NotificationType = 
  | "comment_reply" 
  | "comment_like" 
  | "ticket_purchase" 
  | "event_like";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  userId: string;
  relatedEventId?: string;
  relatedCommentId?: string;
  actionBy?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}