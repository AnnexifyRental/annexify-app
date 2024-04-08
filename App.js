
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateAd from './src/screens/CreateAd';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={Home} />
        <Tab.Screen name={'CreateAd'} component={CreateAd} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
