import React, { useState } from "react";
import "./QuestionCard.css";
import { QuestionPropType } from "../types/questionType";

const QuestionCard: React.FC<QuestionPropType> = ({
  question,
  options,
  callback,
}) => {
  const [selectedAns, setSelectedAns] = useState("");

  const handleSelection = (e: any) => {
    setSelectedAns(e.target.value);
  };

  return (
    <div className="question-container">
      <h3 className="question">{question}</h3>
      <form
        className="options"
        onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}
      >
        {options.map((option: string, index: number) => {
          return (
              <label className="option" key={index}>
                <input
                  onChange={handleSelection}
                  required
                  checked={selectedAns === option}
                  type="radio"
                  name="option"
                  value={option}
                />
                {" " + option}
              </label>
          );
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default QuestionCard;
