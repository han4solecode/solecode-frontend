import PageLayout from "../components/Layouts/PageLayout";
import Card from "../components/Fragments/Card";
import { useEffect, useState } from "react";

function HomePage(props) {
  const {} = props;

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const bookData = JSON.parse(localStorage.getItem("books") || "[]");
    const memberData = JSON.parse(localStorage.getItem("members") || "[]");
    if (bookData && memberData) {
      setBooks(bookData);
      setMembers(memberData);
    }
  }, []);

  const booksCount = books.length;
  const membersCount = members.length;
  console.log(membersCount);

  return (
    <PageLayout pageTitle="Home Page">
      <div className="grid grid-cols-4 gap-4">
        <Card
          cardTitle="Number of Books"
          data={booksCount}
          cardFooter="books"
        ></Card>
        <Card
          cardTitle="Number of Members"
          data={membersCount}
          cardFooter="members"
        ></Card>
        <Card cardTitle="Ongoing Lendings" data="" cardFooter="lendings"></Card>
      </div>
    </PageLayout>
  );
}

export default HomePage;
