'use strict';

import React, { Component } from 'react';

import { Text, TextInput, StyleSheet, Image, ListView, View, TouchableOpacity, Navigator } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AccountScene from './AccountScene.js';
import MaintainScene from './MaintainScene.js';
import NotificationsScene from './NotificationsScene.js';
import FeedbackScene from './FeedbackScene.js';
import Navbar from '../components/Navbar';


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var data = ['Account', 'Notifications', 'Report to Maintenance', 'Send us Feedback', 'Privacy Policy'];

const ACCOUNT = 'Account';
const NOTIFICATION = 'Notifications';
const MAINTAIN = 'Report to Maintenance';
const FEEDBACK = 'Send us Feedback';
const PRIVACY = 'Privacy Policy';

var SettingsScene = React.createClass({

  getInitialState() {
    const {navigator} = this.props;
    return {
      dataSource: ds.cloneWithRows(data)
    }
  },

  renderRow(rowData) {
    console.log("setting props", this.props);
    return (
      <View>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={ () => {this.renderSettingScene(rowData)} }>
          <Text style={styles.text}>{rowData}</Text>
          <View style={styles.rightContainer}>
            <Icon style={styles.icon} name="ios-arrow-forward-outline" size={20} color="#4F8EF7" />
          </View>
        </TouchableOpacity>
        <View style={styles.separator}/>
      </View>
    )
  },

  render() {
    return (
      <View style={styles.container}>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />

        <View style={styles.logoutContainer}>
          <View style={styles.separator}/>
          <TouchableOpacity
            style={styles.rowContainer}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
          <View style={styles.separator}/>
        </View>

    </View>
  )},

  renderSettingScene(rowData) {
    const { navigator } = this.props;

    switch (rowData) {
      case ACCOUNT:
        console.log("rowData", rowData);
        console.log("renderSettingScene", this.props);
        navigator.push ({
          component: AccountScene,
          passProps: {
            username: this.props.username,
            email: this.props.email,
            password: this.props.password,
            address: this.props.address,
            city: this.props.city,
            property_name: this.props.property_name,
            title: rowData}
        });
        break;
      case MAINTAIN:
        console.log("rowData", rowData);
        console.log("renderSettingScene", this.props);
        navigator.push ({
          component: MaintainScene,
          passProps: {
            username: this.props.username,
            email: this.props.email,
            password: this.props.password,
            address: this.props.address,
            city: this.props.city,
            property_name: this.props.property_name,
            title: rowData,}
        });
        break;
      case NOTIFICATION:
        console.log("rowData", rowData);
        console.log("renderSettingScene", this.props);
        navigator.push ({
          component: NotificationsScene,
          passProps: {
            username: this.props.username,
            email: this.props.email,
            password: this.props.password,
            address: this.props.address,
            city: this.props.city,
            property_name: this.props.property_name,
            title: rowData,}
        });
        break;
      case FEEDBACK:
      navigator.push ({
        component: FeedbackScene,
        passProps: {
          username: this.props.username,
          email: this.props.email,
          password: this.props.password,
          address: this.props.address,
          city: this.props.city,
          property_name: this.props.property_name,
          title: rowData,}
      });
      break;
    } // end switch
  },

      // <View>
      // <Navigator
      //   initialRoute={{ title: 'Awesome Scene', index: 0 }}
      //   renderScene={(route, navigator) =>
      //     <Text>Hello {route.title}!</Text>
      //   }
      //   style={{padding: 100}}
      // />
      // </View>
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 20,
    paddingBottom: 25
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  text: {
    fontFamily: 'Helvetica',
    color: '#929292',
    fontSize: 20,
    marginLeft: 10,
    textAlign: 'center',
  },
  icon: {
    color: '#929292',
    marginRight: 10,
    top: 3
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  logoutContainer: {
    flex: 1,
    // marginTop: 0,
    // marginBottom: 100,
  }
});
module.exports = SettingsScene;
