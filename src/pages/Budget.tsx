
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import BudgetHeader from '@/components/budget/BudgetHeader';
import BudgetSummary from '@/components/budget/BudgetSummary';
import BudgetCategories from '@/components/budget/BudgetCategories';
import BudgetTrends from '@/components/budget/BudgetTrends';

const Budget: React.FC = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in">
        <BudgetHeader />
        <BudgetSummary />
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
          <BudgetCategories />
          <BudgetTrends />
        </div>
      </div>
    </AppLayout>
  );
};

export default Budget;
