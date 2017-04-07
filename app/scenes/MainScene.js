'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';

import Navbar from '../components/Navbar';
import StatusScene from './StatusScene';
import ReserveScene from './ReserveScene';
import SettingsScene from './SettingsScene';
import moment from 'moment';


export default class MainScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.property_name,
    };
  }


  _renderContent = (component) => {
    var Component = component;
    console.log('props', {...this.props});
    return (
      <View style={styles.tabContent}>
        <Navbar {...this.props} title={this.state.title} />
        <Component {...this.props} />
      </View>
    )
  }

  render() {
    console.log('mainscene', this.props);
    return (

    )
  }
} // end class

var styles = StyleSheet.create({
  tabContent: {
    flex: 1
  }
});
