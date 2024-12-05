import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLeaveRequestProcessById,
  reviewLeaveRequest,
} from "../services/employees.service";
import PageLayout from "../components/Layouts/PageLayout";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import DataTable from "../components/Fragments/DataTable";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";

function LeaveRequestReviewPage(props) {
  const {} = props;
  const { processId } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    action: "",
    comment: "",
  };

  const [leaveRequestData, setLeaveRequestData] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLeaveRequestProcessById(Number(processId))
      .then((res) => {
        setLeaveRequestData(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  //   console.log(leaveRequestData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues);

  const handleClearForm = (e) => {
    e.preventDefault();
    setFormValues(initialValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let errorMessages = {};

    if (!formValues.comment.trim()) {
      errorMessages.comment = "Comment is required";
    } else {
      errorMessages.comment = "";
    }

    if (!formValues.action) {
      errorMessages.action = "Action is required";
    } else {
      errorMessages.action = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      // send leave request review
      let reviewData = {
        processId: Number(processId),
        ...formValues,
      };
      console.log("Review Data: ", reviewData);

      if (
        confirm(`Confirm review leave request (process ID: ${processId})? `)
      ) {
        reviewLeaveRequest(reviewData)
          .then((res) => {
            alert(res.data.message);
            navigate(0);
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data.message);
            navigate(-1);
          });
      } else {
        return;
      }
    }
  };

  const tableHeader = ["Review Date", "Action by", "Action", "Comment"];

  const TableBody = () => {
    return leaveRequestData?.processIdNavigation?.workflowActions.length !==
      0 ? (
      <tbody>
        {leaveRequestData?.processIdNavigation?.workflowActions.map(
          (wa, index) => {
            var actionDate = new Date(wa.actionDate).toLocaleDateString();
            return (
              <tr
                key={index}
                className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
              >
                <td>{actionDate}</td>
                <td>
                  {wa.actorIdNavigation?.fname} {wa.actorIdNavigation?.lname}
                </td>
                <td>{wa.action}</td>
                <td>{wa.comment}</td>
              </tr>
            );
          }
        )}
      </tbody>
    ) : (
      <tbody>
        <tr className="bg-slate-500">
          <td colSpan="4" className="text-black text-center text-xl py-10">
            No Data Available
          </td>
        </tr>
      </tbody>
    );
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

  return (
    <PageLayout pageTitle="Leave Request Review">
      <div className="border rounded border-gray-300 p-2 w-3/4 text-gray-900">
        <div className="flex flex-col text-md mb-3">
          <h1 className="text-2xl font-medium mb-1">Process Detail</h1>
          <span>
            <strong>Requester: </strong>
            {
              leaveRequestData?.processIdNavigation?.requesterIdNavigation
                ?.fname
            }{" "}
            {
              leaveRequestData?.processIdNavigation?.requesterIdNavigation
                ?.lname
            }
          </span>
          <span>
            <strong>Request Date: </strong>
            {new Date(
              leaveRequestData?.processIdNavigation?.requestDate
            ).toDateString()}
          </span>
          <span>
            <strong>Process ID: </strong>
            {leaveRequestData?.processId}
          </span>
          <span>
            <strong>Current Status: </strong>
            <span
              className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                leaveRequestData?.processIdNavigation?.status.includes(
                  "Pending"
                )
                  ? "bg-yellow-200 text-yellow-800"
                  : leaveRequestData?.processIdNavigation?.status.includes(
                      "Approve"
                    )
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {leaveRequestData?.processIdNavigation?.status}
            </span>
          </span>
        </div>
        <div className="mb-3">
          <h1 className="text-2xl font-medium mb-1">Leave Request Detail</h1>
          <div className="flex flex-col">
            <span>
              <strong>Leave Type: </strong>
              {leaveRequestData?.leaveType}
            </span>
            <span>
              <strong>Start Date: </strong>
              {new Date(leaveRequestData?.startDate).toDateString()}
            </span>
            <span>
              <strong>End Date: </strong>
              {new Date(leaveRequestData?.endDate).toDateString()}
            </span>
            <span>
              <strong>Reason: </strong>
              {leaveRequestData?.reason}
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-medium mb-1">Action History</h1>
          <DataTable header={tableHeader} body={<TableBody />}></DataTable>
        </div>
      </div>
      <form autoComplete="off" className="mt-3 w-3/4">
        <div className="mb-3">
          <label
            htmlFor="action"
            className="block text-black mb-2 text-lg text-semibold"
          >
            Action
          </label>
          <div className="flex items-center ps-4">
            <input
              id="bordered-radio-1"
              type="radio"
              value="Approved"
              name="action"
              className="w-6 h-6"
              checked={formValues.action === "Approved"}
              onChange={(e) => handleInputChange(e)}
            />
            <label
              htmlFor="bordered-radio-1"
              className="w-full py-4 ms-2 text-lg font-medium"
            >
              Approve
            </label>
          </div>
          <div className="flex items-center ps-4">
            <input
              id="bordered-radio-2"
              type="radio"
              value="Rejected"
              name="action"
              className="w-6 h-6"
              checked={formValues.action === "Rejected"}
              onChange={(e) => handleInputChange(e)}
            />
            <label
              htmlFor="bordered-radio-2"
              className="w-full py-4 ms-2 text-lg font-medium"
            >
              Reject
            </label>
          </div>
          {errors.action && (
            <small className="text-red-600">{errors.action}</small>
          )}
        </div>
        <FormInput
          name="comment"
          type="text"
          onChange={(e) => handleInputChange(e)}
          value={formValues.comment}
          errorMessage={errors.comment}
          isTextarea={true}
        >
          Comment
        </FormInput>
        <div className="mt-3 space-x-2">
          <Button type="submit" onClick={handleFormSubmit}>
            Review
          </Button>
          <Button
            type="reset"
            styleName="bg-gray-600"
            onClick={handleClearForm}
          >
            Clear
          </Button>
        </div>
      </form>
    </PageLayout>
  );
}

export default LeaveRequestReviewPage;
