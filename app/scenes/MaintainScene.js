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


export default class MaintainScene extends Component {

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
    console.log('Maintain Scene', this.props);
    const { navigator } = this.props;
    const { username, password, passwordconfirm, address, city, property_name } = this.state;

    return (
      <View style={styles.container}>
        <Navbar title={this.props.title} leftBtn='Back' navigator={navigator} />
        <View style={styles.container}>
          <View style={styles.mainContainer}>



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
  input: {
    alignSelf: 'center',
    flexDirection:'row',
    borderBottomColor: '#dddddd',
    // height: 40,
    // width: 250,
    marginTop: 10,
    // fontSize: 17,
    // padding: 10,
  },
  label: {
    justifyContent: "flex-start",
    width: 120,
    fontWeight: 'bold',
    // marginLeft: 30,
    fontSize: 17,
    padding: 10
  },
  textInput: {
    justifyContent: "flex-end",
    width: 200,
    // alignSelf: 'center',
    // height: 40,
    // width: 250,
    // marginTop: 26,
    // marginRight: 30,
    fontSize: 17,
    padding: 10,
    backgroundColor: '#F6F6F6'
  }
});
