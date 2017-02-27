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

  async setCity(city) {
    await AsyncStorage.setItem('city', city);
  },
  async getCity() {
    let res = await AsyncStorage.getItem('city');
    return res;
  },

  async setLongitude(longitude) {
    await AsyncStorage.setItem('longitude', longitude);
  },
  async getLongitude() {
    let res = await AsyncStorage.getItem('longitude');
    return res;
  },

  async setLatitude(longitude) {
    await AsyncStorage.setItem('latitude', latitude);
  },
  async getLatitude() {
    let res = await AsyncStorage.getItem('latitude');
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
  }

}

export default store;
