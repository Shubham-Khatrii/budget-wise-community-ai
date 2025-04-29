
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PiggyBank, Plane, Car, Home } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  icon: React.ReactNode;
  iconBg: string;
  priority: 'High' | 'Medium' | 'Low';
}

const FinancialGoals: React.FC = () => {
  const goals: Goal[] = [
    {
      id: 'g1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 7500,
      dueDate: '2025-12-31',
      icon: <PiggyBank className="h-4 w-4" />,
      iconBg: 'bg-budget-blue/10 text-budget-blue',
      priority: 'High',
    },
    {
      id: 'g2',
      title: 'European Vacation',
      targetAmount: 5000,
      currentAmount: 2750,
      dueDate: '2026-06-15',
      icon: <Plane className="h-4 w-4" />,
      iconBg: 'bg-budget-purple/10 text-budget-purple',
      priority: 'Medium',
    },
    {
      id: 'g3',
      title: 'New Car',
      targetAmount: 20000,
      currentAmount: 5000,
      dueDate: '2027-03-01',
      icon: <Car className="h-4 w-4" />,
      iconBg: 'bg-budget-green/10 text-budget-green',
      priority: 'Medium',
    },
    {
      id: 'g4',
      title: 'Down Payment',
      targetAmount: 50000,
      currentAmount: 12000,
      dueDate: '2028-01-01',
      icon: <Home className="h-4 w-4" />,
      iconBg: 'bg-budget-orange/10 text-budget-orange',
      priority: 'High',
    },
  ];

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number): number => {
    return Math.round((current / target) * 100);
  };

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
    }).format(date);
  };

  // Get badge color based on priority
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'High':
        return 'bg-destructive/20 text-destructive border-destructive/20';
      case 'Medium':
        return 'bg-budget-orange/20 text-budget-orange border-budget-orange/20';
      case 'Low':
        return 'bg-budget-green/20 text-budget-green border-budget-green/20';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
        <CardDescription>Track your progress towards your financial milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${goal.iconBg}`}>
                      {goal.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                          {goal.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Target: ${goal.targetAmount.toLocaleString()} • Due: {formatDate(goal.dueDate)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                
                <div className="space-y-1">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${goal.currentAmount.toLocaleString()} saved</span>
                    <span>${(goal.targetAmount - goal.currentAmount).toLocaleString()} to go</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;
