function CompanyCard({ name, imageUrl, email }) {
  return (
    <div style={styles.card}>
      <img src={imageUrl} alt={name} style={styles.image} />
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.email}>{email}</p>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '18px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    textAlign: 'center',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '12px',
  },
  name: {
    marginBottom: '8px',
    color: '#1976d2',
  },
  email: {
    color: '#666',
    fontSize: '14px',
  },
}

export default CompanyCard
