import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import CreateAd from './src/screens/CreateAd';
import PostDetails from './src/screens/PostDetails';
import Login from './src/screens/Login';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

function HomeStack({ isAuthenticated }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List of latest ads">
        {props => <Home {...props} isAuthenticated={isAuthenticated} />}
      </Stack.Screen>
      <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
    </Stack.Navigator>
  );
}

function AppTabs({ isAuthenticated }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // Hide the tab labels
        tabBarStyle: { height: 60 }, // Adjust the height if needed
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      >
        {props => <HomeStack {...props} isAuthenticated={isAuthenticated} />}
      </Tab.Screen>
      <Tab.Screen
        name="Post New Ad"
        component={CreateAd}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="plus-circle" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay for demonstration
      await SplashScreen.hideAsync();
      checkAuthentication();
    }

    const checkAuthentication = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken'); // Retrieve token from SecureStore
        if (accessToken) {
          console.log('Access token retrieved:', accessToken);
          setIsAuthenticated(true);
        } else {
          openHostedUI();
        }
      } catch (error) {
        console.error('Error retrieving access token:', error);
        openHostedUI();
      }
    };

    const openHostedUI = () => {
      // Navigate to Login screen
      navigation.navigate('Login');
    };

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Annexify"
            options={{ headerShown: false }}
          >
            {props => <AppTabs {...props} isAuthenticated={isAuthenticated} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}