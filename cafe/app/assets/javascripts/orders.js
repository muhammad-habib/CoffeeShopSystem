/**
 * Created by seif on 5/3/17.
 */
$(document).ready(function () {


    $(".changeStatus").change(function () {

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
    $(document).on("change",".changeStatus",function () {
        $.ajax({
            url: "/changeStatus",
            data: {
                user: $(this).data('user'),
                order: $(this).data('id'),
                status: $(this).val()
            },
            method: 'GET'
        })
    })
});