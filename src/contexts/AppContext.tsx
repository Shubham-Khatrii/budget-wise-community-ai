import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { PiggyBank, Plane, Car, Home } from 'lucide-react';

// Define types for our data
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  dueDate: string;
  icon: React.ReactNode;
  iconBg: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Bill {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Overdue';
}

export interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  color: string;
}

interface AppContextType {
  expenses: Expense[];
  notifications: Notification[];
  goals: Goal[];
  bills: Bill[];
  budgetCategories: BudgetCategory[];
  monthlyBudget: number;
  totalSpent: number;
  remaining: number;
  communityPosts: CommunityPost[];
  unreadNotificationsCount: number;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addContributionToGoal: (goalId: string, amount: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  markBillAsPaid: (id: string) => void;
  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'author' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => void;
  likePost: (postId: string) => void;
  formatCurrency: (amount: number) => string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize with sample data
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 't1',
      title: 'Grocery Shopping',
      amount: 8432,
      date: '2025-04-28',
      category: 'Food',
    },
    {
      id: 't2',
      title: 'Monthly Rent',
      amount: 120000,
      date: '2025-04-25',
      category: 'Housing',
    },
    {
      id: 't3',
      title: 'Chai Coffee',
      amount: 580,
      date: '2025-04-28',
      category: 'Food',
    },
    {
      id: 't4',
      title: 'Auto to Work',
      amount: 1250,
      date: '2025-04-28',
      category: 'Transportation',
    },
    {
      id: 't5',
      title: 'Dinner with Friends',
      amount: 3825,
      date: '2025-04-27',
      category: 'Food',
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      title: 'Budget Alert',
      message: 'You have exceeded your Food budget for this month by ₹2,500',
      date: '2025-04-28',
      read: false,
      type: 'warning',
    },
    {
      id: 'n2',
      title: 'Bill Reminder',
      message: 'Your electricity bill of ₹3,200 is due tomorrow',
      date: '2025-04-27',
      read: false,
      type: 'info',
    },
    {
      id: 'n3',
      title: 'Goal Achievement',
      message: "Congratulations! You've reached 50% of your Emergency Fund goal",
      date: '2025-04-25',
      read: true,
      type: 'success',
    }
  ]);

  // Initialize budget categories
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    { name: 'Housing', spent: 120000, budget: 150000, color: '#0EA5E9' },
    { name: 'Food', spent: 68000, budget: 65000, color: '#F97316' },
    { name: 'Transportation', spent: 32000, budget: 40000, color: '#8B5CF6' },
    { name: 'Entertainment', spent: 45000, budget: 40000, color: '#D946EF' },
    { name: 'Utilities', spent: 28000, budget: 30000, color: '#10B981' },
  ]);

  // Initialize bills
  const [bills, setBills] = useState<Bill[]>([
    {
      id: 'b1',
      title: 'Electricity Bill',
      amount: 3499.75,
      dueDate: '2025-05-05',
      status: 'Pending',
    },
    {
      id: 'b2',
      title: 'Water Bill',
      amount: 1235.30,
      dueDate: '2025-05-10',
      status: 'Pending',
    },
    {
      id: 'b3',
      title: 'Internet & Cable',
      amount: 2199.99,
      dueDate: '2025-05-15',
      status: 'Pending',
    },
    {
      id: 'b4',
      title: 'Mobile Recharge',
      amount: 999.00,
      dueDate: '2025-05-22',
      status: 'Pending',
    },
    {
      id: 'b5',
      title: 'Streaming Services',
      amount: 649.98,
      dueDate: '2025-05-28',
      status: 'Pending',
    }
  ]);

  // Initialize initial goals with sample data
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
  
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  // Initialize community posts
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: 'p1',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://i.pravatar.cc/150?img=1',
        initials: 'PS',
      },
      timestamp: '2 hours ago',
      content: 'I finally reached my emergency fund goal of ₹5 lakhs! It took me 18 months of consistent saving. So happy to have this financial safety net now.',
      likes: 24,
      comments: 8,
      shares: 3,
    },
    {
      id: 'p2',
      author: {
        name: 'Arjun Kumar',
        avatar: 'https://i.pravatar.cc/150?img=2',
        initials: 'AK',
      },
      timestamp: '5 hours ago',
      content: 'Anyone have tips on reducing grocery expenses? My food budget keeps going over limit despite careful planning.',
      likes: 16,
      comments: 12,
      shares: 0,
    },
    {
      id: 'p3',
      author: {
        name: 'Meera Patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
        initials: 'MP',
      },
      timestamp: '1 day ago',
      content: 'Just switched to a better credit card with 2% cashback on all purchases and no annual fee. Already seeing savings on my monthly expenses!',
      likes: 32,
      comments: 4,
      shares: 7,
    }
  ]);

  // Calculate total monthly budget
  const monthlyBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  
  // Calculate total spent amount
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  
  // Calculate remaining budget
  const remaining = monthlyBudget - totalSpent;

  // Calculate unread notifications count
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Add a new expense
  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: `t${expenses.length + 1}`,
      date: new Date().toISOString().split('T')[0],
    };
    
    setExpenses([newExpense, ...expenses]);
    
    // Update the budget category's spent amount
    const updatedCategories = budgetCategories.map(category => {
      if (category.name === expense.category) {
        return {
          ...category,
          spent: category.spent + expense.amount
        };
      }
      return category;
    });
    
    setBudgetCategories(updatedCategories);
    
    // Create notification for large expenses (over ₹5000)
    if (expense.amount > 5000) {
      addNotification({
        title: 'Large Expense',
        message: `You spent ${formatCurrency(expense.amount)} on ${expense.title}`,
        type: 'info'
      });
    }
    
    toast.success(`Added ${formatCurrency(expense.amount)} expense for ${expense.title}`);
  };

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `n${notifications.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      read: false,
    };
    
    setNotifications([newNotification, ...notifications]);
    
    // Show toast for new notifications
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  // Mark a notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  // Add contribution to a goal
  const addContributionToGoal = (goalId: string, amount: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, currentAmount: goal.currentAmount + amount }
          : goal
      )
    );
    
    const goalTitle = goals.find(g => g.id === goalId)?.title;
    if (goalTitle) {
      toast.success(`Added ${formatCurrency(amount)} to ${goalTitle}`);
      
      // Add notification for goal contributions
      addNotification({
        title: 'Goal Contribution',
        message: `You added ${formatCurrency(amount)} to your ${goalTitle} goal`,
        type: 'success'
      });
    }
  };

  // Add a new goal
  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: `g${goals.length + 1}`,
    };
    
    setGoals([...goals, newGoal]);
    toast.success(`${goal.title} added to your financial goals`);
    
    // Add notification for new goal
    addNotification({
      title: 'New Goal Created',
      message: `You created a new goal: ${goal.title} with target ${formatCurrency(goal.targetAmount)}`,
      type: 'success'
    });
  };

  // Mark a bill as paid
  const markBillAsPaid = (id: string) => {
    // Find the bill to get its amount
    const bill = bills.find(b => b.id === id);
    
    if (bill) {
      // Update bill status
      setBills(
        bills.map(bill => 
          bill.id === id ? { ...bill, status: 'Paid' as const } : bill
        )
      );
      
      // Add an expense for the paid bill
      addExpense({
        title: `Paid: ${bill.title}`,
        amount: bill.amount,
        category: 'Utilities',
        description: `Payment for ${bill.title}`
      });
      
      toast.success(`${bill.title} marked as paid`);
    }
  };

  // Add community post
  const addCommunityPost = (post: Omit<CommunityPost, 'id' | 'author' | 'timestamp' | 'likes' | 'comments' | 'shares'>) => {
    const newPost: CommunityPost = {
      id: `p${communityPosts.length + 1}`,
      author: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=8',
        initials: 'YO',
      },
      timestamp: 'Just now',
      content: post.content,
      likes: 0,
      comments: 0,
      shares: 0,
    };
    
    setCommunityPosts([newPost, ...communityPosts]);
    toast.success('Post added to community feed');
  };
  
  // Like a post
  const likePost = (postId: string) => {
    setCommunityPosts(
      communityPosts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        notifications,
        goals,
        bills,
        budgetCategories,
        monthlyBudget,
        totalSpent,
        remaining,
        communityPosts,
        unreadNotificationsCount,
        addExpense,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addContributionToGoal,
        addGoal,
        markBillAsPaid,
        addCommunityPost,
        likePost,
        formatCurrency
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
