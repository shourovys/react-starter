import apiClient from '../../../services/api-client';
import type {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from '../types/user.types';

const userService = {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/api/users');
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/api/users/${id}`);
    return response.data;
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>('/api/users', data);
    return response.data;
  },

  async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<User>(`/api/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/api/users/${id}`);
  },
};

export default userService;
