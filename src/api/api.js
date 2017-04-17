var request = require('request');

export function get (url){
    return new Promise(function(resolve, reject){
        request({
          method: 'GET',
          url: url,
          json: true,
          headers: {
            'User-Agent': 'request'
          }
        }, function(err, resp, body){
          if(err){
            reject(err);
        } else {
            resolve(body);
          }
        });
    });
}
