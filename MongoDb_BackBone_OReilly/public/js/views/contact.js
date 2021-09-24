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
        
    }
)