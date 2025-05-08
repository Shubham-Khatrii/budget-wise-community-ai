
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '@/contexts/AppContext';

const BudgetTrends: React.FC = () => {
  const { formatCurrency } = useAppContext();
  
  // Sample budget trend data for the past 6 months
  const trendData = [
    { month: 'Nov', budget: 300000, spent: 285000 },
    { month: 'Dec', budget: 310000, spent: 320000 },
    { month: 'Jan', budget: 310000, spent: 290000 },
    { month: 'Feb', budget: 315000, spent: 300000 },
    { month: 'Mar', budget: 320000, spent: 280000 },
    { month: 'Apr', budget: 325000, spent: 293000 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Spending Trends</CardTitle>
        <CardDescription>Compare budget vs. spending over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis 
                width={45}
                tickFormatter={(value) => `₹${(value/1000)}K`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="budget" 
                name="Budget" 
                stroke="#0EA5E9" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
              <Line 
                type="monotone" 
                dataKey="spent" 
                name="Spent" 
                stroke="#F97316" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTrends;
