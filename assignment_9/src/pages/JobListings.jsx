import jobPosts from "../data/jobPosts";
import JobCard from "../components/JobCard";

function JobListings() {
  return (
    <div className="container">
      <h1>Job Listings</h1>
      <p>Browse available positions and find the right role for you.</p>

      <div style={styles.grid}>
        {jobPosts.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            description={job.description}
            lastUpdated={job.lastUpdated}
            applyLink={job.applyLink}
            skills={job.skills}
            salary={job.salary}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px"
  }
};

export default JobListings;