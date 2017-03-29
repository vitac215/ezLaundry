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

import FloatLabelTextInput from 'react-native-floating-label-text-input';

<<<<<<< HEAD
var AccountScene = React.createClass({
=======
import Navbar from '../components/Navbar';
>>>>>>> upstream/master

export default class AccountScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: this.props.password,
      address: this.props.address,
      city: this.props.city,
      property_name: this.props.property_name
    }
  };

  render() {
    console.log('AccountScene', this.props);
    const { navigator } = this.props;
    const { username, password, passwordconfirm, address, city, property_name } = this.state;

    return (
      <View style={styles.container}>
<<<<<<< HEAD
        <Navbar title={this.props.title} leftBtn='Back' rightBtn='Done' navigator={navigator} />
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
=======
        <Navbar title={this.props.title} leftBtn='Back' navigator={navigator} />
        <View style={styles.container}>
          <View style={styles.mainContainer}>

            <View style={styles.input}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={ (username) => {this.setState({username})}}
                placeholder={ username }
                autoCapitalize='none'
                placeholderTextColor='rgba(51,51,51,0.5)'
                autoCorrect={false}
                value={username} />
            </View>

            {/* <TextInput
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
              onChangeText={ (address) => {this.setState({address})}}
              placeholder='address'
              autoCapitalize='none'
              placeholderTextColor='rgba(51,51,51,0.5)'
              autoCorrect={false}
              value={address} />

            <TextInput
              style={styles.textInput}
              onChangeText={ (city) => {this.setState({city})}}
              placeholder='city'
              autoCapitalize='none'
              placeholderTextColor='rgba(51,51,51,0.5)'
              autoCorrect={false}
              value={city} />

            <TextInput
              style={styles.textInput}
              onChangeText={ (property_name) => {this.setState({property_name})}}
              placeholder='property name'
              autoCapitalize='none'
              placeholderTextColor='rgba(51,51,51,0.5)'
              autoCorrect={false}
              value={property_name} /> */}

          </View>
>>>>>>> upstream/master
        </View>
      </View>
    );
  };

};

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
  mainContainer: {
    justifyContent: 'center',
    marginTop: 50
  },
  input: {
    // alignSelf: 'center',
    flexDirection:'row',
    // height: 40,
    // width: 250,
    // marginTop: 26,
    // fontSize: 17,
    // padding: 10,
  },
  label: {
    justifyContent: "flex-start",
    width: 120,
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 50
  },
  textInput: {
    justifyContent: "flex-end",
    width: 200,
    // alignSelf: 'center',
    // height: 40,
    // width: 250,
    // marginTop: 26,
    fontSize: 17,
    // padding: 10,
  }
});
