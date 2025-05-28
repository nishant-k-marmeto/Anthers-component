import React from "react";
import PageHeadingDesc from "./PageHeadingDesc";
import { GiCheckMark, ClockFadingIcon } from "../icons";

// SVGs for tick (completed) and progress (in-progress)
const TickSVG = () => (
    <GiCheckMark className="bg-gray-100 text-[#2E8B57] w-6 h-6" />
);
const ProgressSVG = () => (
    <ClockFadingIcon className="bg-gray-100 w-6 h-6" />
);
// Step type definition
export type Step = {
  heading: string;
  description?: string;
  button?: React.ReactNode;
  endIcon?: React.ReactNode;
  rightImage?: React.ReactNode; // Right-side image for expanded state
  completed: boolean; // true = completed, false = in-progress
};

interface StepperParentProps {
  heading: string;
  description?: string;
  steps: Step[];
  className?: string;
}

const StepperParent: React.FC<StepperParentProps> = ({ heading, description, steps, className = "" }) => {
  const [expandedIdx, setExpandedIdx] = React.useState<number | null>(null);
  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <div className={`w-full bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <PageHeadingDesc title={heading} description={description} className="mb-0" />
        <span className="text-sm font-medium text-gray-500">{completedCount}/{steps.length} steps completed.</span>
      </div>
      <div className="flex flex-col gap-4">
        {steps.map((step, idx) => {
          const expanded = expandedIdx === idx;
          return (
            <div key={idx} className="relative">
              <div
                className={`relative z-10 transition-all duration-500 ease-out border-0 rounded-xl bg-gray-100 shadow-sm hover:shadow-md ${expanded ? "p-4" : "p-4"}`}
                style={{
                  transitionProperty: "transform, box-shadow, background-color",
                  transitionDuration: "600ms", 
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setExpandedIdx(expanded ? null : idx)}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 z-10">
                    {step.completed ? <TickSVG /> : <ProgressSVG />}
                  </div>
                  <div className="flex-1 flex items-center min-h-8">
                    <span className="font-normal text-lg text-gray-900">{step.heading}</span>
                  </div>
                  
                  {expanded && step.endIcon && (
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 mr-2">
                      {step.endIcon}
                    </div>
                  )}
                </div>
                <div 
                  className={`overflow-hidden transition-all pl-12 ${
                    expanded ? 'max-h-96 opacity-100 pt-4 translate-y-0' : 'max-h-0 opacity-0 pt-0 -translate-y-4'
                  }`}
                  style={{ 
                    transform: expanded ? 'translateY(0)' : 'translateY(-8px)',
                    transitionProperty: "max-height, opacity, padding, transform",
                    transitionDuration: "650ms", 
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDelay: expanded ? "50ms" : "0ms"
                  }}
                >
                  <div className="flex flex-row items-start">
                    <div className="flex-1">
                      {step.description && <div className="text-gray-500 text-sm mb-2">{step.description}</div>}
                      {step.button && <div className="mt-2 mb-4">{step.button}</div>}
                    </div>
                    
                    {step.rightImage && (
                      <div 
                        className="flex-shrink-0 ml-4 w-48 h-32 -mt-2"
                        style={{
                          opacity: expanded ? 1 : 0,
                          transform: expanded ? 'translateX(0)' : 'translateX(20px)',
                          transition: "opacity 750ms ease-out, transform 750ms ease-out",
                          transitionDelay: expanded ? "150ms" : "0ms"
                        }}
                      >
                        <div className="w-full h-full overflow-hidden">
                          {step.rightImage}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { StepperParent };

/**
 * ===================== USAGE EXAMPLE =====================
 *
 * import { StepperParent } from "./DefaultStepper";
 * import Button from "../ui/button/Button";
 *
 * const steps = [
 *   {
 *     heading: "Send email campaign to your repeat customers",
 *     description: "Let your customers know about your new offers.",
 *     button: <Button variant="primary">Send Email</Button>,
 *     completed: false,
 *   },
 *   {
 *     heading: "Offer customers to build a box",
 *     description: "Let customers create build a box and increase your AOV.",
 *     button: <Button variant="primary">Create Box</Button>,
 *     completed: false,
 *   },
 *   {
 *     heading: "Upsell products on subscription portal.",
 *     completed: true,
 *   },
 *   {
 *     heading: "Set up a cart upsell to convert one time buyers into subscribers.",
 *     completed: true,
 *   },
 * ];
 *
 * <StepperParent
 *   heading="Get Started with Sangraha AI"
 *   description="Follow these steps to unlock the full potential of your data."
 *   steps={steps}
 * />
 *
 * // You can add more steps or update the 'completed' boolean to control progress.
 */
