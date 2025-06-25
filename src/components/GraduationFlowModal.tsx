import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, PartyPopper, ShieldCheck, FileText, Star } from 'lucide-react';

interface GraduationFlowModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
}

const slideAnimation = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

const GraduationFlowModal: React.FC<GraduationFlowModalProps> = ({
  isOpen,
  onOpenChange,
  userName,
}) => {
  const [step, setStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('GraduationFlowModal loaded');
  }, []);

  const handleNextStep = () => setStep((prev) => prev + 1);

  const handleFinish = () => {
    if (agreedToTerms) {
      console.log('User graduated to adult account.');
      onOpenChange(false);
      navigate('/dashboard-screen');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ duration: 0.8, type: 'spring' }}>
              <PartyPopper className="h-24 w-24 text-yellow-400 mb-6" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Happy 18th Birthday, {userName}!</h2>
            <p className="text-lg text-muted-foreground mb-8">You're officially an adult, and your account is ready to grow with you.</p>
            <Button size="lg" onClick={handleNextStep}>
              Let's Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Unlock Your Financial Freedom</h2>
            <p className="text-center text-muted-foreground mb-10">Here are some of the new features you're unlocking:</p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-4"><Star className="h-6 w-6 text-yellow-500 flex-shrink-0" /> Full control over your funds & transfers.</li>
              <li className="flex items-center gap-4"><Star className="h-6 w-6 text-yellow-500 flex-shrink-0" /> Access to new investment opportunities.</li>
              <li className="flex items-center gap-4"><Star className="h-6 w-6 text-yellow-500 flex-shrink-0" /> Higher transaction limits.</li>
              <li className="flex items-center gap-4"><Star className="h-6 w-6 text-yellow-500 flex-shrink-0" /> Parental oversight is now removed.</li>
            </ul>
            <Button size="lg" onClick={handleNextStep} className="mt-12 w-full">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
             <ShieldCheck className="h-24 w-24 text-green-500 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Final Confirmation</h2>
            <p className="text-muted-foreground mb-8">As you're now legally an adult, we just need you to agree to the updated Terms of Service for your new account type.</p>
            <div className="p-4 border rounded-md h-48 overflow-y-auto bg-muted/50 text-sm text-left mb-6">
              <p className="font-bold mb-2">Updated Terms of Service:</p>
              <p>By clicking "I Agree & Finish", you acknowledge that you are 18 years of age or older. You agree to the updated YouthBank UK terms, which grant you full and sole responsibility for your account. Parental controls and oversight will be permanently removed. You will gain access to all standard banking features, including but not limited to overdrafts (subject to eligibility), investment products, and higher transaction limits. Please read the full terms and conditions document available on our website for complete details. This transition is final and marks your graduation to a full YouthBank UK adult account.</p>
            </div>
            <div className="flex items-center space-x-2 mb-8">
              <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} />
              <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I have read and agree to the new terms.
              </label>
            </div>
            <Button size="lg" onClick={handleFinish} disabled={!agreedToTerms} className="w-full">
               I Agree & Finish Setup
            </Button>
          </div>
        );
      case 4:
         return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <FileText className="h-24 w-24 text-blue-500 mb-6" />
            <h2 className="text-4xl font-bold mb-2">You're All Set!</h2>
            <p className="text-lg text-muted-foreground mb-8">Welcome to the next chapter of your financial journey. Your new dashboard awaits.</p>
            <Button size="lg" onClick={handleFinish}>
              Explore My New Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // This is for the final "success" step which is not part of the main flow
    // but a state reached after finishing. We can set it to 4 on successful completion.
    // For now, let's keep it simple. If we finish on step 3, we navigate away.
    // To make a final screen, we'd set step to 4 in handleFinish before navigating.
    // Let's adjust handleFinish to show a final screen.
    const originalHandleFinish = () => {
        if (agreedToTerms) {
          console.log('User graduated to adult account.');
          setStep(4);
        }
    };
    // Re-assigning logic based on which step we are on
    if(step !== 3){
        // No special logic
    } else {
        // override finish logic for step 3
    }
  },[step, agreedToTerms, navigate, onOpenChange]);


  const finalFinishAndNavigate = () => {
    onOpenChange(false);
    navigate('/dashboard-screen');
    // Reset step for next time modal opens
    setTimeout(() => setStep(1), 500);
  }

  // Refined Step Renderer Logic
  const renderContent = () => {
     switch (step) {
      case 1:
        return <div key={1} className="w-full h-full p-8">{renderStep()}</div>;
      case 2:
        return <div key={2} className="w-full h-full p-8">{renderStep()}</div>;
      case 3:
        return <div key={3} className="w-full h-full p-8">{renderStep()}</div>;
      case 4:
         return (
          <div key={4} className="text-center flex flex-col items-center justify-center h-full p-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
              <Star className="h-24 w-24 text-green-500 mb-6" fill="currentColor" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-2">You're All Set!</h2>
            <p className="text-lg text-muted-foreground mb-8">Welcome to the next chapter of your financial journey. Your new dashboard awaits.</p>
            <Button size="lg" onClick={finalFinishAndNavigate}>
              Explore My New Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 max-w-none w-screen h-screen bg-background text-foreground flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={slideAnimation.initial}
            animate={slideAnimation.animate}
            exit={slideAnimation.exit}
            transition={slideAnimation.transition}
            className="w-full h-full max-w-md mx-auto"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default GraduationFlowModal;