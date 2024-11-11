import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import CreateAd from './src/screens/CreateAd';
import PostDetails from './src/screens/PostDetails'; 
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import Amplify from 'aws-amplify';
import awsConfig from './AwsConfig';

Amplify.configure(awsConfig);


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay for demonstration
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);
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
