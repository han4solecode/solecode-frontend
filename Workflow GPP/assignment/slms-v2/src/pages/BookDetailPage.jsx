import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../services/books.service";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function BookDetailPage(props) {
  const {} = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBookById(Number(id))
      .then((res) => {
        setBook(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(book);

  const TableBody = () => {
    return (
      <tbody className="text-lg">
        <tr>
          <td className="text-end align-top">Book Title:</td>
          <td className="text-justify pl-2">{book.title}</td>
        </tr>
        <tr>
          <td className="text-end align-top">Book Author:</td>
          <td className="text-justify pl-2">{book.author}</td>
        </tr>
        <tr>
          <td className="text-end align-top">Description:</td>
          <td className="text-justify w-96 pl-2">{book.description}</td>
        </tr>
        <tr>
          <td className="text-end align-top">Category:</td>
          <td className="text-justify w-96 pl-2">{book.category}</td>
        </tr>
        <tr>
          <td className="text-end align-top">Publisher:</td>
          <td className="text-justify w-96 pl-2">{book.publisher}</td>
        </tr>
        <tr>
          <td className="text-end align-top">ISBN:</td>
          <td className="text-justify w-96 pl-2">{book.isbn}</td>
        </tr>
        <tr>
          <td className="text-end align-top">Location:</td>
          <td className="text-justify w-96 pl-2">{book.location}</td>
        </tr>
      </tbody>
    );
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation></LoadingAnimation>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout pageTitle="Book Detail">
      <div className="flex items-center justify-center">
        <table>
          <TableBody />
        </table>
      </div>
      <div className="my-3">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </PageLayout>
  );
}

export default BookDetailPage;
