import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import { deleteUser, getAllUsers } from "../services/users.service";

function MembersPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddMemberButtonClick = () => {
    navigate("/members/add");
  };

  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let ths = ["Member ID", "Full Name", "Email", "Address", "Action"];

  useEffect(() => {
    setIsLoading(true);
    const fetchMembers = async () => {
      const members = await getAllUsers();
      if (members) {
        setMembers(members);
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleEditMemberButtonClick = (id) => {
    navigate(`/members/edit/${id}`);
  };

  const handleDeleteMember = (id) => {
    if (confirm(`Are you sure you want to delete member ID ${id}?`)) {
      const deleteExistingUser = async (id) => {
        const status = await deleteUser(id);
        if (status === 204) {
          alert(`Book with ID ${id} has been deleted successfully`);
          navigate("/members");
        } else {
          alert("Error! Please try again");
        }
      };

      deleteExistingUser(Number(id));
    } else {
      return;
    }
  };

  const TableBody = () => {
    return members.length !== 0 ? (
      <tbody>
        {members.map((member) => (
          <tr
            key={member.userid}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{member.userid}</td>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>{member.address}</td>
            <td className="space-x-2">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditMemberButtonClick(member.userid)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteMember(member.userid)}
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
    <PageLayout pageTitle="Members Page">
      <Button onClick={handleAddMemberButtonClick} type="button">
        Add a New Member
      </Button>
      <DataTable header={ths} body={<TableBody />}></DataTable>
    </PageLayout>
  );
}

export default MembersPage;
