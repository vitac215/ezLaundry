# ezLaundry

[![N|Solid](http://i.imgur.com/UZy5V1T.png)](https://nodesource.com/products/nsolid)

ezLaundry is a mobile + IoT solution (including hardware, server+DB, and mobile app) for apartment residents to check availability of public laundry facilities in real time and make reservations.

This is the repository for the front-end development (IOS app) in React Native.
Also check out the repository for [back-end development](https://github.com/wanghaodawn/Laundry-Helper).

Video demo: https://www.youtube.com/watch?v=U14PvntNAwo&feature=youtu.be


## App Interface
<img src="http://i.imgur.com/1wdBrLX.png" width="150">
<img src="http://i.imgur.com/xTzpuiR.png" width="150">
<img src="http://i.imgur.com/tWjatqq.png" width="150">

<img src="http://i.imgur.com/NpRYn2n.png" width="150">
<img src="http://i.imgur.com/lx3W0rj.png" width="150">
<img src="http://i.imgur.com/kUBzPW6.png" width="150">


## Basic Usage
* <b>Registration</b>
   * You can register by entering your username, password, and address. (The address must be a registered address that have the supporting facilities)
* <b>Check status</b>
   * You can check the availability of washing machines and dryers at a registered apartment.
* <b>Make a quick reservation</b>
   * Once a machine become available, you can click on it to make a quick reservation
   * The quick reservation will last for 5 minutes, so that you have time to bring down your laundry to the laundry room.
   * You will be given a reservation/access code for you to enter at the hub in the laundry room in order to use the reserved machine.


## TODO
* Change address/password, forget password
* 3rd-party registration/login (Facebook, Google)
* Push notification where there is an available machine
* Notification settings
* Push notification when the user's laundry is done
* Report to maintenance form, Send app feedback form
* Make reservation at a certain time
* 3rd-party embedded payment
* Andorid 
* Deploy on App store and Google play store
