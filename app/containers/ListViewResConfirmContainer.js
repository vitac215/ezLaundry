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
    console.log(props);
    super(props);

    this.state = {
      dataSource: this.props.dataSource,
    }
  };

  render() {
    <ScrollView style={styles.listContainer}>
      <View>
        <ListView
          dataSource = {this.props.dataSource}
          renderRow = {this.renderRow} // auto bind
        />
      </View>
    </ScrollView>

    // return (
    //   <View>
    //
    //
    //     <View style={styles.container}>
    //       <ScrollView style={styles.listContainer}>
    //         <ListView
    //           dataSource = {this.state.dataSource}
    //           renderRow = {this.renderRow.bind(this)} // auto bind
    //         />
    //       </ScrollView>
    //     </View>
    //
    //   </View>
    //
    // );
  };

  renderRow(rowData) {
    console.log(rowData);

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
    };
  }; // end of renderRow
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
