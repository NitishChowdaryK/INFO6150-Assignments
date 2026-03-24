import { useEffect, useState } from 'react'
import { fetchAllUsers } from '../services/api'
import CompanyCard from '../components/CompanyCard'

function CompanyShowcase() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchAllUsers()

        const usersWithImages = (data.users || []).filter(
          (user) => user.imagePath,
        )

        const formattedCompanies = usersWithImages.map((user) => ({
          id: user.email,
          name: user.fullName || 'Company Profile',
          email: user.email,
          imageUrl: `http://localhost:3000${user.imagePath}`,
        }))

        setCompanies(formattedCompanies)
      } catch (err) {
        setError('Failed to load company images.')
      } finally {
        setLoading(false)
      }
    }

    loadCompanies()
  }, [])

  return (
    <div className="container">
      <h1>Company Showcase</h1>
      <p>
        Explore company profiles and image gallery fetched from the backend.
      </p>

      {loading && <p>Loading company showcase...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && companies.length === 0 && (
        <p>No company images available yet.</p>
      )}

      <div style={styles.grid}>
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            name={company.name}
            email={company.email}
            imageUrl={company.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  grid: {
    marginTop: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
}

export default CompanyShowcase
