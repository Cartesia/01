$(document).ready(function() {

    var rmvBtn = "<button class='remove-button'>x</button>";


    $(".block-draggable").draggable({
        cancel : false,
        helper :'clone'
    });

    $(".preview-zone__sortable").droppable({
        accept : ".block-draggable",
        drop : function(event,ui) {
            console.log("Item was Dropped");
            $(this).append($(ui.draggable).clone().data('html'));
            var n = $('.preview-zone__sortable li').size();
            $(this).find("li").last().attr('data-order',n)
                   .prepend(rmvBtn);
        }
    });

    $( ".sortable" ).sortable()
                    .disableSelection()
                    .on("click", ".remove-button", function() {
                        $(this).parent().remove();
                    });

});





