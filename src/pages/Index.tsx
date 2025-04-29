
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  BarChart2, 
  TrendingUp, 
  Bell, 
  Users, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Wallet
} from 'lucide-react';

const Index: React.FC = () => {
  // Features section data
  const features = [
    {
      icon: <PieChart className="h-6 w-6" />,
      title: 'Budget Overview',
      description: 'Get a clear snapshot of your finances with visual dashboards and spending analytics.',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Financial Goals',
      description: 'Set and track progress on your savings goals, from emergency funds to dream vacations.',
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: 'Expense Tracking',
      description: 'Automatically categorize and monitor your spending habits across all accounts.',
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: 'Bill Reminders',
      description: 'Never miss a payment with customizable alerts for upcoming bills and subscriptions.',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'AI Insights',
      description: 'Receive personalized recommendations to optimize spending and increase savings.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Community Support',
      description: 'Share tips and stay motivated with a community of like-minded savers.',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "BudgetWise helped me save for my first home in just 18 months. The visual goals feature kept me motivated every step of the way.",
      author: "Sarah T., Homeowner"
    },
    {
      quote: "As a freelancer with irregular income, I struggled to manage my finances until I found BudgetWise. Now I always know where I stand.",
      author: "Marco R., Graphic Designer"
    },
    {
      quote: "The AI suggestions pointed out subscriptions I'd forgotten about, saving me over $200 annually. That alone paid for the app many times over!",
      author: "Priya K., Student"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BudgetWise</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/auth" className="text-sm font-medium hover:text-primary">
              Sign In
            </Link>
            <Button asChild size="sm">
              <Link to="/auth?tab=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Smart Budgeting for <br className="hidden sm:block" />Financial Freedom
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take control of your finances with AI-powered insights, automatic expense tracking, and personalized saving plans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="px-8">
              <Link to="/auth?tab=signup">Start For Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/auth">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 relative">
            <div className="bg-card shadow-lg border rounded-xl overflow-hidden max-w-4xl mx-auto">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
                alt="BudgetWise Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for Financial Success</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you budget smarter, save faster, and build lasting wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have transformed their financial lives with BudgetWise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border shadow-sm">
                <div className="mb-4 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block mr-1">★</span>
                  ))}
                </div>
                <p className="italic mb-4">{testimonial.quote}</p>
                <p className="font-medium">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Finances?</h2>
          <p className="mb-8 max-w-xl mx-auto opacity-90">
            Join BudgetWise today and take the first step towards financial freedom.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8">
            <Link to="/auth?tab=signup">Get Started Now</Link>
          </Button>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="font-bold">BudgetWise</span>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Help</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} BudgetWise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
