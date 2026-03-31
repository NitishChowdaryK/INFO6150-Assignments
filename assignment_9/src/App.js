import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import JobListings from "./pages/JobListings";
import Contact from "./pages/Contact";
import CompanyShowcase from "./pages/CompanyShowcase";
import AdminEmployees from "./pages/AdminEmployees";
import AddJob from "./pages/AddJob";
import Navbar from "./components/Navbar";

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>{children}</div>
    </>
  );
}

function AdminRoute({ children }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (user?.type !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>{children}</div>
    </>
  );
}

function EmployeeRoute({ children }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (user?.type !== "employee") {
    return <Navigate to="/admin/employees" replace />;
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>{children}</div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <EmployeeRoute>
              <About />
            </EmployeeRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <EmployeeRoute>
              <JobListings />
            </EmployeeRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <EmployeeRoute>
              <Contact />
            </EmployeeRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <EmployeeRoute>
              <CompanyShowcase />
            </EmployeeRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <AdminRoute>
              <AdminEmployees />
            </AdminRoute>
          }
        />

        <Route
          path="/add-job"
          element={
            <AdminRoute>
              <AddJob />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;