'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert
} from 'react-native';

import Button from 'apsl-react-native-button';
import API from '../api';
import store from '../store';

import Navbar from '../components/Navbar';
import MainScene from './MainScene';

export default class LoginScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      address: '',
      property_name: ''
    }
  }

  async loginAction() {
    const { navigator } = this.props;
    const { username, password } = this.state;

    if (!username || !password) {
      Alert.alert('Please enter your username and password');
      return;
    }

    try {
      // original
      //const res = await API.login(username, password);
      // change
      const res = {"message": "SUCCESS",
                   "user": {"username": "v",
                            "password": "v",
                            "property_name": "Forbes",
                            "address": "forbes ave"
                           },
                  };
      // end change
      if (res.message && res.message.toUpperCase() === "SUCCESS") {
        // Store the user data
        let user = res.user;
        store.setUsername(user.username);
        store.setPassword(user.password);
        store.setPropertyName(user.property_name);

        this.setState({
          username: user.username,
          password: user.password,
          address: user.address,
          property_name: user.property_name
        })

        // Navigate to the main scene
        navigator.push({
          name: 'Status',
          title: user.property_name,
          passProps: this.state,
          component: MainScene
        })
        return;
      // Alert error messageå
      } else {
        Alert.alert(res.message);
        return;
      }
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { navigator } = this.props;
    const { username, password } = this.state;

    return (
      <View style={styles.container}>
        <Navbar title='Login' leftBtn='Back' navigator={navigator} />

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
            </View>

              <Button style={styles.btn}
                      textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                      onPress={this.loginAction.bind(this)}>
                Login
              </Button>
          </View>

        </View>
      </View> // include navbar
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
