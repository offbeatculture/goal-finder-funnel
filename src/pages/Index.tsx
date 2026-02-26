import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { questions, calculateResult } from "@/lib/quizData";
import { trackEvent } from "@/lib/analytics";
import ProgressBar from "@/components/quiz/ProgressBar";
import IntroScreen from "@/components/quiz/IntroScreen";
import QuestionScreen from "@/components/quiz/QuestionScreen";
import ReinforcementOne from "@/components/quiz/ReinforcementOne";
import ReinforcementTwo from "@/components/quiz/ReinforcementTwo";
import ReinforcementThree from "@/components/quiz/ReinforcementThree";
import ReinforcementFour from "@/components/quiz/ReinforcementFour";
import LoadingScreen from "@/components/quiz/LoadingScreen";
import ResultScreen from "@/components/quiz/ResultScreen";
import ConversionPage from "@/components/quiz/ConversionPage";
import RegistrationForm from "@/components/quiz/RegistrationForm";

type Screen =
  | { type: "intro" }
  | { type: "question"; qi: number; qn: number }
  | { type: "reinforcement"; v: 1 | 2 | 3 | 4 }
  | { type: "loading" }
  | { type: "result" }
  | { type: "conversion" }
  | { type: "registration" };

const flow: Screen[] = [
  { type: "intro" },
  { type: "question", qi: 0, qn: 1 },
  { type: "question", qi: 1, qn: 2 },
  { type: "question", qi: 2, qn: 3 },
  { type: "reinforcement", v: 1 },
  { type: "question", qi: 3, qn: 4 },
  { type: "question", qi: 4, qn: 5 },
  { type: "question", qi: 5, qn: 6 },
  { type: "reinforcement", v: 2 },
  { type: "question", qi: 6, qn: 7 },
  { type: "question", qi: 7, qn: 8 },
  { type: "question", qi: 8, qn: 9 },
  { type: "reinforcement", v: 3 },
  { type: "question", qi: 9, qn: 10 },
  { type: "question", qi: 10, qn: 11 },
  { type: "question", qi: 11, qn: 12 },
  { type: "reinforcement", v: 4 },
  { type: "question", qi: 12, qn: 13 },
  { type: "question", qi: 13, qn: 14 },
  { type: "loading" },
  { type: "result" },
  { type: "conversion" },
  { type: "registration" },
];

const Index = () => {
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();

  const s = flow[screen];
  const advance = useCallback(() => setScreen((p) => p + 1), []);

  const handleAnswer = useCallback(
    (i: number) => {
      setAnswers((prev) => [...prev, i]);
      const q = flow[screen] as { qi: number; qn: number };
      trackEvent("question_answered", { question_number: q.qn, answer_selected: i });
      setTimeout(advance, 300);
    },
    [screen, advance]
  );

  const result = answers.length === 14 ? calculateResult(answers) : null;

  const isQ = s.type === "question";
  const slideUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2, ease: "easeOut" },
  };
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="quiz-container flex flex-col min-h-screen">
        {isQ && <ProgressBar current={(s as any).qn} total={14} />}
        <AnimatePresence mode="wait">
          <motion.div key={screen} className="flex-1 flex flex-col" {...(isQ ? slideUp : fadeIn)}>
            {s.type === "intro" && (
              <IntroScreen onStart={() => { trackEvent("quiz_started"); advance(); }} />
            )}
            {s.type === "question" && (
              <QuestionScreen question={questions[(s as any).qi]} onAnswer={handleAnswer} />
            )}
            {s.type === "reinforcement" && s.v === 1 && (
              <ReinforcementOne onContinue={() => { trackEvent("reinforcement_viewed", { reinforcement_number: 1 }); advance(); }} />
            )}
            {s.type === "reinforcement" && s.v === 2 && (
              <ReinforcementTwo onContinue={() => { trackEvent("reinforcement_viewed", { reinforcement_number: 2 }); advance(); }} />
            )}
            {s.type === "reinforcement" && s.v === 3 && (
              <ReinforcementThree onContinue={() => { trackEvent("reinforcement_viewed", { reinforcement_number: 3 }); advance(); }} />
            )}
            {s.type === "reinforcement" && s.v === 4 && (
              <ReinforcementFour onContinue={() => { trackEvent("reinforcement_viewed", { reinforcement_number: 4 }); advance(); }} />
            )}
            {s.type === "loading" && <LoadingScreen onComplete={advance} />}
            {s.type === "result" && result && (
              <ResultScreen score={result.score} archetype={result.archetype} onCTA={() => { trackEvent("cta_clicked"); advance(); }} />
            )}
            {s.type === "conversion" && <ConversionPage onCTA={advance} />}
            {s.type === "registration" && (
              <RegistrationForm onSuccess={() => { trackEvent("payment_success"); navigate("/thank-you"); }} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
