const server = 'http://128.237.219.34:3000/';
// ec2-54-165-215-7.compute-1.amazonaws.com/

const API_URL = {
    'signUp': server + 'api/add_user/',
    'login': server + 'api/login_user/',
    'getMachineData': server + 'api/show_all_user_schedules_type_after_now/',
    'quickReserve': server + 'api/quick_reservation/'
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

    // console.log(API_URL.getMachineData);
    // console.log(username);
    // console.log(machine_type);
    // try{
    //   let response = await fetch(`${API_URL.getMachineData}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username,
    //       machine_type
    //     })
    //   })
    //   let json = await response.json();
    //   console.log(json.schedules);
    //   return json.schedules;
    // } catch(err) {
    //   console.log(err);
    // }

    // change
    let json = [
                 {'user_name': "v", 'end_time': "0005"},  // current time + 1
                 {'user_name': "v", 'end_time': "0010"},
                 {'user_name': "v", 'end_time': "0003"},
                 {'user_name': "v", 'end_time': "0000"}
               ]
    return json;
    // end change

  },


  quickReserve: async function(username, machine_id) {
    // try{
    //   let response = await fetch(`${API_URL.quickReserve}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username,
    //       machine_id
    //     })
    //   })
    //   let json = await response.json();
    //   console.log(json);
    //   return json;
    // } catch(err) {
    //   console.log(err);
    // }

    let json = {'message': "SUCCESS"}
    return json;
  }

}

export default API;
