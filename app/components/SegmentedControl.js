'use strict';

import React, {Component} from 'react';

import { View } from 'react-native';

import ListViewStatusContainer from '../containers/ListViewStatusContainer';
import ListViewReservationContainer from '../containers/ListViewReservationContainer';
import ListViewResConfirmContainer from '../containers/ListViewResConfirmContainer';

export default class SegmentedControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("SegmentedControl props", this.props);
    switch(this.props.bottomTab) {
      case 'Status':
          return (
            <View>
              <ListViewStatusContainer {...this.props} />
            </View>
          );

      case 'Reservation':
        if (this.props.title === "Reservation") {
          return (
            <View>
              <ListViewReservationContainer {...this.props} />
            </View>
          );
        } else {
          // console.log("enter ListViewResConfirmContainer");
          return (
            <View>
              <ListViewResConfirmContainer {...this.props} />
            </View>
          );
        } // end of if

    } // end of switch
  }

}
