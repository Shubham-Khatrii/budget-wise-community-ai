
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Heart, ThumbsUp, Share2 } from 'lucide-react';

const Community: React.FC = () => {
  const communityPosts = [
    {
      id: 'p1',
      author: {
        name: 'Priya Sharma',
        avatar: 'https://i.pravatar.cc/150?img=1',
        initials: 'PS',
      },
      timestamp: '2 hours ago',
      content: 'I finally reached my emergency fund goal of ₹5 lakhs! It took me 18 months of consistent saving. So happy to have this financial safety net now.',
      likes: 24,
      comments: 8,
      shares: 3,
    },
    {
      id: 'p2',
      author: {
        name: 'Arjun Kumar',
        avatar: 'https://i.pravatar.cc/150?img=2',
        initials: 'AK',
      },
      timestamp: '5 hours ago',
      content: 'Anyone have tips on reducing grocery expenses? My food budget keeps going over limit despite careful planning.',
      likes: 16,
      comments: 12,
      shares: 0,
    },
    {
      id: 'p3',
      author: {
        name: 'Meera Patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
        initials: 'MP',
      },
      timestamp: '1 day ago',
      content: 'Just switched to a better credit card with 2% cashback on all purchases and no annual fee. Already seeing savings on my monthly expenses!',
      likes: 32,
      comments: 4,
      shares: 7,
    }
  ];

  const communityGroups = [
    {
      id: 'g1',
      name: 'Frugal Living India',
      members: 5340,
      description: 'Tips and strategies for living frugally in India',
      posts: 238,
    },
    {
      id: 'g2',
      name: 'Investment Strategies',
      members: 4218,
      description: 'Discussion on stocks, mutual funds, and other investments',
      posts: 412,
    },
    {
      id: 'g3',
      name: 'First-time Homebuyers',
      members: 2987,
      description: 'Support group for those saving for their first home',
      posts: 154,
    },
    {
      id: 'g4',
      name: 'Debt Freedom Journey',
      members: 3562,
      description: 'Support for those working to become debt-free',
      posts: 326,
    },
  ];

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground">Connect with other users</p>
          </div>
          <Button size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </div>
        
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-full px-4 py-2 cursor-pointer text-muted-foreground">
                        Share your financial journey or ask a question...
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" />
                      Success Story
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Question
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      Community Poll
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {communityPosts.map(post => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                    <p className="mb-4">{post.content}</p>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        {post.shares}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityGroups.map(group => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          <Users className="h-4 w-4 inline mr-1" /> 
                          {group.members} members
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4 inline mr-1" /> 
                          {group.posts} posts
                        </p>
                      </div>
                      <Button>Join Group</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                  <Users className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium mb-1">Create New Group</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Start a community around a financial topic you're passionate about
                  </p>
                  <Button>Create Group</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Community;
