
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Coffee, 
  ShoppingBag, 
  Home, 
  Bus, 
  Utensils, 
  Film, 
  Wifi, 
  Dumbbell 
} from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  icon: React.ReactNode;
  iconBg: string;
}

const RecentTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 't1',
      title: 'Grocery Shopping',
      amount: -84.32,
      date: '2025-04-28',
      category: 'Food',
      icon: <ShoppingBag className="h-4 w-4" />,
      iconBg: 'bg-budget-orange/10 text-budget-orange',
    },
    {
      id: 't2',
      title: 'Monthly Rent',
      amount: -1200,
      date: '2025-04-25',
      category: 'Housing',
      icon: <Home className="h-4 w-4" />,
      iconBg: 'bg-budget-blue/10 text-budget-blue',
    },
    {
      id: 't3',
      title: 'Starbucks Coffee',
      amount: -5.80,
      date: '2025-04-28',
      category: 'Food',
      icon: <Coffee className="h-4 w-4" />,
      iconBg: 'bg-budget-orange/10 text-budget-orange',
    },
    {
      id: 't4',
      title: 'Uber to Work',
      amount: -12.50,
      date: '2025-04-28',
      category: 'Transportation',
      icon: <Bus className="h-4 w-4" />,
      iconBg: 'bg-budget-purple/10 text-budget-purple',
    },
    {
      id: 't5',
      title: 'Dinner with Friends',
      amount: -38.25,
      date: '2025-04-27',
      category: 'Food',
      icon: <Utensils className="h-4 w-4" />,
      iconBg: 'bg-budget-orange/10 text-budget-orange',
    },
    {
      id: 't6',
      title: 'Movie Tickets',
      amount: -24.00,
      date: '2025-04-26',
      category: 'Entertainment',
      icon: <Film className="h-4 w-4" />,
      iconBg: 'bg-budget-pink/10 text-budget-pink',
    },
    {
      id: 't7',
      title: 'Internet Bill',
      amount: -65.00,
      date: '2025-04-25',
      category: 'Utilities',
      icon: <Wifi className="h-4 w-4" />,
      iconBg: 'bg-budget-green/10 text-budget-green',
    },
    {
      id: 't8',
      title: 'Gym Membership',
      amount: -49.99,
      date: '2025-04-24',
      category: 'Health',
      icon: <Dumbbell className="h-4 w-4" />,
      iconBg: 'bg-budget-blue/10 text-budget-blue',
    },
  ];

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format amount with appropriate sign and decimals
  const formatAmount = (amount: number): string => {
    const sign = amount < 0 ? '-' : '+';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${transaction.iconBg}`}>
                  {transaction.icon}
                </div>
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)} • {transaction.category}
                  </p>
                </div>
              </div>
              <span className={`font-medium ${transaction.amount < 0 ? 'text-destructive' : 'text-budget-green'}`}>
                {formatAmount(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
