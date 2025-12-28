import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import StartExamButton from "../services/StartExamButton";
import api from "../services/AxiosInstance";

function StudentDashboard() {
  const { token, authMessage, user } = useContext(AuthContext);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Please log in to view your dashboard.");
      setLoading(false);
      return;
    }

    const fetchExams = async () => {
      try {
        setLoading(true);
        const res = await api.get("/exams/upcoming", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const exams = res.data.data || [];
        exams.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );

        setUpcomingExams(exams);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [token]);

  const handleNavigateResults = useCallback(() => {
    navigate("/student/dashboard/results");
  }, [navigate]);

  const renderExams = useMemo(() => {
    return upcomingExams.map((exam) => {
      const startDate = new Date(exam.startTime);

      return (
        <div key={exam._id} className="card mb-3 shadow-sm border-0">
          <div className="card-body d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">{exam.title}</h5>

              <div className="text-muted small mb-2">
                {startDate.toLocaleDateString()} ·{" "}
                {startDate.toLocaleTimeString()}
              </div>

              <span className="badge bg-info text-dark">
                {exam.duration} mins
              </span>
            </div>

            <StartExamButton examId={exam._id} />
          </div>
        </div>
      );
    });
  }, [upcomingExams]);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-semibold">
          Welcome, {user?.name || "Student"}
        </h2>
        <p className="text-muted mb-0">
          Here’s what’s coming up next.
        </p>
      </div>

      {/* System Messages */}
      {authMessage && (
        <div className="alert alert-warning">{authMessage}</div>
      )}

      <div className="row">
        {/* Exams */}
        <div className="col-lg-8 col-md-12 mb-4">
          <h5 className="mb-3">Upcoming Exams</h5>

          {loading ? (
            <div className="text-muted">Loading exams...</div>
          ) : upcomingExams.length ? (
            renderExams
          ) : (
            <div className="text-muted">No upcoming exams.</div>
          )}
        </div>

        {/* Actions */}
        <div className="col-lg-4 col-md-12">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: 20 }}>
            <div className="card-body">
              <h6 className="mb-3">Quick Actions</h6>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() =>
                    navigate("/student/dashboard/profile")
                  }
                >
                  View Profile
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleNavigateResults}
                >
                  View Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;