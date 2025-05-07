
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const Community: React.FC = () => {
  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground">Connect with other users</p>
          </div>
        </div>
        <div className="grid gap-6">
          <p>Community features will be implemented here.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Community;
