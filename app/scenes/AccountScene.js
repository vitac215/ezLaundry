'use strict';

import React, { Component } from 'react';

import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ListView,
  SegmentedControlIOS,
  ScrollView,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Navbar from '../components/Navbar';

var WithLabel = React.createClass({
    render() {
      return (
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Text>{this.props.label}</Text>
          </View>
          {this.props.children}
        </View>
      );
    }
  }
);

var AccountScene = React.createClass({

  getInitialState: function() {
    const {navigator} = this.props;

    return {
      email: this.props.username,
      password: this.props.password,
      address: this.props.address,
    };
  },

  render: function() {
    console.log('AccountScene', this.props);
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <Navbar title={this.props.title} leftBtn='Back' navigator={navigator} />
        <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
        <Text>
          <Text>&ensp;&ensp;&ensp;Email&ensp;&ensp;&ensp;</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={ (email) => {this.setState({email})}}
            placeholder={this.props.username}
            autoCapitalize='none'
            autoCorrect={false}
            value={this.state.email}/>
        </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={ (password) => {this.setState({password})}}
            placeholder='password'
            autoCapitalize='none'
            secureTextEntry
            placeholderTextColor='rgba(51,51,51,0.5)'
            autoCorrect={false}
            value={this.state.password} />
        </View>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  inputContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  textInput: {
    alignSelf: 'center',
    height: 40,
    width: 250,
    marginTop: 26,
    fontSize: 17,
    padding: 10,
  },
  mainContainer: {
    justifyContent: 'center',
    marginTop: 50
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1,
  },
});

module.exports = AccountScene;
