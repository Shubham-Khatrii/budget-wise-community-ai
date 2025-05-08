
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
import { useAppContext } from '@/contexts/AppContext';

const RecentTransactions: React.FC = () => {
  const { expenses } = useAppContext();
  
  // Category to icon mapping
  const categoryIcons: Record<string, { icon: React.ReactNode; bg: string }> = {
    Food: { icon: <Utensils className="h-4 w-4" />, bg: 'bg-budget-orange/10 text-budget-orange' },
    Housing: { icon: <Home className="h-4 w-4" />, bg: 'bg-budget-blue/10 text-budget-blue' },
    Transportation: { icon: <Bus className="h-4 w-4" />, bg: 'bg-budget-purple/10 text-budget-purple' },
    Entertainment: { icon: <Film className="h-4 w-4" />, bg: 'bg-budget-pink/10 text-budget-pink' },
    Utilities: { icon: <Wifi className="h-4 w-4" />, bg: 'bg-budget-green/10 text-budget-green' },
    Health: { icon: <Dumbbell className="h-4 w-4" />, bg: 'bg-budget-blue/10 text-budget-blue' },
    Others: { icon: <ShoppingBag className="h-4 w-4" />, bg: 'bg-budget-purple/10 text-budget-purple' },
  };

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format amount with appropriate sign and decimals for Indian Rupees
  const formatAmount = (amount: number): string => {
    const sign = amount < 0 ? '-' : '-'; // All expenses are negative
    return `${sign}₹${Math.abs(amount).toLocaleString('en-IN')}`;
  };

  // Get the most recent 8 transactions
  const recentTransactions = expenses.slice(0, 8);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => {
            const categoryInfo = categoryIcons[transaction.category] || 
              { icon: <ShoppingBag className="h-4 w-4" />, bg: 'bg-gray-200 text-gray-700' };
              
            return (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${categoryInfo.bg}`}>
                    {categoryInfo.icon}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)} • {transaction.category}
                    </p>
                  </div>
                </div>
                <span className="font-medium text-destructive">
                  {formatAmount(transaction.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
