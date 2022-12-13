import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import PreDepartureScreen from '../screens/PreDepartureScreen';
import MyChecklistEditScreen from '../screens/MyChecklistEditScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="PreDeparture" component={PreDepartureScreen} />
        <Stack.Screen name="MyChecklistEdit" component={MyChecklistEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
