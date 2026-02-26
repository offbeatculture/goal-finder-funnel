import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  onCTA: () => void;
}

const steps = [
  { num: "01", name: "CLARITY", desc: "Guided 10-year dream life visualization" },
  { num: "02", name: "BREAKDOWN", desc: "Big vision broken into a 30-day first milestone" },
  { num: "03", name: "GAMIFICATION", desc: "MMIR: Milestones, Meaning, Identity, Rewards" },
  { num: "04", name: "AUTOMATION", desc: "Ritual Recipe — habits that run without willpower" },
];

const painPoints = [
  "You started strong. Quit by Week 2. Again.",
  "Courses at 12%. Planners untouched.",
  "You know what to do. You just do not do it.",
  "Every Monday is a fresh start that leads nowhere.",
];

const faqs = [
  { q: "Is it live?", a: "Yes, live on Zoom. Recording is sent within 24 hours." },
  { q: "Will I get the recording?", a: "Yes, full recording included with your registration." },
  { q: "How long is the workshop?", a: "2.5 hours — from 11 AM to 1:30 PM." },
  { q: "Is it worth ₹99?", a: "The downloadable Goal Hacking Excel Planner alone is worth 10x this." },
  { q: "I have tried goal-setting before. Is this different?", a: "Yes. This is not motivation-based. It is a system install. Four laws, one framework." },
];

const ConversionPage = ({ onCTA }: Props) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-10 space-y-14">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <h1 className="text-[28px] font-extrabold text-foreground leading-tight">
          You have been pushing yourself toward goals your whole life.
        </h1>
        <h2 className="text-[28px] font-extrabold text-primary leading-tight">
          There is a reason it keeps not working.
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          You do not have a discipline problem.
          <br />You have an architecture problem.
          <br />And architecture can be installed.
        </p>
      </motion.section>

      {/* MIRROR */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-foreground">Does this sound familiar?</h3>
        <div className="space-y-3">
          {painPoints.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-4"
            >
              <p className="text-base text-foreground">{p}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground italic">
          That is not laziness. That is a design flaw. And it is fixable.
        </p>
      </section>

      {/* THE SYSTEM */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-primary">The 4-Step Goal Hacking System</h3>
        <div className="space-y-3">
          {steps.map((s) => (
            <div key={s.num} className="bg-card rounded-2xl p-4 flex gap-4 items-start">
              <span className="text-2xl font-extrabold text-primary">{s.num}</span>
              <div>
                <p className="font-bold text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COACH */}
      <section className="space-y-4">
        <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="text-6xl">🎤</span>
        </div>
        <h3 className="text-xl font-bold text-foreground">Ankit Neerav — India's No.1 Life Coach</h3>
        <div className="flex gap-2 flex-wrap">
          {["Tony Robbins Impact Award", "1M+ Students", "₹50 Crore+ Revenue Generated"].map((c) => (
            <span key={c} className="px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-semibold">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* OFFER */}
      <section className="bg-card rounded-2xl p-6 space-y-4">
        <h3 className="text-2xl font-bold text-primary">Goal Hacking Workshop</h3>
        <div className="flex items-baseline gap-3">
          <span className="text-lg text-muted-foreground line-through">₹999</span>
          <span className="text-3xl font-extrabold text-foreground">₹99</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Sunday, March 1 &nbsp;|&nbsp; 11:00 AM to 1:30 PM &nbsp;|&nbsp; Live + Recording Included
        </p>
        <button onClick={onCTA} className="cta-button-large">
          Become a Goal-Hacker
        </button>
        <p className="text-xs text-muted-foreground text-center">
          100% Satisfaction Guaranteed &nbsp;|&nbsp; Limited Seats
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-4 pb-8">
        <h3 className="text-xl font-bold text-foreground">FAQ</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-2xl border-none px-4">
              <AccordionTrigger className="text-foreground text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default ConversionPage;
