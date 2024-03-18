import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import UserLayout from "./pages/user/UserLayout";
import UserHome from "./pages/user/UserHome";
import AdminHome from "./pages/admin/AdminHome";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminBooks from "./pages/admin/AdminBooks";
import CreateBook from "./pages/admin/CreateBook";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import UserLoans from "./pages/user/UserLoans";
import useUserContext from "./hooks/useUserContext";
import Members from "./pages/admin/Members";

function App() {
  const { user } = useUserContext();

  const member = user?.role === "member" ? true : false;
  const admin = user?.role === "admin" ? true : false;

  return (
    <BrowserRouter>
      <Routes>
        {/* users */}
        <Route path="/" element={<UserLayout />}>
          <Route
            index
            element={member || admin ? <UserHome /> : <Navigate to="/login" />}
          />
          <Route
            path="mybooks"
            element={member || admin ? <UserLoans /> : <Navigate to="/login" />}
          />
          <Route
            path="signup"
            element={!member ? <UserSignup /> : <Navigate to="/mybooks" />}
          />
          <Route
            path="login"
            element={!member ? <UserLogin /> : <Navigate to="/mybooks" />}
          />
        </Route>

        {/* admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route
            index
            element={admin ? <AdminHome /> : <Navigate to="/login" />}
          />
          <Route
            path="books"
            element={admin ? <AdminBooks /> : <Navigate to="/login" />}
          />
          <Route
            path="create"
            element={admin ? <CreateBook /> : <Navigate to="/login" />}
          />
          <Route
            path="members"
            element={admin ? <Members /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
