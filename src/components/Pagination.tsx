import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  pageSize,
  hasNext,
  hasPrevious,
  onNextPage,
  onPreviousPage
}) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  
  return (
    <div className="flex items-center justify-between py-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, totalResults)}
            </span>{' '}
            of <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
      </div>
      
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={onPreviousPage}
          disabled={!hasPrevious}
          className={`pagination-button relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            hasPrevious
              ? 'bg-white text-gray-700 hover:bg-gray-50'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          } mr-2 border`}
        >
          <ChevronLeft size={16} className="mr-1" />
          Previous
        </button>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={!hasNext}
          className={`pagination-button relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
            hasNext
              ? 'bg-white text-gray-700 hover:bg-gray-50'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          } ml-2 border`}
        >
          Next
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;