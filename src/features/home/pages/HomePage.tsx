import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card data-testid="welcome-card">
        <CardHeader>
          <CardTitle data-testid="welcome-title">
            Welcome to React TypeScript Starter
          </CardTitle>
          <CardDescription data-testid="welcome-description">
            A modern, production-ready boilerplate with testing, accessibility,
            and performance features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground" data-testid="welcome-content">
            This is your home page. Start building your amazing application
            here!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
