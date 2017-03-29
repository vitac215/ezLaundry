'use strict';

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';

import Button from 'apsl-react-native-button';
import Navbar from '../components/Navbar';

export default class AccountScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      email: this.props.email,
      password: this.props.password,
      address: this.props.address,
      city: this.props.city,
      property_name: this.props.property_name
    }
  };

  saveChange() {

  }

  render() {
    console.log('AccountScene', this.props);
    const { navigator } = this.props;
    const { username, email, password, address, city, property_name } = this.state;

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
                  onChangeText={ (username) => {this.setState({username})}}
                  placeholder={ username }
                  value={ username }
                  autoCapitalize='none'
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
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (password) => {this.setState({password})}}
                  placeholder={ password }

                  value={ password }
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (address) => {this.setState({address})}}
                  placeholder={ address }
                  value={ address }
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (city) => {this.setState({city})}}
                  placeholder={ city }

                  value={ city }
                  autoCapitalize='none'
                  placeholderTextColor='rgba(51,51,51,0.5)'
                  autoCorrect={false} />
              </View>

              <View style={styles.input}>
                <Text style={styles.label}>Property Name</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={ (property_name) => {this.setState({property_name})}}
                  placeholder={ property_name }

                  value={ property_name }
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
