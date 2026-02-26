import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const negativeWords = ["PROCRASTINATOR", "QUITTER", "INCONSISTENT", "LAZY", "STUCK"];
const positiveWords = ["FINISHER", "BUILDER", "CONSISTENT", "GOAL-HACKER", "UNSTOPPABLE"];

const ReinforcementFour = ({ onContinue }: Props) => {
  const [step, setStep] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => setStep(4), 5500),
      setTimeout(() => setStep(5), 6500),
      setTimeout(() => setShowBtn(true), 5000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="text-center space-y-8 z-10 max-w-sm w-full">
        {/* Silhouette */}
        <motion.div
          className="mx-auto w-24 h-32 rounded-t-full border-2 relative flex items-center justify-center overflow-hidden"
          style={{
            borderColor: step >= 3 ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.3)",
            boxShadow: step >= 3 ? "0 0 20px hsl(var(--primary) / 0.3)" : "none",
          }}
        >
          <span className="text-5xl opacity-40">🧍</span>
          {/* Words floating through */}
          {step >= 1 && step < 2 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              {negativeWords.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.5, y: -20 }}
                  transition={{ duration: 1.5, delay: i * 0.3 }}
                  className="text-[10px] font-bold text-muted-foreground"
                >
                  {w}
                </motion.span>
              ))}
            </div>
          )}
          {step >= 3 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              {positiveWords.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="text-[10px] font-bold text-primary"
                >
                  {w}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>

        {step >= 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="text-xl font-bold text-foreground">You don't need more willpower.</p>
            <p className="text-xl font-bold text-foreground">You need a new identity.</p>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
            The Goal Hacking system installs it.
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {showBtn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-10 left-6 right-6">
            <button onClick={onContinue} className="cta-button">Continue</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReinforcementFour;
