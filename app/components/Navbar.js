'use strict';

import React, { Component } from 'react';
import { View, StyleSheet,Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  onGoBack() {
    const {navigator} = this.props;
    navigator.pop();
  }

  render() {
    const {route} = this.props;
    return (
      <View style={styles.navbar}>
          <Text style={styles.button} onPress={this.onGoBack.bind(this)}>{route.leftBtn}</Text>
          <Text style={styles.title}>{route.title}</Text>
          <Text style={styles.button}>{route.rightBtn}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  navbar: {
    flexDirection:'row',
    paddingTop: 35,
    paddingBottom: 10,
    backgroundColor: '#4AC3C0'
  },

  button: {
    width: 50,
    color:'#fff',
    textAlign:'center'
  },

  title: {
    fontSize: 20,
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1
  }

});
