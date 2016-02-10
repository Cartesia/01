$(document).ready(function() {

    // "remove-button" node
    var rmvBtn = "<button class='remove-button'>x</button>";
    var urlEditBtn = "<button class='edit-img__button'>Edit image</button>";
    var editPopup = '<div class="edit-popup"><h3 class="edit-popup__title">Modifier l\'image</h3><div class="edit-popup__content">Source: <input type="text" class="src" placeholder="Lien vers l\'image" value=""><br>Description: <input type="text" class="alt" placeholder="Description de l\'image" value=""><br><button class="the-button btn-primary">Valider</button></div></div>';

    // function to update index on sortable
    function updateIndex() {
        var items = $('.sortable').find('li');
        items.each(function(i) {
            $(this).attr('data-order',i + 1);
        });
    }

    function editablePrompt() {
        $('.editable-text').editable({
            url: '/post',
            type: 'textarea',
            title: 'Modifier le texte'
        });
        $('.editable-url').editable({
            url: '/post',
            type: 'text',
            title: 'Modifier l\'url',
            value: '',
            display: function(value, response) {
                return false;   //disable this method
            },
            success: function(response, newValue){
                $(this).attr('href', newValue);
            }
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
    }


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
                .prepend(rmvBtn);
            var test = $(this).find("img").last();
            if(test.hasClass('editable')){
                $(this).find("img").last().parent()
                    .before(urlEditBtn);
            }
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
        })
        .on('click', ".edit-img__button", function() {
            $(this).parent().prepend(editPopup);
            var img = $(this).closest('td').find("img");
            var src = $(this).parent().find('.src');
            var alt = $(this).parent().find('.alt');
            src.attr('value',img.attr('src'));
            alt.attr('value',img.attr('alt'));
            src.focus();
            src.on('blur', function() {
                alt.focus();
            });
            alt.on('blur', function() {
                $(this).closest('.edit-popup').remove()
            });

        })
        .on('click', '.edit-popup .the-button', function() {
            var img = $(this).closest('td').find("img");
            var src = $(this).parent().find('.src').val();
            var alt = $(this).parent().find('.alt').val();
            if(src!==''){
                img.attr('src',src);
            }
            if(alt!==''){
                img.attr('alt',alt);
            }
            $(this).closest('.edit-popup').remove();
        });

    // prevent redirection when trying to edit anchor tags
    $(".preview-zone__sortable").on('click', 'a', function(e) {
        e.preventDefault();
    });

    // function to send data in POST
    function openWithPostData(page,data)
    {
        var form = document.createElement('form'); // create a form
        form.setAttribute('action', page); // set the action to 'ApiController.php'
        form.setAttribute('method', 'post'); // set method to post
        form.setAttribute('target', '_blanck'); // set method to post
        for (n in data){
            var inputvar = document.createElement('input'); // create a input
            inputvar.setAttribute('type', 'hidden'); // set type to 'hidden' which will not display it in the browser rendering
            inputvar.setAttribute('name', n); // set name to data 'n'
            inputvar.setAttribute('value', data[n]); // set value to data[n]
            form.appendChild(inputvar); // append inputvar to form
        }
        document.body.appendChild(form); // append form to DOM
        form.submit(); // submit
    }

    // function to trim final content and POST to ApiController.


    $('#downloadLink').on('click', function(e) {
        var finalContent = "";
        var title = $('#title').val();
        e.preventDefault();
        var content = $('#content-to-download').find('li');
        var btns = $(content).find('button');
        btns.detach();

        $(content).each(function(){
            var content = $(this).html();
            finalContent += content;
        });
        $('.preview-zone__sortable li').prepend(rmvBtn);

        openWithPostData($(this).attr('data-blocks'),{'title':title, 'blocks':finalContent});

    });
});