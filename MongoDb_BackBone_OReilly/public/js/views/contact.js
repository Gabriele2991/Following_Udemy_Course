define(['SocialNetView','text!templates/contact.html'],
    function (SocialNetView, contactTemplate) {
        var contactView = SocialNetView.extend({
            addButton:false,
            removeButton:false,
            tagName:'li',
            events:{
                "click.addbutton":"addContact",
                "clico.removebutton":"removeContact"
            },
            
            addContact:function(){
                var $responseArea = this.$('.actionArea');
                $.post('/accounts/me/contact',{contactId:this.model.get('id')},
                    function onSuccess(){
                        $responseArea.text('Contact Added');
                    },function onError(){
                        $responseArea.text('Could not add contact');
                    }
                );
            },

            removeContact:function(){
                var $responseArea = this.$('.actionarea');
                $responseArea.text ('Removing contact...');
                $.ajax({
                    url:'/accounts/me/contact',
                    type:'DELETE',
                    data:{
                        contactId:this.model.get('accountId'),
                    }}).done(function onSuccess(){
                        $responseArea.text('Contact Removed');
                    }).fail(function onError(){
                        $responseArea.text('Could not remove Contact');
                    }
                );
            },

            initialize:function(){
                //set addbutton vaariable in case it has been added in the constructor
                if(this.options.addButton){
                    this.addButton = this.options.addButton;
                }

                if(this.option.removeButton){
                    this.removeButton = this.options.removeButton;
                }
            },
            render:function(){
                $(this.el).html(_.template(contactTemplate,{
                    model:this.model.toJSON(),
                    addButton:this.addButton,
                    removeButton:this.removeButton
                }));
                return this;
            }
        });
        return contactView;
    }
);