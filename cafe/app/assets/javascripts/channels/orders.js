/**
 * Created by walid on 05/05/17.
 */
App.messages = App.cable.subscriptions.create('OrdersChannel', {
    received: function (data) {
        order = JSON.parse(data.order);
        if (data.action == 'delete')
            $('.' + order.id).remove();
        else if (data.action == 'add') {
            user = JSON.parse(data.user);
            products = JSON.parse(data.products);

            Object.keys(data.productsAmount).forEach(function(key,index) {
                for(var i=0;i<products.length;i++)
                {
                    if(products[i].id == key)
                    {
                        products[i].amount = data.productsAmount[key]
                    }
                }
            });

            var productsItems = '';
            for(var i=0;i<products.length;i++)
            {
                productsItems +='<div  style="text-align: center;">'+
                    '<span>' +
                    '<h4 class="ui image header">' +
                    '<img src="' + products[i].image.url+'"' +
                    'class="ui mini rounded image">' +
                    '<div class="content">'+ products[i].name +
                    '<div class="sub header">'+ products[i].amount +
                    '</div> ' +
                    '</div> ' +
                    '</h4> ' +
                    '</span>'+
                    '</div>';
            }

            item = '<table class="ui red table">' +
                '<thead class="'+order.id+'">' +
                '<tr>' +
                '<th>Order Date</th> ' +
                '<th>Name</th> ' +
                '<th>Room</th> ' +
                '<th>Action</th> ' +
                '</tr> ' +
                '</thead> ' +
                '<tbody> ' +
                '<tr class="'+order.id+'"> ' +
                '<td>'+order.created_at+'</td> ' +
                '<td>'+user.username+'</td> ' +
                '<td>'+user.room+'</td> ' +
                '<td>cancel</td> ' +
                '</tr> ' +
                '</tbody> ' +
                '</table>' +
                '<div class="'+order.id+'">'+productsItems+'</div>';

            $('.ui.raised.container.segment').append(item);
        }

    },

    renderMessage: function (data) {
        console.log(data)
    }
});