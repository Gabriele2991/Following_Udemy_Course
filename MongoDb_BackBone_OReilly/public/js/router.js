define(['views/index','views/register','views/login','views/forgotpassword'],
        function(IndexView,Registerview,LoginView,ForgotPasswordView){
            var SocialRouter = Backbone.Router.extend({
                currentView:null,
                routes:{
                    "index":"index",
                    "login":"login",
                    "register":"register",
                    "forgotpassword":"forgotpassword"
                },
                changeView:function(view){
                    if(null != this.currentView){
                        this.currentView.undelegateEvents();
                    }
                    this.currentView = view;
                    this.currentView.render();
                },
                index:function(){
                    this.changeView(new IndexView);
                },
                login:function(){
                    this.changeView(new LoginView());
                },
                register: function () {
                    this.changeView(new Registerview);
                },
                forgotpassword: function () {
                    this.changeView(new ForgotPasswordView);
                }
            });
            return new SocialRouter();
        })