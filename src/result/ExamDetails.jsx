import React, { useMemo } from "react";
import ExamSummary from "./ExamSummary";
import QuestionDetails from "./QuestionDetails";

const ExamDetails = React.memo(({ exam, isExpanded, onToggle }) => {
  /* ---------- Derived Data (Memoized) ---------- */
  const { totalQuestions, correctAnswers, totalScore } = useMemo(() => {
    const total = exam.answers.length;

    let correct = 0;
    for (const ans of exam.answers) {
      const correctOption = ans.question.options.find(o => o.isCorrect);
      if (ans.selectedOption === correctOption?.id) {
        correct++;
      }
    }

    return {
      totalQuestions: total,
      correctAnswers: correct,
      totalScore: correct,
    };
  }, [exam.answers]);

  /* ---------- Render ---------- */
  return (
    <div className="exam-result card mb-4 p-3">
      <h4 className="mb-2">
        Exam{" "}
        <small className="text-muted">
          (Submitted: {new Date(exam.submittedAt).toLocaleString()})
        </small>
      </h4>

      <ExamSummary
        totalScore={totalScore}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
      />

      <button
        className="btn btn-info mt-3"
        onClick={() => onToggle(exam._id)}
      >
        {isExpanded ? "Hide Details" : "View Details"}
      </button>

      {isExpanded && (
        <div className="questions mt-4">
          <h5>Questions</h5>

          {exam.answers.map(answer => (
            <QuestionDetails
              key={answer.question._id}
              question={answer.question}
              answer={answer}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ExamDetails;