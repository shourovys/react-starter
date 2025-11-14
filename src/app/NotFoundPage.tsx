import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NotFoundPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card data-testid="not-found-card">
        <CardHeader>
          <CardTitle data-testid="not-found-title">
            404 - Page Not Found
          </CardTitle>
          <CardDescription data-testid="not-found-description">
            The page you are looking for does not exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p
              className="text-muted-foreground"
              data-testid="not-found-content"
            >
              The page you are looking for has been moved, deleted, or never
              existed.
            </p>
            <Button
              onClick={() => (window.location.href = '/')}
              data-testid="go-home-button"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
