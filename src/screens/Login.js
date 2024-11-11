import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios'; 
import BASE_URL from '../../Config';

const Login = ({ navigation }) => {
  const handleLogin = async () => {
    try {
      await Auth.federatedSignIn({ provider: 'COGNITO' });
    } catch (error) {
      console.log('Error signing in', error);
    }
  };

  useEffect(() => {
    const handleRedirect = async () => {
      const url = new URL(window.location.href);
      const accessToken = url.hash.match(/access_token=([^&]*)/)[1];
      const idToken = url.hash.match(/id_token=([^&]*)/)[1];

      if (accessToken && idToken) {
        try {
          const response = await axios.post(`${BASE_URL}/user?idToken=${idToken}`, {}, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          const data = response.data;
          console.log('User data:', data);
          // Navigate to Home screen after successful login
          navigation.navigate('Home');
        } catch (error) {
          console.log('Error sending token to backend', error);
        }
      }
    };

    handleRedirect();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Annexify</Text>
      <Button title="Login with Cognito" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Login;