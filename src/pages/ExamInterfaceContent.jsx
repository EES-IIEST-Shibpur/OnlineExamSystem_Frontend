import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/AxiosInstance";
import "../styles/ExamInterfaceContent.css";

const ExamInterfaceContent = ({ examData }) => {
  const { examId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ---------------- Persistent Exam End Time ---------------- */
  const endTimeRef = useRef(() => {
    const stored = localStorage.getItem(`exam_${examId}_endTime`);
    const endTime = stored
      ? Number(stored)
      : new Date(examData.endTime).getTime();

    localStorage.setItem(`exam_${examId}_endTime`, endTime);
    return endTime;
  });

  /* ---------------- Core States ---------------- */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(() =>
    Math.max(0, Math.floor((endTimeRef.current() - Date.now()) / 1000))
  );

  const [answers, setAnswers] = useState(() => {
    const stored = localStorage.getItem(`exam_${examId}_answers`);
    return stored ? JSON.parse(stored) : [];
  });

  /* ---------------- Derived States ---------------- */
  const answeredQuestions = useMemo(() => {
    return new Set(
      answers.map((a) =>
        examData.questions.findIndex((q) => q._id === a.questionId)
      )
    );
  }, [answers, examData.questions]);

  const currentQuestion = useMemo(() => {
    const q = examData.questions[currentQuestionIndex];
    return {
      ...q,
      selectedOption: answers.find(
        (a) => a.questionId === q._id
      )?.selectedOption,
    };
  }, [currentQuestionIndex, answers, examData.questions]);

  /* ---------------- Timer Effect ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((endTimeRef.current() - Date.now()) / 1000)
      );

      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        handleSubmit(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- Persist Answers ---------------- */
  useEffect(() => {
    localStorage.setItem(
      `exam_${examId}_answers`,
      JSON.stringify(answers)
    );
  }, [answers, examId]);

  /* ---------------- Handlers ---------------- */
  const handleOptionChange = (optionId) => {
    setAnswers((prev) => [
      ...prev.filter(
        (a) => a.questionId !== currentQuestion._id
      ),
      {
        questionId: currentQuestion._id,
        selectedOption: optionId,
      },
    ]);
  };

  const handleSubmit = async (auto = false) => {
    try {
      await api.post(
        "/exam-taking/submit",
        { examId, answers },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem(`exam_${examId}_answers`);
      localStorage.removeItem(`exam_${examId}_endTime`);

      if (!auto) alert("Exam submitted successfully");
      navigate("/student/dashboard");
    } catch (err) {
      console.error("Submission failed:", err);
      if (!auto)
        alert(err.response?.data?.message || "Submission failed");
    }
  };

  /* ---------------- Utils ---------------- */
  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  /* ---------------- Render ---------------- */
  return (
    <div className="exam-interface">
      <header className="exam-header">
        <h1>{examData.title}</h1>
        <div className="timer">{formatTime(timeRemaining)}</div>
      </header>

      <section className="question-section">
        <h3>
          Question {currentQuestionIndex + 1}: {currentQuestion.text}
        </h3>

        {currentQuestion.options.map((opt) => (
          <label key={opt._id} className="option">
            <input
              type="radio"
              checked={currentQuestion.selectedOption === opt._id}
              onChange={() => handleOptionChange(opt._id)}
            />
            {opt.text}
          </label>
        ))}
      </section>

      <nav className="navigation">
        <button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((i) => i - 1)}
        >
          Previous
        </button>

        <button
          disabled={
            currentQuestionIndex === examData.questions.length - 1
          }
          onClick={() => setCurrentQuestionIndex((i) => i + 1)}
        >
          Next
        </button>

        <button className="submit" onClick={() => handleSubmit(false)}>
          Submit
        </button>
      </nav>

      <div className="question-navigation">
        {examData.questions.map((_, i) => (
          <button
            key={i}
            className={answeredQuestions.has(i) ? "answered" : ""}
            onClick={() => setCurrentQuestionIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamInterfaceContent;