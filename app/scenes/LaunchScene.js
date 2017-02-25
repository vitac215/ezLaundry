'use strict'

import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View, StyleSheet, Image } from 'react-native';

import Button from 'apsl-react-native-button';

import LoginScene from './LoginScene';
import SignupScene from './SignupScene';

export default class LaunchScene extends Component {
  constructor(props) {
    super(props);
    const {navigator} = this.props;
  }

  toNext(data) {
    const {navigator} = this.props;
    if (navigator) {
      navigator.push(data);
    }
  }

  onLoginClick() {
    this.toNext({
      name: 'LoginScene',
      title: 'Login',
      component: LoginScene,
      passProps: {
        leftBtn: 'Back'
      }
    });
  }

  onSignupClick() {
    this.toNext({
      name: 'SignupScene',
      title: 'Sign Up',
      leftBtn: 'Back',
      component: SignupScene,
      passProps: {
        leftBtn: 'Back'
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgWrapper}>
          <Image source={require('../img/bg.png')} style={styles.bg} />
        </View>

        <Image source={require('../img/logo.png')} style={styles.img}/>
        <Image source={require('../img/logo2.png')} style={styles.img2}/>

        <Button style={styles.btn}
                textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                onPress={this.onLoginClick.bind(this)}>
          Login
        </Button>
        <Button style={styles.btn}
                textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                onPress={this.onSignupClick.bind(this)}>
          Sign up
        </Button>

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

  img: {
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 30
  },

  img2: {
    alignSelf: 'center',
    width: 180,
    marginBottom: 40
  }

});
