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
    console.log(this.props);
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
        <View>
          <Text style={styles.remainTime}>00:{this.state.time}</Text>
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
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.setState({time: this.state.time});
      }
    };
    this.setTimeout(timer.bind(this), 1000);
  }
});

var styles = StyleSheet.create({
  text: {
    color: '#929292',
    fontSize: 15
  },
  wrapper: {
    padding: 10,
    marginRight:10,
    backgroundColor: '#e5e5e5',
  },
  remainTime: {
    fontSize: 30
  },
});

module.exports = CountDown;
