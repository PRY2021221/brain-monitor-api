export class PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];

  total: number;

  totalPages: number;

  page: number;

  limit: number;
}
