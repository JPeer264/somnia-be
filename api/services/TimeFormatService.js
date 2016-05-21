module.exports={
  
  toDateString: function(timestamp){
    return sails.moment(parseInt(timestamp)).format('YYYY-MM-DD');
  }
  
};
