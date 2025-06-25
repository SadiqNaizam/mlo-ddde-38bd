import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart, Bar, XAxis, YAxis } from "@/components/ui/chart";
import { Coins, PiggyBank, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ChartConfig } from "@/components/ui/chart";

interface EvolvingDashboardCardProps {
  userName: string;
  userAge: number;
  balance: number;
  weeklySpendingData?: { day: string; spent: number }[];
  savingsGoalProgress?: number;
}

const defaultSpendingData = [
  { day: "Mon", spent: 5.50 },
  { day: "Tue", spent: 2.00 },
  { day: "Wed", spent: 7.25 },
  { day: "Thu", spent: 0.00 },
  { day: "Fri", spent: 12.00 },
  { day: "Sat", spent: 15.75 },
  { day: "Sun", spent: 3.50 },
];

const chartConfig = {
  spent: {
    label: "Spent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const EvolvingDashboardCard: React.FC<EvolvingDashboardCardProps> = ({
  userName,
  userAge,
  balance,
  weeklySpendingData = defaultSpendingData,
  savingsGoalProgress = 65,
}) => {
  console.log('EvolvingDashboardCard loaded for user age:', userAge);

  const isYoungerUser = userAge < 13;

  const YoungUserView = () => (
    <>
      <CardHeader>
        <div className="flex items-center gap-3">
          <PiggyBank className="w-8 h-8 text-pink-500" />
          <div>
            <CardTitle className="text-2xl">Your Pocket Money</CardTitle>
            <CardDescription>Keep track of your savings, {userName}!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg">
          <Coins className="w-8 h-8 mr-4 text-green-600" />
          <span className="text-5xl font-bold text-green-700">£{balance.toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <label htmlFor="savings-progress" className="text-sm font-medium">Weekly Savings Goal</label>
          <Progress id="savings-progress" value={savingsGoalProgress} className="w-full" />
          <p className="text-xs text-muted-foreground text-center">{savingsGoalProgress}% of the way there!</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to="/activity-screen">
            See Activity <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </>
  );

  const OlderUserView = () => (
    <>
      <CardHeader>
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          <div>
            <CardTitle className="text-2xl">Financial Snapshot</CardTitle>
            <CardDescription>Your spending summary for this week.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-3xl font-bold">£{balance.toFixed(2)}</p>
        </div>
        <div className="h-[150px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart accessibilityLayer data={weeklySpendingData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `£${value}`} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to="/savings-screen">
            Manage Savings Goals <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      {isYoungerUser ? <YoungUserView /> : <OlderUserView />}
    </Card>
  );
};

export default EvolvingDashboardCard;