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
import MainScene from '../scenes/MainScene';

export default class ListViewResConfirmContainer extends Component {
  constructor(props) {
    console.log("ListViewResConfirmContainer", props);
    super(props);

    this.state = {
      dataSource: this.props.dataSource,
      reserved: true,
    }
  };

  render() {
    console.log("here at ListViewResConfirmContainer");
    console.log(this.props);
    console.log('resconfirm ds',this.props.dataSource);

    return (
      <View>

        <View style={styles.container}>
          <ScrollView style={styles.listContainer}>
            <ListView
              dataSource = {this.props.dataSource}
              renderRow = {this.renderRow.bind(this)}
              // renderRow = {console.log("resconfirm renderrow this", this)} // auto bind
            />
          </ScrollView>
        </View>

      </View>

    );
  };

  renderRow(rowData) {
    // rowData: reserve_time, display_id, access_code
    console.log('renderRow props', this.props);
    console.log("renderRow data", rowData);

    var img = this.props.selectedTab === 'Washing' ? require('../img/status/Washing.png') : require('../img/status/Dryer.png');
    // var expire_time = moment(rowData.reserve_time, "hh:mm A").add(10, 'minutes').format('hh:mm A');
    var reserve_time = moment(rowData.reserve_time, "hh:mm A").format('hh:mm A');

    if (this.state.reserved === true) {
      return (
          <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.centerContainer}>
                    <Text style={[styles.text, styles.machine_id]}>{rowData.display_id}</Text>
                </View>
                <Image style={styles.thumb} source={img} />
                <View style={[styles.textContainer, styles.centerContainer]}>
                <Text style={[styles.text]}>{this.state.selectedTab}</Text>
                  <Text style={[styles.text, styles.available]}>{reserve_time}</Text>
                  <Text style={[styles.text]}>Access code: {rowData.access_code ? rowData.access_code : 1011}</Text>
                  <TouchableOpacity
                          style={styles.btn}
                          onPress={this.cancelRes.bind(this)}>
                    <Text style={{fontSize: 15, color: '#4AC3C0'}}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <View style={styles.separator}/>
          </View>
      )
    } else {
      return null;
    };
  }; // end of renderRow

  cancelRes() {
    this.setState({
      reserved: false,
    });
    this.props.navigator.push({
      component: MainScene,
      passProps: {
        username: this.props.username,
        // TODO: if server finishes API (getResSchedule, getAllResSchedule, cancelRes), uncomment the following 2
        // selectedTab: this.props.selectedTab,
        // bottomTab: 'Reservation',
        bottomTab: 'Status',
        title: this.props.property_name,
      }
    });
  }; // cencelRes
}



var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabContent: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    marginLeft: 60,
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
    height: 60,
    alignSelf: 'center',
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
  timeContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
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
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  wrapper: {
    backgroundColor: '#CCFFFF',
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 15,
    borderColor: '#4AC3C0',
    borderWidth: 0.5,
    padding: 8,
  },
  imageText: {
    alignSelf: 'flex-start',
  }
});
