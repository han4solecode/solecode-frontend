import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function PaginationBar(props) {
  const { pageCount, setPage } = props;
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-md">
            <BsChevronLeft
              style={{ color: "white", fontSize: "1.5em" }}
            ></BsChevronLeft>
          </span>
        }
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-md mr-4">
            <BsChevronRight
              style={{ color: "white", fontSize: "1.5em" }}
            ></BsChevronRight>
          </span>
        }
        pageRangeDisplayed={3}
        pageCount={pageCount}
        containerClassName="flex items-center justify-center mt-8 mb-4 space-x-2"
        pageClassName="block border border-gray-800  hover:bg-gray-800 hover:text-white w-10 h-10 flex items-center justify-center rounded-md"
        activeClassName="bg-gray-800 text-white"
        onPageChange={(e) => setPage(e.selected)}
      />
    </div>
  );
}

export default PaginationBar;
