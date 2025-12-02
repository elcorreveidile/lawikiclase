// Shared types across the monorepo

export type Role = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';

export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type EnrollmentStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  role: Role;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  imageUrl?: string;
  price: number;
  currency: string;
  status: CourseStatus;
  instructorId: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration?: number;
  order: number;
  isPreview: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress: number;
  enrolledAt: Date;
  completedAt?: Date;
}

export interface Payment {
  id: string;
  enrollmentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripeSessionId?: string;
}

export interface WebProject {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
}
