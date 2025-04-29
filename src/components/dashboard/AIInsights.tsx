
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Insight {
  id: string;
  text: string;
  type: 'tip' | 'warning' | 'positive';
  action?: string;
}

const AIInsights: React.FC = () => {
  const insights: Insight[] = [
    {
      id: 'i1',
      text: 'Your restaurant spending is 35% higher than last month. Consider setting a dining budget.',
      type: 'warning',
      action: 'Set budget',
    },
    {
      id: 'i2',
      text: 'Congratulations! You've reached 50% of your emergency fund goal.',
      type: 'positive',
    },
    {
      id: 'i3',
      text: 'Based on your income, you could increase your monthly savings by $250 without impacting your lifestyle.',
      type: 'tip',
      action: 'Adjust savings',
    },
    {
      id: 'i4',
      text: 'Your subscription services total $95/month. We found potential savings of $35 from overlapping services.',
      type: 'warning',
      action: 'View details',
    },
  ];

  // Get badge styling based on insight type
  const getBadgeStyling = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-budget-orange/20 text-budget-orange';
      case 'positive':
        return 'bg-budget-green/20 text-budget-green';
      case 'tip':
        return 'bg-budget-blue/20 text-budget-blue';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Get label text based on insight type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'warning':
        return 'Suggestion';
      case 'positive':
        return 'Achievement';
      case 'tip':
        return 'Opportunity';
      default:
        return 'Insight';
    }
  };

  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-budget-purple mr-2" />
            AI Insights
          </CardTitle>
          <CardDescription>Personalized financial recommendations</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="p-3 rounded-md border border-border">
              <div className="flex justify-between items-start mb-2">
                <Badge className={getBadgeStyling(insight.type)}>
                  {getTypeLabel(insight.type)}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="sr-only">Helpful</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <ThumbsDown className="h-3.5 w-3.5" />
                    <span className="sr-only">Not helpful</span>
                  </Button>
                </div>
              </div>
              <p className="text-sm mb-3">{insight.text}</p>
              {insight.action && (
                <Button variant="outline" size="sm" className="w-full text-xs">
                  {insight.action}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
