
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const BudgetCategories: React.FC = () => {
  const { budgetCategories, formatCurrency } = useAppContext();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Categories</CardTitle>
        <CardDescription>Track spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
                  <span>{formatCurrency(category.spent)}</span>
                  <span>{formatCurrency(category.budget)}</span>
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
