import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users.service";
import { getAllBooks } from "../services/books.service";
import { borrowBook } from "../services/lendings.service";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import Button from "../components/Elements/Button";

function BorrowPage(props) {
  const {} = props;
  const navigate = useNavigate();

  const initialValues = {
    userid: "",
    bookids: [],
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getAllUsers(), getAllBooks()])
      .then((res) => {
        setMembers(res[0]);
        setBooks(res[1]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setSelectedBooks([...selectedBooks, value]);
        // setFormValues({ ...formValues, bookids: selectedBooks });
      } else {
        setSelectedBooks((prevData) => {
          return prevData.filter((bookId) => {
            return bookId !== value;
          });
        });
        // setFormValues({ ...formValues, bookids: selectedBooks });
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let errorMessages = {};

    if (!formValues.userid) {
      errorMessages.userid = "Member cannot be empty";
    } else {
      errorMessages.userid = "";
    }

    if (selectedBooks.length === 0) {
      errorMessages.bookids = "Minimum 1 book has to be selected";
    } else if (selectedBooks.length > 3) {
      errorMessages.bookids = "Cannot borrow more than 3 books";
    } else {
      errorMessages.bookids = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      let bookIds = selectedBooks.map((str) => {
        return parseInt(str);
      });
      let borrowData = {
        userid: Number(formValues.userid),
        bookids: bookIds,
      };
      console.log(borrowData);

      borrowBook(borrowData)
        .then((res) => {
          if (res) {
            alert("Books has been borrowed successfully");
            navigate("/return");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("An error has occured");
        });
    }
  };

  //   console.log(formValues);
  //   console.log(selectedBooks);

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
    <PageLayout pageTitle="Borrow Books">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-3">
            <label
              htmlFor="userid"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Member
            </label>
            <select
              name="userid"
              id="userid"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.userid}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Member
              </option>
              {members.map((member) => (
                <option value={member.userid} key={member.userid}>
                  {member.name}
                </option>
              ))}
            </select>
            {errors.userid && (
              <small className="text-red-600">{errors.userid}</small>
            )}
          </div>
          <fieldset className="mb-3">
            <legend className="text-lg">
              Choose books you want to borrow (max 3 books):
            </legend>
            {books.map((book) => (
              <div key={book.bookid}>
                <input
                  type="checkbox"
                  name="bookids"
                  value={book.bookid}
                  onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="bookids" className="ml-2">
                  {book.title}
                </label>
              </div>
            ))}
            {errors.bookids && (
              <small className="text-red-600">{errors.bookids}</small>
            )}
          </fieldset>
          <Button type="submit" onClick={handleFormSubmit}>
            Borrow
          </Button>
        </div>
        {/* <div>Kanan</div> */}
      </div>
    </PageLayout>
  );
}

export default BorrowPage;
