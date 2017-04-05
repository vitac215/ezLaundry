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

export default class FeedbackScene extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      username: this.props.username,
      email: this.props.email,
    }
  };

  sendFeedback() {
    console.log("send feedback");
    if (this.feedback.length > 500 || this.feedback.length < 10) {
      Alert.alert('Your feedback should be greater than 10 and less than 500 words');
    } else {
      Alert.alert('We have received your feedbacK. Thanks!');
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
