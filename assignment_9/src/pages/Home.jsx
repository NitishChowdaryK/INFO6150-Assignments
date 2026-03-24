function Home() {
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="container">
      <h1>Welcome to the Job Portal</h1>
      <p>
        Explore exciting opportunities, discover companies, and manage your
        job search journey.
      </p>
      <p>
        Logged in as: <strong>{userEmail}</strong>
      </p>
    </div>
  );
}

export default Home;