
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Download } from 'lucide-react';

const BudgetHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Budget Overview</h1>
        <p className="text-muted-foreground">Track your spending and stay on target</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
        <Button size="sm" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>New Budget</span>
        </Button>
      </div>
    </div>
  );
};

export default BudgetHeader;
