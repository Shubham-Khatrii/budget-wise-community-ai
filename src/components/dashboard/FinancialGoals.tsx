
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PiggyBank, Plane, Car, Home, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppContext } from '@/contexts/AppContext';

const FinancialGoals: React.FC = () => {
  const { goals, addGoal, addContributionToGoal } = useAppContext();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [contributionAmount, setContributionAmount] = useState('');
  
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    dueDate: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
  });

  // Predefined goals for initial state
  const initialGoals = [
    {
      id: 'g1',
      title: 'Emergency Fund',
      targetAmount: 1000000,
      currentAmount: 750000,
      dueDate: '2025-12-31',
      icon: <PiggyBank className="h-4 w-4" />,
      iconBg: 'bg-budget-blue/10 text-budget-blue',
      priority: 'High' as 'High' | 'Medium' | 'Low',
    },
    {
      id: 'g2',
      title: 'Goa Vacation',
      targetAmount: 200000,
      currentAmount: 75000,
      dueDate: '2026-06-15',
      icon: <Plane className="h-4 w-4" />,
      iconBg: 'bg-budget-purple/10 text-budget-purple',
      priority: 'Medium' as 'High' | 'Medium' | 'Low',
    },
    {
      id: 'g3',
      title: 'New Car',
      targetAmount: 1500000,
      currentAmount: 500000,
      dueDate: '2027-03-01',
      icon: <Car className="h-4 w-4" />,
      iconBg: 'bg-budget-green/10 text-budget-green',
      priority: 'Medium' as 'High' | 'Medium' | 'Low',
    },
    {
      id: 'g4',
      title: 'Home Down Payment',
      targetAmount: 5000000,
      currentAmount: 1200000,
      dueDate: '2028-01-01',
      icon: <Home className="h-4 w-4" />,
      iconBg: 'bg-budget-orange/10 text-budget-orange',
      priority: 'High' as 'High' | 'Medium' | 'Low',
    },
  ];

  // Use either context goals or initial goals if context is empty
  const displayGoals = goals.length > 0 ? goals : initialGoals;

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

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.dueDate) {
      return;
    }

    const iconOptions = [
      { icon: <PiggyBank className="h-4 w-4" />, bg: 'bg-budget-blue/10 text-budget-blue' },
      { icon: <Plane className="h-4 w-4" />, bg: 'bg-budget-purple/10 text-budget-purple' },
      { icon: <Car className="h-4 w-4" />, bg: 'bg-budget-green/10 text-budget-green' },
      { icon: <Home className="h-4 w-4" />, bg: 'bg-budget-orange/10 text-budget-orange' },
    ];
    
    const randomIcon = iconOptions[Math.floor(Math.random() * iconOptions.length)];
    
    addGoal({
      title: newGoal.title,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      dueDate: newGoal.dueDate,
      icon: randomIcon.icon,
      iconBg: randomIcon.bg,
      priority: newGoal.priority,
    });
    
    setNewGoal({
      title: '',
      targetAmount: '',
      dueDate: '',
      priority: 'Medium',
    });
    
    setIsAddGoalOpen(false);
  };

  const openContributeDialog = (goalId: string) => {
    setSelectedGoalId(goalId);
    setIsContributeOpen(true);
  };

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
    setIsContributeOpen(false);
  };

  return (
    <Card className="col-span-full mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Financial Goals</CardTitle>
          <CardDescription>Track your progress towards your financial milestones</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => setIsAddGoalOpen(true)}>
          <Plus className="mr-1 h-4 w-4" /> Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {displayGoals.map((goal) => {
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => openContributeDialog(goal.id)}
                  >
                    Add Funds
                  </Button>
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
        </div>

        {/* Add Goal Dialog */}
        <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Financial Goal</DialogTitle>
              <DialogDescription>
                Create a new savings goal to track your progress.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddGoal}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Goal Title
                  </Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="col-span-3"
                    placeholder="New Car, Emergency Fund, etc."
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Target Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    className="col-span-3"
                    placeholder="500000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Target Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select
                    value={newGoal.priority}
                    onValueChange={(value: 'High' | 'Medium' | 'Low') => 
                      setNewGoal({...newGoal, priority: value})
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddGoalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Goal</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Contribute Dialog */}
        <Dialog open={isContributeOpen} onOpenChange={setIsContributeOpen}>
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
                <Button variant="outline" type="button" onClick={() => setIsContributeOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Funds</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;
