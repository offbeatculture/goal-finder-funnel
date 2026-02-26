import { useState } from "react";
import type { Question } from "@/lib/quizData";

interface Props {
  question: Question;
  onAnswer: (index: number) => void;
}

const QuestionScreen = ({ question, onAnswer }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => onAnswer(index), 300);
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-8">
      <h2 className="text-[28px] font-bold text-foreground leading-tight mb-10">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`tile-base ${selected === i ? "tile-selected" : ""}`}
          >
            <span className="text-xl">{answer.emoji}</span>
            <span className="text-lg">{answer.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionScreen;
