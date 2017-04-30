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
import ResConfirmScene from '../scenes/ResConfirmScene';

export default class ListViewResConfirmContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
  };

  componentDidMount() {
    console.log("ListViewResConfirmContainer didmount");
    UTL.fetchData(this.props.username, this.state.selectedTab, this.state.bottomTab).done((res) => {
      console.log(res);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res),
      });
      // Fetch data every 5 sec
      var timer = setInterval(() => UTL.fetchData(this.props.username, this.state.selectedTab, this.state.bottomTab), 5000);
      if (this.state.bottomTab === "Settings") {
        clearInterval(timer);
      }
    });
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.listContainer}>
          <ListView
            dataSource = {this.state.dataSource.cloneWithRows(res)}
            renderRow = {this.renderRow.bind(this)} // auto bind
          />
        </ScrollView>
      </View>
    );
  };

  renderRow(rowData) {
    console.log(rowData);

    // TODO: ResConfirmScene, fetchData API
    return (
      <View>
          <ResConfirmScene {...this.props} dataSource={this.state.dataSource}/>
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
