
export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // Note: In a real app, we would never store plaintext passwords
  createdAt: string;
}

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  loggedIn: boolean;
  lastLogin: string;
}

// Simulate backend response time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async register(userData: { email: string; name: string; password: string }): Promise<User> {
    // Simulate API call
    await delay(1000);

    // Check if user already exists
    const existingUsers = this.getAllUsers();
    const userExists = existingUsers.find(user => user.email === userData.email);
    
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: crypto.randomUUID(),
      email: userData.email,
      name: userData.name,
      password: userData.password, // In real app, we would hash this
      createdAt: new Date().toISOString()
    };
    
    // Save user to local storage
    localStorage.setItem('car_wash_users', JSON.stringify([...existingUsers, newUser]));
    
    // Start user session
    this.setCurrentUser({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      loggedIn: true,
      lastLogin: new Date().toISOString()
    });
    
    return newUser;
  },
  
  async login(email: string, password: string): Promise<UserSession> {
    // Simulate API call
    await delay(1000);
    
    // Find user
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Create session
    const session: UserSession = {
      userId: user.id,
      email: user.email,
      name: user.name,
      loggedIn: true,
      lastLogin: new Date().toISOString()
    };
    
    // Save session
    this.setCurrentUser(session);
    
    return session;
  },
  
  logout(): void {
    localStorage.removeItem('car_wash_current_user');
  },
  
  getCurrentUser(): UserSession | null {
    const userJson = localStorage.getItem('car_wash_current_user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing current user from local storage:', error);
      return null;
    }
  },
  
  setCurrentUser(session: UserSession): void {
    localStorage.setItem('car_wash_current_user', JSON.stringify(session));
  },
  
  getAllUsers(): User[] {
    const usersJson = localStorage.getItem('car_wash_users');
    if (!usersJson) return [];
    
    try {
      return JSON.parse(usersJson);
    } catch (error) {
      console.error('Error parsing users from local storage:', error);
      return [];
    }
  },
  
  isLoggedIn(): boolean {
    const currentUser = this.getCurrentUser();
    return !!currentUser?.loggedIn;
  }
};
