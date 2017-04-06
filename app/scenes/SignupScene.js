'use strict'

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, StyleSheet, Image, TextInput, Alert } from 'react-native';

import Button from 'apsl-react-native-button';
import store from '../store';
import API from '../api';

import Navbar from '../components/Navbar';
import MainScene from './MainScene';
import LoginScene from './LoginScene';

export default class SignupScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordconfirm: '',
      city: '',
      address: '',
      property_name: '',
      longitude: '',
      latitude: ''
    }
  }

  async signupAction() {
    console.log('sign up');
    const { navigator } = this.props;
    const { username, email, password, passwordconfirm, address, city} = this.state;

    if (!username || !email || !password || !address || !city) {
      Alert.alert('Please enter all the information');
      return;
    }

    if (username.length > 20) {
      Alert.alert('Your username cannot be greater than 20');
    } else if ( username.length <= 0 ) {
      Alert.alert('Your username should be greater than 0');
    }
    if (password.length < 6) {
      Alert.alert('Your password should be greater than 6');
    } else if (password.length > 20) {
      Alert.alert('Your password cannot be greater than 20');
    }
    if (password !== passwordconfirm) {
      Alert.alert('Passwords do not match');
      return;
    }
    console.log('before query server', this.props);
    // Create a new user
    try {
      let res = await API.signUp(username, email, password, address, city);
      if (res.message && res.message.toUpperCase() === "SUCCESS") {
        console.log(res);
        Alert.alert(
          'Please confirm your email',
          'We have sent an email to you, please check your inbox.',
          [
            {text: 'OK', onPress: () => {
              this.renderLoginScene()
              }}
          ]
        )
        // Store the user data
        let user = res.user;
        store.setUsername(user.username);
        store.setPassword(user.password);
        store.setPropertyName(user.property_name);

        // Navigate to the status scene
        navigator.push({
          name: 'Status',
          title: property_name,
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

  renderLoginScene() {
    const { navigator } = this.props;
    const { username, password} = this.state;
    navigator.push ({
      component: LoginScene,
      passProps: {
        username: username,
        password: password,
      }
    });

  }
  render() {
    const { navigator } = this.props;
    const {username, email, password, passwordconfirm, address, city, property_name} = this.state;

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
                sectionColor='#4AC3C0'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={username} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (email) => {this.setState({email})}}
                placeholder='email address'
                autoCapitalize='none'
                sectionColor='#4AC3C0'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={email} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (password) => {this.setState({password})}}
                placeholder='password'
                autoCapitalize='none'
                secureTextEntry
                sectionColor='#4AC3C0'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={password} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (passwordconfirm) => {this.setState({passwordconfirm})}}
                placeholder='confirm password'
                autoCapitalize='none'
                secureTextEntry
                sectionColor='#4AC3C0'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={passwordconfirm} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (address) => {this.setState({address})}}
                placeholder='address'
                autoCapitalize='none'
                sectionColor='#4AC3C0'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={address} />

              <TextInput
                style={styles.textInput}
                onChangeText={ (city) => {this.setState({city})}}
                placeholder='city'
                autoCapitalize='none'
                sectionColor='#4AC3C0'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={city} />
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
