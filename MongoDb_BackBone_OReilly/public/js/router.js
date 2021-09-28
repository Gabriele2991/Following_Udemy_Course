define(['views/index','views/register','views/login','views/forgotpassword','views/profile','models/Account','models/StatusCollection','models/ContactCollection'],
        function(IndexView,Registerview,LoginView,ForgotPasswordView,ProfileView,Account,StatusCollection,ContactCollection){
            var SocialRouter = Backbone.Router.extend({
                
                currentView:null,
               
                routes:{
                    "addcontact":"addcontact",
                    "index":"index",
                    "login":"login",
                    "register":"register",
                    "forgotpassword":"forgotpassword",
                    "profile/:id":"profile",
                    "contacts/:id":"contacts"
                },
                changeView:function(view){
                    if(null != this.currentView){
                        this.currentView.undelegateEvents();
                    }
                    this.currentView = view;
                    this.currentView.render();
                },
                index:function(){
                    var statusCollection = new StatusCollection();
                    statusCollection.url = '/accounts/me/activity';
                    this.changeView(new IndexView({
                        collection:statusCollection
                    }));
                    statusCollection.fetch();
                },
                login:function(){
                    this.changeView(new LoginView());
                },
                register: function () {
                    this.changeView(new Registerview());
                },
                forgotpassword: function () {
                    this.changeView(new ForgotPasswordView());
                },
                profile:function(id){
                    var model = new Account({id:id});
                    this.changeView(new ProfileView({model:model}));
                    model.fetch();
                }
            });
            return new SocialRouter();
        })