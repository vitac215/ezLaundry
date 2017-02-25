'use strict';
import React, { Component } from 'react';
import {
  Navigator,
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
export default class ReserveScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigator} = this.props;
    console.log("Reserve!!!")
    return (
      <View style={styles.container}>
      <Navbar title='Pick Your Time' leftBtn='Back' navigator={navigator} />
      <Text style={styles.text}>Hello!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4AC3C0'
  },
  text: {
    fontSize: 100
  }
});
