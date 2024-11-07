import PageLayout from "../components/Layouts/PageLayout";
import Card from "../components/Fragments/Card";
import { useEffect, useState } from "react";

function HomePage(props) {
  const {} = props;

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const bookData = JSON.parse(localStorage.getItem("books") || "[]");
    const memberData = JSON.parse(localStorage.getItem("members") || "[]");
    if (bookData && memberData) {
      setBooks(bookData);
      setMembers(memberData);
    }
  }, []);

  const booksCount = books.length;
  const membersCount = members.length;
  console.log(loading);

  return (
    <PageLayout pageTitle="Home Page">
      <div className="flex space-x-4">
        <Card
          cardTitle="Number of Books"
          data={booksCount}
          cardFooter="books"
          isLoading={loading}
        ></Card>
        <Card
          cardTitle="Number of Members"
          data={membersCount}
          cardFooter="members"
          isLoading={loading}
        ></Card>
      </div>
    </PageLayout>
  );
}

export default HomePage;
