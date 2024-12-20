import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import {
  deleteAssignment,
  getAllAssignment,
  getAllAssignmentsNoPaging,
} from "../services/assignments.service";

function AssignmentsPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [allAssingments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const tableHeader = [
    "Employee",
    "Project",
    "Work Start Date",
    "Hours Worked",
    "Action",
  ];

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllAssignment(perPage, page + 1),
      getAllAssignmentsNoPaging(),
    ])
      .then((res) => {
        setAssignments(res[0].data);
        setAllAssignments(res[1].data);
      })
      .catch((err) => {
        console.log(err[0], err[1]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchAssignments = async (perPage, page) => {
      const res = await getAllAssignment(perPage, page);
      if (res.status === 200) {
        setAssignments(res.data);
        setLoading(false);
      }
    };
    fetchAssignments(perPage, page + 1);
  }, [page, perPage]);

  const handleAddAssignmentButtonClick = () => {
    navigate("/assignments/new");
  };

  const handleAssignmentDetailButtonClick = (empNo, projNo) => {
    navigate(`/assignments/${empNo}/${projNo}/detail`);
  };

  const handleEditAssignmentButtonClick = (empNo, projNo) => {
    navigate(`/assignments/${empNo}/${projNo}`);
  };

  const handleDeleteAssignment = (empNo, projNo) => {
    if (
      confirm(
        `Are you sure you want to delete assignment of employee empNo ${empNo} in project projNo ${projNo}?`
      )
    ) {
      deleteAssignment(empNo, projNo)
        .then((res) => {
          if (res.status === 204) {
            alert(
              `Assignment of employee empNo ${empNo} in project projNo ${projNo} has been deleted successfully`
            );
            navigate(0);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            `Error occurred. Please try again or contact admin. ERROR ${err}`
          );
        });
    } else {
      return;
    }
  };

  const TableBody = () => {
    return assignments.length !== 0 ? (
      <tbody>
        {assignments.map((assignment, key) => (
          <tr
            key={key}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>
              {assignment.empnoNavigation.fname}{" "}
              {assignment.empnoNavigation.lname}
            </td>
            <td>{assignment.projnoNavigation.projname}</td>
            <td>{assignment.dateworked}</td>
            <td>{assignment.hoursworked}</td>
            <td className="flex gap-2 justify-center">
              <Button
                onClick={() =>
                  handleAssignmentDetailButtonClick(
                    assignment.empno,
                    assignment.projno
                  )
                }
              >
                Detail
              </Button>
              <Button
                styleName="bg-green-700"
                onClick={() =>
                  handleEditAssignmentButtonClick(
                    assignment.empno,
                    assignment.projno
                  )
                }
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() =>
                  handleDeleteAssignment(assignment.empno, assignment.projno)
                }
              >
                Delete
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return (
    <PageLayout pageTitle="Assignments">
      {/* <div className="flex justify-between items-center">
        <Button onClick={handleAddAssignmentButtonClick} type="button">
          Add a New Assignment
        </Button>
        <div>
          <label htmlFor="perPage">Items per page: </label>
          <input
            type="number"
            className="w-10"
            min="0"
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
          />
        </div>
      </div>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
      <PaginationBar
        pageCount={Math.ceil(allAssingments.length / perPage)}
        setPage={setPage}
      ></PaginationBar> */}
    </PageLayout>
  );
}

export default AssignmentsPage;
