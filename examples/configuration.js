/*
  Copyright (c) 2010 - 2017, Nordic Semiconductor ASA
  All rights reserved.
  Redistribution and use in source and binary forms, with or without modification,
  are permitted provided that the following conditions are met:
  1. Redistributions of source code must retain the above copyright notice, this
     list of conditions and the following disclaimer.
  2. Redistributions in binary form, except as embedded into a Nordic
     Semiconductor ASA integrated circuit in a product or a software update for
     such product, must reproduce the above copyright notice, this list of
     conditions and the following disclaimer in the documentation and/or other
     materials provided with the distribution.
  3. Neither the name of Nordic Semiconductor ASA nor the names of its
     contributors may be used to endorse or promote products derived from this
     software without specific prior written permission.
  4. This software, with or without modification, must only be used with a
     Nordic Semiconductor ASA integrated circuit.
  5. Any software provided in binary form under this license must not be reverse
     engineered, decompiled, modified and/or disassembled.
  THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS
  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
  OF MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE
  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
  OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
var Thingy = require('../index');
console.log('Configuration example');

function onDiscover(thingy) {
  console.log('Discovered: ' + thingy.uuid);

  thingy.on('disconnect', function() {
    console.log('Disconnected!');
  });

  thingy.connectAndSetUp(function(error) {
    console.log('Connected! ' + thingy.uuid + ((error) ? error : ''));

    thingy.device_name_set("0123456789", function(error){
        console.log(((error) ? error : ''));
        thingy.device_name_get(function(error, device_name) {
            console.log('Device name: ' + device_name  + ((error) ? error : ''));
        });
    });

    var my_adv_param = {
        interval : 380, // 380ms interval
        timeout : 60    // 60s timeout
    };

    thingy.adv_param_set(my_adv_param, function(error){
        console.log(((error) ? error : ''));

        thingy.adv_param_get(function(error, adv_param) {
            console.log('Adv param:', adv_param);
        });
    });

    var my_conn_param = {
        min_conn_int  : 7.5,
        max_conn_int  : 30,
        slave_latency : 0,
        sup_timeout   : 3200
    };

    thingy.conn_param_set(my_conn_param, function(error){
        console.log(((error) ? error : ''));

        thingy.conn_param_get(function(error, conn_param) {
            console.log('Conn param:', conn_param);
        });
    });

    var my_eddystone = {
        url_prefix : 3,
        url  : 'nordicsemi.com'
    };

    thingy.eddystone_url_set(my_eddystone, function(error){
        console.log(((error) ? error : ''));

        thingy.eddystone_url_get(function(error, eddystone) {
            console.log('Eddystone URL:', eddystone);
        });
    });

  });
}

Thingy.discover(onDiscover);
