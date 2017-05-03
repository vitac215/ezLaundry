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
  Alert,
  TabBarIOS,
  TouchableHighlight,
} from 'react-native';

import Navbar from '../components/Navbar';
import API from '../api';
import moment from 'moment';
import Button from 'apsl-react-native-button';
import MainScene from './MainScene';
import StatusResScene from './StatusResScene';
import ReserveScene from './ReserveScene';
import SettingsScene from './SettingsScene';

var ReserveConfirmScene = React.createClass({

  getInitialState: function() {
    const {navigator} = this.props;
    console.log('reserve confirm scene', this.props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      username: this.props.username,
      reserve_time: this.props.reserve_time,
      washingDS: ds,
      dryerDS: ds,
      reserveDS: ds.cloneWithRows(this._genRows({})),
      values: ['Washing', 'Dryer'],
      selectedTab: this.props.type,
      selectedIndex: this.props.type === 'Washing' ? 0: 1,
      title: this.props.title,
      bottomTab: this.props.bottomTab,
      type: this.props.type,
      reserved: this.props.reserved,
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  componentWillMount: function() {
    this._pressData = {};
  },
  fetchData: async function() {
    API.getMachineData(this.state.username, "washing")
      .then((res) => {
        this.setState({
          washingDS: this.state.washingDS.cloneWithRows(res),
        });
      })
    .then(() => {
      API.getMachineData(this.state.username, "dryer") // to be changed to dryer
        .then((res) => {
          console.log("fetched data", res);
          this.setState({
            dryerDS: this.state.dryerDS.cloneWithRows(res),
          })
        })
    })
    .done()
  },
  _renderContent: function(component) {
    var Component = component;
    console.log('props', {...this.props});
    return (
      <View style={styles.tabContent}>
        <Navbar {...this.props} title={this.state.title} />
        <Component {...this.props} />
      </View>
    )
  },
  render() {
    console.log('initial state', this.props.reserve_time);
    // var reserved = this.props.reserved;
    if (this.state.reserved && this.state.type === this.state.selectedTab) {
      return (
        this.renderReserved()
      );
    } else {
      console.log("no reservation");
      return (
        this.renderUnreserved()
      );
    }

  },
  renderReserved: function() {
    console.log("render reserved");
    return (
      <View style={styles.container}>
        <TabBarIOS
          unselectedTintColor='#565656'
          tintColor='#2E8A87'
          barTintColor='#F8F8F8'>

          <TabBarIOS.Item
            title="Status"
            icon={{uri: statusIcon, scale: 3}}
            selected={this.state.bottomTab === 'Status'}
            onPress={() => {
              this.setState({
                bottomTab: 'Status',
                title: this.props.property_name
              });
            }}>
            { this._renderContent(StatusScene) }
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Reservation"
            icon={{uri: reservationIcon, scale: 3}}
            selected={this.state.bottomTab === 'Reservation'}
            onPress={() => {
              this.setState({
                bottomTab: 'Reservation',
                title: this.props.title,
              });
            }}>
            <View style={styles.tabContent}>
              <View style={styles.scContainer}>
                <Navbar {...this.props} title={this.props.title} />
                <SegmentedControlIOS
                  style={styles.segmentedControl}
                  tintColor='#B0FFFE'
                  values={this.state.values}
                  selectedIndex={this.state.selectedIndex}
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

          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Settings"
            icon={{uri: settingsIcon, scale: 3}}
            selected={this.state.bottomTab === 'Settings'}
            onPress={() => {
              this.setState({
                bottomTab: 'Settings',
                title: 'Settings'
              });
            }}>
            { this._renderContent(SettingsScene) }
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    )
  },
  renderUnreserved: function() {
    console.log("render unreserved");
    return (
      <View style={styles.container}>
      <TabBarIOS
        unselectedTintColor='#565656'
        tintColor='#2E8A87'
        barTintColor='#F8F8F8'>

        <TabBarIOS.Item
          title="Status"
          icon={{uri: statusIcon, scale: 3}}
          selected={this.state.bottomTab === 'Status'}
          onPress={() => {
            this.setState({
              bottomTab: 'Status',
              title: this.props.property_name
            });
          }}>
          { this._renderContent(StatusScene) }
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Reservation"
          icon={{uri: reservationIcon, scale: 3}}
          selected={this.state.bottomTab === 'Reservation'}
          onPress={() => {
            this.setState({
              bottomTab: 'Reservation',
              title: this.props.title,
            });
          }}>
          <View style={styles.tabContent}>
            <View style={styles.scContainer}>
              <Navbar {...this.props} title={this.props.title} />
              <SegmentedControlIOS
                style={styles.segmentedControl}
                tintColor='#B0FFFE'
                values={this.state.values}
                selectedIndex={this.state.selectedIndex}
                onValueChange={(val)=> {
                  this.setState({
                    selectedTab: val
                  })
                }}/>
            </View>
            <ScrollView style={styles.listContainer}>
              <ListView
                dataSource={this.state.reserveDS}
                renderRow={this._renderRow}
              />
            </ScrollView>
          </View>

        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Settings"
          icon={{uri: settingsIcon, scale: 3}}
          selected={this.state.bottomTab === 'Settings'}
          onPress={() => {
            this.setState({
              bottomTab: 'Settings',
              title: 'Settings'
            });
          }}>
          { this._renderContent(SettingsScene) }
        </TabBarIOS.Item>
      </TabBarIOS>
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
                this.reservationConfirm(reserveTime);} }   // TODO: pass time to api
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
  _pressData: ({}: {[key: number]: boolean}),
  _pressRow: function(rowID: number) {
      this._pressData[rowID] = !this._pressData[rowID];
      this.setState({dataSource: this.state.reserveDS.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },
  reservationConfirm: function(reserveTime) {
    console.log("time", reserveTime);
    console.log("reserve props", this.props);
    this.props.navigator.push({
    component: ReserveConfirmScene,
    passProps: {
      username: this.props.username,
      address: this.props.address,
      password: this.props.password,
      property_name: this.props.property_name,
      reserve_time: reserveTime,
      type: this.state.selectedTab,
      title: "Your Reservation",
      bottomTab: 'Reservation',
      reserved: true,
    }
    });
  },
  renderListView: function() {
    // Display washing machines
    console.log(this.props.type);
    if (this.state.selectedTab === 'Washing') {
      return (
        <View>
          {this.renderReserveWashingScene()}
        </View>
      )
    } else if (this.state.selectedTab === 'Dryer') {
    // Display dryers
      return (
        <View>
          {this.renderReserveDryerScene()}
        </View>
      )
    }
  },
  renderReserveWashingScene: function() {
    console.log(this.props.type);
    if (this.props.type === 'Washing') {
      return (
        <ListView
          dataSource = {this.state.washingDS}
          renderRow = {this.renderRow} // auto bind
        />
      );
    } else {
      return null;
    }

  },

  renderReserveDryerScene: function() {
    if (this.props.type === 'Dryer') {
      return (
        <ListView
          dataSource = {this.state.dryerDS}
          renderRow = {this.renderRow} // auto bind
        />
      );
    } else {
      return null;
    }

  },
  renderRow(rowData) {
    console.log('rowData', rowData)
    var img = this.state.selectedTab === 'Washing' ? require('../img/status/Washing.png') : require('../img/status/Dryer.png');
    var raw_remainTime = rowData.end_time;
    var predict_time = moment().add(10, 'minutes').format('hh:mm A');
    var expire_time = moment(this.props.reserve_time, "hh:mm A").add(10, 'minutes').format('hh:mm A');
    if (raw_remainTime === "0000") {
      return (
          <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.centerContainer}>
                    <Text style={[styles.text, styles.machine_id]}>{rowData.display_id}</Text>
                </View>
                <Image style={styles.thumb} source={img} />
                <View style={[styles.textContainer, styles.centerContainer]}>
                <Text style={[styles.text]}>{this.state.selectedTab}</Text>
                  <Text style={[styles.text, styles.available]}>EXPIRED: {expire_time}</Text>
                  <Text style={[styles.text]}>Access code: 1001</Text>
                  <Button style={styles.btn}
                          textStyle={{fontSize: 10, color: '#4AC3C0'}}
                          onPress={() => {
                            this.setState({
                              reserved: false,
                            });
                            this.renderUnreserved;
                          }}>
                    Cancel
                  </Button>
                </View>
            </View>
            <View style={styles.separator}/>
          </View>
      )
    } else {
      return null;
    }

  },
  });

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
    alignSelf: 'flex-end',
    borderWidth: 0,
    margin: 15,
    width: 60,
    borderColor: '#4AC3C0',
    borderWidth: 0.5,
    height: 30,
  },
  imageText: {
    alignSelf: 'flex-start',
  }
});

module.exports = ReserveConfirmScene;
