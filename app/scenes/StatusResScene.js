'use strict';

import React, { Component } from 'react';

import { Text, TextInput, StyleSheet, Image, ScrollView, ListView, View } from 'react-native';

import Navbar from '../components/Navbar';
import SegmentedControlContainer from '../containers/SegmentedControlContainer';

export default class StatusResScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar {...this.props} title={this.props.title} />
        <SegmentedControlContainer {...this.props}/>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
