/*
  Store the data of the current user
*/

let data = {
  username: '',
  password: '',
  address: '',
  propertyName: ''
}

let store = {
  getUsername: () => {
    return data.username;
  },

  setUsername: (username) => {
    data.username = username;
  },

  getPassword: () => {
    return data.password;
  },

  setPassword: (password) => {
    data.password = password;
  },

  getAddress: () => {
    return data.Address;
  },

  setAddress: (address) => {
    data.address = address;
  },

  getPropertyName: () => {
    return data.PropertyName;
  },

  setPropertyName: (propertyName) => {
    data.propertyName = propertyName;
  }
}

export default store;
