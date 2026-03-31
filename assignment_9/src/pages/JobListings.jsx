import { useEffect, useState } from "react";
import { fetchAllJobs } from "../services/api";

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetchAllJobs();
        setJobs(response.jobs || []);
      } catch (err) {
        setError(err.response?.data?.details || "Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="container">
      <h1>Job Listings</h1>
      <p>Browse all available job opportunities.</p>

      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div style={styles.grid}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} style={styles.card}>
                <h2 style={styles.title}>{job.jobTitle}</h2>
                <p><strong>Company:</strong> {job.companyName}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "12px",
    color: "#0b4ea2",
  },
};

export default JobListings;