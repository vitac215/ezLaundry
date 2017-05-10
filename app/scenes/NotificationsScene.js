'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  Switch,
} from 'react-native';

import store from '../store';
import Navbar from '../components/Navbar';

export default class NotificationsScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      remindWashingAvailable: false,
      remindDryerAvailable: false,
      remindDone: false,
    }
  };

  componentDidMount() {
    // let done = (await store.getRemindDone() != null) ? await store.getRemindDone() : false;

    AsyncStorage.getItem("Washing").then((value) => {
            console.log(value);
            if (value === "true") {
              value = true;
            } else {
              value = false;
            }
            this.setState({
              remindWashingAvailable: value,
            });
            console.log(this.state);
        }).done();

    AsyncStorage.getItem("Dryer").then((value) => {
            console.log(value);
            if (value === "true") {
              value = true;
            } else {
              value = false;
            }
            this.setState({
              remindDryerAvailable: value,
            });
            console.log(this.state);
        }).done();

    AsyncStorage.getItem("Laundry").then((value) => {
            console.log(value);
            if (value === "true") {
              value = true;
            } else {
              value = false;
            }
            this.setState({
              remindDone: value,
            });
            console.log(this.state);
        }).done();
  }

  saveNoti(key, value) {
    console.log(key);
    console.log(value);
    AsyncStorage.setItem(key, JSON.stringify(value));
    switch (key) {
      case "Washing":
        this.setState({
          remindWashingAvailable: value,
        });
        break;
      case "Dryer":
        this.setState({
          remindDryerAvailable: value,
        });
        break;

      case "Laundry":
        this.setState({
          remindDone: value,
        });
        break;
      default:
        break;
    }
  }


  render() {
    const { navigator } = this.props;
    console.log(this.state);

    return (
      <View style={styles.container}>
        <Navbar title={this.props.title} leftBtn='Back' navigator={navigator} />
          <View style={styles.inputContainer}>

            <View style={styles.input}>
              <Text style={styles.label}>Remind me when a washing machine becomes available: </Text>
              <Switch
                style={styles.switch}
                value={this.state.remindWashingAvailable}
                onValueChange={
                  (value) => {
                    this.saveNoti("Washing", value);
                  }
                }/>
            </View>
            <View style={styles.separator}/>

            <View style={styles.input}>
              <Text style={styles.label}>Remind me when a dryer becomes available: </Text>
              <Switch
                style={styles.switch}
                value={this.state.remindDryerAvailable}
                onValueChange={
                  (value) => {
                    this.saveNoti("Dryer", value);
                  }
                }/>
            </View>
            <View style={styles.separator}/>


            <View style={styles.input}>
              <Text style={styles.label}>Remind me when my laundry is done: </Text>
              <Switch
                style={styles.switch}
                value={this.state.remindDone}
                onValueChange={
                  (value) => {
                    this.saveNoti("Laundry", value);
                  }
                }/>
            </View>
            <View style={styles.separator}/>

          </View>
      </View>
    );
  };

};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 20,
    padding: 20,
  },
  input: {
    flexDirection:'row',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  label: {
    justifyContent: "flex-start",
    flexGrow: 0.8,
    width: 150,
    fontSize: 15,
    marginRight: 20,
  },
  switch: {
    justifyContent: "flex-end",
    flexGrow: 0.2,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
});
