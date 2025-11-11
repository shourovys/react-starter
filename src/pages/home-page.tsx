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
      <Card>
        <CardHeader>
          <CardTitle>Welcome to React + TypeScript Starter</CardTitle>
          <CardDescription>
            A modern, production-ready boilerplate with testing, accessibility,
            and performance features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is your home page. Start building your amazing application
            here!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
