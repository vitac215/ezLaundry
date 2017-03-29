'use strict';

import React, { Component } from 'react';

import { Text, TextInput, StyleSheet, Image, ListView, View, TouchableOpacity, Navigator } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AccountScene from './AccountScene.js';
import MaintainScene from './MaintainScene.js';
import NotificationsScene from './NotificationsScene.js';
import Navbar from '../components/Navbar';


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var data = ['Account', 'Notifications', 'Report to Maintenance', 'Privacy', 'Send us Feedback', 'Sign out'];

var SettingsScene = React.createClass({

  getInitialState: function() {
    const {navigator} = this.props;
    return {
      dataSource: ds.cloneWithRows(data)
    }
  },

  renderRow: function(rowData) {
    console.log("setting props", this.props);
    return (
      <View>
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => {
            this.renderSettingScene(rowData);
          }}>
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
      </View>
    );
  },
  renderSettingScene: function(rowData) {
    const { navigator } = this.props;
    if (rowData === 'Account') {
      console.log("rowData", rowData);
      console.log("renderSettingScene", this.props);
      navigator.push ({
        component: AccountScene,
        passProps: {
          username: this.props.username,
          password: this.props.password,
          address: this.props.address,
          property_name: this.props.property_name,
          title: rowData,
        }
      });
    }
    if (rowData === 'Report to Maintenance') {
      console.log("rowData", rowData);
      console.log("renderSettingScene", this.props);
      navigator.push ({
        component: MaintainScene,
        passProps: {
          username: this.props.username,
          password: this.props.password,
          address: this.props.address,
          property_name: this.props.property_name,
          title: rowData,
        }
      });
    }
    if (rowData === 'Notifications') {
      console.log("rowData", rowData);
      console.log("renderSettingScene", this.props);
      navigator.push ({
        component: MaintainScene,
        passProps: {
          username: this.props.username,
          password: this.props.password,
          address: this.props.address,
          property_name: this.props.property_name,
          title: rowData,
        }
      });
    }
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 10,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  text: {
    color: '#929292',
    fontSize: 15,
    fontFamily: 'Helvetica',
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
});
module.exports = SettingsScene;
