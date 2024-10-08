import { usePagination } from "./use-pagination";
type PaginationProps = {
  onPageChange: (pageNumber: string | number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};
const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (!paginationRange) {
    return null;
  } else {
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }
  }

  const handleOnNext = () => {
    onPageChange(currentPage + 1);
  };

  const handleOnPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex gap-20 justify-center">
      {currentPage === 1 ? null : (
        <button type="button" onClick={handleOnPrevious}>
          Назад
        </button>
      )}

      {lastPage === currentPage ? null : (
        <button type="button" onClick={handleOnNext}>
          Вперед
        </button>
      )}
    </div>
  );
};
export default Pagination;
