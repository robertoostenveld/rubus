var ping = require('ping');
var request = require('request');

// Using my firmware from https://github.com/robertoostenveld/arduino/tree/master/esp8266_12v_trigger,
// the commands to switch the amplifier are
//   http://nad-d3020.local/on
//   http://nad-d3020.local/on

// Using the Tasmota formware from https://github.com/arendst/Tasmota configured for an inverted relay
// on pin D6, the commands are
//  http://nad-d3020.local/cm?cmnd=Power%20on 
//  http://nad-d3020.local/cm?cmnd=Power%20off 

var d3020 = '192.168.1.26'; // this is the NAD D3020 12V trigger controller
var host1 = '192.168.1.29'; // this is the Samsung Smart TV over LAN
var host2 = '192.168.1.30'; // this is the Samsung Smart TV over WiFi
var host3 = '192.168.1.31'; // this is the Mac Mini over LAN
var host4 = '192.168.1.32'; // this is the Mac Mini over WiFi

setInterval(function() {
  ping.sys.probe(host1, function(isAlive1) {
    ping.sys.probe(host2, function(isAlive2) {
      ping.sys.probe(host3, function(isAlive3) {
        ping.sys.probe(host4, function(isAlive4) {
          if (isAlive1 | isAlive2 | isAlive3 | isAlive4) {
            // console.log('on');
            request
              .get('http://' + d3020 + '/cm?cmnd=Power%20on')
              .on('error', function(err) {
                console.log(err)
              });
          } else {
            // console.log('off');
            request
              .get('http://' + d3020 + '/cm?cmnd=Power%20off')
              .on('error', function(err) {
                console.log(err)
              });
          }
        });
      });
    });
  });
}, 5000);
