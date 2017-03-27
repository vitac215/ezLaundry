'use strict';

import React, { Component } from 'react';

import { Text, TextInput, StyleSheet, Image, ScrollView, ListView, View } from 'react-native';

import ReserveConfirmScene from './ReserveConfirmScene.js';
import Navbar from '../components/Navbar';
import MainScene from './MainScene.js';

export default class ReserveRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('reserve render', this.props);
    return (
      <View style={styles.container}>
      
      <ReserveConfirmScene {...this.props} />

      </View>

    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
