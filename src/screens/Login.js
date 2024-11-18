import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from '../services/ApiService';

const Login = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    const clientId = '3j164aptj9mu6pri50n64rlaq';
    const redirectUri = 'annexify://auth';
    const hostedUrl = `https://annexify.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=${clientId}&response_type=token&scope=email+openid+phone&redirect_uri=${encodeURIComponent(redirectUri)}`;

    const handleNavigationStateChange = async (navState) => {
        const { url } = navState;
        console.log('Navigated URL:', url); // Log the URL for debugging

        if (url && url.startsWith(redirectUri)) {
            const accessTokenMatch = url.match(/access_token=([^&]+)/);
            const idTokenMatch = url.match(/id_token=([^&]+)/);

            const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
            const idToken = idTokenMatch ? idTokenMatch[1] : null;



            console.log('--------------------------------------------------------------------------------------------');
            console.log(idToken);
            console.log('--------------------------------------------------------------------------------------------');
            console.log(accessToken);
            console.log('--------------------------------------------------------------------------------------------');


            if (accessToken && idToken) {
                try {
                    await SecureStore.setItemAsync('accessToken', accessToken);
                    console.log('Access token stored successfully.');

                    apiClient.post('/user', {}, {
                        params: { idToken: idToken }
                    })
                        .then(response => {
                            console.log('User data saved successfully');
                            navigation.navigate('HomeTab');
                        })
                        .catch(error => {
                            console.error('Error saving user data:', error);
                        });
                } catch (error) {
                    console.error('Error storing access token:', error);
                }
            } else {
                console.error('Tokens not found in URL.');
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {loading && (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={styles.loading}
                />
            )}
            <WebView
                source={{ uri: hostedUrl }}
                onLoadEnd={() => setLoading(false)}
                onNavigationStateChange={handleNavigationStateChange}
                startInLoadingState
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -25,
        marginLeft: -25,
    },
});

export default Login;
