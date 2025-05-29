import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FaqIcons } from './FaqIcons';

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqSectionProps {
  /** Array of FAQ items to display */
  faqs: FaqItem[];
  /** Optional title for the FAQ section */
  title?: string;
  /** Optional custom class for the container */
  className?: string;
  /** Optional custom class for the title */
  titleClassName?: string;
  /** Optional custom class for the FAQ list */
  listClassName?: string;
  /** Optional custom class for each FAQ item */
  itemClassName?: string;
  /** Optional custom class for the question text */
  questionClassName?: string;
  /** Optional custom class for the answer text */
  answerClassName?: string;
  /** Optional background color */
  bgColor?: string;
  /** Optional maximum width for the content */
  maxWidth?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  title = "Frequently asked questions",
  titleClassName = "text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl",
  listClassName = "mt-16 divide-y divide-gray-900/10",
  maxWidth = "max-w-4xl",
  questionClassName = "text-base/7 font-semibold text-gray-900",
  answerClassName = "mt-2 pr-12 text-base/7 text-gray-600",
  bgColor = "bg-white",
  className = "",
}) => {
  // Don't render if no FAQs are provided
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className={`${bgColor} ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className={`mx-auto ${maxWidth}`}>
          {title && <h2 className={titleClassName}>{title}</h2>}
          <dl className={listClassName}>
            {faqs.map((faq, index) => (
              <Disclosure key={`faq-${index}`} as="div" className={itemClassName}>
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left">
                        <span className={questionClassName}>{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? 
                            <FaqIcons.Minus className="size-6" /> : 
                            <FaqIcons.Plus className="size-6" />
                          }
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className={answerClassName}>
                      {faq.answer}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;