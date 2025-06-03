
export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  requiredRole: UserRole[];
  color: string;
}

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
