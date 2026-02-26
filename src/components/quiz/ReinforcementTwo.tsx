import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const ReinforcementTwo = ({ onContinue }: Props) => {
  const [step, setStep] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2800),
      setTimeout(() => setStep(4), 3800),
      setTimeout(() => setStep(5), 4800),
      setTimeout(() => setShowBtn(true), 5000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="text-center space-y-6 z-10 max-w-sm w-full">
        {/* Split visual */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full gap-0 relative h-40 mb-4"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-2 rounded-l-2xl" style={{ background: "hsl(var(--primary) / 0.08)" }}>
              <span className="text-3xl">🏠</span>
              <span className="text-2xl">🚗</span>
              <span className="text-2xl">💪</span>
            </div>
            {/* Crack line */}
            {step >= 2 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary origin-top"
                style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary)))" }}
              />
            )}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 rounded-r-2xl bg-secondary">
              <span className="text-3xl">⏰</span>
              <span className="text-2xl">🏋️</span>
              <span className="text-2xl">💻</span>
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
            <p className="text-xl font-bold text-foreground">Your goal feels amazing.</p>
            <p className="text-xl font-bold text-foreground">The work feels terrible.</p>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary text-primary-foreground rounded-2xl py-3 px-5"
          >
            <p className="font-bold text-lg">That gap is killing your goals.</p>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-muted-foreground">
            It's called the Task-Goal Mismatch. And it's fixable.
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

export default ReinforcementTwo;
