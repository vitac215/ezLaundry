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
import UnTouchableRowItem from '../components/UnTouchableRowItem';

export default class ListViewReservationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      WashingDS: this.props.WashingDS,
      DryerDS: this.props.DryerDS,
    }
  };

  render() {
    console.log("ListViewReservationContainer props", this.props);
    var dataSource;
    if (this.props.selectedTab === "Washing") {
      dataSource = this.props.WashingDS;
    }
    else if (this.props.selectedTab === "Dryer") {
      dataSource = this.props.DryerDS;
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          <ListView
            dataSource = {dataSource}
            renderRow = {this.renderRow.bind(this)} // auto bind
          />
        </ScrollView>
      </View>
    );
  };

  renderRow(rowData) {
    console.log('res renderrow data',rowData);

    return (
      <View>
          {rowData.availability ? (
              <TouchableRowItem rowData={rowData} {...this.props} {...this.state}/>
            ) : (
              <UnTouchableRowItem rowData={rowData}/>
            )
          }
      </View>
    );

  } // end of renderRow
}



var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    flex: 1,
    color: '#929292',
    fontSize: 15,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  scContainer: {
    backgroundColor: '#4AC3C0'
  },
});
