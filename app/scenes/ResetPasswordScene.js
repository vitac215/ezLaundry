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

export default class ResetPasswordScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      email: this.props.email,
    }
  }

  async resetPassword() {
    const { navigator } = this.props;
    const { username, email } = this.state;

    if (!username || !email) {
      Alert.alert('Please enter your username and email');
      return;
    }

    try {

      const res = await API.forgetPassword(username, email);
      console.log('reset password', res);
      if (res.message && res.message.toUpperCase() === "SUCCESS") {
        // Store the user data
        Alert.alert('An email to reset your password has been sent to you!');
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
    const { username, email } = this.state;

    return (
      <View style={styles.container}>
        <Navbar title='Reset Password' leftBtn='Back' navigator={navigator} />
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
              onChangeText={ (email) => {this.setState({email})}}
              placeholder='email'
              autoCapitalize='none'
              placeholderTextColor='rgba(51,51,51,0.5)'
              sectionColor='#4AC3C0'
              autoCorrect={false}
              value={email} />
              </View>
            <Button style={styles.btn}
                    textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                    onPress={this.resetPassword.bind(this)}>
              Reset Password
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
