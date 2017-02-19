const API_URL = {
    'signUp': '/api/add_user',
    'login': '/api/login'
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
  }
}

export default API;
