import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: Props) => {
  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-8">
            Ankit Neerav
          </p>
        </div>

        <h1 className="text-4xl font-heading font-extrabold text-foreground leading-tight text-center">
          Why do your goals keep falling apart?
        </h1>

        <p className="text-lg text-muted-foreground text-center">
          Take this 90-second quiz to find out exactly what's stopping you — and what to do about it.
        </p>

        <button onClick={onStart} className="cta-button-large mt-6 font-heading">
          Find Out Now
        </button>

        <p className="text-sm text-muted-foreground text-center">
          14 questions. Free. Takes 90 seconds.
        </p>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
