// Mock data for tests
export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    createdAt: '2024-01-03T00:00:00.000Z',
  },
];

export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const mockApiResponse = {
  success: true,
  data: mockUsers,
  meta: {
    total: 3,
    page: 1,
    limit: 10,
  },
};

export const mockErrorResponse = {
  success: false,
  error: {
    code: 'USER_NOT_FOUND',
    message: 'User not found',
  },
};

// Mock form data
export const mockCreateUserForm = {
  name: 'New User',
  email: 'newuser@example.com',
};

export const mockUpdateUserForm = {
  name: 'Updated User',
  email: 'updated@example.com',
};
