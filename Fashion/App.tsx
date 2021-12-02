import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Onboarding, Welcome, Login } from './src/Authentication';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Routes } from './src/Authentication/components/Navigation'

const AuthenticationStack = createStackNavigator<Routes>();

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    'SFProText-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
    'SFProText-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SFProText-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <NavigationContainer>
          <AuthenticationNavigator />
        </NavigationContainer>
    );
  }
}
