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
import moment from 'moment';

import UTL from '../utilities';
import TouchableRowItem from '../components/TouchableRowItem';

export default class ListViewReservationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: this.props.dataSource,
    }
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          <ListView
            dataSource = {this.props.dataSource}
            renderRow = {this.renderRow.bind(this)} // auto bind
          />
        </ScrollView>
      </View>
    );
  };

  renderRow(rowData) {
    console.log(rowData);

    return (

      <View>
        <View style={styles.row, styles.separator}>
        </View>
        <View style={styles.timeContainer}>
          {rowData.availability ? (
              <TouchableRowItem {...this.props} {...this.state}/>
            ) : (
              <TouchableRowItem {...this.props} {...this.state}/>
            )
          }
        </View>
      </View>

    );

  } // end of renderRow

}



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
    color: '#929292',
    fontSize: 15,
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
