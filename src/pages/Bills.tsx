
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Calendar, Filter, Clock, BadgeIndianRupee } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  status: 'paid' | 'pending' | 'overdue';
  recurring: boolean;
  frequency?: string;
}

const Bills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  
  const bills: Bill[] = [
    {
      id: 'b1',
      name: 'Electricity Bill',
      amount: 3250,
      dueDate: '2025-05-15',
      category: 'Utilities',
      status: 'pending',
      recurring: true,
      frequency: 'Monthly',
    },
    {
      id: 'b2',
      name: 'Internet Service',
      amount: 1999,
      dueDate: '2025-05-20',
      category: 'Utilities',
      status: 'pending',
      recurring: true,
      frequency: 'Monthly',
    },
    {
      id: 'b3',
      name: 'Rent Payment',
      amount: 25000,
      dueDate: '2025-05-05',
      category: 'Housing',
      status: 'paid',
      recurring: true,
      frequency: 'Monthly',
    },
    {
      id: 'b4',
      name: 'Netflix Subscription',
      amount: 649,
      dueDate: '2025-05-12',
      category: 'Entertainment',
      status: 'pending',
      recurring: true,
      frequency: 'Monthly',
    },
    {
      id: 'b5',
      name: 'Mobile Recharge',
      amount: 499,
      dueDate: '2025-04-30',
      category: 'Utilities',
      status: 'overdue',
      recurring: true,
      frequency: 'Monthly',
    },
    {
      id: 'b6',
      name: 'Credit Card Payment',
      amount: 15780,
      dueDate: '2025-05-18',
      category: 'Financial',
      status: 'pending',
      recurring: true,
      frequency: 'Monthly',
    },
    {
      id: 'b7',
      name: 'Health Insurance',
      amount: 8500,
      dueDate: '2025-08-10',
      category: 'Insurance',
      status: 'pending',
      recurring: true,
      frequency: 'Quarterly',
    },
    {
      id: 'b8',
      name: 'Amazon Prime',
      amount: 1499,
      dueDate: '2025-06-15',
      category: 'Entertainment',
      status: 'pending',
      recurring: true,
      frequency: 'Annual',
    },
  ];

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Calculate total amount for upcoming/pending bills
  const upcomingBillsTotal = bills
    .filter(bill => bill.status === 'pending')
    .reduce((sum, bill) => sum + bill.amount, 0);

  // Calculate total amount for overdue bills
  const overdueBillsTotal = bills
    .filter(bill => bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  // Calculate total amount for paid bills
  const paidBillsTotal = bills
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  // Filter bills based on active tab
  const filteredBills = bills.filter(bill => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return bill.status === 'pending';
    if (activeTab === "overdue") return bill.status === 'overdue';
    if (activeTab === "paid") return bill.status === 'paid';
    return false;
  });

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-budget-green">Paid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-budget-orange">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive">Overdue</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Bills & Subscriptions</h1>
            <p className="text-muted-foreground">Track your recurring payments</p>
          </div>
          <Button size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>Add Bill</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Due This Month</CardTitle>
              <div className="p-1 rounded-full bg-budget-orange/10 text-budget-orange">
                <Calendar className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{upcomingBillsTotal.toLocaleString('en-IN')}</div>
              <p className="text-sm text-muted-foreground mb-2">5 bills pending</p>
              <Progress value={60} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Overdue</CardTitle>
              <div className="p-1 rounded-full bg-destructive/10 text-destructive">
                <Clock className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{overdueBillsTotal.toLocaleString('en-IN')}</div>
              <p className="text-sm text-destructive mb-2">1 bill overdue</p>
              <Button size="sm" variant="outline" className="w-full">Pay Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Paid This Month</CardTitle>
              <div className="p-1 rounded-full bg-budget-green/10 text-budget-green">
                <BadgeIndianRupee className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{paidBillsTotal.toLocaleString('en-IN')}</div>
              <p className="text-sm text-muted-foreground mb-2">1 bill paid</p>
              <Progress value={15} className="h-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>Bills & Subscriptions</CardTitle>
              <CardDescription>Manage all your recurring payments</CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto mt-4 sm:mt-0">
              <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            {bill.name}
                            {bill.recurring && (
                              <span className="text-xs text-muted-foreground">
                                Recurring ({bill.frequency})
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{bill.category}</TableCell>
                        <TableCell>₹{bill.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>{formatDate(bill.dueDate)}</TableCell>
                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            {bill.status === 'pending' || bill.status === 'overdue' ? 'Mark Paid' : 'Details'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No bills found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Bills;
