import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import { useEffect, useState } from "react";

function ProfilePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  //   const [currentUser, setCurrentUser] = useState({});

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  //   useEffect(() => {
  //     setCurrentUser(user);
  //   }, []);

  return (
    <PageLayout pageTitle="Profile Page">
      <div className="flex flex-col">
        <p>
          <strong>Email: </strong> {currentUser?.user?.email}
        </p>
        <strong>Roles</strong>
        <ul>
          {currentUser?.roles &&
            currentUser?.roles?.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
        </ul>
      </div>
    </PageLayout>
  );
}

export default ProfilePage;
