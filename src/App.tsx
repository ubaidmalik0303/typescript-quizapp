import React, { useEffect, useState } from "react";
import "./App.css";
import { getQuizDetails } from "./services/quizService";
import { QuestionType } from "./types/questionType";
import QuestionCard from "./compoents/QuestionCard";

function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);

  const handleSubmit = (
    e: React.FormEvent<EventTarget>,
    selectedAns: string
  ) => {
    e.preventDefault();
    console.log(quiz[currentStep].answer);
    if (selectedAns === quiz[currentStep].answer) {
      setScore(++score);
    }

    if (currentStep !== quiz?.length - 1) {
      setCurrentStep(++currentStep);
    } else {
      setShowResult(true);
    }
  };

  const tryAgain = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const questions: QuestionType[] = await getQuizDetails(5, "hard");
      setQuiz(questions);
    };

    fetchData();
  }, []);

  if (showResult) {
    return (
      <div className="result-box">
        <h1>Result</h1>
        <p>
          Your Total Score: {score} Out Of {quiz.length}
        </p>
        <button onClick={tryAgain}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      <div className="App">
        {quiz.length ? (
          <QuestionCard
            options={quiz[currentStep].options}
            question={quiz[currentStep].question}
            callback={handleSubmit}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}

export default App;
