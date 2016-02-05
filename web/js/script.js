$(document).ready(function(){
    console.log('DOM+jQuery ready...');

        $(".block-draggable").draggable({
            cancel : false,
            helper :'clone'
        });

        $(".block-drop-zone").droppable({
            accept : ".block-draggable",
            drop : function(event,ui){
                console.log("Item was Dropped");
                $(this).append($(ui.draggable).clone().data('html'));
            }
        });

});





