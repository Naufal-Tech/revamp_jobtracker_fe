import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useAllJobContext } from "../pages/AllJob";

const PageButtonContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobContext();

  const parsedCurrentPage = parseInt(currentPage);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // First Page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: parsedCurrentPage === 1 })
    );

    // Dots
    if (parsedCurrentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dot-1">
          ...
        </span>
      );
    }

    // One Before Current Page
    if (parsedCurrentPage !== 1 && parsedCurrentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: parsedCurrentPage - 1,
          activeClass: false,
        })
      );
    }

    // Current Page
    if (parsedCurrentPage !== 1 && parsedCurrentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: parsedCurrentPage,
          activeClass: true,
        })
      );
    }

    // One After Current Page
    if (
      parsedCurrentPage !== numOfPages &&
      parsedCurrentPage !== numOfPages - 1
    ) {
      pageButtons.push(
        addPageButton({
          pageNumber: parsedCurrentPage + 1,
          activeClass: false,
        })
      );
    }

    // Dots Page
    if (parsedCurrentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }

    // Next Page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: parsedCurrentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = parsedCurrentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = parsedCurrentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageButtonContainer;
