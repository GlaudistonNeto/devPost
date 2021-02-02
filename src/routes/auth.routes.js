import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import SignInUp from '../screens/SignInUp';

const Stack = createStackNavigator();

function AuthRoutes() {
 return (
   <Stack.Navigator>
    <Stack.Screen
      name="SignInUpScreen"
      component={SignInUp}
      options={{ headerShown: false }}
    />
   </Stack.Navigator>
  );
};

export default AuthRoutes;
