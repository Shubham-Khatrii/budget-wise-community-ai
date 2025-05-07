
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Notifications: React.FC = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your finances</p>
          </div>
        </div>
        <div className="grid gap-6">
          <p>Notifications center will be implemented here.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
