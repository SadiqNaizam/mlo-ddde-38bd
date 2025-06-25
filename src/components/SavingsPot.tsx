import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PiggyBank } from "lucide-react";
import { RadialBar, RadialBarChart } from "recharts";

interface SavingsPotProps {
  icon?: React.ReactNode;
  title: string;
  currentAmount: number;
  targetAmount: number;
}

const SavingsPot: React.FC<SavingsPotProps> = ({
  icon = <PiggyBank className="h-10 w-10 text-muted-foreground" />,
  title,
  currentAmount,
  targetAmount,
}) => {
  console.log('SavingsPot loaded for:', title);

  const progress = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const chartData = [
    {
      name: "progress",
      value: clampedProgress,
      fill: "hsl(var(--primary))",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg font-semibold truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-48 h-48">
          <ChartContainer
            config={{
              progress: {
                label: "Progress",
                color: "hsl(var(--primary))",
              },
            }}
            className="absolute inset-0"
          >
            <RadialBarChart
              data={chartData}
              innerRadius="75%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              barSize={20}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: "hsl(var(--muted))" }}
                cornerRadius={10}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 text-center">
            {icon}
            <span className="text-3xl font-bold text-primary">
              {Math.floor(clampedProgress)}%
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center p-4 pt-0 border-t mt-2">
        <p className="text-sm text-muted-foreground">Progress</p>
        <p className="text-lg font-medium">
          {formatCurrency(currentAmount)} / {formatCurrency(targetAmount)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default SavingsPot;