import PageLayout from "../components/Layouts/PageLayout";
import Card from "../components/Fragments/Card";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import DataTable from "../components/Fragments/DataTable";
import Button from "../components/Elements/Button";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getKpi, getProcessesToReview } from "../services/dashboard.service";
import { useNavigate } from "react-router-dom";

function HomePage(props) {
  const {} = props;
  const navigate = useNavigate();

  const [activeMembers, setActiveMembers] = useState([]);
  const [booksPerCategoryCount, setBooksPerCategoryCount] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [processToReviewCount, setProcessToReviewCount] = useState(0);
  const [processes, setProcesses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getKpi(), getProcessesToReview()])
      .then((res) => {
        setActiveMembers(res[0].data.activeMembers);
        setBooksPerCategoryCount(res[0].data.booksPerCategoryCount);
        setOverdueBooks(res[0].data.overdueBooks);
        setTotalBooks(res[0].data.totalBooks);
        setProcessToReviewCount(res[0].data.processToReviewCount);

        console.log(res[0].data);
        setProcesses(res[1].data);
      })
      .catch((err) => {
        console.log(err[0], err[1]);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // getKpi()
    //   .then((res) => {
    //     console.log(res);
    //     setActiveMembers(res.data.activeMembers);
    //     setBooksPerCategoryCount(res.data.booksPerCategoryCount);
    //     setOverdueBooks(res.data.overdueBooks);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, []);

  console.log(booksPerCategoryCount);

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

  const overdueBooksTableHeader = [
    "Requester",
    "Book Title",
    "Due Date",
    "Overdue Days",
  ];

  const OverdueBooksTableBody = () => {
    return overdueBooks.length !== 0 ? (
      <tbody>
        {overdueBooks.map((lend) => (
          <tr
            key={lend.lendingId}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{lend.name}</td>
            <td>{lend.title}</td>
            <td>{lend.dueDate}</td>
            <td>{lend.overdueDays} Days</td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr className="bg-slate-500">
          <td colSpan="5" className="text-black text-center text-xl py-10">
            No Data Available
          </td>
        </tr>
      </tbody>
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
                  navigate(`/books/review-request/${proc.processId}`)
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
    <PageLayout pageTitle="Home Page">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Card
            cardTitle="Total Books"
            data={totalBooks}
            cardFooter="Books"
          ></Card>
          <Card
            cardTitle="Total Process To Follow Up"
            data={processToReviewCount}
            cardFooter="Process"
          ></Card>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div
            style={{ height: "400px" }}
            className="border rounded border-gray-400 pb-5"
          >
            <div className="flex items-center justify-center">
              <h3>Most Active Members</h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activeMembers}
                layout="vertical"
                margin={{ right: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="borrowedBookCount" fill="#0d6efd" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{ height: "400px" }}
            className="border rounded border-gray-400 pb-5"
          >
            <div className="flex items-center justify-center">
              <h3>Book Categories</h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={booksPerCategoryCount}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {booksPerCategoryCount.map((entry, index) => (
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
          <div>
            <div
              style={{ height: "400px" }}
              className="border rounded border-gray-400 pb-5 px-2"
            >
              <div className="flex items-center justify-center">
                <h3>Overdue Books</h3>
              </div>
              <DataTable
                header={overdueBooksTableHeader}
                body={<OverdueBooksTableBody />}
              ></DataTable>
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

export default HomePage;
