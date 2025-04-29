
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { 
  PieChart, 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Bell, 
  Users, 
  Settings,
  LogOut,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: PieChart, 
      path: '/dashboard' 
    },
    { 
      title: 'Expenses', 
      icon: TrendingDown, 
      path: '/expenses' 
    },
    { 
      title: 'Budgets', 
      icon: BarChart2, 
      path: '/budgets' 
    },
    { 
      title: 'Goals', 
      icon: TrendingUp, 
      path: '/goals' 
    },
    { 
      title: 'Bills', 
      icon: Calendar, 
      path: '/bills' 
    },
    { 
      title: 'Notifications', 
      icon: Bell, 
      path: '/notifications' 
    },
    { 
      title: 'Community', 
      icon: Users, 
      path: '/community' 
    },
    { 
      title: 'Settings', 
      icon: Settings, 
      path: '/settings' 
    },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Wallet className="h-6 w-6 text-sidebar-accent" />
          <span className="font-bold text-lg">BudgetWise</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`flex items-center ${location.pathname === item.path ? 'bg-accent text-accent-foreground' : ''}`}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
