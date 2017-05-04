App.messages = App.cable.subscriptions.create('ProductsChannel', {
    received: function(data) {
        product = JSON.parse(data.product);
        $('[data-id=' + product.id + ']').remove();
    },

    renderMessage: function(data) {
        console.log(data)
    }
});