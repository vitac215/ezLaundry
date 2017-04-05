const server = 'http://128.237.134.80:3000/';
// ec2-54-165-215-7.compute-1.amazonaws.com/

const API_URL = {
    'signUp': server + 'api/add_user/',
    'login': server + 'api/login_user/',
    'getMachineData': server + 'api/show_all_user_schedules_type_after_now/',
    'quickReserve': server + 'api/quick_reservation/',
    'updateUser': server +  '/api/update_user_info/',
    'report': server + '/api/send_email_to_landlord/',
    'sendFeedback': server + '/api/send_feedback/',
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
  },


  getMachineData: async function(username, machine_type) {
    // original

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
      console.log(json.schedules);
      return json.schedules;
    } catch(err) {
      console.log(err);
    }

    // change
    // let json = [
    //              {'user_name': "v", 'end_time': "0005"},  // current time + 1
    //              {'user_name': "v", 'end_time': "0010"},
    //              {'user_name': "v", 'end_time': "0003"},
    //              {'user_name': "v", 'end_time': "0000"}
    //            ]
    // return json;
    // end change

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

    // let json = {'message': "SUCCESS"}
    // return json;
  },
  updateUser: async function(username, new_password, address, city) {
    try{
      let response = await fetch(`${API_URL.updateUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          new_password,
          address,
          city,
        })
      })
      let json = await response.json();
      console.log(json);
        return json;
    } catch(err) {
      console.log(err);
    }
  },
  report: async function(username, report) {
    try{
      let response = await fetch(`${API_URL.updateUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          report,
        })
      })
      let json = await response.json();
      console.log(json);
        return json;
    } catch(err) {
      console.log(err);
    }
  },
  sendFeedback: async function(username, text) {
    try{
      let response = await fetch(`${API_URL.sendFeedback}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          text,
        })
      })
      let json = await response.json();
      console.log(json);
        return json;
    } catch(err) {
      console.log(err);
    }
  },

}

export default API;
