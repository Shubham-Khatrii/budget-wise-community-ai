
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from '@/contexts/AppContext';

const BudgetSummary: React.FC = () => {
  const { monthlyBudget, totalSpent, remaining, formatCurrency } = useAppContext();
  
  // Calculate percentage spent
  const percentageSpent = Math.round((totalSpent / monthlyBudget) * 100);
  
  // Current month and year
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Monthly Budget Summary - {monthName} {year}</CardTitle>
        <CardDescription>Your overall budget progress for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-bold">{formatCurrency(monthlyBudget)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Remaining</p>
            <p className="text-2xl font-bold text-budget-green">{formatCurrency(remaining)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Budget Used</span>
            <span className="text-sm font-medium">{percentageSpent}%</span>
          </div>
          <Progress value={percentageSpent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(totalSpent)} spent</span>
            <span>{formatCurrency(monthlyBudget)} budgeted</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSummary;
