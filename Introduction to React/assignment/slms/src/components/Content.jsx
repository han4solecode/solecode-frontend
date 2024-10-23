import BookList from "./BookList";
import AddBookForm from "./AddBookForm";

function Content() {
  return (
    <>
      <div className="container d-flex">
        <BookList></BookList>
        <AddBookForm></AddBookForm>
      </div>
    </>
  );
}

export default Content;
