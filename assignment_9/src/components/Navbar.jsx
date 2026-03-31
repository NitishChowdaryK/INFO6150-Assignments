import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h2 style={styles.logo}>JobPortal</h2>

        {user?.type === 'employee' && (
          <>
            <Link to="/home" style={styles.link}>
              Home
            </Link>
            <Link to="/about" style={styles.link}>
              About
            </Link>
            <Link to="/jobs" style={styles.link}>
              Job Listings
            </Link>
            <Link to="/contact" style={styles.link}>
              Contact
            </Link>
            <Link to="/companies" style={styles.link}>
              Company Showcase
            </Link>
          </>
        )}

        {user?.type === 'admin' && (
          <>
            <Link to="/admin/employees" style={styles.link}>
              Employees
            </Link>
            <Link to="/add-job" style={styles.link}>
              Add Job
            </Link>
          </>
        )}
      </div>

      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: '#0b4ea2',
    color: '#fff',
    padding: '14px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  logo: {
    margin: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#fff',
    color: '#0b4ea2',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}

export default Navbar
