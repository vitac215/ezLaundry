'use strict';

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Button from 'apsl-react-native-button';
import Navbar from '../components/Navbar';
import API from '../api';
import store from '../store';

export default class AccountScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      old_password:'',
      new_password:'',
      confirm_password:'',
      new_address:'',
      new_city: '',
    }
  };

  async saveChange() {
    const { navigator } = this.props;
    const { username, email, password, address, city, property_name } = this.props;
    const { old_password, new_password, confirm_password, new_address, new_city } = this.state;
    // console.log("old password", old_password == '');  // true;
    try {
      if (old_password == '') {
        Alert.alert('Please enter your password.');
      } else {
        let response = await API.checkOldPassword(username, old_password);
        if (response.message != 'EQUAL') {
          Alert.alert('Your password is not correct');
          return;
        }
        if (new_password != '') {
          if (this.state.new_password !== this.state.confirm_password) {
            Alert.alert('Passwords do not match');
            return;
          }
        } else if (new_address == '') {
            Alert.alert('Hi, seems you have nothing to update :)');
            return;
        }
        if (new_password == '') {
          this.setState({
            new_password: old_password,
          });
          console.log("old_password", old_password);
          console.log("new_password", new_password);
        }
        let res = await API.updateUser(username, new_password, new_address, new_city);
        if (res.message && res.message.toUpperCase() === "SUCCESS") {
          // Store the user data
          console.log(res);
          let user = res.user;
          store.setPassword(user.password);
          if (address != null) {
            store.setPropertyName(user.property_name);
          }
          Alert.alert(
            'Your account info has been reset!'
          );
          return;
        // Alert error message
        } else {
          Alert.alert(res.message);
          return;
        }
      }
      // console.log(response);
      // if (response.message && response.message.toUpperCase() !== "EQUAL") {
      //   console.log('input_hashed_password', response.hashed_password);
      //   console.log('stored password', this.props.password);
      //     Alert.alert('Password is not correct');
      // }
    } catch(err) {
      console.log(err);
    }
    // try {
    //   let res = await API.updateUser(username, new_password, address, city);
    //
    // } catch(err) {
    //   console.log(err);
    // }
  }

  render() {
    // console.log('AccountScene', this.props);
    const { navigator } = this.props;
    const { username, email, password, address, city, property_name } = this.props;
    const { old_password, new_password, confirm_password, new_address, new_city } = this.state;

    return (
      <View style={styles.container}>
        <Navbar title={this.props.title} leftBtn='Back' navigator={navigator} />
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.input}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={ username }
                  value={ username }
                  autoCapitalize='none'
                  editable={false}
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (email) => {this.setState({email})}}
                  placeholder={ email }
                  value={ email }
                  autoCapitalize='none'
                  editable={false}
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Old Password</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (old_password) => {this.setState({old_password})}}
                  placeholder='Enter your old pass word'
                  secureTextEntry
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  value={ old_password }
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (new_password) => {this.setState({new_password})}}
                  placeholder='Enter your new password.'
                  secureTextEntry
                  value={ new_password }
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (confirm_password) => {this.setState({confirm_password})}}
                  placeholder='Confirm your password.'
                  value={ confirm_password }
                  secureTextEntry
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (new_address) => {this.setState({new_address})}}
                  placeholder={ new_address }
                  value={ new_address }
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (new_city) => {this.setState({new_city})}}
                  placeholder={ new_city }
                  value={ new_city }
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>
            </View>

            <Button style={styles.btn}
                    textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                    onPress={this.saveChange.bind(this)}>
              Save
            </Button>

          </View>
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
    marginTop: 30
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    alignSelf: 'center',
    flexDirection:'row',
    borderBottomColor: '#dddddd',
    marginTop: 10,
  },
  label: {
    justifyContent: "flex-start",
    width: 120,
    fontWeight: 'bold',
    fontSize: 17,
    padding: 10
  },
  textInput: {
    justifyContent: "flex-end",
    width: 200,
    fontSize: 17,
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  btn: {
    backgroundColor: '#4AC3C0',
    alignSelf: 'center',
    borderWidth: 0,
    margin: 15,
    width: 300
  },
});
