import React, { createContext, useReducer, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  fullName: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: User;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: User) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload || null };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const login = async (email: string, password: string) => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      const users: User[] = usersData ? JSON.parse(usersData) : [];
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (newUser: User) => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      let users: User[] = usersData ? JSON.parse(usersData) : [];
      if (users.some((u) => u.email === newUser.email)) {
        return false;
      }
      users = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};