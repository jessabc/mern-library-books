import axios from "axios";
import { useEffect } from "react";
import useUserContext from "../../hooks/useUserContext";
import { Link } from "react-router-dom";
import useLoansContext from "../../hooks/useLoansContext";
import LoansDataTable from "../../components/user/LoansDataTable";

const UserLoans = () => {
  const { user } = useUserContext();
  const { loans, dispatch } = useLoansContext();

  useEffect(() => {
    const getUserLoans = async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/api/members/loans`,
          headers
        );
        dispatch({ type: "SET_LOANS", payload: response.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.message);
        }
      }
    };

    getUserLoans();
  }, []);

  return (
    <div className="m-5">
      {loans?.length > 0 ? (
        <LoansDataTable loans={loans} />
      ) : (
        <p>
          {" "}
          You do not have any current loans. Go check out some{" "}
          <Link to="/" className="text-slate-500 font-semibold">
            books
          </Link>
        </p>
      )}
    </div>
  );
};

export default UserLoans;
