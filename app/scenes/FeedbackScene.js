'use strict';

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Button from 'apsl-react-native-button';
import Navbar from '../components/Navbar';
import API from '../api.js';

export default class FeedbackScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      username: this.props.username,
      email: this.props.email,
    }
  };

  async sendFeedback() {
    console.log("send feedback", this.props);
    const { navigator } = this.props;
    const { username, feedback, email } = this.state;
    if (feedback.length < 10) {
      Alert.alert('Your feedback should be greater than 10 words');
    } else if (feedback.length > 500) {
      Alert.alert('Your feedback should be less than 500 words');
    } else {
      try {
        let res = await API.sendFeedback(username, feedback);
        console.log(res);
        if (res.message && res.message.toUpperCase() === "SUCCESS") {
          console.log('', res);
          Alert.alert(
            'Thanks!',
            'We have received your feedback.',
            [
              {text: 'OK'}
            ]
          )
          return;
        // Alert error message
        } else {
          Alert.alert(res.message);
          return;
        }
        return;
      } catch(err) {
        console.log(err);
      }
    }



  }

  render() {
    console.log('Feedback Scene', this.props);
    const { navigator } = this.props;
    const { username, feedback, email } = this.state;

    return (
      <View style={styles.container}>
        <Navbar title={this.props.title} leftBtn='Back' navigator={navigator} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textArea}
              onChangeText={ (feedback) => {this.setState({feedback})}}
              placeholder="Let us know what you think about this app!"
              value={ feedback }
              autoCapitalize='none'
              placeholderTextColor='rgba(51,51,51,0.5)'
              editable={true}
              multiline={true}
              autoCorrect={false} />
          </View>

          <Button style={styles.btn}
                  textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}
                  onPress={this.sendFeedback.bind(this)}>
            Send
          </Button>
      </View>
    );
  };

};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  inputContainer: {
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  textArea: {
    alignSelf: 'center',
    width: 300,
    height: 250,
    fontSize: 17,
    padding: 15,
    backgroundColor: '#F6F6F6',
  },
  btn: {
    backgroundColor: '#4AC3C0',
    alignSelf: 'center',
    borderWidth: 0,
    margin: 15,
    width: 300
  },
});
