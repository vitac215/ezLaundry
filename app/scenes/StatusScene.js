'use strict';

import React, { Component } from 'react';

import { Text, TextInput, StyleSheet, Image, ScrollView, ListView, View } from 'react-native';

import SegmentedControl from '../components/SegmentedControl';

export default class StatusScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <SegmentedControl {...this.props}/>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
