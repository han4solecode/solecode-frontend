import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function UnauthorizedPage(props) {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-center h-screen gap-2">
        <p className="text-2xl">You are unauthorized to access this page.</p>
        <Button onClick={() => navigate("/dashboard")}>Go to dashboard</Button>
      </div>
    </PageLayout>
  );
}

export default UnauthorizedPage;
