import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ExamInterfaceContent from "./ExamInterfaceContent";
import api from "../services/AxiosInstance";

const ExamInterface = () => {
  const { examId } = useParams();
  const { token } = useContext(AuthContext);

  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !examId) return;

    const controller = new AbortController();

    const fetchExamData = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.post(
          `/exam-taking/start/${examId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        setExamData(data.data.exam);
      } catch (err) {
        if (err.name === "CanceledError") return;

        console.error("Exam start failed:", err);
        setError(
          err.response?.data?.message ||
          "Unable to start exam. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();

    return () => controller.abort();
  }, [examId, token]);

  /* ---------- Render States ---------- */

  if (loading) {
    return <p>Initializing exam...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!examData) {
    return <p>Exam data unavailable.</p>;
  }

  return <ExamInterfaceContent examData={examData} />;
};

export default ExamInterface;