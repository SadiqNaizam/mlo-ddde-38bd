import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import TopBar from '@/components/layout/TopBar';
import BottomNavBar from '@/components/layout/BottomNavBar';
import EvolvingDashboardCard from '@/components/EvolvingDashboardCard';
import SavingsPot from '@/components/SavingsPot';

// shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Icons
import { Switch, Bike, Gamepad2, Plane } from 'lucide-react';

// Sample data for Savings Pots
const sampleSavingsPots = [
  {
    icon: <Bike className="h-10 w-10 text-muted-foreground" />,
    title: 'New Bike',
    currentAmount: 150,
    targetAmount: 250,
  },
  {
    icon: <Gamepad2 className="h-10 w-10 text-muted-foreground" />,
    title: 'Video Game',
    currentAmount: 45,
    targetAmount: 60,
  },
  {
    icon: <Plane className="h-10 w-10 text-muted-foreground" />,
    title: 'Holiday Fund',
    currentAmount: 300,
    targetAmount: 1000,
  },
];

const DashboardScreen = () => {
  // State to demonstrate the evolving nature of the dashboard
  const [userAge, setUserAge] = useState(12);
  const userName = "Alex";

  useEffect(() => {
    console.log('DashboardScreen loaded');
  }, []);

  const toggleUserAge = () => {
    setUserAge(prevAge => (prevAge === 12 ? 18 : 12));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar title="Dashboard" />
      
      <ScrollArea className="flex-1">
        <main className="container px-4 py-6 pb-24">
          
          {/* A helper card to demonstrate the evolving UI */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Viewing as {userAge}-year-old</p>
                <p className="text-sm text-muted-foreground">Click to see the older user view.</p>
              </div>
              <Button onClick={toggleUserAge} size="sm">
                <Switch className="mr-2 h-4 w-4" />
                Toggle View
              </Button>
            </CardContent>
          </Card>
          
          {/* Main Evolving Dashboard Card */}
          <section className="mb-8">
            <EvolvingDashboardCard
              userName={userName}
              userAge={userAge}
              balance={123.45}
            />
          </section>

          {/* Savings Pots Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">My Savings Pots</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {sampleSavingsPots.map((pot, index) => (
                <SavingsPot
                  key={index}
                  icon={pot.icon}
                  title={pot.title}
                  currentAmount={pot.currentAmount}
                  targetAmount={pot.targetAmount}
                />
              ))}
            </div>
          </section>

          {/* Quick Actions Card */}
          <section>
             <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button asChild variant="outline">
                    <Link to="/savings-screen">Manage Savings Goals</Link>
                  </Button>
                   <Button asChild variant="outline">
                    <Link to="/activity-screen">View Full Statement</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/parental-control-screen">Parental Controls</Link>
                  </Button>
                </CardContent>
              </Card>
          </section>

        </main>
      </ScrollArea>

      <BottomNavBar />
    </div>
  );
};

export default DashboardScreen;