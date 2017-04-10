import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class TouchableRowItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {rowData} = this.props;
    return (
      <View>
        <View style={styles.row}>

          <View style={styles.timeContainer}>
            <TouchableOpacity onPress={() => {
                Alert.alert(
                  'Reserve a ' + this.props.selectedTab + ' machine at ' + rowData.slot +'?',
                  'Please note that your reservation will be cancelled if you are late for 10 minutes',
                  [
                    {text: 'Confirm', onPress: (reserveTime) => {
                      var reserveTime = rowData.slot;
                      this.reservationConfirm(reserveTime);} },   // TODO: pass time to api
                    {text: 'Cancel'},
                  ]
                );
              }}>
              <Text style={styles.text}>
                {rowData.slot}
              </Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.separator} />
      </View>
    )
  } // end of render

  reservationConfirm(reserveTime) {
    console.log("time", reserveTime);
    console.log("reserve props", this.props);
    var {username, selectedTab} = this.props;
    this.props.navigator.push({
    component: ReserveConfirmScene,
    passProps: {
      username: username,
      reserve_time: reserveTime,
      machine_type: selectedTab,
      title: "Your Reservation",
      bottomTab: 'Reservation',
      reserved: true,
    }
    });
  }

} // end of class

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 20,
    // height: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  text: {
    flex: 1,
    color: '#929292',
    fontSize: 20,
  },
  timeContainer: {
    flex: 1,
    // margin: 10,
    justifyContent: 'flex-start',
  },
  untouchable: {
    backgroundColor: '#EEEEEE',
  },
});
