
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  color: string;
}

const BudgetCategories: React.FC = () => {
  // Sample budget categories data
  const categories: BudgetCategory[] = [
    { name: 'Housing', spent: 1200, budget: 1500, color: '#0EA5E9' },
    { name: 'Food', spent: 680, budget: 650, color: '#F97316' },
    { name: 'Transportation', spent: 320, budget: 400, color: '#8B5CF6' },
    { name: 'Entertainment', spent: 450, budget: 400, color: '#D946EF' },
    { name: 'Utilities', spent: 280, budget: 300, color: '#10B981' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Categories</CardTitle>
        <CardDescription>Track spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => {
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
                  <span>${category.spent}</span>
                  <span>${category.budget}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <Button variant="outline" size="sm" className="w-full">
            View All Categories
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCategories;
