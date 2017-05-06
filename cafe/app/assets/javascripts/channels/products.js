App.messages = App.cable.subscriptions.create('ProductsChannel', {
    received: function(data) {
        product = JSON.parse(data.product);
        console.log(product);
        if(product.is_available)
        {


        }
        $('[data-id=' + product.id + ']').remove();
    },

    renderMessage: function(data) {
        console.log(data)
    }
});