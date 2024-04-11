
type props = {
  data: any;
  dataPerPage: number;
  setCurrentPage: any;
};

export default function Pagination({ data, dataPerPage , setCurrentPage }: props) {

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderButtons = () => {
    const totalPages = Math.ceil(data.length / dataPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return <div className="pagination-buttons">{renderButtons()}</div>;
}
