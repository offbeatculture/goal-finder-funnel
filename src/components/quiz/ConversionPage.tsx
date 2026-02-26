import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, BarChart3, RefreshCw, Copy, Grid3X3, Sparkles } from "lucide-react";
import ankitPhoto from "@/assets/ankit-neerav.webp";
import creativesImg from "@/assets/creatives.png";

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

const inclusions = [
  { icon: Sparkles, text: "Complete Goal Hacking Framework Training" },
  { icon: Target, text: "Guided 10-Year Visualization Exercise" },
  { icon: BarChart3, text: "MMIR Formula Deep Dive" },
  { icon: RefreshCw, text: "Ritual Recipe for Habit Automation" },
  { icon: Copy, text: "Plan-Action Separation Technique" },
  { icon: Grid3X3, text: "Downloadable Goal Hacking Planner (Excel)" },
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
        <h1 className="text-[28px] font-heading font-extrabold text-foreground leading-tight">
          You have been pushing yourself toward goals your whole life.
        </h1>
        <h2 className="text-[28px] font-heading font-extrabold text-primary leading-tight">
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
        <h3 className="text-xl font-heading font-bold text-foreground">Does this sound familiar?</h3>
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
        <h3 className="text-xl font-heading font-bold text-primary">The 4-Step Goal Hacking System</h3>
        <div className="space-y-3">
          {steps.map((s) => (
            <div key={s.num} className="bg-card rounded-2xl p-4 flex gap-4 items-start">
              <span className="text-2xl font-heading font-extrabold text-primary">{s.num}</span>
              <div>
                <p className="font-heading font-bold text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COACH */}
      <section className="space-y-4">
        <div className="w-full rounded-2xl overflow-hidden">
          <img src={ankitPhoto} alt="Ankit Neerav on stage" className="w-full h-auto object-cover" />
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground">Ankit Neerav — India's No.1 Life Coach</h3>
        <div className="flex gap-2 flex-wrap">
          {["Tony Robbins Impact Award", "1M+ Students", "₹50 Crore+ Revenue Generated"].map((c) => (
            <span key={c} className="px-3 py-1.5 rounded-full bg-secondary text-primary text-xs font-semibold">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* OFFER — Redesigned to match reference */}
      <section className="rounded-[24px] overflow-hidden bg-gradient-to-b from-card to-background border border-border">
        {/* Creatives Banner */}
        <div className="w-full pt-6 px-4">
          <img src={creativesImg} alt="Goal Hacking Workshop materials" className="w-full h-auto object-contain" />
        </div>

        {/* Launch Offer Pill */}
        <div className="flex justify-center pt-6">
          <span className="px-5 py-1.5 rounded-full border border-foreground text-foreground text-xs font-heading font-bold tracking-[0.15em] uppercase">
            Launch Offer
          </span>
        </div>

        {/* Title */}
        <h3 className="text-center text-[28px] font-heading font-extrabold text-foreground px-6 pt-4">
          Goal Hacking Workshop
        </h3>

        {/* What's Included Card */}
        <div className="mx-4 mt-6 rounded-2xl bg-card border border-border p-6 space-y-5">
          <p className="text-xs font-heading font-bold tracking-[0.15em] uppercase text-muted-foreground">
            What's Included
          </p>
          <div className="space-y-5">
            {inclusions.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <item.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-base font-semibold text-foreground leading-snug">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Pricing */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground line-through">₹999</p>
            <p className="text-[40px] font-heading font-extrabold text-primary leading-none">₹99</p>
            <p className="text-sm text-muted-foreground">One-time payment • Instant access</p>
          </div>

          {/* CTA */}
          <button onClick={onCTA} className="cta-button-large font-heading">
            Become A Goal-Hacker
          </button>

          {/* Guarantee */}
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p className="text-sm text-muted-foreground">100% Satisfaction Guaranteed</p>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Limited launch pricing • Seats may fill fast
          </p>
        </div>

        <div className="h-6" />
      </section>

      {/* FAQ */}
      <section className="space-y-4 pb-8">
        <h3 className="text-xl font-heading font-bold text-foreground">FAQ</h3>
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
