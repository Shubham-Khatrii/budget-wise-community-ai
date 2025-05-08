
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FinancesSummary from '@/components/dashboard/FinancesSummary';
import BudgetOverview from '@/components/dashboard/BudgetOverview';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import FinancialGoals from '@/components/dashboard/FinancialGoals';
import BillReminders from '@/components/dashboard/BillReminders';
import AIInsights from '@/components/dashboard/AIInsights';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/contexts/AppContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { addExpense } = useAppContext();
  
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: '',
  });

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newExpense.title || !newExpense.amount || !newExpense.category) {
      return;
    }
    
    // Add the new expense to our context
    addExpense({
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
    });

    // Reset form and close modal
    setNewExpense({ title: '', amount: '', category: '' });
    setIsAddExpenseOpen(false);
  };

  const openAddExpenseDialog = () => {
    setIsAddExpenseOpen(true);
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <DashboardHeader onAddExpense={openAddExpenseDialog} />
        <FinancesSummary />
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Budget Overview</h2>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNavigate('/budgets')}
            >
              View All Budgets
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => handleNavigate('/expenses')}
            >
              View All Expenses
            </Button>
          </div>
        </div>
        <BudgetOverview />
        
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
          <BillReminders />
          <AIInsights />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Financial Goals</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 md:mt-0"
            onClick={() => handleNavigate('/goals')}
          >
            Manage Goals
            <PlusCircle className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <FinancialGoals />
        
        <div className="h-6"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleNavigate('/expenses')}
            >
              View All Transactions
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={openAddExpenseDialog}
            >
              Add Transaction
              <PlusCircle className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        <RecentTransactions />

        {/* Add Expense Dialog */}
        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Enter the details of your new expense.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddExpenseSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                    className="col-span-3"
                    placeholder="Grocery Shopping"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="col-span-3"
                    placeholder="5000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddExpenseOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Expense</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
