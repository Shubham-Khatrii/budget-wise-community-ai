
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, PiggyBank, Plane, Car, Home, Gift, GraduationCap, BadgeIndianRupee, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/contexts/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Goals: React.FC = () => {
  const { goals, addContributionToGoal, formatCurrency } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [monthlyContribution, setMonthlyContribution] = useState(75000);
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState('');
  
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

  // Calculate total saved and target amounts
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  // Handle monthly contribution change
  const handleContributionChange = (action: 'increase' | 'decrease' | 'optimize') => {
    if (action === 'increase') {
      setMonthlyContribution(prev => prev + 5000);
      toast.success(`Monthly contribution increased to ${formatCurrency(monthlyContribution + 5000)}`);
    } else if (action === 'decrease') {
      const newValue = Math.max(5000, monthlyContribution - 5000);
      setMonthlyContribution(newValue);
      toast.success(`Monthly contribution decreased to ${formatCurrency(newValue)}`);
    } else if (action === 'optimize') {
      // Simple optimization logic - 10% of total remaining target
      const totalRemaining = totalTarget - totalSaved;
      const optimizedContribution = Math.round(totalRemaining * 0.1 / 12) * 1000; // Rounded to nearest thousand
      setMonthlyContribution(optimizedContribution);
      toast.success(`Monthly contribution optimized to ${formatCurrency(optimizedContribution)}`);
    }
  };

  // Open contribute dialog
  const openContributeDialog = (goalId: string) => {
    setSelectedGoalId(goalId);
    setIsContributeDialogOpen(true);
  };

  // Handle contribution
  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contributionAmount || !selectedGoalId) {
      return;
    }
    
    const amount = parseFloat(contributionAmount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }
    
    addContributionToGoal(selectedGoalId, amount);
    
    setContributionAmount('');
    setIsContributeDialogOpen(false);
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
              <div className="text-3xl font-bold mb-1">{formatCurrency(totalSaved)}</div>
              <p className="text-sm text-muted-foreground mb-4">Total saved across all goals</p>
              <Progress value={totalProgress} className="h-2 mb-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(totalSaved)} saved</span>
                <span>{formatCurrency(totalTarget)} target</span>
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
              <div className="text-3xl font-bold mb-1">{formatCurrency(monthlyContribution)}</div>
              <p className="text-sm text-muted-foreground mb-4">Current monthly savings target</p>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContributionChange('decrease')}
                >
                  Decrease
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContributionChange('optimize')}
                >
                  Optimize
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContributionChange('increase')}
                >
                  Increase
                </Button>
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
                            Target: {formatCurrency(goal.targetAmount)} • Due: {formatDate(goal.dueDate)}
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
                            <DropdownMenuItem onClick={() => openContributeDialog(goal.id)}>
                              Add money
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit goal</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete goal</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(goal.currentAmount)} saved</span>
                        <span>{formatCurrency(goal.targetAmount - goal.currentAmount)} to go</span>
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

      {/* Contribute Dialog */}
      <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Contribution</DialogTitle>
            <DialogDescription>
              Add funds to your savings goal.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContribute}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contribution" className="text-right">
                  Amount (₹)
                </Label>
                <Input
                  id="contribution"
                  type="number"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="col-span-3"
                  placeholder="10000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsContributeDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Funds</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Goals;
