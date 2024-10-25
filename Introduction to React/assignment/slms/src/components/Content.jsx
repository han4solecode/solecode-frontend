import BookList from "./BookList";
import AddBookForm from "./AddBookForm";

function Content() {
  return (
    <>
      <div className="container d-flex flex-column">
        <BookList></BookList>
        <AddBookForm></AddBookForm>
      </div>
    </>
  );
}

export default Content;
