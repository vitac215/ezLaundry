const API_URL = {
    // http:128.237.176.69
    // http://ec2-52-73-134-152.compute-1.amazonaws.com
    'signUp': 'http:128.237.176.69:3000/api/add_user/',
    'login': 'http:128.237.176.69:3000/api/login_user/',
    'getMachineData': 'http:128.237.176.69:3000/api/show_user_schedule_anonymous_type/',
    'quickReserve': ''
}

const API = {
  signUp: async function(username, password, address, city, property_name) {
    try{
      let response = await fetch(`${API_URL.signUp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          address,
          city,
          property_name
        })
      })
      let json = await response.json();
      console.log(json);
        return json;
    } catch(err) {
      console.log(err);
    }

    // let json = {'success': true, 'msg': ''};
    // return json;
  },


  login: async function(username, password) {
    try{
      let response = await fetch(`${API_URL.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      let json = await response.json();
      console.log(json);
      return json;
    } catch(err) {
      console.log(err);
    }

    // let json = {'success': true,
    //             'user': {'username': 'vita', 'password': '123', 'address': '732', 'propertyName': 'Forbes Apartment'},
    //             'msg': ''};
    // return json;
  },


  getMachineData: async function(username, machine_type) {
    console.log(API_URL.getMachineData);
    console.log(username);
    console.log(machine_type);
    try{
      let response = await fetch(`${API_URL.getMachineData}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          machine_type
        })
      })
      let json = await response.json();
      console.log(json);
      return json;
    } catch(err) {
      console.log(err);
    }

    // let json = [
    //             {'machine_id': 1, 'endTime': "2017-02-26T21:59:31.000Z"},  // EST 2017/2/16/ 4:59
    //             {'machine_id': 2, 'endTime': "2017-02-26T21:56:31.000Z"},
    //             {'machine_id': 3, 'endTime': "2017-02-26T22:10:38.000Z"},
    //             {'machine_id': 4, 'endTime': "2017-02-26T22:12:39.000Z"}
    //           ]
    // return json;
  },


  quickReserve: async function(username, machine_id) {
    try{
      let response = await fetch(`${API_URL.quickReserve}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          machine_id
        })
      })
      let json = await response.json();
      console.log(json);
      return json;
    } catch(err) {
      console.log(err);
    }

    // let json = {'success': true, 'msg': ''};
    // return json;
  },

  // // To be deleted
  // getFakeReserve: async function(address) {
  //   let response = await fetch(`${API_URL.getWashingData}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       address
  //     })
  //   });
  //
  //   let json = {};
  //   try{
  //     json = await response.json();
  //   } catch(err) {
  //     json = {
  //       response
  //     }
  //   }
  //
  //   return json;
  //
  //   // let json = [
  //   //              {'machine_id': 1, 'remainTime': "1404"},
  //   //              {'machine_id': 2, 'remainTime': "0000"},
  //   //              {'machine_id': 3, 'remainTime': "2100"},
  //   //              {'machine_id': 4, 'remainTime': "0500"}
  //   //            ]
  //   // return json;
  // }

}

export default API;
