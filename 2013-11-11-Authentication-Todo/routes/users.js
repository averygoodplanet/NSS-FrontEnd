var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

exports.create = function(req, res){
  var user = new User();
  user.email = req.body.email;

  bcrypt.hash(req.body.password, 10, function(err, hash){
    user.password = hash;
    user.save(function(err, user){
      if(err){
        res.send({status: 'error'});
      } else {
        res.send({status: 'ok'});
      }
    });
  });
};

exports.login = function(req, res){
  //search for the user by email
  User.findOne({email: req.body.email}, function(err, user){
    //if you find a user do a bcrypt comparison
    // of the password entered versus the password (or hash) in database
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        //if password is correct, then do some stuff with the session
        // and send back a status of 'ok' and email property
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok', email: user.email});
            });
          });
        //if password isn't correct then destroy session
        //and send back status of 'error'
        } else {
          req.session.destroy(function(err){
            res.send({status: 'error'});
          });
        }
      });
    //if you don't find the user send back status of 'error'
    } else {
      res.send({status: 'error'});
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    res.send({status: 'ok'});
  });
};

exports.makeMeAnAdmin = function(req, res){
  if(req.query.password === '12345'){
    res.locals.user.isAdmin = true;
    res.locals.user.save(function(err, user){
      res.send(user);
    });
  } else {
    res.send('sorry!');
  }
};

exports.admin = function(req, res){
  User.find(function(err, users){
    res.render('users/admin', {title: 'Express', users: users});
  });
};

exports.delete = function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    res.redirect('/admin');
  });
};

exports.update = function(req, res){
  User.findById(req.params.id, function(err, user){
    user.isAdmin = !user.isAdmin;
    user.save(function(err, user){
      res.send({});
    });
  });
};
