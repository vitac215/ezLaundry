'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';

import MenuBar from '../components/MenuBar';

export default class MainScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log('mainscene', this.props);
    return (
      <MenuBar {...this.props} />
    )
  }
} // end class

var styles = StyleSheet.create({
  tabContent: {
    flex: 1
  }
});
