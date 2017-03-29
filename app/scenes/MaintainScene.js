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
  Picker,
} from 'react-native';


import Navbar from '../components/Navbar';


export default class MaintainScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: this.props.password,
      address: this.props.address,
      selectedMachine: '0',
      problem: '',
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
        <Navbar title={this.props.title} leftBtn='Back' rightBtn navigator={navigator} />
        <Text style={styles.text}>Choose Machines</Text>
        <Picker
          selectedValue={this.state.selectedMachine}
          onValueChange={(val) => this.setState({selectedMachine: val})}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="General Problem" value="0" />
        </Picker>
        <Text style={styles.text}>What is the problem?</Text>
        <Picker
          selectedValue={this.state.problem}
          onValueChange={(prob) => this.setState({problem: prob})}>
          <Picker.Item label="Machine is broken." value="1" />
          <Picker.Item label="Machine is dirty." value="2" />
        </Picker>
      </View>
    );
  },
  changeMode: function() {
    const newMode = this.state.mode === Picker.MODE_DIALOG
        ? Picker.MODE_DROPDOWN
        : Picker.MODE_DIALOG;
    this.setState({mode: newMode});
  },

  onValueChange: function(key: string, value: string) {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },

  picker: {
    width: 100,
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
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#4AC3C0',
    padding: 10,
    backgroundColor: '#F6F6F6'
  }
});
