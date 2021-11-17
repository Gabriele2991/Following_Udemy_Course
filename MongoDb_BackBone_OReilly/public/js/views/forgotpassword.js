define(['text!templates/forgotpassord.html'],function(forgotpassordTemplate){
    var forgotpasswordView = Backbone.View.extend({
        el: $('#content'),
        events: {
            "submit form": "password"
        },
        password:function(){
            $.post('/forgotpassword',{
                email:$('input[name=email').val()
            },function(data){
                console.log(data);
            });
            return false;
        },
        render:function(){
            this.$el.html(forgotpasswordtemplate);
        }
    });
    return forgotpasswordView;
})