import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import CreateAd from './src/screens/CreateAd';
import PostDetails from './src/screens/PostDetails'; 
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'gray',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: 'dodgerblue'
          },
          tabBarStyle: {
            height: 60,
            paddingTop: 5
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 7
          }
        }}
      >
        <Tab.Screen
          name="Annexify"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <Feather name="droplet" size={25} color={focused ? 'dodgerblue' : 'gray'} />
            )
          }}
        />
        <Tab.Screen
          name="Let's Get Listing!"
          component={CreateAd}
          options={{
            tabBarLabel: 'Post Ad',
            tabBarIcon: ({ focused }) => (
              <Feather name="droplet" size={25} color={focused ? 'dodgerblue' : 'gray'} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
