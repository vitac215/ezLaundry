'use strict'
import React, { Component } from 'react';
import { AppRegistry, Component, Navigator } from 'react-native';
import ViewContainer from './app/components/ViewContainer';
import StatusBarBackground from './app/components/StatusBarBackground';

export default class laundry extends Component {
  render() {
    return (
      <Navigator>
    );
  }
}

AppRegistry.registerComponent('laundry', () => laundry);
