const API_URL = {
    'signUp': '/api/add_user',
    'login': '/api/login',
    'getWashingData': '/api/show_all_washing?show_all=True',
    'getDryerData': '/api/show_all_dryer?show_all=True',
    'quickReserve': ''
}

const API = {
  signUp: async function(username, password, address, propertyName) {
    // let response = await fetch(`${API_URL.signUp}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //     address,
    //     propertyName
    //   })
    // });
    //
    // let json = {};
    // try{
    //   json = await response.json();
    // } catch(err) {
    //   json = {
    //     response
    //   }
    // }
    //
    // return json;

    let json = {'success': true, 'msg': ''};
    return json;
  },

  login: async function(username, password) {
    // let response = await fetch(`${API_URL.login}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password
    //   })
    // });
    //
    // let json = {};
    // try{
    //   json = await response.json();
    // } catch(err) {
    //   json = {
    //     response
    //   }
    // }
    //
    // return json;

    let json = {'success': true,
                'user': {'username': 'vita', 'password': '123', 'address': '732', 'propertyName': 'Forbes Apartment'},
                'msg': ''};
    return json;
  },

  getWashingData: async function(address) {
    // let response = await fetch(`${API_URL.getWashingData}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     address
    //   })
    // });
    //
    // let json = {};
    // try{
    //   json = await response.json();
    // } catch(err) {
    //   json = {
    //     response
    //   }
    // }
    //
    // return json;

    let json = [
                 {'machine_id': 1, 'remainTime': 15},
                 {'machine_id': 2, 'remainTime': 8},
                 {'machine_id': 3, 'remainTime': 10},
                 {'machine_id': 4, 'remainTime': 0}
               ]
    return json;
  },

  getDryerData: async function(address) {
    // let response = await fetch(`${API_URL.getDryerData}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     address
    //   })
    // });
    //
    // let json = {};
    // try{
    //   json = await response.json();
    // } catch(err) {
    //   json = {
    //     response
    //   }
    // }
    //
    // return json;

    let json = [
                 {'machine_id': 1, 'remainTime': 55},
                 {'machine_id': 2, 'remainTime': 48},
                 {'machine_id': 3, 'remainTime': 0},
               ]
    return json;
  },

  quickReserve: async function(username) {
    // let response = await fetch(`${API_URL.quickReserve}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username
    //   })
    // });
    //
    // let json = {};
    // try{
    //   json = await response.json();
    // } catch(err) {
    //   json = {
    //     response
    //   }
    // }
    //
    // return json;

    let json = {'success': true, 'msg': ''};
    return json;
  },

  // To be deleted
  getFakeReserve: async function(address) {
    // let response = await fetch(`${API_URL.getWashingData}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     address
    //   })
    // });
    //
    // let json = {};
    // try{
    //   json = await response.json();
    // } catch(err) {
    //   json = {
    //     response
    //   }
    // }
    //
    // return json;

    let json = [
                 {'machine_id': 1, 'remainTime': 11},
                 {'machine_id': 2, 'remainTime': 0},
                 {'machine_id': 3, 'remainTime': 12},
                 {'machine_id': 4, 'remainTime': 0}
               ]
    return json;
  }

}

export default API;
