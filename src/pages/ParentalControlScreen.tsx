import React, { useState, useEffect } from 'react';
import TopBar from '@/components/layout/TopBar';
import AllowanceSlider from '@/components/AllowanceSlider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ParentalControlScreen = () => {
  const [onlineSpending, setOnlineSpending] = useState(true);
  const [atmWithdrawal, setAtmWithdrawal] = useState(false);
  const [inStoreSpending, setInStoreSpending] = useState(true);

  useEffect(() => {
    console.log('ParentalControlScreen loaded');
  }, []);

  const handleSaveChanges = () => {
    console.log('Saving settings:', {
      onlineSpending,
      atmWithdrawal,
      inStoreSpending,
    });
    // Here you would typically make an API call to save the settings
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <TopBar title="Parental Controls" />
      <main className="container mx-auto p-4 md:p-8">
        <Card className="max-w-2xl mx-auto shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Manage Child's Account</CardTitle>
            <CardDescription>
              Adjust allowances, set spending limits, and manage permissions for your child's account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Allowance Section */}
            <section className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Allowances & Limits</h3>
                <div className="space-y-4">
                  <AllowanceSlider
                    label="Weekly Allowance"
                    defaultValue={15}
                    max={50}
                    step={1}
                    onValueChange={(value) => console.log('Weekly allowance changed to:', value)}
                  />
                  <AllowanceSlider
                    label="Single Transaction Limit"
                    defaultValue={10}
                    max={25}
                    step={0.5}
                    onValueChange={(value) => console.log('Transaction limit changed to:', value)}
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* Permissions Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Spending Permissions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-white">
                  <Label htmlFor="online-spending" className="text-base">Enable Online Spending</Label>
                  <Switch
                    id="online-spending"
                    checked={onlineSpending}
                    onCheckedChange={setOnlineSpending}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-white">
                  <Label htmlFor="atm-withdrawal" className="text-base">Allow ATM Withdrawals</Label>
                  <Switch
                    id="atm-withdrawal"
                    checked={atmWithdrawal}
                    onCheckedChange={setAtmWithdrawal}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-white">
                  <Label htmlFor="in-store" className="text-base">Allow In-Store Purchases</Label>
                  <Switch
                    id="in-store"
                    checked={inStoreSpending}
                    onCheckedChange={setInStoreSpending}
                  />
                </div>
              </div>
            </section>

            <Separator />

            {/* Save Button */}
            <div className="pt-4 flex justify-end">
              <Button size="lg" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ParentalControlScreen;