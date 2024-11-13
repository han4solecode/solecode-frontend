import { useEffect, useState } from "react";
import { getAllLendings, returnBook } from "../services/lendings.service";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import DataTable from "../components/Fragments/DataTable";
import PaginationBar from "../components/Fragments/PaginationBar";
import Button from "../components/Elements/Button";

function ReturnPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const [lendings, setLendings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginatedLendings, setPaginatedLendings] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 5;

  let ths = [
    "ID",
    "Member ID",
    "Book ID",
    "Borrow Date",
    "Return Date",
    "Action",
  ];

  useEffect(() => {
    setIsLoading(true);
    const fetchLendings = async () => {
      const lendings = await getAllLendings();
      if (lendings) {
        setLendings(lendings);
        setIsLoading(false);
        setPaginatedLendings(
          lendings.filter((item, index) => {
            return (index >= page * perPage) & (index < (page + 1) * perPage);
          })
        );
      }
    };
    fetchLendings();
  }, []);

  useEffect(() => {
    setPaginatedLendings(
      lendings.filter((item, index) => {
        return (index >= page * perPage) & (index < (page + 1) * perPage);
      })
    );
  }, [page]);

  const handleReturnBook = (lendingId) => {
    if (
      confirm(
        `Are you sure you want to return a book with lending ID ${lendingId}?`
      )
    ) {
      const returnLending = async (lendingId) => {
        const status = await returnBook(lendingId);
        if (status === 204) {
          alert(
            `Book with with lendingID ${lendingId} has been returned successfully`
          );
          navigate("/return");
        }
      };

      returnLending(lendingId);
    } else {
      return;
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation></LoadingAnimation>
        </div>
      </PageLayout>
    );
  }

  const TableBody = () => {
    return lendings.length !== 0 ? (
      <tbody>
        {paginatedLendings.map((lending) => (
          <tr
            key={lending.lendingid}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{lending.lendingid}</td>
            <td>{lending.userid}</td>
            <td>{lending.bookid}</td>
            <td>{lending.borrowdate}</td>
            <td>{lending.returndate}</td>
            <td className="flex gap-2 justify-center">
              <Button onClick={() => handleReturnBook(lending.lendingid)}>
                Return
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr className="bg-slate-500">
          <td colSpan="8" className="text-black text-center text-xl py-10">
            No Data Available
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <PageLayout pageTitle="Return Books">
      <DataTable header={ths} body={<TableBody />}></DataTable>
      <PaginationBar
        pageCount={Math.ceil(lendings.length / perPage)}
        setPage={setPage}
      ></PaginationBar>
    </PageLayout>
  );
}

export default ReturnPage;
