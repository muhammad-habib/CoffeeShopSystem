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
            // .done(function (msg) {
            //     if (msg) {
            //         if (msg.read) {
            //             setTimeout(function () {
            //                 elm.removeClass("loading");
            //                 elm.prepend('<i class="Checkmark icon"></i>');
            //                 elm.siblings('button.wish-status').find('i.Checkmark').remove();
            //                 setTimeout(function () {
            //                     //window.location.href = "/bookdetails/"+elm.data('id');
            //                 }, 1000);
            //             }, 1000);
            //         }
            //         else {
            //             setTimeout(function () {
            //                 elm.removeClass("loading");
            //                 elm.find('i.Checkmark').remove();
            //             }, 1000);
            //         }
            //     }
            // })
            // .fail(function (error) {
            //     if (error) {
            //         console.log(error);
            //     }
            //
            // })
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