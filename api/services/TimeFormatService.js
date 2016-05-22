module.exports={

  toDateString: function(timestamp){
    console.log("TimeFormatService:");

    timestamp = parseInt(timestamp);

    console.log(timestamp);
    
    
    var result = sails.moment(timestamp).format('YYYY-MM-DD');
    console.log(result);

    return result;
  }

};
