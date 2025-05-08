
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

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

interface AppContextType {
  expenses: Expense[];
  notifications: Notification[];
  goals: Goal[];
  unreadNotificationsCount: number;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addContributionToGoal: (goalId: string, amount: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  formatCurrency: (amount: number) => string;
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

  const [goals, setGoals] = useState<Goal[]>([]);

  // Format currency as Indian Rupees
  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

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

  return (
    <AppContext.Provider
      value={{
        expenses,
        notifications,
        goals,
        unreadNotificationsCount,
        addExpense,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addContributionToGoal,
        addGoal,
        formatCurrency
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
