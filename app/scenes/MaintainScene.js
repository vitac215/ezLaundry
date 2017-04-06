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
import Button from 'apsl-react-native-button';
import API from '../api';


export default class MaintainScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      email: this.props.email,
      password: this.props.password,
      address: this.props.address,
      selectedMachine: '0',
      problem: '',
      city: this.props.city,
      property_name: this.props.property_name,
      report:'',
    }
  };
  async report() {

    console.log('report', this.props);
    const { navigator } = this.props;
    const { username, password, passwordconfirm, address, city, property_name, report } = this.state;
    if (report.length < 10) {
      Alert.alert('Your report length must be greater than 10');
    } else if (report.length > 500) {
      Alert.alert('Your report length must be smaller than 10');
    } else {
      try {
        let res = await API.report(username, report);
        if (res.message && res.message.toUpperCase() === "SUCCESS") {
          Alert.alert("Your report is on its way");
          console.log(res);
          return;
        // Alert error message
        } else {
          Alert.alert(res.message);
          return;
        }
      } catch(err) {
        console.log(err);
      }
    }
  }

  render() {
    console.log('Maintain Scene', this.props);
    const { navigator } = this.props;
    const { username, password, passwordconfirm, address, city, property_name, report } = this.state;
    var problem = '';
    return (
      <View style={styles.container}>
        <Navbar title={this.props.title} leftBtn='Back' rightBtn navigator={navigator} />
        <Text style={styles.text}>What is the problem?</Text>
        <Picker
          selectedValue={this.state.problem}
          onValueChange={(prob) => this.setState({report: prob})}>
          <Picker.Item label="Machine is broken" value="1" />
          <Picker.Item label="Machine is dirty" value="2" />
          <Picker.Item label="Others" value="0" />
        </Picker>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textArea}
            onChangeText={ (report) => this.setState({report})}
            placeholder="Would you like to write more detail?"
            value={ report }
            autoCapitalize='none'
            placeholderTextColor='rgba(51,51,51,0.5)'
            editable={true}
            multiline={true}
            autoCorrect={false} />
        </View>
        <Button style={styles.btn}
                textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                onPress={this.report.bind(this)}>
          Save
        </Button>
      </View>
    );
  };
  // changeMode: function() {
  //   const newMode = this.state.mode === Picker.MODE_DIALOG
  //       ? Picker.MODE_DROPDOWN
  //       : Picker.MODE_DIALOG;
  //   this.setState({mode: newMode});
  // },
  //
  // onValueChange: function(key: string, value: string) {
  //   const newState = {};
  //   newState[key] = value;
  //   this.setState(newState);
  // },
};

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
    marginTop: 10,
  },
  label: {
    justifyContent: "flex-start",
    width: 120,
    fontWeight: 'bold',
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
    padding: 10,
    backgroundColor: '#F6F6F6'
  },
  textArea: {
    alignSelf: 'center',
    width: 300,
    height: 200,
    fontSize: 17,
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  btn: {
    backgroundColor: '#4AC3C0',
    alignSelf: 'center',
    borderWidth: 0,
    margin: 15,
    width: 300
  },
  inputContainer: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
});
