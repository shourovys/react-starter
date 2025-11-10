import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import './App.css';

function App() {
  const { toast } = useToast();
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      toast({
        title: 'Welcome!',
        description: `Hello ${name}, welcome to the React + TypeScript + Tailwind + shadcn/ui boilerplate!`,
      });
      setName('');
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                <span className="hidden font-bold sm:inline-block">
                  React TypeScript Boilerplate
                </span>
              </a>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                {/* Placeholder for future search */}
              </div>
              <nav className="flex items-center">
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto py-6 space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              React 19 + TypeScript 5.7 + Tailwind CSS + shadcn/ui
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A production-ready boilerplate with testing, linting, and modern
              development tools.
            </p>
            <div className="flex justify-center gap-4">
              <Button>Get Started</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>React 19</CardTitle>
                <CardDescription>
                  Latest React with concurrent features and improved performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built with the latest React 19 features including automatic
                  batching, transitions, and server components support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>TypeScript 5.7</CardTitle>
                <CardDescription>
                  Strict TypeScript configuration for better developer
                  experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Full TypeScript support with strict mode, path aliases, and
                  comprehensive type checking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tailwind CSS</CardTitle>
                <CardDescription>
                  Utility-first CSS framework with shadcn/ui components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Beautiful, accessible components built with Tailwind CSS and
                  shadcn/ui design system.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Demo */}
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Try out the components and theme toggle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={!name.trim()}>
                  Show Welcome Toast
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Welcome Dialog</DialogTitle>
                      <DialogDescription>
                        This is a demonstration of the shadcn/ui dialog
                        component.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="setup">Setup</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-2">
                  <p>
                    This is the overview tab content showcasing the shadcn/ui
                    tabs component.
                  </p>
                </TabsContent>
                <TabsContent value="features" className="space-y-2">
                  <p>
                    Features include: React 19, TypeScript 5.7, Vite 6, Tailwind
                    CSS, shadcn/ui, Testing, and more!
                  </p>
                </TabsContent>
                <TabsContent value="setup" className="space-y-2">
                  <p>
                    Quick setup: Clone the repo, install dependencies, and start
                    developing!
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="border-t mt-10">
          <div className="container py-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using modern web technologies
            </p>
            <p className="text-sm text-muted-foreground">
              Ready for production deployment
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
