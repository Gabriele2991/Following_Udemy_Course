define(['SocialNetView', 'views/contact','text!templates/contacts.html'],
    function (SocialNetView, contactsTemplate,ContactsView) {
        var contactsView = SocialNetView.extend({
            el: $('#content'),

            initialize:function(){
                this.collection.on('reset',this.renderCollection,this);
            },
            render:function(){
                this.$el.html(contactsTemplate);
            },

            renderCollection:function(collection){
                collection.each(function(contact){
                    var statusHtml =(new ContactsView({
                        removeButton:true,
                        model:contact
                    })).render().el;
                    $(statusHtml).appendTo('.contacts_list');
                });
            }
        });
        return contactsView; 
    }
)