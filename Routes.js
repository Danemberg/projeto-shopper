import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './pages/Home';
import Login from './pages/Login';

const Stack = createStackNavigator();

export function Routes (){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={Home}
        />
        <Stack.Screen name="login" component={Login} 
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

