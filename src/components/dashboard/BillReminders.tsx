
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Overdue';
}

const BillReminders: React.FC = () => {
  const [bills, setBills] = React.useState<Bill[]>([
    {
      id: 'b1',
      title: 'Electricity Bill',
      amount: 98.75,
      dueDate: '2025-05-05',
      status: 'Pending',
    },
    {
      id: 'b2',
      title: 'Water Bill',
      amount: 45.30,
      dueDate: '2025-05-10',
      status: 'Pending',
    },
    {
      id: 'b3',
      title: 'Internet & Cable',
      amount: 89.99,
      dueDate: '2025-05-15',
      status: 'Pending',
    },
    {
      id: 'b4',
      title: 'Cell Phone',
      amount: 75.00,
      dueDate: '2025-05-22',
      status: 'Pending',
    },
    {
      id: 'b5',
      title: 'Streaming Services',
      amount: 23.98,
      dueDate: '2025-05-28',
      status: 'Pending',
    }
  ]);

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Days until due
  const getDaysUntil = (dateString: string): number => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Mark bill as paid
  const markAsPaid = (id: string): void => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, status: 'Paid' as const } : bill
    ));
  };

  // Get status badge color
  const getStatusColor = (status: string, daysUntil: number): string => {
    if (status === 'Paid') return 'bg-budget-green/20 text-budget-green border-budget-green/20';
    if (daysUntil < 0) return 'bg-destructive/20 text-destructive border-destructive/20';
    if (daysUntil < 3) return 'bg-budget-orange/20 text-budget-orange border-budget-orange/20';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Upcoming Bills</CardTitle>
        <CardDescription>Bills due in the next 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bills.map((bill) => {
            const daysUntil = getDaysUntil(bill.dueDate);
            let statusText = bill.status;
            
            if (bill.status !== 'Paid' && daysUntil < 0) {
              statusText = 'Overdue';
            }
            
            return (
              <div 
                key={bill.id} 
                className={`flex items-center justify-between p-3 rounded-md 
                  ${bill.status === 'Paid' ? 'bg-muted/30' : 'hover:bg-muted/50'} 
                  transition-colors`}
              >
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className={`font-medium ${bill.status === 'Paid' ? 'text-muted-foreground' : ''}`}>
                      {bill.title}
                    </p>
                    <span className={`font-medium ${bill.status === 'Paid' ? 'text-muted-foreground' : ''}`}>
                      ${bill.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Due: {formatDate(bill.dueDate)}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(statusText, daysUntil)}
                    >
                      {statusText === 'Pending' ? 
                        (daysUntil === 0 ? 'Due today' : 
                          daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : 
                          `Due in ${daysUntil} days`) : 
                        statusText}
                    </Badge>
                  </div>
                </div>
                {bill.status !== 'Paid' && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="ml-2 h-8 w-8 p-0" 
                    onClick={() => markAsPaid(bill.id)}
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Mark as paid</span>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BillReminders;
