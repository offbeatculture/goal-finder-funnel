import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Analyzing your answers...");

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return p + 1;
      });
    }, 30);

    const t1 = setTimeout(() => setText("Building your Goal Achievement Profile..."), 1500);
    const t2 = setTimeout(onComplete, 3000);

    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-10">
        Ankit Neerav
      </p>

      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-75"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-foreground">
          {progress}%
        </span>
      </div>

      <motion.p
        key={text}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-base text-muted-foreground text-center"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
