'use strict';

import React, { Component } from 'react';

import { Text, TextInput, StyleSheet, Image, ListView, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


export default class SettingsScene extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var data = ['Notification', 'Report to Maintenance', 'Change Address', 'Send App Feedback'];
    this.state = {
      dataSource: ds.cloneWithRows(data)
    }
  }

  renderRow(rowData) {
    return (
      <View>

        <View style={styles.rowContainer}>
          <Text style={styles.text}>{rowData}</Text>
          <View style={styles.rightContainer}>
            <Icon style={styles.icon} name="ios-arrow-forward-outline" size={20} color="#4F8EF7" />
          </View>
        </View>

        <View style={styles.separator}/>

      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 25
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  text: {
    color: '#929292',
    fontSize: 20,
    marginLeft: 10
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
