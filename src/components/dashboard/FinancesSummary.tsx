
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';

const FinancesSummary: React.FC = () => {
  const summaryItems = [
    {
      title: 'Total Balance',
      value: '₹12,58,000',
      icon: <IndianRupee className="h-4 w-4" />,
      trend: '',
      trendValue: '',
      color: 'text-budget-blue',
      bgColor: 'bg-budget-blue/10',
    },
    {
      title: 'Monthly Income',
      value: '₹8,35,000',
      icon: <ArrowUpRight className="h-4 w-4" />,
      trend: 'up',
      trendValue: '4.3%',
      color: 'text-budget-green',
      bgColor: 'bg-budget-green/10',
    },
    {
      title: 'Monthly Expenses',
      value: '₹3,62,800',
      icon: <ArrowDownRight className="h-4 w-4" />,
      trend: 'down',
      trendValue: '2.1%',
      color: 'text-budget-orange',
      bgColor: 'bg-budget-orange/10',
    },
    {
      title: 'Savings Rate',
      value: '56.5%',
      icon: <ArrowUpRight className="h-4 w-4" />,
      trend: 'up',
      trendValue: '8.2%',
      color: 'text-budget-purple',
      bgColor: 'bg-budget-purple/10',
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {summaryItems.map((item) => (
        <Card key={item.title} className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`p-1 rounded-full ${item.bgColor}`}>
              <div className={item.color}>
                {item.icon}
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="text-2xl font-bold">{item.value}</div>
            {item.trend && (
              <p className={`text-xs flex items-center mt-1
                ${item.trend === 'up' ? 'text-budget-green' : 'text-budget-orange'}`}
              >
                {item.trend === 'up' ? 
                  <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                }
                {item.trendValue} from last month
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FinancesSummary;
