const { stringify } = require('querystring');

module.exports= function(config,mongoose,nodemailer){
    var crypto = require('crypto');
    var nodemailer = require('nodemailer');
    var mongoose = require('mongoose');

    var Status = new mongoose.Schema({
        name:{
            first:{type:String},
            last:{type:String},
        },
        status:{type:String}
    });

    var AccountSchema = new mongoose.Schema({
        email: {type:String, unique:true},
        password:{type:String},
        name:{
            first:{type:String},
            last:{type:String}
        },
        birthday:{
            day:{type:Number,min:1,max:31,required:false},
            month:{type:Number,min:1,max:12,required:false},
            year:{type:Number}
        },
        photoUrl:{type:String},
        biography:{type:String},
        status:[Status],//my own status updates only
        activity:[Status] //All status updates including friends
    });

    var Account = mongoose.model('Account',AccountSchema);

    var registerCallback = function(err){
        if(err){
            return console.log(err);
        };
        return console.log('Account creation successful');
    };

    var changePassword = function(accountId,newpassword){
        var shaSum = crypto.createHash('sha256');
        shaSum.update(newpassword);
        var hashedPassword = shaSum.digest('hex');
        Account.update({_id:accountId},{$set:{password:hashedPassword}},{upsert:false},
            function changePasswordCallback(err){
                console.log('Change of password successfull for account '+ accountId);
            }
        );
    }
    var forgotPassword = function(email,resetPasswordUrl,callback){
        var user = Account.findOne({email:email},function findAccount(err,doc){
            if(err){
                //Email address is not a valid user
                callback(false);
            }else{
                var smtpTransport = nodemailer.createTransport('SMTP',config.mail);
                resetPasswordUrl += '?account='+ doc._id;
                smtpTransport.sendMail({
                    from:'thisapp@example.com',
                    to:doc.email,
                    subject:'Social Network Request',
                    text:'Click here to reset your password : '+resetPasswordUrl
                },function forgotPasswordResult(err){
                    if(err){
                        callback(false);
                    }else{
                        callback(true);
                    }
                });
            }
        });
    };

    var login = function(email,password,callback){
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);
        Account.findOne({email:email,password:shaSum.digest('hex')},function(err,doc){
            callback(null != doc);
        });
    };

    var findById = function(accountId,callback){
        Account.findOne({_id:accountId},function(err,doc){
            callback(doc);
        })
    };

    var register = function(email,password,firstName,lastName){
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        console.log('registering '+email);
        
        var user = new Account({
            email:email,
            name:{
                first:firstName,
                last:lastName,
            },
            password:shaSum.digest('hex')
        });
        user.save(registerCallback);
        console.log('Account saved');
    }

    return{
        findById:findById,
        register:register,
        forgotPassword:forgotPassword,
        changePassword:changePassword,
        login:login,
        Account:Account
    }
}