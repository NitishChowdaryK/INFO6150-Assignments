import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container">
      <h1>Welcome to the Job Portal</h1>
      <p>
        Explore exciting opportunities, discover companies, and manage your
        job search journey.
      </p>
      <p>
        Logged in as: <strong>{user?.fullName || user?.email || "User"}</strong>
      </p>
    </div>
  );
}

export default Home;