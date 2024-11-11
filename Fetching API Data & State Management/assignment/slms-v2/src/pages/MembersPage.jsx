import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";

function MembersPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddMemberButtonClick = () => {
    navigate("/members/add");
  };

  const [members, setMembers] = useState([]);

  let ths = [
    "Member ID",
    "Full Name",
    "Email",
    "Gender",
    "Phone Number",
    "Address",
    "Action",
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("members") || "[]");
    if (data) {
      setMembers(data);
    }
  }, []);

  const handleEditMemberButtonClick = (id) => {
    navigate(`/members/edit/${id}`);
  };

  const handleDeleteMember = (id) => {
    if (confirm(`Are you sure you want to delete member ID ${id}?`)) {
      let members = JSON.parse(localStorage.getItem("members"));
      members = members.filter((member) => member.id !== id);
      localStorage.setItem("members", JSON.stringify(members));
      if (members.length === 0) {
        localStorage.removeItem("members");
      }
      setMembers(members);
      alert(`Member with ID ${id} has been deleted successfully`);
    } else {
      return;
    }
  };

  const TableBody = () => {
    return members.length !== 0 ? (
      <tbody>
        {members.map((member) => (
          <tr
            key={member.id}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{member.id}</td>
            <td>{member.fullName}</td>
            <td>{member.email}</td>
            <td>{member.gender}</td>
            <td>{member.phoneNumber}</td>
            <td>{member.address}</td>
            <td className="space-x-2">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditMemberButtonClick(member.id)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteMember(member.id)}
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
