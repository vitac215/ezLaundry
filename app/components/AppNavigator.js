'use strict'

import React, { Component } from 'react';
import { View, StyleSheet,Text } from 'react-native';

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);
    const {navigator} = this.props;
  }

  render() {
    return (
      <View Style={styles.navContainer}>
          <Text>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  navContainer: {
    height: 50,
    // backgroundColor: '#4AC3C0'
    backgroundColor: 'white'
  }
});
