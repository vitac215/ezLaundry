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
  Alert,
  TouchableOpacity
} from 'react-native';

import Button from 'apsl-react-native-button';
import API from '../api';
import store from '../store';

import Navbar from '../components/Navbar';
import MainScene from './MainScene';
import ResetPasswordScene from './ResetPasswordScene';

export default class LoginScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      email: '',
      password: this.props.password,
      address: '',
      city: '',
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
      const res = await API.login(username, password);

      // NOTE: changed
      // const res = {"message": "SUCCESS",
      //              "user": {"username": "v",
      //                       "email": "v@gmail.com",
      //                       "password": "v",
      //                       "property_name": "Forbes",
      //                       "city": 'Pittsburgh',
      //                       "address": "forbes",
      //                      },
      //             };
      // end change


      if (res.message && res.message.toUpperCase() === "SUCCESS") {
        // Store the user data
        let user = res.user;
        // console.log(res.user);
        store.setUsername(user.username);
        store.setPassword(user.password);
        store.setPropertyName(user.property_name);

        this.setState({
          username: user.username,
          email: user.email,
          password: user.password,
          address: user.address,
          city: user.city,
          property_name: user.property_name,
        })

        // Navigate to the main scene
        navigator.push({
          name: 'Status',
          title: user.property_name,
          component: MainScene,
          passProps: {
            username: user.username,
            email: user.email,
            password: user.password,
            address: user.address,
            city: user.city,
            property_name: user.property_name,
            bottomTab: 'Status',
          }
        })
        return;
      // Alert error messageå
      } else {
        console.log('login', res.message);
        Alert.alert(
          res.message,
          '',
          [
            {text: 'Confirm', onPress: () => {
              this.resendEmail(username)} },
            {text: 'Cancel'},
          ]);
        return;
      }
    } catch(err) {
      console.log(err);
    }
  }

  async resendEmail(username) {
    console.log('resendEmail');
    try {
      let res = await API.resendEmail(username);
      console.log(res);
      if (res.message && res.message.toUpperCase() === "SUCCESS") {
        console.log(res);
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

  forgotPassword () {
    const { navigator } = this.props;
    const { username, email } = this.state;

    navigator.push ({
      component: ResetPasswordScene,
      passProps: {
        username: '',
        email: '',
        password: '',
        address: '',
        city: '',
        property_name: '',}
    });
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
                sectionColor='#4AC3C0'
                autoCorrect={false}
                value={username} />
              <TextInput
                style={styles.textInput}
                onChangeText={ (password) => {this.setState({password})}}
                placeholder='password'
                autoCapitalize='none'
                sectionColor='#4AC3C0'
                secureTextEntry
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={password} />

              <TouchableOpacity
                onPress={() => Alert.alert(
                  'Forgot your password?',
                  'An email will be sent to your registered email address for password resetting',
                  [
                    {text: 'Reset Password', onPress: () => {
                      this.forgotPassword()} },
                    {text: 'Cancel'},
                  ]
                )}>
                <Text style={styles.forget}>forgot password?</Text>
              </TouchableOpacity>
            </View>
            <Button style={styles.btn}
                    textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                    onPress={this.loginAction.bind(this)}>
              Login
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
    margin: 30,
    width: 300
  },

  text: {
    color: '#929292',
    alignSelf: 'center'
  },
  forget: {
    alignSelf: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
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
