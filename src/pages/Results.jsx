import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/AxiosInstance";
import ExamDetails from "../result/ExamDetails";

const Results = () => {
  const { token } = useContext(AuthContext);

  const [examResults, setExamResults] = useState([]);
  const [expandedExamId, setExpandedExamId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        const res = await api.get("/results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        setExamResults(res.data.data || []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Error fetching results:", err);
          setError("Failed to load results");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

    return () => controller.abort();
  }, [token]);

  const toggleExamDetails = useCallback((examId) => {
    setExpandedExamId((prev) =>
      prev === examId ? null : examId
    );
  }, []);

  /* ---------- Render States ---------- */

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (examResults.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="exam-results">
      <h3>Exam Results</h3>

      {examResults.map((exam) => (
        <ExamDetails
          key={exam._id}
          exam={exam}
          isExpanded={expandedExamId === exam._id}
          onToggle={toggleExamDetails}
        />
      ))}
    </div>
  );
};

export default Results;