export interface PageModel {
  cursor: string; // stringyfied number
  hasNext: boolean;
  hasPrev: boolean;
  next: number;
  page: number;
  prev: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
