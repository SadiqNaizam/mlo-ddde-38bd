import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import TopBar from '@/components/layout/TopBar';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ChartConfig } from "@/components/ui/chart";

const transactions = [
  { id: '1', date: '2024-07-29', description: 'Weekly Allowance', amount: 10.00, type: 'incoming' as 'incoming' | 'outgoing' },
  { id: '2', date: '2024-07-28', description: 'Cinema Ticket', amount: -7.50, type: 'outgoing' as 'incoming' | 'outgoing' },
  { id: '3', date: '2024-07-27', description: 'Corner Shop Sweets', amount: -2.25, type: 'outgoing' as 'incoming' | 'outgoing' },
  { id: '4', date: '2024-07-26', description: 'Gift from Grandma', amount: 20.00, type: 'incoming' as 'incoming' | 'outgoing' },
  { id: '5', date: '2024-07-25', description: 'Book Store', amount: -12.00, type: 'outgoing' as 'incoming' | 'outgoing' },
  { id: '6', date: '2024-07-24', description: 'Savings Deposit', amount: -5.00, type: 'outgoing' as 'incoming' | 'outgoing' },
  { id: '7', date: '2024-07-22', description: 'Weekly Allowance', amount: 10.00, type: 'incoming' as 'incoming' | 'outgoing' },
];

const spendingData = [
    { category: "Food", amount: 15.50 },
    { category: "Fun", amount: 22.50 },
    { category: "Shopping", amount: 12.00 },
    { category: "Gifts", amount: 20.00 },
];

const chartConfig = {
  amount: {
    label: "Spent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ActivityScreen = () => {
  console.log('ActivityScreen loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <TopBar title="Activity" />
      
      <main className="flex-1 pb-20">
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="container py-6">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transactions">All Transactions</TabsTrigger>
                <TabsTrigger value="analysis">Spending Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>A log of all your incoming and outgoing money.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((t) => (
                          <TableRow key={t.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${t.type === 'incoming' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                                  {t.type === 'incoming' ? (
                                    <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-300" />
                                  ) : (
                                    <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-300" />
                                  )}
                                </div>
                                <div>
                                    <p className="font-medium">{t.description}</p>
                                    <p className="text-sm text-muted-foreground">{t.date}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className={`text-right font-semibold ${t.type === 'incoming' ? 'text-green-600' : 'text-foreground'}`}>
                                {t.type === 'incoming' ? '+' : ''}£{Math.abs(t.amount).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Here's where your money went this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] w-full">
                      <BarChart accessibilityLayer data={spendingData} margin={{ top: 20 }}>
                        <XAxis
                          dataKey="category"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <YAxis
                           tickLine={false}
                           axisLine={false}
                           tickMargin={10}
                           tickFormatter={(value) => `£${value}`}
                        />
                        <ChartTooltip
                           cursor={false}
                           content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default ActivityScreen;