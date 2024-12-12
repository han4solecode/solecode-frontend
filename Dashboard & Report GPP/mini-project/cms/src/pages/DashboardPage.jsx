import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Card from "../components/Fragments/Card";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import DataTable from "../components/Fragments/DataTable";
import Button from "../components/Elements/Button";
import { getAllEmployeesNoPaging } from "../services/employees.service";
import { getAllDepartmentNoPaging } from "../services/departments.service";
import { getAllProjectsNoPaging } from "../services/projects.service";
import { getAllAssignmentsNoPaging } from "../services/assignments.service";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { getKpi, getProcessesToReview } from "../services/dashboard.service";

function DashboardPage(props) {
  const {} = props;
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [averageSalaryPerDepartment, setAverageSalaryPerDepartment] = useState(
    []
  );
  const [employeeDistribution, setEmployeeDistribution] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);

    if (!user) {
      navigate("/login");
    }

    setLoading(true);
    Promise.all([
      getAllEmployeesNoPaging(),
      getAllDepartmentNoPaging(),
      getAllProjectsNoPaging(),
      getAllAssignmentsNoPaging(),
    ])
      .then((res) => {
        setEmployees(res[0].data);
        setDepartments(res[1].data);
        setProjects(res[2].data);
        setAssignments(res[3].data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([getKpi(), getProcessesToReview()])
      .then((res) => {
        console.log(res[0].data);
        console.log(res[1].data);

        setAverageSalaryPerDepartment(res[0].data.averageSalaryPerDepartment);
        setEmployeeDistribution(res[0].data.employeeDistribution);
        setTopEmployees(res[0].data.topEmployees);
        setProcesses(res[1].data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const processToReviewTableHeader = [
    "Process ID",
    "Request Date",
    "Requester",
    "Workflow",
    "Status",
    "Action",
  ];

  const ProcessToReviewTableBody = () => {
    return processes.length !== 0 ? (
      <tbody>
        {processes.map((proc) => (
          <tr
            key={proc.processId}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{proc.processId}</td>
            <td>{proc.requestDate}</td>
            <td>{proc.requester}</td>
            <td>{proc.workflow}</td>
            <td>
              <span
                className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                  proc.status.includes("Pending")
                    ? "bg-yellow-200 text-yellow-800"
                    : proc.status.includes("Approve")
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {proc.status}
              </span>
            </td>
            <td className="flex justify-center p-1 items-center">
              <Button
                onClick={() =>
                  navigate(
                    `/employees/requests/${
                      proc.workflow.split(" ")[0]
                    }/review/${proc.processId}`
                  )
                }
              >
                Review
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr className="bg-slate-500">
          <td colSpan="6" className="text-black text-center text-xl py-10">
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
    <PageLayout pageTitle="Dashboard">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div
            style={{ height: "400px" }}
            className="border rounded border-gray-400 pb-5"
          >
            <div className="flex items-center justify-center">
              <h3>Average Salary Per Department</h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={averageSalaryPerDepartment}
                layout="vertical"
                margin={{ right: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" width={50} />
                <Tooltip />
                <Bar
                  dataKey="averageSalary"
                  name="Average Salary"
                  fill="#1f2937"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{ height: "400px" }}
            className="border rounded border-gray-400 pb-5"
          >
            <div className="flex items-center justify-center">
              <h3>Employee Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employeeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {employeeDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{ height: "400px" }}
            className="border rounded border-gray-400 pb-5"
          >
            <div className="flex items-center justify-center mb-3">
              <h3>Top 5 Employees</h3>
            </div>
            <div className="mx-3">
              {topEmployees.map((emp) => (
                <div className="flex justify-between mb-2">
                  <span>{emp.name}</span>
                  <span>{emp.workingHour} Hours</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border rounded border-gray-400 pb-5 px-2">
          <div className="flex items-center justify-center">
            <h3>Your Tasks</h3>
          </div>
          <DataTable
            header={processToReviewTableHeader}
            body={<ProcessToReviewTableBody />}
          ></DataTable>
        </div>
      </div>
    </PageLayout>
  );
}

export default DashboardPage;
