import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

export default class UnTouchableRowItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {rowData} = this.props;
    return (

      <View>
        <View style={[styles.row, styles.untouchable]}>
          <View style={styles.timeContainer}>

            <View>
              <Text style={styles.text}>
                {rowData.slot}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.separator} />
      </View>



    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 20,
    // height: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  text: {
    flex: 1,
    color: '#929292',
    fontSize: 20,
  },
  timeContainer: {
    flex: 1,
    // margin: 10,
    justifyContent: 'flex-start',
  },
  untouchable: {
    backgroundColor: '#EEEEEE',
  },
});
