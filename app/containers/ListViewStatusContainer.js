'use strict';

import React, {Component} from 'react';
import {
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
import CountDown from '../components/CountDown';
import moment from 'moment-timezone';

export default class ListViewStatusContainer extends Component {
  constructor(props) {
    super(props);
  };

  

  renderMachine() {
    return (
      <ListView
        dataSource = {this.props.dataSource}
        renderRow = {this.renderRow} // auto bind
      />
    );
  };

  renderListView() {
    // Display machines
    return (
      <View>
        {this.renderMachine}
      </View>
    );
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          {this.renderListView()}
        </ScrollView>
      </View>
    );
  };
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
