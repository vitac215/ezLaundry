import API from './api';

const UTIL = {
  fetchData: async function(username, selectedTab) {
    console.log("fetchdata");
    return await API.getMachineData(username, selectedTab)
      .then((res) => {
        console.log(res);
        return res; // !!! probably closure
      });
  },
}

export default UTIL;
