var async = require('async');
         async.auto({
           getUserName: function(callback) {
            console.log('**In getUserName.**')
            callback(null, 'sudeep_dk')
           },

         connectToDb: function(callback) {
          console.log('**In connectToDb.**')

          //change to false to produce error ..
          var connected = true
          if(connected) {
            callback(null, connected)
          } else {
            callback('Error connecting to DB.', null)
          }
       },                                                                                                                                                                                                                                                                                                                                                     
       checkIfUserExist: [
          'getUserName',
          'connectToDb',
          function(results, callback) {
             console.log('**In checkIfUserExist.**',          
                JSON.stringify(results))
             var userExist = false
             if(userExist) {
                callback('User exist in DB.')
             } else {               
                setTimeout(function() {                 
                      callback(null, userExist);
               },1000);
             }
          }
       ],

       signup: [
          'checkIfUserExist',
          function(results, callback) {
             console.log('**In signup**', JSON.stringify(results))
             var userName = results.getUserName
             var isDbConnected = results.connectToDb
             var userExist = results.checkIfUserExist

            if(userName && isDbConnected && !userExist) {
               callback(null, 
                 {'status': '200', 'msg': 'Successfully signed up user'})
           } else {
              callback('Error signing up user.', null)
           }
        }
     ],
},
     function(error, results) {
        console.log('error = ', error)
        console.log('results = ', results)         
    })

