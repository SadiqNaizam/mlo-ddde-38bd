import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShieldCheck } from 'lucide-react';

type Actor = 'parent' | 'child';

interface CollaborativeOnboardingStepProps {
  /** The actor this step is for, determines the visual theme. */
  actor: Actor;
  /** The main title of the onboarding step. */
  title: string;
  /** A brief description or instruction for the step. */
  description: string;
  /** The interactive content for the step, e.g., form fields. */
  children: React.ReactNode;
  /** Optional additional class names. */
  className?: string;
}

const actorConfig: Record<Actor, { icon: React.ReactElement; label: string; themeClasses: string }> = {
  parent: {
    icon: <ShieldCheck className="h-6 w-6 text-blue-700" />,
    label: "For the Parent",
    themeClasses: 'bg-blue-50/50 border-blue-200'
  },
  child: {
    icon: <User className="h-6 w-6 text-green-700" />,
    label: "Your Turn!",
    themeClasses: 'bg-green-50/50 border-green-200'
  }
};

const CollaborativeOnboardingStep: React.FC<CollaborativeOnboardingStepProps> = ({
  actor,
  title,
  description,
  children,
  className
}) => {
  console.log(`CollaborativeOnboardingStep loaded for: ${actor}`);

  const { icon, label, themeClasses } = actorConfig[actor];

  return (
    <Card className={cn('w-full transition-all duration-300', themeClasses, className)}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner">
            {icon}
          </div>
          <span className="text-lg font-semibold text-gray-800">{label}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="pl-16">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="mt-1 text-base">
            {description}
          </CardDescription>
          <div className="mt-6">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborativeOnboardingStep;