'use strict';

import React, {Component} from 'react';

import { View } from 'react-native';

import ListViewStatusContainer from '../containers/ListViewStatusContainer';
import ListViewReservationContainer from '../containers/ListViewReservationContainer';

export default class SegmentedControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("SegmentedControl", this.props);
    switch(this.props.bottomTab) {
      case 'Status':
          return (
            <View>
              <ListViewStatusContainer {...this.props} />
            </View>
          );
        break;
      case 'Reservation':
          return (
            <View>
              <ListViewReservationContainer {...this.props} />
            </View>
          );
        break;
    }
  }

}
