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


var ReserveConfirmScene = React.createClass({

  getInitialState: function() {
    const {navigator} = this.props;

    return {
      username: this.props.username,
      washingDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }),
      dryerDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      reserveDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      values: ['Washing', 'Dryer'],
      selectedTab: 'Washing'
    }
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
}

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
  end_time: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  available: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: '#CCFFFF',
  }
});

module.exports = ReserveConfirmScene;
