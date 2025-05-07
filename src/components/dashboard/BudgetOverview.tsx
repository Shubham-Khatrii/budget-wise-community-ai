
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const BudgetOverview: React.FC = () => {
  // Sample budget data
  const budgetCategories = [
    { name: 'Housing', spent: 120000, budget: 150000, color: '#0EA5E9' },
    { name: 'Food', spent: 68000, budget: 65000, color: '#F97316' },
    { name: 'Transportation', spent: 32000, budget: 40000, color: '#8B5CF6' },
    { name: 'Entertainment', spent: 45000, budget: 40000, color: '#D946EF' },
    { name: 'Utilities', spent: 28000, budget: 30000, color: '#10B981' },
  ];

  // Calculate total budget and spent
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalPercentage = Math.round((totalSpent / totalBudget) * 100);

  // Format for pie chart
  const pieData = budgetCategories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
  }));

  // Function to format currency in Indian Rupees
  const formatIndianRupees = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget</CardTitle>
          <CardDescription>Your budget overview for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Budget</span>
              <span className="text-sm font-medium">{totalPercentage}%</span>
            </div>
            <Progress value={totalPercentage} className="h-2" />
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{formatIndianRupees(totalSpent)} spent</span>
              <span>{formatIndianRupees(totalBudget)} budgeted</span>
            </div>
          </div>

          <div className="space-y-4">
            {budgetCategories.map((category) => {
              const percentage = Math.round((category.spent / category.budget) * 100);
              const isOverBudget = category.spent > category.budget;
              
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className={`text-sm font-medium ${
                      isOverBudget ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="budget-progress-bar">
                    <div 
                      className="budget-progress-bar-fill" 
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isOverBudget ? 'var(--destructive)' : category.color,
                      }} 
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatIndianRupees(category.spent)}</span>
                    <span>{formatIndianRupees(category.budget)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spending Distribution</CardTitle>
          <CardDescription>How you're spending your money</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Spent']}
                  labelFormatter={(name) => `${name}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverview;
