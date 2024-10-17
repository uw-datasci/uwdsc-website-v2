// Pagination.tsx
import React from "react";
import ArrowButton from "../UI/ArrowButton";

interface PaginationProps {
  table: {
    setPageIndex: (index: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
    getPageCount: () => number;
    getRowCount: () => number;
    getState: () => {
      pagination: {
        pageIndex: number;
        pageSize: number;
      };
    };
    setPageSize: (size: number) => void;
  };
}

const Pagination: React.FC<PaginationProps> = ({ table }) => {
  return (
    <div className="text-s mx-auto mt-5 flex w-fit flex-col items-center justify-center gap-4 rounded-md bg-grey1 p-4 sm:flex-row">
      <div className="flex items-center gap-1">
        <ArrowButton
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          label="<<"
        />
        <ArrowButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          label="<"
        />
        <ArrowButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          label=">"
        />
        <ArrowButton
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          label=">>"
        />
      </div>
      <span className="flex items-center gap-1">
        <div>Page</div>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <span className="flex items-center gap-2">
        <span>Go to:</span>
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="w-16 rounded-sm border p-1"
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        className="rounded-sm border bg-pureWhite py-1 pl-2 pr-8"
      >
        {[10, 20, 50, table.getRowCount()].map((pageSize, index, array) => (
          <option key={pageSize} value={pageSize}>
            {index === array.length - 1 ? "Show All" : `Show ${pageSize}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
