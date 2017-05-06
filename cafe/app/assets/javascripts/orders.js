/**
 * Created by seif on 5/3/17.
 */
$(document).ready(function () {



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
});