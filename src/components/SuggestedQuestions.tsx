import { motion } from "framer-motion";

const questions = [
  "What are early symptoms of MS?",
  "How is MS diagnosed?",
  "Can exercise help with MS?",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const SuggestedQuestions = ({ onSelect }: SuggestedQuestionsProps) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12">
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
        <span className="text-3xl">💬</span>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">How can I help?</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Ask me anything about Multiple Sclerosis. Here are some questions to get started:
      </p>
      <div className="flex flex-wrap justify-center gap-3 max-w-lg">
        {questions.map((q, i) => (
          <motion.button
            key={q}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            onClick={() => onSelect(q)}
            className="px-5 py-3 rounded-full border border-border bg-card text-foreground text-sm font-medium hover:bg-accent hover:border-primary transition-colors"
          >
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
