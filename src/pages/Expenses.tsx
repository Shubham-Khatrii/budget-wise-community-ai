
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Filter, ArrowUpDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

const Expenses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Sample expenses data
  const expenses: Expense[] = [
    { id: 'e1', date: '2025-04-28', description: 'Grocery Shopping', category: 'Food', amount: 2800 },
    { id: 'e2', date: '2025-04-26', description: 'Movie Tickets', category: 'Entertainment', amount: 1200 },
    { id: 'e3', date: '2025-04-25', description: 'Internet Bill', category: 'Utilities', amount: 1999 },
    { id: 'e4', date: '2025-04-25', description: 'Fuel', category: 'Transportation', amount: 2500 },
    { id: 'e5', date: '2025-04-23', description: 'Restaurant Dinner', category: 'Food', amount: 3500 },
    { id: 'e6', date: '2025-04-22', description: 'Medicine', category: 'Health', amount: 850 },
    { id: 'e7', date: '2025-04-20', description: 'Clothing', category: 'Shopping', amount: 5699 },
    { id: 'e8', date: '2025-04-18', description: 'Mobile Recharge', category: 'Utilities', amount: 499 },
    { id: 'e9', date: '2025-04-15', description: 'Gym Membership', category: 'Health', amount: 2499 },
    { id: 'e10', date: '2025-04-15', description: 'Office Supplies', category: 'Work', amount: 750 },
  ];

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format amount
  const formatAmount = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Filter expenses based on search query and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         expense.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from expenses
  const categories = Array.from(new Set(expenses.map(expense => expense.category)));

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Expenses</h1>
            <p className="text-muted-foreground">Track and manage your spending</p>
          </div>
          <Button size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Add Expense</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>View and manage your expense transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell className="font-medium">{expense.description}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell className="text-right text-destructive font-medium">
                          {formatAmount(expense.amount)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No expenses found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredExpenses.length > 0 && (
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredExpenses.length} of {expenses.length} expenses
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled={true}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={true}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Expenses;
