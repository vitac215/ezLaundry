'use strict'

import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, NavigatorIOS, View } from 'react-native';

import LaunchScene from './app/scenes/LaunchScene';

export default class laundry extends Component {
  render() {
    var defaultRoute = "LaunchScene";
    var defaultComp = LaunchScene;
    var deafultTitle = "Welcome";

    return (
      <NavigatorIOS
        style={{flex: 1}}
        barTintColor="#4AC3C0"
        titleTextColor="#fff"
        tintColor="fff"

        initialRoute= {{
          name: defaultRoute,
          title: deafultTitle,
          component: LaunchScene
        }}
        configureScene={ (route) => {
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          var Component = route.component;
          return (
            <View Style={{flex: 1}}>
              <Component {...route.params} navigator={navigator} />
            </View>
          )
        }}
      />
    )
  }
}

AppRegistry.registerComponent('laundry', () => laundry);
