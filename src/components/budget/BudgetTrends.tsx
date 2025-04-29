
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BudgetTrends: React.FC = () => {
  // Sample budget trend data for the past 6 months
  const trendData = [
    { month: 'Nov', budget: 3000, spent: 2850 },
    { month: 'Dec', budget: 3100, spent: 3200 },
    { month: 'Jan', budget: 3100, spent: 2900 },
    { month: 'Feb', budget: 3150, spent: 3000 },
    { month: 'Mar', budget: 3200, spent: 2800 },
    { month: 'Apr', budget: 3250, spent: 2930 },
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value}`, '']}
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
