import { http, HttpResponse } from 'msw';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

// Example API handlers for testing
export const handlers = [
  // Mock GET request
  http.get('/api/users', () => {
    return HttpResponse.json<User[]>([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ]);
  }),

  // Mock POST request
  http.post('/api/users', async ({ request }) => {
    const newUser = (await request.json()) as CreateUserRequest;
    const createdUser: User = { ...newUser, id: Date.now() };
    return HttpResponse.json(createdUser, { status: 201 });
  }),

  // Mock error response
  http.get('/api/error', () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }),

  // Mock delayed response
  http.get('/api/delayed', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return HttpResponse.json({ message: 'Delayed response' });
  }),
];
