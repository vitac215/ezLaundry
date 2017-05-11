import moment from 'moment';

import API from './api';

const UTIL = {
  fetchData: async function(username, selectedTab, bottomTab, title) {
    // console.log("fetchdata");

    switch (bottomTab) {
      case 'Status':
        return await API.getMachineData(username, selectedTab)
          .then((res) => {
            console.log(res);
            return res; // !!! probably closure
          });
      case 'Reservation':
        // console.log('UTL title', title);
        if (title === "Reservation") {
          // console.log("fetch all res schedule");
          return await API.getAllResSchedule(username, selectedTab)
            .then((res) => {
              // console.log(res);
              return res;
            });
        } else {
          // console.log("fetch res schedule");
          return await API.getResSchedule(username, selectedTab)
            .then((res) => {
              // console.log('fetch res schedule result', res);
              return res.schedules;
            });
        }

    };
  },

  processResData: function(data, machine_type) {
    // console.log("processResData");

    var buffer = 10;
    var w_interval = 30+buffer;
    var d_interval = 60+buffer;
    var interval = (machine_type === 'Washing') ? w_interval : d_interval;

    /*
      Create a schedule array to hold all the possible time slots and their availability
    */
    var schedule = [];
    var start = 0;
    while (start < 24*60) {
      var dataPt = {'slot': start, 'availability': true};
      schedule.push(dataPt);
      start = start + interval;
    }

    /*
      Iterate through the data from backend and mark the unavailable slots
    */
    for (let time of data) {
      let time_data = time.res_time;
      let h = time_data.getHours();
      let m = time_data.getMinutes();
      let index = Math.floor((h*60 + m)/interval);
      if (schedule[index]) {
        schedule[index].availability = false;
      }
    }

    /*
      Format the slot from minutes to HH:mm A
    */
    for (let row of schedule) {
      // row.slot = moment().utc().minutes(row.slot).format("HH:mm A");
      row.slot = moment().startOf('day').add(row.slot, 'minutes').format("HH:mm A");
    }

    // console.log(schedule);
    return schedule;
  },

}; // end of UTIL

export default UTIL;
