
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, PiggyBank, Plane, Car, Home, Gift, GraduationCap, BadgeIndianRupee, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  icon: React.ReactNode;
  iconBg: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Short-term' | 'Long-term';
}

const Goals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const goals: Goal[] = [
    {
      id: 'g1',
      title: 'Emergency Fund',
      targetAmount: 1000000,
      currentAmount: 750000,
      dueDate: '2025-12-31',
      icon: <PiggyBank className="h-4 w-4" />,
      iconBg: 'bg-budget-blue/10 text-budget-blue',
      priority: 'High',
      category: 'Short-term',
    },
    {
      id: 'g2',
      title: 'Goa Vacation',
      targetAmount: 200000,
      currentAmount: 75000,
      dueDate: '2026-06-15',
      icon: <Plane className="h-4 w-4" />,
      iconBg: 'bg-budget-purple/10 text-budget-purple',
      priority: 'Medium',
      category: 'Short-term',
    },
    {
      id: 'g3',
      title: 'New Car',
      targetAmount: 1500000,
      currentAmount: 500000,
      dueDate: '2027-03-01',
      icon: <Car className="h-4 w-4" />,
      iconBg: 'bg-budget-green/10 text-budget-green',
      priority: 'Medium',
      category: 'Long-term',
    },
    {
      id: 'g4',
      title: 'Home Down Payment',
      targetAmount: 5000000,
      currentAmount: 1200000,
      dueDate: '2028-01-01',
      icon: <Home className="h-4 w-4" />,
      iconBg: 'bg-budget-orange/10 text-budget-orange',
      priority: 'High',
      category: 'Long-term',
    },
    {
      id: 'g5',
      title: 'Anniversary Gift',
      targetAmount: 50000,
      currentAmount: 30000,
      dueDate: '2025-08-15',
      icon: <Gift className="h-4 w-4" />,
      iconBg: 'bg-budget-pink/10 text-budget-pink',
      priority: 'Medium',
      category: 'Short-term',
    },
    {
      id: 'g6',
      title: 'Higher Education',
      targetAmount: 2500000,
      currentAmount: 400000,
      dueDate: '2029-06-01',
      icon: <GraduationCap className="h-4 w-4" />,
      iconBg: 'bg-budget-blue/10 text-budget-blue',
      priority: 'Low',
      category: 'Long-term',
    },
  ];

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number): number => {
    return Math.round((current / target) * 100);
  };

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
    }).format(date);
  };

  // Filter goals based on active tab
  const filteredGoals = goals.filter(goal => {
    if (activeTab === "all") return true;
    return goal.category.toLowerCase() === activeTab.toLowerCase();
  });

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
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Financial Goals</h1>
            <p className="text-muted-foreground">Set and track your financial targets</p>
          </div>
          <Button size="sm" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>New Goal</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Goals Summary</CardTitle>
              <div className="p-1 rounded-full bg-budget-blue/10 text-budget-blue">
                <PiggyBank className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{(2955000).toLocaleString('en-IN')}</div>
              <p className="text-sm text-muted-foreground mb-4">Total saved across all goals</p>
              <Progress value={29} className="h-2 mb-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹{(2955000).toLocaleString('en-IN')} saved</span>
                <span>₹{(10250000).toLocaleString('en-IN')} target</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Next Milestone</CardTitle>
              <div className="p-1 rounded-full bg-budget-pink/10 text-budget-pink">
                <Gift className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold">Anniversary Gift</h3>
                <Badge variant="outline" className={getPriorityColor("Medium")}>Medium</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Due by {formatDate('2025-08-15')}</p>
              <Progress value={60} className="h-2 mb-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹{(30000).toLocaleString('en-IN')} of ₹{(50000).toLocaleString('en-IN')}</span>
                <span>60% complete</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Monthly Contribution</CardTitle>
              <div className="p-1 rounded-full bg-budget-green/10 text-budget-green">
                <BadgeIndianRupee className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">₹{(75000).toLocaleString('en-IN')}</div>
              <p className="text-sm text-muted-foreground mb-4">Current monthly savings target</p>
              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" variant="outline">Decrease</Button>
                <Button size="sm" variant="outline">Optimize</Button>
                <Button size="sm" variant="outline">Increase</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Your Goals</CardTitle>
                <CardDescription>Track progress toward your financial milestones</CardDescription>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-[300px]">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="short-term">Short-term</TabsTrigger>
                  <TabsTrigger value="long-term">Long-term</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredGoals.map((goal) => {
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
                            Target: ₹{goal.targetAmount.toLocaleString('en-IN')} • Due: {formatDate(goal.dueDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{progress}%</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Add money</DropdownMenuItem>
                            <DropdownMenuItem>Edit goal</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete goal</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₹{goal.currentAmount.toLocaleString('en-IN')} saved</span>
                        <span>₹{(goal.targetAmount - goal.currentAmount).toLocaleString('en-IN')} to go</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredGoals.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No goals found in this category.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Goals;
