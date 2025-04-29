
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FinancesSummary from '@/components/dashboard/FinancesSummary';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import FinancialGoals from '@/components/dashboard/FinancialGoals';
import BillReminders from '@/components/dashboard/BillReminders';
import AIInsights from '@/components/dashboard/AIInsights';

const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in">
        <DashboardHeader />
        <FinancesSummary />
        <BudgetOverview />
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
          <BillReminders />
          <AIInsights />
        </div>
        
        <FinancialGoals />
        <div className="h-6"></div>
        <RecentTransactions />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
