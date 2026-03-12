import { AlertTriangle } from "lucide-react";

const DisclaimerBanner = () => {
  return (
    <div className="bg-disclaimer border-b border-border px-4 py-2.5 flex items-center gap-2 text-sm text-foreground">
      <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0" />
      <span>
        This tool provides informational support and does not replace medical advice.
      </span>
    </div>
  );
};

export default DisclaimerBanner;
