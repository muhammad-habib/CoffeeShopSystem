/**
 * Created by walid on 05/05/17.
 */
App.messages = App.cable.subscriptions.create('OrdersChannel', {
    received: function(data) {
        order = JSON.parse(data.order);

        // $('tr[data-id='+ order.id +' ]').remove();
        $('.'+order.id).remove();
        // console.log(order.id);
        // console.log($('tr[id='+ order.id +' ]').find('td:eq(1)').text());

    },

    renderMessage: function(data) {
        console.log(data)
    }
});