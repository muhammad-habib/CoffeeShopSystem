App.messages = App.cable.subscriptions.create('ProductsChannel', {
    received: function(data) {
        product = JSON.parse(data.product);
        product.action = data.action;
        if(product.is_available && (product.action == "status" || product.action == "create" || product.action == "update" ))
        {
            item = '<div data-id="'+product.id+'" class="four wide column">' +
                '<div id="'+product.id+'" class="ui card product"  >' +
                ' <div class="image"><img src="'+product.image.url+'" class="ui medium image" /></div>' +
                ' <div class="ui bottom attached content">' +
                ' <p> ' +
                '<label for="">'+product.name+'</label> ' +
                '<span for="" style="float: right">'+product.price+'</span> ' +
                '</p> ' +
                '</div>' +
                ' </div>' +
                ' </div>';

            if(product.action == "update")
            {
                $('[data-id=' + product.id + ']').remove();
            }
            $('#productGrid').append(item);
        }
        if(!product.is_available && (product.action == "status" || product.action == "update"))
            $('[data-id=' + product.id + ']').remove();

        if(product.is_available &&  product.action == "delete" )
            $('[data-id=' + product.id + ']').remove();
    },

    renderMessage: function(data) {
        console.log(data)
    }
});