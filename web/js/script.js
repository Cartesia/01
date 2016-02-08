$(document).ready(function(){
    console.log('DOM+jQuery ready...');
    var rmvBtn = "<div class='remove-button'>x</div>";

    $(".block-draggable").draggable({
        cancel : false,
        helper :'clone'
    });

    $(".preview-zone__sortable").droppable({
        accept : ".block-draggable",
        drop : function(event,ui){
            console.log("Item was Dropped");
            $(this).append($(ui.draggable).clone().data('html'));
            var n = $('.preview-zone__sortable li').size();
            $(this).find("li").last().attr('data-order',n);
            $(this).find("li").last().append(rmvBtn);
        }
    });

    $( ".sortable" ).sortable()
                    .disableSelection();

    $('.remove-button').on('click',function(){
       $(this).parent()
              . remove();
    });

});





