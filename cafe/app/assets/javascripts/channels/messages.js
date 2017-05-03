App.messages = App.cable.subscriptions.create('MessagesChannel', {
    received: function(data) {
        console.log(data);
    },

    renderMessage: function(data) {
        console.log(data)
    }
});