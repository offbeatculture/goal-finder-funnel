export interface Question {
  text: string;
  answers: { emoji: string; text: string }[];
}

export const questions: Question[] = [
  {
    text: "How do your goals usually start?",
    answers: [
      { emoji: "🔥", text: "Huge excitement" },
      { emoji: "📋", text: "Careful planning" },
      { emoji: "😐", text: "Meh, we'll see" },
      { emoji: "🤷", text: "They don't start" },
    ],
  },
  {
    text: "What happens by Week 2?",
    answers: [
      { emoji: "💪", text: "Still going strong" },
      { emoji: "🐌", text: "Slowing down" },
      { emoji: "🚪", text: "Already quit" },
      { emoji: "❓", text: "What goal?" },
    ],
  },
  {
    text: "Why does it fall apart?",
    answers: [
      { emoji: "🏃", text: "Life gets busy" },
      { emoji: "😔", text: "Lost motivation" },
      { emoji: "😴", text: "It felt boring" },
      { emoji: "🤔", text: "No idea" },
    ],
  },
  {
    text: "When you miss a day, you think:",
    answers: [
      { emoji: "🔄", text: "I'll catch up" },
      { emoji: "😩", text: "I'm hopeless" },
      { emoji: "😌", text: "It's fine" },
      { emoji: "🏳️", text: "I give up" },
    ],
  },
  {
    text: "How many unfinished courses do you own?",
    answers: [
      { emoji: "✅", text: "Zero" },
      { emoji: "📚", text: "1 to 2" },
      { emoji: "📦", text: "3 to 5" },
      { emoji: "😬", text: "Too many" },
    ],
  },
  {
    text: "The daily work toward your goal feels:",
    answers: [
      { emoji: "⚡", text: "Exciting" },
      { emoji: "😑", text: "Okay-ish" },
      { emoji: "😤", text: "A chore" },
      { emoji: "😰", text: "Overwhelming" },
    ],
  },
  {
    text: "Your relationship with plans:",
    answers: [
      { emoji: "❤️", text: "Love making them" },
      { emoji: "🙈", text: "Avoid them" },
      { emoji: "📝", text: "Make and ignore" },
      { emoji: "🤷", text: "What plans?" },
    ],
  },
  {
    text: "When starting a project, you:",
    answers: [
      { emoji: "🚀", text: "Jump straight in" },
      { emoji: "🔍", text: "Research first" },
      { emoji: "🔀", text: "Both at once" },
      { emoji: "🧊", text: "Get stuck" },
    ],
  },
  {
    text: "Plans vs results — your ratio:",
    answers: [
      { emoji: "🏆", text: "More results" },
      { emoji: "⚖️", text: "About equal" },
      { emoji: "📊", text: "More plans" },
      { emoji: "🚫", text: "Neither" },
    ],
  },
  {
    text: "Honestly — you'd call yourself:",
    answers: [
      { emoji: "💎", text: "Disciplined" },
      { emoji: "🔧", text: "Working on it" },
      { emoji: "⏰", text: "A procrastinator" },
      { emoji: "🔄", text: "Inconsistent" },
    ],
  },
  {
    text: "Your goals feel like they are:",
    answers: [
      { emoji: "🧲", text: "Pulling me forward" },
      { emoji: "🌌", text: "Far away" },
      { emoji: "😨", text: "Scary" },
      { emoji: "💥", text: "Pressure" },
    ],
  },
  {
    text: "You reward yourself when you hit a milestone?",
    answers: [
      { emoji: "🎉", text: "Always" },
      { emoji: "🤏", text: "Sometimes" },
      { emoji: "😶", text: "Rarely" },
      { emoji: "💭", text: "Never thought of it" },
    ],
  },
  {
    text: "Your life 10 years from now feels:",
    answers: [
      { emoji: "🔮", text: "Crystal clear" },
      { emoji: "🌫️", text: "A bit vague" },
      { emoji: "❓", text: "Hard to imagine" },
      { emoji: "⏳", text: "Too far away" },
    ],
  },
  {
    text: "One change that would fix everything:",
    answers: [
      { emoji: "🎯", text: "Consistency" },
      { emoji: "💡", text: "Clarity" },
      { emoji: "🛡️", text: "Discipline" },
      { emoji: "⚙️", text: "The right system" },
    ],
  },
];

export interface Archetype {
  name: string;
  description: string;
  insight: string;
  rootCause: string;
  pattern: string;
}

export const archetypeList: Archetype[] = [
  {
    name: "THE VISIONARY DREAMER",
    description: "You have a powerful dream. The bridge to Monday morning is missing.",
    insight: "Your fix is the 10-Year Visualization + Plan-Action Separation.",
    rootCause: "Dream-Reality Gap",
    pattern: "5+ Years",
  },
  {
    name: "THE MOTIVATED QUITTER",
    description: "Your excitement is real. But borrowed fuel always runs out.",
    insight: "Your fix is the MMIR Formula — it replaces motivation with a pull system.",
    rootCause: "Task-Goal Mismatch",
    pattern: "3+ Years",
  },
  {
    name: "THE MASTER PLANNER",
    description: "More plans than most people have attempts. Execution is the gap.",
    insight: "Your fix is Plan-Action Separation — it unlocks output that is already there.",
    rootCause: "Plan-Action Overlap",
    pattern: "2+ Years",
  },
  {
    name: "THE OVERWHELMED STRIVER",
    description: "10 goals. Zero traction. Sprinting everywhere, arriving nowhere.",
    insight: "Your fix is one goal plus MMIR — more life change than ten scattered goals.",
    rootCause: "Goal Overload",
    pattern: "4+ Years",
  },
  {
    name: "THE STUCK RESTARTER",
    description: "You have tried everything. Each failed attempt quietly costs you belief.",
    insight: "Your fix is Goal Hacking — it addresses all 4 layers that others miss.",
    rootCause: "System Failure",
    pattern: "5+ Years",
  },
];

export function calculateResult(answers: number[]) {
  const rawScore = answers.reduce((sum, a) => sum + (a + 1), 0);
  const displayScore = Math.round(((56 - rawScore) / 42) * 100);
  const clampedScore = Math.max(0, Math.min(100, displayScore));

  let archetype: Archetype;
  if (clampedScore >= 75) archetype = archetypeList[0];
  else if (clampedScore >= 55) archetype = archetypeList[1];
  else if (clampedScore >= 40) archetype = archetypeList[2];
  else if (clampedScore >= 25) archetype = archetypeList[3];
  else archetype = archetypeList[4];

  return { score: clampedScore, archetype };
}
