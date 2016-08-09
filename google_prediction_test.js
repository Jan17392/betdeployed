var request = require('request');

function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log(response);
   		 console.log(body);
   		} else {
   			console.log("failed " + error);
   		}
   	};

//request({ url: 'https://www.googleapis.com/prediction/v1.6/projects/ageless-aquifer-137615/trainedmodels/prediction_test?key=AIzaSyDUqjcU9lNPU9CzkxgpMjfj_dv735XM7_U', method: 'GET'}, callback);




 

          var options = {
            method: 'POST',
            url: 'https://www.googleapis.com/prediction/v1.6/projects/ageless-aquifer-137615/trainedmodels?key=AIzaSyDUqjcU9lNPU9CzkxgpMjfj_dv735XM7_U',
            headers: {'Content-Type': 'application/json'},
            form: 	{
 					"id": "prediction_test",
 					"storageDataLocation": "testing_test/google_prediction_api_betting_data2.csv"     
        			}
        		}


      request(options, callback);