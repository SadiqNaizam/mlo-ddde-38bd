import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus } from 'lucide-react';

// Custom Components
import TopBar from '@/components/layout/TopBar';
import BottomNavBar from '@/components/layout/BottomNavBar';
import SavingsPot from '@/components/SavingsPot';

// Shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define the type for a single savings pot
interface SavingsPotData {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
}

// Sample data for the savings pots
const initialSavingsPots: SavingsPotData[] = [
  { id: '1', title: 'New Bike', currentAmount: 120, targetAmount: 300 },
  { id: '2', title: 'Video Game', currentAmount: 45, targetAmount: 60 },
  { id: '3', title: 'Summer Trip', currentAmount: 250, targetAmount: 800 },
  { id: '4', title: 'Headphones', currentAmount: 80, targetAmount: 150 },
];

// Zod schema for the "Create New Pot" form
const formSchema = z.object({
  goalName: z.string().min(2, {
    message: 'Goal name must be at least 2 characters long.',
  }),
  targetAmount: z.coerce.number().positive({
    message: 'Target amount must be a positive number.',
  }),
});

const SavingsScreen = () => {
  const [pots, setPots] = useState<SavingsPotData[]>(initialSavingsPots);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log('SavingsScreen loaded');
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalName: '',
      targetAmount: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newPot: SavingsPotData = {
      id: (pots.length + 1).toString(),
      title: values.goalName,
      currentAmount: 0,
      targetAmount: values.targetAmount,
    };
    setPots([...pots, newPot]);
    console.log('New savings pot created:', newPot);
    form.reset();
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar title="Savings Goals" />
      <main className="flex-1 overflow-y-auto pb-20">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Pots</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Pot
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create a New Savings Pot</DialogTitle>
                    <DialogDescription>
                      Set a name and a target amount for your new goal.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                      <FormField
                        control={form.control}
                        name="goalName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goal Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., New Skateboard" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="targetAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Amount (£)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 150" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create Pot</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            {pots.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {pots.map((pot) => (
                  <SavingsPot
                    key={pot.id}
                    title={pot.title}
                    currentAmount={pot.currentAmount}
                    targetAmount={pot.targetAmount}
                  />
                ))}
              </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">You don't have any savings pots yet.</p>
                    <p className="text-muted-foreground mt-1">Click "New Pot" to create your first one!</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default SavingsScreen;