import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import NewPost from '../screens/NewPost';
import PostsUser from '../screens/PostsUser';

const Tab = createBottomTabNavigator();

function AppRoutes() {
 return (
   <Tab.Navigator>
       <Tab.Screen name="Home" component={Home} />
       <Tab.Screen name="Search" component={Search} />
       <Tab.Screen name="Profile" component={Profile} />
   </Tab.Navigator>
  );
}

export default AppRoutes;
