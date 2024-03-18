import axios from "axios";
import { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import { Link, useNavigate } from "react-router-dom";

// credit https://preline.co/examples.html

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const response = await axios.post("https://backend-url/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      if (response.data.role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-slate-900 flex h-full items-center py-20">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="mt-7  border  rounded-xl shadow-sm bg-gray-800 border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center mb-1">
                <h1 className="block text-2xl font-bold text-white">Log in</h1>
                <p className="mt-2 text-sm text-gray-400 ">
                  Don't have an account yet?
                  <Link
                    to={"/signup"}
                    className="text-blue-600 decoration-2 hover:underline font-medium pl-1"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* <!-- Form --> */}
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="grid gap-y-4 mt-2">
                  {/* <!-- Form Group --> */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2 text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800  text-gray-400"
                        required
                        aria-describedby="email-error"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {/* <!-- End Form Group --> */}

                    {/* <!-- Form Group --> */}
                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-sm my-2 text-white"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800 text-gray-400"
                          required
                          aria-describedby="password-error"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Form Group --> */}

                  {error && <p className="text-red-500">{error}</p>}

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                  >
                    Log in
                  </button>
                </div>
              </form>
              {/* <!-- End Form --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
