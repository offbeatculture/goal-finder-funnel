import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const confettiColors = [
  "hsl(47, 91%, 53%)",
  "hsl(47, 91%, 70%)",
  "hsl(0, 0%, 100%)",
  "hsl(47, 91%, 40%)",
];

const ThankYou = () => {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      dur: 2 + Math.random() * 2,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: 4 + Math.random() * 6,
    }))
  );

  useEffect(() => {
    document.title = "You're In! — Goal Hacking Workshop";
  }, []);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Confetti */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-sm"
            style={{
              left: `${p.x}%`,
              top: -10,
              width: p.size,
              height: p.size,
              background: p.color,
            }}
            animate={{
              y: [0, window.innerHeight + 20],
              rotate: [0, 360],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              ease: "easeIn",
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-8"
        >
          <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-4xl font-heading font-extrabold text-foreground mb-6 text-center"
        >
          You're In!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center space-y-3"
        >
          <p className="text-lg text-muted-foreground">
            Welcome to the Goal Hacking Workshop.
          </p>
          <p className="text-base text-muted-foreground">
            Check your email and WhatsApp for your joining details.
          </p>
          <p className="text-base text-muted-foreground">
            See you on Sunday at 11 AM!
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-muted-foreground text-center mt-12"
        >
          Ankit Neerav and Team &nbsp;|&nbsp; Offbeat Culture
        </motion.p>
      </div>
    </div>
  );
};

export default ThankYou;
