import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookRequestProcessById } from "../services/books.service";
import PageLayout from "../components/Layouts/PageLayout";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import DataTable from "../components/Fragments/DataTable";

function BookRequestReviewPage(props) {
  const { processId } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    action: "",
    comment: "",
  };

  //   const [processData, setProcessData] = useState({});
  const [bookRequestData, setBookRequestData] = useState({});
  //   const [workflowActionData, setWorkflowActionData] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBookRequestProcessById(Number(processId))
      .then((res) => {
        setBookRequestData(res.data);
        // setProcessData(res.data.processIdNavigation);
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured", err);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(bookRequestData);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation></LoadingAnimation>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout pageTitle="Book Request Review">
      <div className="border rounded border-gray-300 p-2 w-3/4 text-gray-900">
        <div className="flex items-center text-md justify-between mb-3">
          <span>
            <strong>Requester: </strong>
            {
              bookRequestData?.processIdNavigation?.requesterIdNavigation
                ?.firstName
            }{" "}
            {
              bookRequestData?.processIdNavigation?.requesterIdNavigation
                ?.lastName
            }
          </span>
          <span>
            <strong>Request Date: </strong>
            {bookRequestData?.processIdNavigation?.requestDate}
          </span>
          <span>
            <strong>Process ID: </strong>
            {bookRequestData?.processId}
          </span>
          <span>
            <strong>Current Status: </strong>
            {bookRequestData?.processIdNavigation?.status}
          </span>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl font-medium mb-1">Book Detail</h1>
          <div className="flex flex-col">
            <span>
              <strong>Title: </strong>
              {bookRequestData?.title}
            </span>
            <span>
              <strong>Author: </strong>
              {bookRequestData?.author}
            </span>
            <span>
              <strong>ISBN: </strong>
              {bookRequestData?.isbn}
            </span>
            <span>
              <strong>Publisher: </strong>
              {bookRequestData?.publisher}
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-medium mb-1">Action History</h1>
        </div>
      </div>
    </PageLayout>
  );
}

export default BookRequestReviewPage;
