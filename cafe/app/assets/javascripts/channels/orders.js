/**
 * Created by walid on 05/05/17.
 */
App.messages = App.cable.subscriptions.create('OrdersChannel', {
    received: function (data) {
        console.log(data);
        order = JSON.parse(data.order);
        if (data.action == 'delete')
            $('.' + order.id).remove();
        else if (data.action == 'status') {
            switch (parseInt(order.status)) {
                case 0:
                    status = "Received";
                    break;
                case 1:
                    status = "In Progress";
                    break;
                case 2:
                    status = "On The Way";
                    break;
                case 3:
                    status = "Delivered";
                    break;
            }
            $('#' + order.order).html(status);
            $('[id="mystatus_' + order.order + '"]').remove();
        }
        else if (data.action == 'add') {
            user = JSON.parse(data.user);
            products = JSON.parse(data.products);

            Object.keys(data.productsAmount).forEach(function (key, index) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].id == key) {
                        products[i].amount = data.productsAmount[key]
                    }
                }
            });
            var productsItems = '';
            for (var i = 0; i < products.length; i++) {
                productsItems += '<div  style="text-align: center;">' +
                    '<span>' +
                    '<h4 class="ui image header">' +
                    '<img src="' + products[i].image.url + '"' +
                    'class="ui mini rounded image">' +
                    '<div class="content">' + products[i].name +
                    '<div class="sub header">' + products[i].amount.amount +
                    '</div> ' +
                    '</div> ' +
                    '</h4> ' +
                    '</span>' +
                    '</div>';
            }
            item = '<table class="ui red table">' +
                '<thead class="' + order.id + '">' +
                '<tr>' +
                '<th>Order Date</th> ' +
                '<th>Name</th> ' +
                '<th>Room</th> ' +
                '<th>Action</th> ' +
                '</tr> ' +
                '</thead> ' +
                '<tbody> ' +
                '<tr class="'+ order.id +'"> ' +
                '<td><strong>' + order.created_at +'</strong>'+
                '<a class=" circular ui icon  button" style="float: right;" data-method="get" href="/orders/'+order.id+'" '+' >Show Order</a>'+
                '</td> ' +
                '<td>' + user.username + '</td> ' +
                '<td>' + user.room + '</td> ' +
                '<td><select data-id='+order.id+' selected="selected" class="changeStatus" data-user='+user.id+' name="Order[status]" id="Order_status">' +
                '<option value="0">Received</option>'+
                '<option value="1">In Progress</option>'+
                '<option value="2">On The Way</option>'+
                '<option value="3">Delivered</option>'+
                '</select>'+
                '</td>'+
                '</tr> ' +
                '</tbody> ' +
                '</table>' +
                '<div class="' + order.id + '">' + productsItems + '</div>';
            $('#admin_orders').append(item);
            $("table").off();
            $("table").on("change", ".changeStatus", function(event){
                console.log("dddddddddd");
                $.ajax({
                    url: "/changeStatus",
                    data: {
                        user: $(this).data('user'),
                        order: $(this).data('id'),
                        status: $(this).val()
                    },
                    method: 'GET'
                })
            });
        }
    },
    renderMessage: function (data) {
        console.log(data)
    }
});