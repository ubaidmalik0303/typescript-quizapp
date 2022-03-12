import { QuestionType, QuizType } from "../types/questionType";

const shuffleArray = (array: any) => [...array].sort(() => Math.random() - 0.5);

export const getQuizDetails = async (
  totalQuestions: number,
  difficulty: string
): Promise<QuestionType[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${totalQuestions}&category=21&difficulty=${difficulty}&type=multiple`
  );

  let { results } = await res.json();

  console.log(results)

  const quiz: QuestionType[] = results.map((questionObj: QuizType) => {
    return {
      question: questionObj.question,
      answer: questionObj.correct_answer,
      options: shuffleArray(
        questionObj.incorrect_answers.concat(questionObj.correct_answer)
      ),
    };
  });
  return quiz;
};
