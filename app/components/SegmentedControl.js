'use strict';

var React = require('react');
var ReactNative = require('react-native');
var { SegmentedControlIOS, Text, View, StyleSheet } = ReactNative;

export default class SegmentedControl extends React.Component {
  state = {
    values: ['Washing', 'Dryer'],
    selectedIndex: 0
  };

  _onChange = (event) => {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });

  };

  render() {
    return (
      <View style={styles.container}>
        <SegmentedControlIOS
          style={styles.segmentedControl}
          tintColor='#B0FFFE'
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}/>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#4AC3C0'
  },

  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 20,
    marginBottom: 10
  },

  segmentedControl: {
    margin: 10
  }
});
