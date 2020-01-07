var sessions = require("client-sessions");
var moment = require('moment');
var db = require('../config/firebase')

//get collection(table) users
var ref = db.ref("users");

var rs = {};

module.exports = {
    checkLogin: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        //console.log(username);
        //console.log(password);
        if(username == 'admin' && password == '123456'){
            //save user info to session
            req.mySession.username = username;
            //console.log(req.session);
            res.redirect('/cms/users');
        } else {
            res.render('login', {
                title: 'Masak Masak CMS',
                message: 'Wrong username or password',
                layout: 'login'
            })
        }
    },
    getUsers: (req, res) => {
        // As an admin, the app has access to read and write all data, regardless of Security Rules

        var data = [];
        
        ref.once("value", function(snapshot) {
            snapshot.forEach(childSnapshot => {
                var item = childSnapshot.val();
                if(typeof(item.Id) != 'undefined'){
                    item.key = childSnapshot.key
                    data.push(item)
                }
            })
            //console.log(data.length)
            res.render('./pages/users', {
                moment: moment,
                users: data,
                username: req.mySession.username,
                active: 'Users'
            });
        });
    },
    addColumnFirebase: (req, res) => {
        ref.once("value", function(snapshot) {
            snapshot.forEach(function(child){
                child.ref.update({
                    //add column suspend with default value 0
                    signUpTime: 1546275600000,
                    lastGamePlayedTime: 1577811600000
                })
            })
        });
        res.send('ok');
    },
    changeUserSuspendStatus: (req, res) => {
        let idUser = req.body.id_user;
        let suspend = req.body.suspend;
        
        //get user by id
        let userRef = ref.child(idUser)
        let suspendUpdate;
        //update user suspend status
        //if current status is 1(suspended). Change to 0 (not suspend)
        if(suspend == 1){
            suspendUpdate = 0;
        } else {
            suspendUpdate = 1;
        }

        userRef.update({suspend:suspendUpdate}, function(err){
            if(err){
                res.json({code: 0, message: err})
            } else {
                res.json({code: 1, message: 'Update user suspend status successful'})
            }
        })

        // res.json({
        //     id_user: idUser,
        //     suspend: suspend
        // })
    }
}