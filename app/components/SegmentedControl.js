'use strict';

var React = require('react');
var ReactNative = require('react-native');
var { SegmentedControlIOS, AsyncStorage, StyleSheet, Text, View, ListView, Image } = ReactNative;

import API from '../api';
import store from '../store';

var SegmentedControl = React.createClass({
  getInitialState: function() {
    return {
      address: this.props.address,
      washingDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dryerDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      values: ['Washing', 'Dryer'],
      selectedTab: 'Washing'
    }
  },

  // Fetch data from api
  componentDidMount: function() {
    this.fetchData()
    // Fetch data every minute
    this.timer = setInterval(() => this.fetchData(), 60000)
  },

  fetchData: async function() {
    console.log("fetch machine data");
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
      console.log("state is washing");
      return (
        <View>
          {this.renderWashingStatusScene()}
        </View>
      )
    } else if (this.state.selectedTab === 'Dryer') {
    // Display dryers
      console.log("state is dryer");
      return (
        <View>
          {this.renderDryerStatusScene()}
        </View>
      )
    }
  },

  renderWashingStatusScene: function() {
    console.log("render washing");
    return (
      <ListView
        dataSource = {this.state.washingDS}
        renderRow = {this.renderRow} // auto bind
      />
    )
  },

  renderDryerStatusScene: function() {
    console.log("render dryer");
    return (
      <ListView
        dataSource = {this.state.dryerDS}
        renderRow = {this.renderRow} // auto bind
      />
    )
  },


  renderRow(rowData) {
    var img = this.state.selectedTab === 'Washing' ? require('../img/status/Washing.png') : require('../img/status/Dryer.png');
    return (
      <View>
          <View style={styles.rowContainer}>
              <View style={styles.centerContainer}>
                  <Text style={[styles.text, styles.machine_id]}>{rowData.machine_id}</Text>
              </View>
              <Image style={styles.thumb} source={img} />
              <View style={styles.textContainer}>
                  <Text style={[styles.text, styles.remainTime]}>{rowData.remainTime}</Text>
                  <Text style={[styles.text, styles.endTime]}>{rowData.endTime}</Text>
                  <Text>{this.state.name}</Text>
              </View>
          </View>
          <View style={styles.separator}/>
      </View>
    );
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
        <View style={styles.listContainer}>
          {this.renderListView()}
        </View>
      </View>
    );
  },

}) // end class


var styles = StyleSheet.create({
  container: {
    flex: 1
  },

  scContainer: {
    backgroundColor: '#4AC3C0',
    height: 50
  },

  listContainer: {
    backgroundColor: '#fff',
    height: 800
  },

  segmentedControl: {
    margin: 10,
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
  }
});

module.exports = SegmentedControl;
