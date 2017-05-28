'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';

import StatusResScene from '../scenes/StatusResScene';
import SettingsScene from '../scenes//SettingsScene';

import API from '../api';

var statusIcon =
'data:image/png;base64,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';

var reservationIcon =
'data:image/png;base64,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';

var settingsIcon =
'data:image/png;base64,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';


export default class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottomTab: this.props.bottomTab,
      title: this.props.property_name,
    };
  }

  _renderContent = (component, checkRes) => {
    console.log("menubar checkRes", checkRes);
    var Component = component;
    console.log('props', {...this.props});
    // console.log('state', {...this.state});

    // to avoid overwrite of the prop title from state undefined
    let titleDefined;
    if (this.state.title === undefined) {
      titleDefined = this.props.title;
    } else {
      titleDefined = this.state.title
    }


    var titleToPass;
    // if the user is clicking the Reservation menu button, check the if s/he has reservation
    if (checkRes) {
      // check the server if this person has a reservation
      API.getResSchedule(this.props.username, "washing").done((res) => {
        // TODO: check the data format
        console.log('SegmentedControlContainer titleToPass res', res);
        if (res.length >= 1) {
          titleToPass = 'Your Reservation';
        } else {
          titleToPass = 'Reservation';
        }
      });
    }

    console.log("menubar titleToPass", titleToPass);
    return (
      <View style={styles.tabContent}>
        <Component {...this.props} {...this.state} title={titleDefined} titleToPass={titleToPass} />
      </View>
    )
  }

  render() {
    return (
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
          { this._renderContent(StatusResScene, false) }
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Reservation"
          icon={{uri: reservationIcon, scale: 3}}
          selected={this.state.bottomTab === 'Reservation'}
          onPress={this.checkReservation.bind(this)}>
          { this._renderContent(StatusResScene, true) }
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
          { this._renderContent(SettingsScene, false) }
        </TabBarIOS.Item>

      </TabBarIOS>
    )
  }

  checkReservation() {
    // check the server if this person has a reservation
    API.getResSchedule(this.props.username, 'Washing').done((res) => {
      if (res.length >= 1) {
        this.setState({
          bottomTab: 'Reservation',
          title: 'Your Reservation',
        });
      } else {
        this.setState({
          bottomTab: 'Reservation',
          title: 'Reservation',
        })
      }
    });
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1
  }
});
