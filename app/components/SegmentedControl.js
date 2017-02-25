'use strict';

import React, {Component} from 'react';
import {
  SegmentedControlIOS,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  ScrollView,
  Navigator,
  Alert
} from 'react-native';

import API from '../api';
import store from '../store';
import CountDown from './CountDown';
import moment from 'moment';
import ReserveScene from '../scenes/ReserveScene';

var SegmentedControl = React.createClass({

  getInitialState: function() {
    const {navigator} = this.props;
    return {
      address: this.props.address,
      // washingDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      washingDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }),
      dryerDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      reserveDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      values: ['Washing', 'Dryer'],
      selectedTab: 'Washing'
    }
  },

  // Fetch data from api
  componentDidMount: function() {
    this.fetchData()
    // Fetch data every 1 min
    // this.timer = setInterval(() => this.fetchData(), 60000)
  },

  fetchData: async function() {
    API.getWashingData(this.state.address)
      .then((res) => {
        this.setState({
          washingDS: this.state.washingDS.cloneWithRows(res),
        })
      })
    .then(() => {
      API.getDryerData(this.state.address)
        .then((res) => {
          this.setState({
            dryerDS: this.state.dryerDS.cloneWithRows(res),
          })
        })
    })
    .done()
  },

  renderListView: function() {
    // Display washing machines
    if (this.state.selectedTab === 'Washing') {
      return (
        <View>
          {this.renderWashingStatusScene()}
        </View>
      )
    } else if (this.state.selectedTab === 'Dryer') {
    // Display dryers
      return (
        <View>
          {this.renderDryerStatusScene()}
        </View>
      )
    }
  },

  renderWashingStatusScene: function() {
    return (
      <ListView
        dataSource = {this.state.washingDS}
        renderRow = {this.renderRow} // auto bind
      />
    )
  },

  renderDryerStatusScene: function() {
    return (
      <ListView
        dataSource = {this.state.dryerDS}
        renderRow = {this.renderRow} // auto bind
      />
    )
  },
  renderReserveScene: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{type: 'Washing'}}
        renderScene={(route, navigator) =>
          <ReserveScene {...this.props}/>
        }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.PushFromRight}
      />
    );
  },

  fetchFakeData: async function() {
    API.getFakeReserve(this.state.address)
      .then((res) => {
        this.setState({
          washingDS: this.state.washingDS.cloneWithRows(res),
        })
      })
    .done()
  },

  quickReserveSuccess: async function() {
    // Call API to reserve this machine_id
    var res = await API.quickReserve(this.state.username);
    if (res.success === true) {
      // Update the DS state - fetch the data again
      this.fetchFakeData();  // to be changed to fetchData
    } else {
      // Do nothing
      console.log("error");
    }
  },

  quickReserveConfirm: async function() {
    // Raise another alert to confirm
    Alert.alert(
      'Reservation',
      'You have reserved this machine successfully. Please note that this reservation will expire in 5 minutes.',
      [
        {text: 'OK', onPress: () => this.quickReserveSuccess() }
      ]
    );
  },

  handleCountDown: function(newRemainTime) {
    console.log("handle count down: "+newRemainTime);
    if (newRemainTime === 0) {
      this.fetchFakeData(); // to be changed to fetchData
      console.log("fetch");
    } else {
      return newRemainTime;
    }
  },

  renderRow(rowData) {
    console.log("enter row");
    console.log("remainTime: " + rowData.remainTime);
    var img = this.state.selectedTab === 'Washing' ? require('../img/status/Washing.png') : require('../img/status/Dryer.png');
    var endTime = moment().add(rowData.remainTime, 'minutes').format('hh:mm a');
    if (rowData.remainTime > 0) {
      return (
          <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.centerContainer}>
                    <Text style={[styles.text, styles.machine_id]}>{rowData.machine_id}</Text>
                </View>
                <Image style={styles.thumb} source={img} />
                <View style={styles.textContainer}>
                  <CountDown
                  time = {rowData.remainTime}
                  onCountDown = {
                    rowData.reamainTime = this.handleCountDown
                  }/>
                  <Text style={[styles.text, styles.endTime]}>{endTime}</Text>
                </View>
            </View>
            <View style={styles.separator}/>
          </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={() => Alert.alert(
              'Reservation',
              'Would you like to reserve this machine for 5 minutes?',
              [
                {text: 'Cancel'},
                {text: 'Confirm', onPress: () => this.quickReserveConfirm() }
              ]
            )}>
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                  <View style={styles.centerContainer}>
                      <Text style={[styles.text, styles.machine_id]}>{rowData.machine_id}</Text>
                  </View>
                  <Image style={styles.thumb} source={img} />
                  <View style={styles.textContainer}>
                  <Text style={[styles.text, styles.available]}>Available</Text>
                  </View>
              </View>
              <View style={styles.separator}/>
            </View>
          </TouchableOpacity>
        </View>
      );}
  },

  render() {
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
          {this.renderListView()}
        </ScrollView>
      </View>
    );
  },

}) // end class


var styles = StyleSheet.create({
  container: {
    flex: 1
  },

  scContainer: {
    backgroundColor: '#4AC3C0'
  },

  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },

  segmentedControl: {
    margin: 10,
    marginLeft: 30,
    marginRight: 30
  },

  text: {
    color: '#929292',
    fontSize: 15
  },
  thumb: {
    width: 60,
    height: 60
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 15
  },
  centerContainer: {
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
  },
  available: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: '#CCFFFF',
  }
});

module.exports = SegmentedControl;
