import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item">
          <p>ID: {user.id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
