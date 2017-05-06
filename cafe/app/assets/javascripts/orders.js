/**
 * Created by seif on 5/3/17.
 */
$(document).ready(function () {


    $("document").on( "change",'.changeStatus', function() {
        console.log("ddddddd")
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
});