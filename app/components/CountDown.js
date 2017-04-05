import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    AppRegistry,
    AppState,
    Alert,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';

var CountDown = React.createClass ({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      time: this.props.time,
      end_time: this.props.end_time,
      username: this.props.username
    };
  },

  componentDidMount(){
    this._countdown();
  },

  render(){
    var style = [styles.text];
    var component;
    component =
        <View style={styles.container}>
          <Text style={styles.remainTime}
            onChange={() => this.handleOnChange}>
            {moment(this.state.time, "mmss").format('mm:ss')}
          </Text>
        </View>
    return (
        component
    )
  },
  _onLocalNotification() {
    Alert.alert(
    'Your laundry is done',
  )},

  _countdown(){
    var timer = function () {
      // var time = this.state.time - 1;
      // var time = moment(this.state.time, "mmss").subtract('1', 'seconds');
      //
      // var displayTime = moment(time,"mmss").format('mmss');
      //
      const now = moment(new Date()).tz("America/New_York");
      //
      // this.setState({time: time});

      if ( moment(now).isBefore(this.state.end_time) && this.state.displayTime != '0001' ) {
        // var time = this.state.time - 1;
        var time = moment(this.state.time, "mmss").subtract('1', 'seconds');
        var displayTime = moment(time,"mmss").format('mmss');
        this.setState({time: time});
        this.setTimeout(timer, 1000);
        this.props.onCountDown(displayTime, this.state.end_time, this.state.username);
      } else {
        // var time = this.state.time - 1;
        var time = '0000';
        var displayTime = moment(time,"mmss").format('mmss');
        // this.setState({time: this.props.time});
        this.setState({time: '0000'});
        this.props.onCountDown(displayTime, this.state.end_time, this.state.username);
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
