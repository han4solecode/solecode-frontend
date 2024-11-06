import PageLayout from "../components/Layouts/PageLayout";
import Card from "../components/Fragments/Card";

function HomePage(props) {
  const {} = props;

  return (
    <PageLayout pageTitle="Home Page">
      <div className="flex space-x-4">
        <Card cardTitle="Number of Books" data="69" cardFooter="books"></Card>
        <Card
          cardTitle="Number of Members"
          data="10"
          cardFooter="members"
        ></Card>
      </div>
    </PageLayout>
  );
}

export default HomePage;
