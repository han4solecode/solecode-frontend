import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../services/employees.service";
import PageLayout from "../components/Layouts/PageLayout";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import Button from "../components/Elements/Button";

function EmployeeDetailPage(props) {
  const {} = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEmployeeById(Number(id))
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(employee);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return (
    <PageLayout pageTitle={`Employee Detail`}>
      <div className="w-full h-1/2 mb-3">
        <div className="flex items-center p-2">
          <img
            src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
            alt="Profile Picture"
            className="w-28 h-28 rounded-full"
          />
          <div className="flex flex-col pl-2">
            <span className="text-2xl font-bold text-gray-800">
              {employee.fname} {employee.lname}
            </span>
            <span className="text-md text-gray-600">
              {employee.position} | {employee.deptnoNavigation?.deptname}{" "}
              Department | Level {employee.level}
            </span>
            <span className="text-md text-gray-600">
              {employee.supervisorempno ? (
                <span>
                  Supervisor:{" "}
                  <span className="font-semibold">
                    {employee.supervisorempnoNavigation?.fname}{" "}
                    {employee.supervisorempnoNavigation?.lname}
                  </span>
                </span>
              ) : (
                ""
              )}
            </span>
            <span className="text-md text-gray-600">
              Status: <span className="font-semibold">{employee.status}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mb-3 w-1/2">
        <span className="text-xl text-gray-800 font-semibold">
          Personal Information
        </span>
        <div className="border rounded p-1 border-gray-200 mb-2">
          <div className="mb-2">
            <span className="text-gray-600 text-lg">Personal Data</span>
          </div>
          <div className="flex items-center text-md justify-between text-gray-800">
            <span>Gender: {employee.sex}</span>
            <span>Date of Birth: {employee.dob}</span>
          </div>
        </div>
        <div className="border rounded p-1 border-gray-200 mb-2">
          <div className="mb-2">
            <span className="text-gray-600 text-lg">Legal Identities</span>
          </div>
          <div className="flex items-center text-md justify-between text-gray-800">
            <span>SSN: {employee.ssn}</span>
          </div>
        </div>
        <div className="border rounded p-1 border-gray-200 mb-2">
          <div className="mb-2">
            <span className="text-gray-600 text-lg">Contacts</span>
          </div>
          <div className="flex flex-wrap items-center text-md justify-between text-gray-800">
            <span>Phone Number: {employee.phonenumber}</span>
            <span>Email Address: {employee.email}</span>
            <span>Home Address: {employee.address}</span>
          </div>
        </div>
      </div>
      <div className="space-x-2">
        <Button onClick={() => navigate("/employees")}>Go Back</Button>
        <Button
          styleName="bg-red-600"
          onClick={() => navigate(`/employees/${employee.empno}/deactivate`)}
        >
          Deactivate
        </Button>
      </div>
    </PageLayout>
  );
}

export default EmployeeDetailPage;
