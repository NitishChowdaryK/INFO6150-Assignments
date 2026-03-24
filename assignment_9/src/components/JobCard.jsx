function JobCard({ title, description, lastUpdated, applyLink, skills, salary }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.text}>{description}</p>
      <p style={styles.text}>
        <strong>Required Skills:</strong> {skills}
      </p>
      <p style={styles.text}>
        <strong>Salary:</strong> {salary}
      </p>
      <p style={styles.updated}>{lastUpdated}</p>
      <a href={applyLink} target="_blank" rel="noreferrer" style={styles.link}>
        Apply Now
      </a>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginBottom: "20px"
  },
  title: {
    marginBottom: "10px",
    color: "#1976d2"
  },
  text: {
    marginBottom: "10px",
    lineHeight: "1.5"
  },
  updated: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "12px"
  },
  link: {
    color: "#ffffff",
    backgroundColor: "#1976d2",
    padding: "10px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    display: "inline-block"
  }
};

export default JobCard;