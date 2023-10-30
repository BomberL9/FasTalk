import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Raleway_300Light } from '@expo-google-fonts/raleway';

import Login from './screens/Login';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import Chat from './screens/Chat';

const Stack = createStackNavigator();

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false
    }
  }

  loadFont = async() => {
    await Font.loadAsync({
      Font: Raleway_300Light
    });
    this.setState({fontLoaded: true})
  };

  componentDidMount(){
    this.loadFont();
  }

  render(){
    const { fontLoaded } = this.state;
    if(!fontLoaded){
      return <Text>Carregando...</Text>
    }else{
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name = "Login" component={Login}/>
            <Stack.Screen name = "SignUp" component={SignUp}/>
            <Stack.Screen name = "Home" component={Home}/>
            <Stack.Screen name = "Chat" component={Chat}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}