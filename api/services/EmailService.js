module.exports={

  sendPasswordEmail: function(email, pw){

    sails.hooks.email.send(
      "password",
      {
        password: pw
      },
      {
        to: email,
        subject: "Welcome to Somnia"
      },
      function(err) {console.log(err || "It worked!");}
    )

  }

};
