'use strict'
import React, { Component, View, Stylesheet } from 'react-native';

class ViewContainer extends Component {
  render() {
    return (
      <View style={styles.ViewContainer}>
        {this.props.children}
      </View>
    )
  }
}

const styles = Stylesheet.create({

  ViewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContents: "flex-start",
    alignItems: "stretch",
  }
})

module.exports = ViewContainer;
