$(document).ready(function(){

    $(".block-draggable").draggable({
        cancel : false,
        helper :'clone'
    });


     $(".block-drop-zone").droppable({
        accept : ".block-draggable",
        drop : function(event,ui){
            $(this).append($(ui.draggable).clone().data('html'));
        }
    });
});





