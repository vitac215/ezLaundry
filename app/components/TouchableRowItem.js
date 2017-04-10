import React, {Component} from 'react';
import {
  Text,
  View,
  ListView,
  TouchableOpacity,
} from 'react-native';

export default class TouchableRowItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    var {rowData} = this.props;
    return (
      <TouchableOpacity>
        <Text style={styles.text}>
          {rowData.slot}
        </Text>
      </TouchableOpacity>
    )
  }
}
