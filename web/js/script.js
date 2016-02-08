$(document).ready(function() {

    var rmvBtn = "<button class='remove-button glyphicon glyphicon-remove'></button>";


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
            // Au double clic sur le texte
            $(this).find("li").dblclick(function(){
                // On récupère sa valeur
                txt = $(this).text();
                // On ajoute un champ de saisie avec la valeur
                $(this).html("<input value='"+txt+"' />");
                // On la sélectionne par défaut
                $(this).find("input").select();
            });
        }
    });

    $( ".sortable" ).sortable()
                    .disableSelection()
                    .on("click", ".remove-button", function() {
                        $(this).parent().remove();
                    });



});





