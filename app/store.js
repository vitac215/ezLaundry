/*
  Store data of the current user
*/

import { AsyncStorage } from 'react-native';

let store = {

  async setUsername(username) {
    await AsyncStorage.setItem('username', username);
  },
  async getUsername() {
    let res = await AsyncStorage.getItem('username');
    return res;
  },

  async setPassword(password) {
    await AsyncStorage.setItem('password', password);
  },
  async getPassword() {
    let res = await AsyncStorage.getItem('password');
    return res;
  },

  async setPropertyName(property_name) {
    await AsyncStorage.setItem('property_name', property_name);
  },
  async getPropertyName(property_name) {
    let res = await AsyncStorage.getItem('property_name');
    return res;
  },

  async removeUser() {
    let keys = ['username', 'password', 'address', 'property_name'];
    await AsyncStorage.multiRemove(keys);
  },


  async setRemindDone(boolean) {
    try {
      await AsyncStorage.setItem('remindDone', JSON.stringify(boolean));
    } catch(error) {
      console.log(error);
    }
  },
  async getRemindDone() {
    let res = await AsyncStorage.getItem('remindDone');
    console.log("value got: " + res);
    return Boolean(res);
  },

}

export default store;
