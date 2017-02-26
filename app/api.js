const API_URL = {
    'signUp': 'http://ec2-52-73-134-152.compute-1.amazonaws.com:3000/api/add_user',
    'login': 'http://ec2-52-73-134-152.compute-1.amazonaws.com:3000/api/login',
    'getWashingData': 'http://ec2-52-73-134-152.compute-1.amazonaws.com:3000/api/show_all_washing?show_all=True',
    'getDryerData': 'http://ec2-52-73-134-152.compute-1.amazonaws.com:3000/api/show_all_dryer?show_all=True',
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
    // console.log(username);
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
                 {'machine_id': 1, 'remainTime': "1504"},
                 {'machine_id': 2, 'remainTime': "0040"},
                 {'machine_id': 3, 'remainTime': "2200"},
                 {'machine_id': 4, 'remainTime': "0000"}
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
                {'machine_id': 1, 'remainTime': "2804"},
                {'machine_id': 2, 'remainTime': "1403"},
                {'machine_id': 3, 'remainTime': "0000"}
               ]
    return json;
  },

  quickReserve: async function(username, machine_id) {
    // let response = await fetch(`${API_URL.quickReserve}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //     machine_id
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
                 {'machine_id': 1, 'remainTime': "1404"},
                 {'machine_id': 2, 'remainTime': "0000"},
                 {'machine_id': 3, 'remainTime': "2100"},
                 {'machine_id': 4, 'remainTime': "0500"}
               ]
    return json;
  }

}

export default API;
