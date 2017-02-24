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
      disabled: false
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
    // if (this.state.disabled) {
    //   style.push({color: 'gray'});
    //   style.push(this.props.disabledTextStyle);
    //   component =
    //       <View style={[styles.wrapper,this.props.buttonStyle]}>
    //         <TouchableWithoutFeedback>
    //           <Text style={[style]}>{this.props.text}({this.state.time})</Text>
    //         </TouchableWithoutFeedback>
    //       </View>
    // } else {
    //   component =
    //       <TouchableHighlight
    //           style={[styles.wrapper,this.props.buttonStyle]}
    //           onPress={this._onPress.bind(this)}
    //           >
    //         <Text style={[style,this.props.textStyle]}>{this.props.text}({this.state.time})</Text>
    //       </TouchableHighlight>
    // }
    return (
        component
    )
  },
  // _onPress(){
  //   if (this.state.disabled) {
  //     //nothing
  //   } else {
  //     this.setState({disabled: true});
  //     this._countdown();
  //     if(this.props.onPress){
  //         this.props.onPress();
  //     }
  //   }
  // },

  _countdown(){
    var timer = function () {
      var time = this.state.time - 1;
      //var time = moment(this.state.time, "mm:ss").subtract('1', 'minutes');
      this.setState({time: time});
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.setState({disabled: false});
        this.setState({time: this.props.time ? this.props.time : 60});
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
