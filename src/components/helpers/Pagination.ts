export const getPaginationButtons = (
  totalPages: number,
  currentPage: number
) => {
  const pageNumbers: (number | "...")[] = [];
  const maxVisibleButtons = 5;

  if (totalPages <= maxVisibleButtons) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) {
      startPage = 2;
      endPage = 4;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
      endPage = totalPages - 1;
    }

    if (startPage > 2) pageNumbers.push("...");
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < totalPages - 1) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }
  return pageNumbers;
};
