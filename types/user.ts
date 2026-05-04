// types/user.ts

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  role?: string;
}

export interface UsersListResponse {
  success: boolean;
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UsersListParams {
  page?: number;
  limit?: number;
  sortBy?: 'id' | 'name' | 'email' | 'createdAt';
  order?: 'asc' | 'desc';
  search?: string;
}

export interface TableState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sorting: Array<{
    id: string;
    desc: boolean;
  }>;
  globalFilter: string;
}
