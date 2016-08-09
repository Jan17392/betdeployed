var fs = require('fs')
module.exports = function(source) {
  var file
    ,api_type;
    
  var json = {
    error: "source is not exist,please check",
    detail:{ 
    }
  };
  
  if (arguments.length >= 2) {
    api_type = arguments[1];
  }

  if ( typeof source === "string" ){
    file = source;
  }else{
    return json;
  }
  
　try {
    value = fs.readFileSync(source, {
      encoding: 'utf-8'
    });
  
    var json_str = JSON.stringify(value, undefined, "\t");
  
    var json = JSON.parse(json_str);
  } catch(error) {
    json = {
      error : "can not parse file at " + source,
      detail : error
    }
  }
  
  if( arguments.length >= 3){
    var msg = arguments[2];
    return json_parse_api(json, api_type, msg) ;
  } else if(arguments.length == 2){
    return json_parse_api(json, api_type);  
  }else{
    return JSON.parse(json);
  }
}

function json_parse_api(json, api_type){
  // console.log(api_type)
  var msg;
  if(arguments.length >= 3){
    msg = arguments[2];
  }
  // console.log(msg)
  
  if(api_type == 0){
    return {
      data: JSON.parse(json),
      status: {
        code : 0,
        msg  : msg  ? msg : 'sucess'
      }
    }
  }else{
    return {
      data: JSON.parse(json),
      status: {
        code : api_type,
        msg  : msg ? msg : 'error'
      }
    }
  }
}