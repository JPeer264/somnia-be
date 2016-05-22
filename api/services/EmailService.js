module.exports={

  sendPasswordEmail: function(email, pw){

    sails.hooks.email.send(
      "password",
      {
        password: pw
      },
      {
        to: email,
        subject: "Welcome to Somnia",
        from: 'somnia.noreply@gmail.com'
      },
      function(err) {console.log(err || "It worked!");}
    )

  }

};
