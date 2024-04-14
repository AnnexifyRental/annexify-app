
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateAd from './src/screens/CreateAd';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'black',
          },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: 'tomato'

          }
        }}
      >
        <Tab.Screen
          name={'Annexify'}
          component={Home}
          options={{
            tabBarLabel: 'Home'
          }}
        />
        <Tab.Screen name={'CreateAd'} component={CreateAd} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
