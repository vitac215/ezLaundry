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

  async setAddress(address) {
    await AsyncStorage.setItem('address', address);
  },
  async getAddress() {
    let res = await AsyncStorage.getItem('address');
    return res;
  },

  async setPropertyName(propertyName) {
    await AsyncStorage.setItem('propertyName', propertyName);
  },
  async getPropertyName(propertyName) {
    let res = await AsyncStorage.getItem('propertyName');
    return res;
  },

  async removeUser() {
    let keys = ['username', 'password', 'address', 'propertyName'];
    await AsyncStorage.multiRemove(keys);
  }

}

export default store;
