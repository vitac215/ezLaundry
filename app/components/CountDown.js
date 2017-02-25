import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    AppRegistry,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';

var CountDown = React.createClass ({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      time: this.props.time,
    };
  },

  componentDidMount(){
    this._countdown();
  },

  render(){
    /*console.log(moment({m:time, s:00}).format("mm:ss"));*/
    /*console.log(moment().subtract(1, 'minutes').format('HH:mm'));*/
    var style = [styles.text];
    var component;
    component =
        <View style={styles.container}>
          <Text style={styles.remainTime}
            onChange={() => this.handleOnChange}>
            00:{this.state.time}
          </Text>
        </View>
    return (
        component
    )
  },

  _countdown(){
    var timer = function () {
      var time = this.state.time - 1;
      //var time = moment(this.state.time, "mm:ss").subtract('1', 'minutes');
      this.setState({time: time});
      this.props.onCountDown(this.state.time);
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.setState({time: this.props.time});
      }

    };
    this.setTimeout(timer.bind(this), 1000);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: '#929292',
    fontSize: 15
  },
  remainTime: {
    fontSize: 30,
    color: '#929292'
  },
});

module.exports = CountDown;
