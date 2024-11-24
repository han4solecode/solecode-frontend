import { useNavigate } from "react-router-dom";

function BookSearchResultCard(props) {
  const { title, isbn, author, category, to } = props;

  const navigate = useNavigate();

  return (
    <div className="w-full h-100 rounded border border-gray-800 my-3 mx-2">
      <div className="flex items-center p-2">
        <img
          src="https://png.pngtree.com/png-vector/20190621/ourmid/pngtree-blank-white-book-cover-png-image_1507801.jpg"
          alt="book cover"
          className="size-1/12 rounded"
        />
        <div className="flex flex-col pl-2">
          <span className="text-xl text-gray-800 hover:text-blue-600">
            <button onClick={() => navigate(to)}>{title}</button>
          </span>
          <span className="text-lg text-gray-500">{author}</span>
          <span className="text-md text-gray-500">{isbn}</span>
          <span className="text-md text-gray-500">{category}</span>
        </div>
      </div>
    </div>
  );
}

export default BookSearchResultCard;
