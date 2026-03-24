import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/home" style={styles.logo}>JobPortal</Link>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/jobs" style={styles.link}>Job Listings</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/companies" style={styles.link}>Company Showcase</Link>
      </div>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#0d47a1",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    textDecoration: "none",
    marginRight: "20px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px"
  },
  logout: {
    backgroundColor: "#ffffff",
    color: "#0d47a1",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Navbar;