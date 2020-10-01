import React, {Component, View, Text} from 'react';
import Wallpaper from './Wallpaper';
import LoginScreen from './LoginScreen';
import Logo from './Logo';

export default class UserScreen extends Component {
  render() {
    return (
        <Wallpaper>
          <Logo />
          <LoginScreen/>
        </Wallpaper>
    );
  }
}