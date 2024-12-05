import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployeeProfile } from "../services/employees.service";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PageLayout from "../components/Layouts/PageLayout";

function ProfilePage(props) {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }

    setIsLoading(true);
    getEmployeeProfile()
      .then((res) => {
        console.log(res.data.profile);
        setProfile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return (
    <PageLayout pageTitle="Employee Profile">
      <div className="flex flex-col">
        <span>Name: {profile.name}</span>
        <span>Email: {profile.email}</span>
        <span>Address: {profile.address}</span>
      </div>
    </PageLayout>
  );
}

export default ProfilePage;
