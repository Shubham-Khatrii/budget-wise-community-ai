
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAppContext();

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  // Check if we have any unread notifications
  const hasUnreadNotifications = notifications.some(notification => !notification.read);

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your finances</p>
          </div>
          {hasUnreadNotifications && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => markAllNotificationsAsRead()}
              className="flex items-center gap-1"
            >
              <Check className="h-4 w-4" />
              <span>Mark all as read</span>
            </Button>
          )}
        </div>
        
        <Card>
          <CardContent className="pt-6">
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-md transition-colors ${
                      notification.read ? 'bg-background' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{notification.title}</h3>
                            {!notification.read && (
                              <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.date)}</p>
                        </div>
                      </div>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                  <Bell className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-muted-foreground">You don't have any notifications at the moment.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Notifications;
