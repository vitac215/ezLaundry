'use strict';

import React, { Component } from 'react';
import { View, StyleSheet,Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  onGoBack() {
    if (this.props.leftBtn !== undefined) {
      const {navigator} = this.props;
      navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.navbar}>
          <Text style={styles.button} onPress={this.onGoBack.bind(this)}>{this.props.leftBtn}</Text>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.button}>{this.props.rightBtn}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  navbar: {
    flexDirection:'row',
    paddingTop: 35,
    paddingBottom: 12,
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
