'use strict'
import React, { Component, StyleSheet } from 'react';
import { AppRegistry, Component, Navigator } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';


class laundry extends Component {
  render() {
    return (
      <AppNavigator
        initialRoute={{ident: "launch"}}/>
    )
  }
}

const styles = StyleSheet.create({

})

AppRegistry.registerComponent('laundry', () => laundry);
