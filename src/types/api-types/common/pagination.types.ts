export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationMeta {
  totalRecords: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
}
