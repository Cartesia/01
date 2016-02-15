$(document).ready(function() {

    // "remove-button" node
    var rmvBtn = "<button class='remove-button'>x</button>";

    var imgEditBtn = "<button class='edit-img__button'>Editer image</button>";
    var vidEditBtn = "<button class='edit-vid__button'>Editer video</button>";


    var imgEditPopup = '<div class="edit-popup"><h3 class="edit-popup__title">Modifier l\'image</h3><div class="edit-popup__content">Source: <br><input type="text" class="src" placeholder="Lien vers l\'image" value=""><br>Description: <br><input type="text" class="alt" placeholder="Description de l\'image" value=""><br><button class="the-button btn-primary">Valider</button></div></div>';
    var vidEditPopup = '<div class="edit-popup"><h3 class="edit-popup__title">Modifier la vidéo</h3><div class="edit-popup__content">Source: <br><input type="text" class="src" placeholder="Lien vers l\'image" value=""><br>Description: <br><input type="text" class="alt" placeholder="Description de l\'image" value=""><br>Lien vers la vidéo: <br><input type="text" class="vidUrl" placeholder="Lien vers la vidéo" value=""><br><button class="the-button btn-primary">Valider</button></div></div>';
    var txtEditPopup = '<div class="edit-popup"><h3 class="edit-popup__title">Modifier le texte</h3><div class="edit-popup__content"><button type="button" class="btn btn-default btn-sm style-bold"><span class="glyphicon glyphicon-bold" aria-hidden="true"></span> Bold </button><button type="button" class="btn btn-default btn-sm style-italic"><span class="glyphicon glyphicon-italic" aria-hidden="true"></span> Italic </button><div class="txt" contenteditable></div><button class="the-button-two the-text-btn btn-primary">Valider</button></div></div>';

    // function to update index on sortable
    function updateIndex() {
        var items = $('.sortable').find('li');
        items.each(function(i) {
            $(this).attr('data-order',i + 1);
        });
    }

    function editablePrompt() {
        $('.editable-title').editable({
            url : '/post',
            type : 'text',
            title : 'Modifier titre'
        });

        $('#comments').editable({
            url: '/post',
            title: 'Enter comments'
        });

        $('.editable-url').editable({
            url: '/post',
            type: 'text',
            title: 'Modifier l\'url',
            value: '',
            display: function(value, response) {
                return false;   //disable this method for x reasons I can't recall
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
        cancel : '.edit-popup',
        helper :'clone',
        distance : 100
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

            var hasMedia = $(this).find("img").last();
            var hasText = $(this).find('.editable-text').last();
            if(hasMedia.hasClass('editable-src')){
                $(this).find("img").last().parent().before(imgEditBtn);
            }
            if(hasMedia.hasClass('editable-vid')){
                $(this).find('img').last().parent().before(vidEditBtn);
            }
        }
    });

    // endable sortable, update index on reorder
    $( ".sortable" ).sortable({
        stop: updateIndex,
        cancel: '.edit-popup,button,.popover',
        distance: 100
    })
        // indexation des blocs
        .on("click", ".remove-button", function() {
            $(this).parent().remove();
            updateIndex();
        })
        // add img edit popup
        .on('click', ".edit-img__button", function() {
            $(this).parent().prepend(imgEditPopup);
            var img = $(this).closest('td').find("img");
            var src = $(this).parent().find('.src');
            var alt = $(this).parent().find('.alt');
            src.attr('value', img.attr('src'));
            alt.attr('value', img.attr('alt'));
        })

        // add vid edit popup
        .on('click', ".edit-vid__button", function() {
            $(this).parent().prepend(vidEditPopup);
            var img = $(this).closest('td').find("img");
            var a = img.parent();
            console.log(a);
            var src = $(this).parent().find('.src');
            var alt = $(this).parent().find('.alt');
            var href = $(this).parent().find('.vidUrl');
            src.attr('value',img.attr('src'));
            alt.attr('value',img.attr('alt'));
            href.attr('value', a.attr('href'));
        })

        // add text edit popup
        .on('click', ".editable-text", function() {
            console.log(this);
            $(this).parent().prepend(txtEditPopup);
            $(this).addClass('current-editing');
            var text = $(this).html();
            var popup = $(this).closest('td');
            var content = $(popup).find('.txt');
            $(content).html(text);
            $('.txt').focus();
        })

        .on('click','.style-bold', function() {
            document.execCommand('bold');
        })

        .on('click','.style-italic', function() {
            document.execCommand('italic');
        })

        // txt update button
        .on('click', '.edit-popup .the-text-btn', function() {
            var content = $(this).closest('td').find('.current-editing');
            var txt = $(this).parent().find('.txt');

            if(txt!==''){
                $(content).html($(txt).html());
            }
            $(this).closest('.edit-popup').remove();
        })

        // custom edition popup validate button
        .on('click', '.edit-popup .the-button', function() {
            var img = $(this).closest('td').find("img");
            var anchor = img.parent();

            var src = $(this).parent().find('.src').val();
            var alt = $(this).parent().find('.alt').val();
            var href = $(this).parent().find('.vidUrl').val();


            if(src!==''){
                img.attr('src',src);
            }
            if(alt!==''){
                img.attr('alt',alt);
            }
            if(href!==''){
                anchor.attr('href',href);
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
        e.preventDefault();

        var content = $('#content-to-download');

        if (content.html() == "") {
            alert('Champs de prévisualisation vide !');
            return false;

        }

        var blocks = content.find('li');
        var finalContent = "";
        var title = $('#title').val();

        $('[data-original-title]').removeAttr('data-original-title'); //remove data attr to all el with data-original-title attr
        var btns = $(blocks).find('button');
        btns.detach();

        $(blocks).each(function(){
            var blocks = $(this).html();
            finalContent += blocks;
        });
        $('.preview-zone__sortable li').prepend(rmvBtn);

        openWithPostData($(this).attr('data-blocks'),{'title':title, 'blocks':finalContent});

    });

    // function to remove popup when clicking outside
    $(document).mouseup(function (e)
    {
        var container = $(".edit-popup");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.remove();
        }
    });


});