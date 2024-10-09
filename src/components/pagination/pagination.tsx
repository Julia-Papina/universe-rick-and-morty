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
    <div className="flex gap-10 ">
      {currentPage === 1 ? null : (
        <button type="button" onClick={handleOnPrevious} className="border border-solid border-slate-300 px-4 py-2 rounded-lg bg-slate-200">
          &#10094;
        </button>
      )}
      <span className="border border-solid border-slate-300 px-4 py-2 rounded-lg bg-slate-200">{currentPage}</span>
      {lastPage === currentPage ? null : (
        <button type="button" onClick={handleOnNext} className="border border-solid border-slate-300 px-4 py-2 rounded-lg bg-slate-200">
          &#10095;
        </button>
      )}
    </div>
  );
};
export default Pagination;
