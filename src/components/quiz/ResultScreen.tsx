import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Archetype } from "@/lib/quizData";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTwPzzgnuxnM99svb-wpxDwzfPA-3lZP9cVqLv4hMH0GtKLollq3-tOFZ0jgzug_-vl3zXvo_HBYNs/pub?gid=43987342&single=true&output=csv";

interface Props {
  score: number;
  archetype: Archetype;
  onCTA: () => void;
}

const ResultScreen = ({ score, archetype, onCTA }: Props) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [workshopDate, setWorkshopDate] = useState("");
  const [workshopTime, setWorkshopTime] = useState("");

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.trim().split("\n");
        if (rows.length >= 2) {
          const cols = rows[1].split(",");
          if (cols[0]) setWorkshopDate(cols[0].trim());
          if (cols[1]) setWorkshopTime(cols[1].trim());
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let current = 0;
    const iv = setInterval(() => {
      current += 1;
      if (current >= score) {
        current = score;
        clearInterval(iv);
      }
      setAnimatedScore(current);
    }, 20);
    return () => clearInterval(iv);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col px-6 py-8 overflow-y-auto">

      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-3">
        YOUR GOAL ACHIEVEMENT PERSONALITY
      </p>

      <h1 className="text-3xl font-heading font-extrabold text-foreground mb-6">
        {archetype.name}
      </h1>

      {/* Score bar */}
      <div className="w-full mb-6">
        <div className="relative w-full h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }} />

        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-muted-foreground">LOW</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs font-bold text-primary">

            Score: {animatedScore} / 100
          </motion.span>
          <span className="text-xs text-muted-foreground">HIGH</span>
        </div>
      </div>

      {/* Tag pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <span className="px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-semibold">
          Root Cause: {archetype.rootCause}
        </span>
        <span className="px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-semibold">
          Pattern: {archetype.pattern}
        </span>
      </div>

      {/* Description */}
      <p className="text-lg text-muted-foreground mb-6">
        {archetype.description}
      </p>

      {/* Insight box */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-5 mb-8">
        <p className="text-sm font-bold mb-1">What this means for you:</p>
        <p className="text-sm">{archetype.insight}</p>
      </div>

      <button onClick={onCTA} className="cta-button-large">
        See Your Solution  
      </button>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Goal Hacking Workshop {workshopDate && <>&nbsp;|&nbsp; {workshopDate}</>} {workshopTime && <>&nbsp;|&nbsp; {workshopTime}</>}
      </p>
    </motion.div>);

};

export default ResultScreen;