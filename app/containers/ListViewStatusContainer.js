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
import moment from 'moment-timezone';

import UTL from '../utilities';
import CountDown from '../components/CountDown';
import ListViewResConfirmContainer from '../containers/ListViewResConfirmContainer';
import API from '../api';

export default class ListViewStatusContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      WashingDS: this.props.WashingDS,
      DryerDS: this.props.DryerDS,
    }
  };

  // componentDidMount() {
  //   // console.log("ListViewStatusContainer props", this.props);
  //   // check the server if this person has a reservation
  //   this.callUTLfetchData("washing");
  //   this.callUTLfetchData("dryer");
  //
  //   // fetch machine data every 5 seconds
  //   //this.timer = setInterval(() => this.callUTLfetchData(), 5000);
  // };

  callUTLfetchData() {
    console.log("callUTLfetchData enter");
    UTL.fetchData(this.props.username, "washing", this.props.bottomTab, this.props.titleToPass).done((res) => {
      this.setState({
        WashingDS: this.state.WashingDS.cloneWithRows(res),
      });
    });
    UTL.fetchData(this.props.username, "dryer", this.props.bottomTab, this.props.titleToPass).done((res) => {
      this.setState({
        DryerDS: this.state.DryerDS.cloneWithRows(res),
      });
    });
  }


  render() {
    console.log('status props',this.props);
    console.log('status state', this.state);
    var dataSource;
    if (this.props.selectedTab === "Washing") {
      dataSource = this.state.WashingDS._dataBlob == null ? this.props.WashingDS : this.state.WashingDS;
    }
    else if (this.props.selectedTab === "Dryer") {
      dataSource = this.state.DryerDS._dataBlob == null ? this.props.DryerDS : this.state.DryerDS;
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
    // console.log(this.props);
    // console.log('rowData', rowData);
    var img = this.props.selectedTab === 'Washing' ? require('../img/status/Washing.png') : require('../img/status/Dryer.png');

    var remainTime_num;

    if (rowData.end_time != null) {
      // // TODO:Convert the end time to readable format
      // // TODO:Check the format of remainTime_num
      // var end_time = moment(rowData.end_time).tz("America/New_York").format('hh:mm A');
      // // Calculate the remain time in mmss
      // remainTime_num = moment(rowData.end_time).tz("America/New_York") - moment().tz("America/New_York");
      // var remainTime_formatted = moment(raw_remainTime).format('mmss');

      // changed
      remainTime_num = rowData.end_time;
      // console.log("raw remainTime: "+remainTime_num);
      var remainTime = moment(remainTime_num).format('mmss');
      var min = parseInt(rowData.end_time.substring(0,2));
      var sec = parseInt(rowData.end_time.substring(2,4));
      var end_time = moment().add(min, 'minutes').add(sec, 'seconds').format('hh:mm A');
      // end change
    } else {
      remainTime_num = 0;
    }

    if (remainTime_num > 0) {
      // console.log("remainTime_num", remainTime_num);
      return (
          <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.centerContainer}>
                    <Text style={[styles.text, styles.machine_id]}>{rowData.display_id}</Text>
                </View>
                <Image style={styles.thumb} source={img} />
                <View style={styles.textContainer}>
                  <CountDown
                  // time = {remainTime}   //TODO:
                  time = {rowData.end_time}   // changed
                  end_time = {rowData.end_time}
                  username = {rowData.username}
                  onCountDown = {
                    remainTime = this.handleCountDown.bind(this)
                  }/>
                  <Text style={[styles.text, styles.end_time]}>{end_time}</Text>
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
                {text: 'Confirm', onPress: (machine_id) => {
                  var machine_id = rowData.machine_id;
                  this.quickReserveConfirm(machine_id)} }
              ]
            )}>
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                  <View style={styles.centerContainer}>
                      <Text style={[styles.text, styles.machine_id]}>{rowData.display_id}</Text>
                  </View>
                  <Image style={styles.thumb} source={img} />
                  <View style={[styles.textContainer, styles.centerContainer]}>
                    <Text style={[styles.text, styles.available]}>Available</Text>
                  </View>
              </View>
              <View style={styles.separator}/>
            </View>
          </TouchableOpacity>
        </View>
      );
    } // end of else
  } // end of renderRow

  /*
    Update the displayed remain time
  */
  handleCountDown(newRemainTime, end_time, username) {
    // TODO:
    // console.log("handleCountDown:\t" + end_time);
    const now = moment(new Date()).tz("America/New_York");
    if ( moment(now).isAfter(end_time) ) {
      // console.log("handleCountDown:\t timeout!");
      // TODO: Need to figure out whether it is n expired reservation or finished laundry
      if (username === this.props.username) { // It can be an expired reservation or finished laundry
        Alert.alert("Your reservation just expired!");
      }

      // UTL.fetchData(this.props.username, this.props.selectedTab, this.props.bottomTab, this.props.title).done((res) => {
      //   this.setState({
      //     dataSource: this.state.dataSource.cloneWithRows(res),
      //   });
      // });
      this.callUTLfetchData();
    } else {
      // console.log("handleCountDown:\t still waiting");
      return newRemainTime;
    }

    // changed
    // if (newRemainTime === "0000") {
    //   this.fetchData();
    // } else {
    //   return newRemainTime;
    // }
  }; // handleCountDown


  /*
    Alert to confirm quickreservation
  */
  async quickReserveConfirm(machine_id) {
    const fake_access_code = '1001';    // TODO:
    // Raise another alert to confirm
    Alert.alert(
      'Reservation Code: ' + fake_access_code,  // to be changed
      'You have reserved this machine successfully. Please note that this reservation will expire in 10 minutes.',
      [
        { text: 'OK', onPress: (id) => {
          var id = machine_id;
          this.quickReserveSuccess(id)} }
      ]
    );
  }; // end of quickReserveConfirm

  async quickReserveSuccess(machine_id) {
    // Call API to reserve this machine_id
    var res = await API.quickReserve(this.props.username, machine_id);
    // console.log("quick reserve", res);
    // console.log("seg props", this.props);
    if (res.message && res.message.toUpperCase() === 'SUCCESS') {
      // Update the DS state - fetch the data again

      // UTL.fetchData(this.props.username, this.props.selectedTab, this.props.bottomTab, 'Your Reservation').done((res) => {
      //   // console.log("fetched data", res);
      //   this.setState({
      //     dataSource: this.state.dataSource.cloneWithRows(res),
      //   });
      // });
      this.callUTLfetchData();

      // this.props.navigator.push({
      // component: ListViewResConfirmContainer,
      // passProps: {
      //   username: this.props.username,
      //   reserve_time: moment().format("hh:mm A"),
      //   type: this.state.selectedTab,
      //   title: "Your Reservation",
      //   bottomTab: 'Reservation',
      //   dataSource: this.props.dataSource,
      // }
      // });
      // console.log("push end");
    } else {
      // Do nothing
      Alert.alert(res.message);
    }
  }; // end of quickReserveSuccess

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
