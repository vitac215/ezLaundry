'use strict';

import React, {Component} from 'react';
import {
  SegmentedControlIOS,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
} from 'react-native';

import SegmentedControl from '../components/SegmentedControl';
import UTL from '../utilities';
import API from '../api';

export default class SegmentedControlContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: ['Washing', 'Dryer'],
      selectedTab: 'Washing',
      bottomTab: this.props.bottomTab,
      WashingDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 }),
      DryerDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      titleToPass: 'Reservation',
    }
  };

  componentDidMount() {
    // console.log("SegmentedControlContainer didmount");
    // console.log("SegmentedControlContainer props", this.props);

    // check the server if this person has a reservation
    API.getResSchedule(this.props.username, this.state.selectedTab).done((res) => {
      // TODO: check the data format
      // console.log('SegmentedControlContainer titleToPass res', res);
      if (res.length >= 1) {
        this.setState({
          titleToPass: 'Your Reservation',
        });
      } else {
        this.setState({
          titleToPass: 'Reservation',
        });
      }
      this.callUTLfetchData();

      // fetch machine data every 5 seconds
      // this.timer = setInterval(() => this.callUTLfetchData(), 5000);
    });
  };


  callUTLfetchData() {
    console.log("callUTLfetchData enter");
    UTL.fetchData(this.props.username, "washing", this.state.bottomTab, this.state.titleToPass).done((res) => {
      this.setState({
        WashingDS: this.state.WashingDS.cloneWithRows(res),
      });
    });
    UTL.fetchData(this.props.username, "dryer", this.state.bottomTab, this.state.titleToPass).done((res) => {
      this.setState({
        DryerDS: this.state.DryerDS.cloneWithRows(res),
      });
    });
  }


  render() {
    // console.log("SegmentedControlContainer props", this.props);
    // console.log("SegmentedControlContainer datasource", this.state.dataSource);
    if (this.state.WashingDS == undefined || this.state.DryerDS == undefined) {
      return <View><Text>Loading</Text></View>
    }
    else {
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
            <SegmentedControl {...this.props} {...this.state} title={this.state.titleToPass}/>
          </ScrollView>
        </View>
      ); // end return
    }

  }; // end render
} // end class

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
