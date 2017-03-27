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
import moment from 'moment';
import SegmentedControl from '../components/SegmentedControl.js';
import ReserveConfirmScene from './ReserveConfirmScene.js';
import ReserveRender from './ReserveRender.js'

var ReserveScene = React.createClass({
  getInitialState: function() {
    const {navigator} = this.props;

    var count = "0";
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
      values: ['Washing', 'Dryer'],
      selectedTab: 'Washing',
    };
  },
  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      <View style={styles.container}>
      <View style={styles.scContainer}>
        <SegmentedControlIOS
          style={styles.segmentedControl}
          tintColor='#B0FFFE'
          values={this.state.values}
          selectedIndex={0}
          onValueChange={(val)=> {
            this.setState({
              selectedTab: val
            })
          }}/>
      </View>
      <ScrollView style={styles.listContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </ScrollView>
      </View>
    );
  },
  _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    // console.log("rowData", rowData);
    // console.log("sectionID", sectionID);
    // console.log("rowID", rowID);
    var time = moment().startOf('day').add(rowID * 30, 'minutes').format('hh:mm A');
    return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
          Alert.alert(
            'Reserve a ' + this.state.selectedTab + ' machine at ' + time +'?',
            'Please note that your reservation will be cancelled if you are late for 10 minutes',
            [
              {text: 'Cancel'},
              {text: 'Confirm', onPress: (reserveTime) => {
                var reserveTime = time;
                this.reservationConfirm(reserveTime)} }   // TODO: pass time to api
            ]
          );
        }}>
        <View>
          <View style={styles.row, styles.separator}>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.text}>
              {time}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },
  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 48; ii++) {
      dataBlob.push(ii);   // passed back to row data
      console.log("genRow data.push");
    }
    return dataBlob;
  },
  _pressRow: function(rowID: number) {
      this._pressData[rowID] = !this._pressData[rowID];
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },
  reservationConfirm: function(reserveTime) {
    console.log("time", reserveTime);
    console.log("reserve props", this.props);
    this.props.navigator.push({
    component: ReserveConfirmScene,
    passProps: {
      information:this.props,
      reserve_time: reserveTime,
      type: this.state.selectedTab,
      title: "Your Reservation",
      tab: 'Reservation',
    }
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    marginLeft: 60,
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  scContainer: {
    backgroundColor: '#4AC3C0'
  },
  segmentedControl: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30
  },
  timeContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  }
});

module.exports = ReserveScene;
