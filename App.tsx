import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NumberAdder from './components/NumberAdder';
import NumberCalculator from './components/NumberCalculator';
import LoginForm from './components/LoginForm';
import ContactList from './components/ContactList';
import TodoApp from './components/TodoApp';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#f0f4f8',
          },
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: '#2c3e50',
        }}
      >
        <Tab.Screen
          name="NumberAdder"
          component={NumberAdder}
          options={{ title: 'Tính Tổng' }}
        />
        <Tab.Screen
          name="NumberCalculator"
          component={NumberCalculator}
          options={{ title: 'Min/Max' }}
        />
        <Tab.Screen
          name="LoginForm"
          component={LoginForm}
          options={{ title: 'Đăng Nhập' }}
        />
        <Tab.Screen
          name="ContactList"
          component={ContactList}
          options={{ title: 'Danh Bạ' }}
        />
        
        <Tab.Screen
          name="TodoApp"
          component={TodoApp}
          options={{ title: 'Todo List' }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}