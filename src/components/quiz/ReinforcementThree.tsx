import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const ReinforcementThree = ({ onContinue }: Props) => {
  const [step, setStep] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 2800),
      setTimeout(() => setStep(5), 3800),
      setTimeout(() => setStep(6), 4600),
      setTimeout(() => setShowBtn(true), 5000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="text-center space-y-6 z-10 max-w-sm w-full">
        {/* Brain icon */}
        {step >= 1 && (
          <motion.div
            className="text-6xl relative mx-auto w-fit"
            animate={
              step === 3
                ? { x: [0, -4, 4, -4, 4, 0], transition: { duration: 0.5 } }
                : {}
            }
          >
            {step < 4 ? (
              <span>🧠</span>
            ) : (
              <div className="flex gap-8 items-center">
                <motion.div initial={{ x: 0 }} animate={{ x: -12 }} className="flex flex-col items-center">
                  <span className="text-5xl">🧠</span>
                  <span className="text-sm font-bold text-primary mt-2">PLAN</span>
                </motion.div>
                <motion.div initial={{ x: 0 }} animate={{ x: 12 }} className="flex flex-col items-center">
                  <span className="text-5xl">🧠</span>
                  <span className="text-sm font-bold text-primary mt-2">DO</span>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Labels flying in */}
        {step >= 2 && step < 4 && (
          <div className="flex justify-between">
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-sm font-bold text-muted-foreground"
            >
              RESEARCH
            </motion.span>
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-sm font-bold text-muted-foreground"
            >
              EXECUTE
            </motion.span>
          </div>
        )}

        {step >= 5 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <p className="text-xl font-bold text-foreground">Plan on plan days. Do on do days.</p>
          </motion.div>
        )}

        {step >= 6 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base text-muted-foreground">
            Paralysis disappears.
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

export default ReinforcementThree;
