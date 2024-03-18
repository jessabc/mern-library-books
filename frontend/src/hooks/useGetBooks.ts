import axios from "axios";
import useBooksContext from "./useBooksContext";

const useGetBooks = () => {
  const { dispatch } = useBooksContext();

  const getBooks = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/api/books`);
      dispatch({ type: "SET_BOOKS", payload: response.data });
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  return getBooks;
};

export default useGetBooks;
