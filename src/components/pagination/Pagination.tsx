import { FiChevronLeft, FiChevronRight } from '../icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showSiblings?: number; // Number of siblings to show on each side
  showEdges?: number; // Number of pages to show at the start and end
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showSiblings = 1,
  showEdges = 1,
  className = '',
}: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  // Ensure current page is within bounds
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  // Helper function to generate range array [start...end]
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  
  // Calculate page numbers to show
  const generatePageNumbers = () => {
    // Always show first 'showEdges' and last 'showEdges' pages
    // Always show 'showSiblings' siblings on each side of current page
    // Use ellipsis when there are gaps
    
    const leftEdgeEnd = showEdges;
    const rightEdgeStart = totalPages - showEdges + 1;
    
    const leftSiblingStart = Math.max(safePage - showSiblings, 1);
    const rightSiblingEnd = Math.min(safePage + showSiblings, totalPages);
    
    const showLeftEllipsis = leftSiblingStart > leftEdgeEnd + 1;
    const showRightEllipsis = rightSiblingEnd < rightEdgeStart - 1;
    
    const pageNumbers: (number | string)[] = [];
    
    // Add left edge pages
    if (showEdges > 0) {
      // Only add left edge pages if they're not part of the current page's siblings
      if (leftSiblingStart > 1) {
        pageNumbers.push(...range(1, Math.min(leftEdgeEnd, totalPages)));
      }
    }
    
    // Add left ellipsis if needed
    if (showLeftEllipsis) {
      pageNumbers.push('...');
    }
    
    // Add page numbers around the current page
    const leftSiblingPageStart = showLeftEllipsis ? Math.max(leftSiblingStart, leftEdgeEnd + 1) : leftSiblingStart;
    const rightSiblingPageEnd = showRightEllipsis ? Math.min(rightSiblingEnd, rightEdgeStart - 1) : rightSiblingEnd;
    
    if (leftSiblingPageStart <= rightSiblingPageEnd) {
      pageNumbers.push(...range(leftSiblingPageStart, rightSiblingPageEnd));
    }
    
    // Add right ellipsis if needed
    if (showRightEllipsis) {
      pageNumbers.push('...');
    }
    
    // Add right edge pages
    if (showEdges > 0 && rightEdgeStart <= totalPages) {
      // Only add the right edge pages if they're not already included in the current page's siblings
      if (rightSiblingEnd < totalPages) {
        pageNumbers.push(...range(Math.max(rightEdgeStart, safePage + showSiblings + 1), totalPages));
      }
    }
    
    // Check for duplicates and remove them
    const uniquePages: (number | string)[] = [];
    const seen = new Set();
    
    pageNumbers.forEach(page => {
      if (typeof page === 'string' || !seen.has(page)) {
        seen.add(page);
        uniquePages.push(page);
      }
    });
    
    return uniquePages;
  };
  
  const pages = generatePageNumbers();
  
  const handlePrevious = () => {
    if (safePage > 1) {
      onPageChange(safePage - 1);
    }
  };
  
  const handleNext = () => {
    if (safePage < totalPages) {
      onPageChange(safePage + 1);
    }
  };
  
  return (
    <nav className={`flex items-center justify-between ${className}`} aria-label="Pagination">
      <div className="flex w-0 flex-1 justify-start">
        <button
          onClick={handlePrevious}
          disabled={safePage === 1}
          className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium ${
            safePage === 1
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiChevronLeft className="size-5" aria-hidden="true" />
          <span>Previous</span>
        </button>
      </div>
      
      <div className="hidden md:flex md:items-center">
        {pages.map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              aria-current={page === safePage ? 'page' : undefined}
              className={`mx-1 inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                page === safePage
                  ? 'bg-neutral-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="mx-1 inline-flex h-8 items-center justify-center text-sm text-gray-500"
            >
              {page}
            </span>
          )
        ))}
      </div>
      
      <div className="flex w-0 flex-1 justify-end">
        <button
          onClick={handleNext}
          disabled={safePage === totalPages}
          className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium ${
            safePage === totalPages
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>Next</span>
          <FiChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
