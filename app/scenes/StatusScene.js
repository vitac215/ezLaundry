'use strict'

import React, { Component } from 'react';

import { Text, TextInput, StyleSheet, Image, ScrollView, ListView, View } from 'react-native';


// function saveData() {
//     AsyncsStorage.setItem("name", "Test");
//     this.setState("name", "Test");
// }

class StatusScene extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    var data = [{'machine_id': 1, 'remainTime':'00:30', 'endTime':'8:30', 'status': 'In Use'}, {'machine_id': 2, 'remainTime':'00:20', 'endTime':'8:20', 'status': 'In Use'}, {'machine_id': 3, 'remainTime':'00:10', 'endTime':'8:10', 'status': 'In Use'}];
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  renderRow(rowData) {
    return (
        <View>
            <View style={styles.rowContainer}>
                <View style={styles.centerContainer}>
                    <Text style={[styles.text, styles.machine_id]}>{rowData.machine_id}</Text>
                </View>
                <Image style={styles.thumb} source={ require('../img/washing.png') } />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.remainTime]}>{rowData.remainTime}</Text>
                    <Text style={[styles.text, styles.endTime]}>{rowData.endTime}</Text>
                    <Text>{this.state.name}</Text>
                </View>
            </View>
            <View style={styles.separator}/>
        </View>
    );
  }

  render() {
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}/>
    );
  }

}

var styles = StyleSheet.create({
  text: {
    color: '#929292',
    fontSize: 15
  },
  container: {
    flex: 1,
    padding: 10
  },
  thumb: {
    width: 60,
    height: 55,
    marginRight: 15
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 18
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  machine_id: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  remainTime: {
    fontSize: 30
  },
  endTime: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});

module.exports = StatusScene;
