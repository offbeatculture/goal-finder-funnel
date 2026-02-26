import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const ReinforcementOne = ({ onContinue }: Props) => {
  const [step, setStep] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => setStep(4), 5200),
      setTimeout(() => setShowBtn(true), 5000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (step < 3) return;
    let c = 0;
    const iv = setInterval(() => {
      c += 2;
      if (c >= 94) {
        c = 94;
        clearInterval(iv);
      }
      setCounter(c);
    }, 32);
    return () => clearInterval(iv);
  }, [step]);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    dur: 5 + Math.random() * 5,
  }));

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-foreground/[0.06]"
          style={{ left: `${p.x}%`, bottom: -4 }}
          animate={{ y: [0, -900], opacity: [0, 0.06, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity }}
        />
      ))}

      <div className="text-center space-y-7 z-10 max-w-sm">
        <AnimatePresence>
          {step >= 1 && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-extrabold text-foreground"
            >
              You're Not Lazy.
            </motion.h1>
          )}
        </AnimatePresence>

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base text-muted-foreground"
          >
            You've started goals a dozen times. You know what comes next.
          </motion.p>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 pt-2"
          >
            <motion.span
              className="text-4xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💡
            </motion.span>
            <div className="text-center">
              <span className="text-5xl font-extrabold text-primary">{counter}%</span>
              <p className="text-sm text-muted-foreground mt-1">
                of people abandon their goals by Week 2.
              </p>
            </div>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-foreground pt-2"
          >
            It's not a character flaw. It's a design flaw.
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {showBtn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-10 left-6 right-6"
          >
            <button onClick={onContinue} className="cta-button">
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReinforcementOne;
