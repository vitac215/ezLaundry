'use strict'

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, StyleSheet, Image, TextInput, Alert } from 'react-native';

import Button from 'apsl-react-native-button';
import store from '../store';
import API from '../api';

import Navbar from '../components/Navbar';
import MainScene from './MainScene';

export default class SignupScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordconfirm: '',
      address: '',
      propertyName: ''
    }
  }

  async signupAction() {
    const { navigator } = this.props;
    const { username, password, passwordconfirm, address, propertyName } = this.state;

    if (!username || !password || !address || !propertyName) {
      Alert.alert('Please enter all the information');
      return;
    }

    if (password !== passwordconfirm) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Create a new user
    try {
      let res = await API.signUp(username, password, address, propertyName);
      if (res.message === "SUCCESS") {
        // Store the user data
        store.setUsername(username);
        store.setPassword(password);
        store.setAddress(address);
        store.setPropertyName(propertyName);

        // Navigate to the status scene
        navigator.push({
          name: 'Status',
          title: propertyName,
          passProps: this.state,
          component: MainScene
        })
        return;
      // Alert error message
      } else {
        Alert.alert(res.message);
        return;
      }
      return;
    } catch(err) {
      console.log(err);
    }
  }


  render() {
    const { navigator } = this.props;
    const {username, password, passwordconfirm, address, propertyName} = this.state;

    return (
      <View style={styles.container}>
        <Navbar title='Sign Up' leftBtn='Back' navigator={navigator} />

        <View style={styles.container}>
          <View style={styles.bgWrapper}>
            <Image source={require('../img/bg.png')} style={styles.bg} />
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={ (username) => {this.setState({username})}}
                placeholder='username'
                autoCapitalize='none'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={username} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (password) => {this.setState({password})}}
                placeholder='password'
                autoCapitalize='none'
                secureTextEntry
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={password} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (passwordconfirm) => {this.setState({passwordconfirm})}}
                placeholder='confirm password'
                autoCapitalize='none'
                secureTextEntry
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={passwordconfirm} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (address) => {this.setState({address})}}
                placeholder='address'
                autoCapitalize='none'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={address} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (propertyName) => {this.setState({propertyName})}}
                placeholder='property name'
                autoCapitalize='none'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={propertyName} />
            </View>

            <Button style={styles.btn}
                    textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                    onPress={this.signupAction.bind(this)}>
              Sign up
            </Button>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  bgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  btn: {
    backgroundColor: '#FFADAD',
    alignSelf: 'center',
    borderWidth: 0,
    margin: 15,
    width: 300
  },

  text: {
    color: '#929292',
    alignSelf: 'center'
  },

  textInput: {
    alignSelf: 'center',
    height: 40,
    width: 250,
    marginTop: 10,
    backgroundColor: '#fff',
    fontSize: 17,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.6)',
    padding: 10
  },

  inputContainer: {
    marginBottom: 30
  },

  mainContainer: {
    justifyContent: 'center',
    marginTop: 50
  }

});
