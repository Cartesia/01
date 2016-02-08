$(document).ready(function() {

    // "remove-button" node
    var rmvBtn = "<button class='remove-button'>x</button>";



    // function to update index on sortable
    function updateIndex() {
        var items = $('.sortable').find('li');
        items.each(function(i) {
            $(this).attr('data-order',i + 1);
        });

    }

    var editablePrompt = function() {
        $('.editable-text').editable({
            url: '/post',
            type: 'textarea',
            title: 'Modifier le texte'
        });
        $('.editable-src').editable({
            url: '/post',
            type: 'textarea',
            title: 'Modifier le texte'
        });
        $('.editable-url').editable({
            url: '/post',
            type: 'textarea',
            title: 'Modifier le texte'
        });
        $('.editable-month').editable({
            url: '/post',
            type: 'select',
            value: 1,
            source : [
                {value: 1, text : 'JAN.'},
                {value: 2, text : 'FEV.'},
                {value: 3, text : 'MAR.'},
                {value: 4, text : 'AVR.'},
                {value: 5, text : 'MAI.'},
                {value: 6, text : 'JUN.'},
                {value: 7, text : 'JUL.'},
                {value: 8, text : 'AOU.'},
                {value: 9, text : 'SEP.'},
                {value: 10, text : 'OCT.'},
                {value: 11, text : 'NOV.'},
                {value: 12, text : 'DEC.'}

            ]

        });
        $('.editable-day').editable({
            url: '/post',
            format: 'dd',
            viewformat: 'dd',
            datepicker: {
                weekStart: 1
            }
        });

        $('.editable-week').editable({
            url: '/post',
            type: 'select',
            value: 1,
            source : [
                {value: 1, text : 'LUN.'},
                {value: 2, text : 'MAR.'},
                {value: 3, text : 'MER.'},
                {value: 4, text : 'JEU.'},
                {value: 5, text : 'VEN.'},
                {value: 6, text : 'SAM.'},
                {value: 7, text : 'DIM.'}

            ]

        });
        $('.editable-hours').editable({
            url: '/post',
            format: 'hh:ii',
            viewformat: 'hh:ii',
            datetimepicker: {
                weekStart: 1
            }
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
            editablePrompt();
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