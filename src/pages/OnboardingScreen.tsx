import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Components
import CollaborativeOnboardingStep from '@/components/CollaborativeOnboardingStep';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form'; // Using Form for structure
import { useForm } from 'react-hook-form'; // For form handling

// Icons
import { ArrowRight, CheckCircle, PartyPopper } from 'lucide-react';

const TOTAL_STEPS = 3;

const OnboardingScreen = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  // Using a single form instance for simplicity, can be split if needed
  const form = useForm();

  console.log('OnboardingScreen loaded');

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinish = () => {
    console.log('Onboarding complete. Navigating to dashboard.');
    // Here you would typically submit the form data
    // For now, just a final visual step
    setStep(TOTAL_STEPS + 1);
  };
  
  const handleNavigateToDashboard = () => {
    navigate('/dashboard-screen'); // Navigate to the route defined in App.tsx
  }

  const progressValue = (step <= TOTAL_STEPS) ? (step / (TOTAL_STEPS + 1)) * 100 : 100;

  const slideAnimation = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <h1 className="text-xl font-bold text-gray-800">Welcome to YouthBank UK</h1>
            <span className='text-sm text-muted-foreground'>Step {step > TOTAL_STEPS ? TOTAL_STEPS : step} of {TOTAL_STEPS}</span>
          </div>
          <Progress value={progressValue} className="w-full" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={slideAnimation.initial}
            animate={slideAnimation.animate}
            exit={slideAnimation.exit}
            transition={slideAnimation.transition}
          >
            {step === 1 && (
              <CollaborativeOnboardingStep
                actor="parent"
                title="Guardian Account Setup"
                description="Let's start by creating the parent account. This will be used to fund and oversee the child's account."
              >
                <Form {...form}>
                  <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CollaborativeOnboardingStep>
            )}

            {step === 2 && (
              <CollaborativeOnboardingStep
                actor="child"
                title="Create Your Profile!"
                description="It's your turn! Pick a cool username to get started. This will be your login name."
              >
                <Form {...form}>
                   <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="childUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., SuperSaver24" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center space-x-2 pt-2">
                        <PartyPopper className="h-5 w-5 text-yellow-500" />
                        <p className="text-sm text-muted-foreground">Make it fun and memorable!</p>
                    </div>
                    <Button type="submit" className="w-full">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CollaborativeOnboardingStep>
            )}

            {step === 3 && (
              <CollaborativeOnboardingStep
                actor="parent"
                title="Set the First Rules"
                description="Let's agree on a weekly allowance. This can be changed anytime from your dashboard."
              >
                 <Form {...form}>
                   <form onSubmit={(e) => { e.preventDefault(); handleFinish(); }} className="space-y-4">
                     <FormField
                      control={form.control}
                      name="allowance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weekly Allowance (£)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 10" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-sm text-muted-foreground pt-2">
                      This is the amount that will be automatically transferred to the child's account each week.
                    </p>
                    <Button type="submit" className="w-full">
                      Finish Setup <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CollaborativeOnboardingStep>
            )}
            
            {step === 4 && (
                <Card className="text-center">
                    <CardHeader>
                        <div className='flex justify-center mb-4'>
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl">You're All Set!</CardTitle>
                        <CardDescription className="text-base">Welcome to YouthBank! The account has been created successfully.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className='mb-6'>You are now ready to explore the dashboard and start your financial journey.</p>
                        <Button size="lg" className="w-full" onClick={handleNavigateToDashboard}>
                            Go to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingScreen;