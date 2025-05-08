
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
import { useAppContext } from '@/contexts/AppContext';

const Bills: React.FC = () => {
  const { bills, markBillAsPaid, formatCurrency } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  
  // Calculate total amount for upcoming/pending bills
  const upcomingBillsTotal = bills
    .filter(bill => bill.status === 'Pending')
    .reduce((sum, bill) => sum + bill.amount, 0);

  // Calculate total amount for overdue bills
  const overdueBillsTotal = bills
    .filter(bill => bill.status === 'Overdue')
    .reduce((sum, bill) => sum + bill.amount, 0);

  // Calculate total amount for paid bills
  const paidBillsTotal = bills
    .filter(bill => bill.status === 'Paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Filter bills based on active tab
  const filteredBills = bills.filter(bill => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return bill.status === 'Pending';
    if (activeTab === "overdue") return bill.status === 'Overdue';
    if (activeTab === "paid") return bill.status === 'Paid';
    return false;
  });

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-budget-green">Paid</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-budget-orange">Pending</Badge>;
      case 'Overdue':
        return <Badge className="bg-destructive">Overdue</Badge>;
      default:
        return null;
    }
  };

  // Handle mark as paid button
  const handleMarkAsPaid = (billId: string) => {
    markBillAsPaid(billId);
  };

  // Count pending bills
  const pendingBillsCount = bills.filter(bill => bill.status === 'Pending').length;
  const overdueBillsCount = bills.filter(bill => bill.status === 'Overdue').length;
  const paidBillsCount = bills.filter(bill => bill.status === 'Paid').length;

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
              <div className="text-3xl font-bold mb-1">{formatCurrency(upcomingBillsTotal)}</div>
              <p className="text-sm text-muted-foreground mb-2">{pendingBillsCount} bills pending</p>
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
              <div className="text-3xl font-bold mb-1">{formatCurrency(overdueBillsTotal)}</div>
              <p className="text-sm text-destructive mb-2">{overdueBillsCount} bills overdue</p>
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
              <div className="text-3xl font-bold mb-1">{formatCurrency(paidBillsTotal)}</div>
              <p className="text-sm text-muted-foreground mb-2">{paidBillsCount} bills paid</p>
              <Progress value={paidBillsTotal > 0 ? 100 : 0} className="h-2" />
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
                            {bill.title}
                            {bill.recurring && (
                              <span className="text-xs text-muted-foreground">
                                Recurring ({bill.frequency})
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{bill.category}</TableCell>
                        <TableCell>{formatCurrency(bill.amount)}</TableCell>
                        <TableCell>{formatDate(bill.dueDate)}</TableCell>
                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => bill.status !== 'Paid' ? handleMarkAsPaid(bill.id) : null}
                          >
                            {bill.status === 'Pending' || bill.status === 'Overdue' ? 'Mark Paid' : 'Details'}
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
