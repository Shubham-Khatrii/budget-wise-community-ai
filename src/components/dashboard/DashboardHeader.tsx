
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  onAddExpense?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddExpense }) => {
  const navigate = useNavigate();
  const { unreadNotificationsCount } = useAppContext();

  const handleMenuAction = (action: string) => {
    switch(action) {
      case 'profile':
        navigate('/settings');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'signout':
        // In a real app, this would handle sign out logic
        navigate('/auth');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Rahul! Here's your financial overview.</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button 
          variant="outline" 
          size="icon" 
          className="relative"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-4 w-4" />
          {unreadNotificationsCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs"
            >
              {unreadNotificationsCount}
            </Badge>
          )}
        </Button>
        <Button 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onAddExpense}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Expense</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>RJ</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleMenuAction('profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuAction('settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive"
              onClick={() => handleMenuAction('signout')}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
