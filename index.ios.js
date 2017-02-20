'use strict'

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Navigator, NavigatorIOS, View } from 'react-native';

import LaunchScene from './app/scenes/LaunchScene';
import Navbar from './app/components/Navbar';

export default class laundry extends Component {
  render() {
    var defaultRoute = "LaunchScene";
    var defaultComp = LaunchScene;

    return (
      <Navigator
        style={{flex: 1}}
        barTintColor="#4AC3C0"
        titleTextColor="#fff"
        tintColor="fff"

        initialRoute= {{
          name: defaultRoute,
          component: LaunchScene
        }}
        configureScene={ (route) => {
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          var Component = route.component;
          return (
            <View Style={{flex: 1}}>
              <Navbar {...route.params} route={route} navigator={navigator} />
              <Component {...route.params} navigator={navigator} />
            </View>
          )
        }}
      />
    )
  }
}

AppRegistry.registerComponent('laundry', () => laundry);
