import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthPage from "./screens/AuthPage";
import DashboardScreen from "./screens/DashboardScreen";

interface User {
  username: string;
  email: string;
  fullName?: string;
}

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Dashboard" : "Auth"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth">
          {() => <AuthPage setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;