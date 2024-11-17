import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import CreateAd from './src/screens/CreateAd';
import PostDetails from './src/screens/PostDetails';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import SInfo from 'react-native-secure-storage';
import { apiClient } from './src/services/ApiService';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const secureStoreOptions = {
  sharedPreferencesName: 'myAppPrefs',
  keychainService: 'myAppKeychain'
};

SplashScreen.preventAutoHideAsync();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay for demonstration
      await SplashScreen.hideAsync();
      openHostedUI();
    }

    const openHostedUI = async () => {
      const clientId = '3j164aptj9mu6pri50n64rlaq';
      const redirectUri = 'annexify://auth';
      const hostedUrl = `https://annexify.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=${clientId}&response_type=token&scope=email+openid+phone&redirect_uri=${encodeURIComponent(redirectUri)}`;

      await Linking.openURL(hostedUrl);
    };

    const handleOpenURL = async ({ url }) => {
      console.log('URL:', url);

      const accessTokenMatch = url.match(/access_token=([^&]+)/);
      const idTokenMatch = url.match(/id_token=([^&]+)/);
      const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
      const idToken = idTokenMatch ? idTokenMatch[1] : null;

      if (accessToken && idToken) {
        await SInfo.setItem('accessToken', accessToken, secureStoreOptions);
        setIsAuthenticated(true);

        apiClient.post('/user', {}, {
          params: {
            idToken: idToken
          }
        })
          .then(response => {
            console.log('User data saved successfully');
          })
          .catch(error => {
            console.log('Error saving user data', error);
          });
      }
    };

    Linking.addEventListener('url', handleOpenURL);

    prepare();

    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarIcon: ({ color, size }) => (<Feather name="home" color={color} size={size} />) }} />
        <Tab.Screen name="CreateAdTab" component={CreateAd} options={{ tabBarIcon: ({ color, size }) => (<Feather name="plus-circle" color={color} size={size} />) }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}