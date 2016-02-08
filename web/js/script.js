$(document).ready(function() {

    // "remove-button" node
    var rmvBtn = "<button class='remove-button'>x</button>";

    // function to update index on sortable
    var updateIndex = function() {
        var items = $('.sortable').find('li');
        items.each(function(i) {
            $(this).attr('data-order',i + 1);
        });
    };

    var lol = function() {
        $('.editable-month').editable({
            url: '/post',
            format: 'YYY-MM-DD',
            title: 'Enter comments'
        });
    };

    // enable DnD of block elements
    $(".block-draggable").draggable({
        cancel : false,
        helper :'clone'
    });

    // enable droppable zone
    $(".preview-zone__sortable").droppable({
        accept : ".block-draggable",
        drop : function(event,ui) {
            console.log("Item was Dropped");
            $(this).append($(ui.draggable).clone().data('html'));
            lol();
            var n = $('.preview-zone__sortable li').size();
            $(this).find("li").last().attr('data-order',n)
                .prepend(rmvBtn)

            ;

        }
    });




    // endable sortable, update index on reorder
    $( ".sortable" ).sortable({
        stop: updateIndex
    })
        .disableSelection()
        .on("click", ".remove-button", function() {
            $(this).parent().remove();
            updateIndex();
        });

});