$(document).ready(function() {

    // Custom VAR for DOM appends
    //remove button on popup edits
    var rmvBtn = "<button class='remove-button'>x</button>";

    //buttons appended on img(s) and video(s) to trigger edit-popup(s)
    var imgEditBtn = "<button class='edit-img__button'>Editer image</button>";
    var vidEditBtn = "<button class='edit-vid__button'>Editer video</button>";
    var btnEditBtn = "<button class='edit-btn__button'>Editer boutton</button>";

    //custom edit-popup(s) for img(s)/video(s) and editable text(s)
    var imgEditPopup = '<div class="edit-popup"><h3 class="edit-popup__title">Modifier l\'image</h3><div class="edit-popup__content">Source:<input type="text" class="src" placeholder="Lien vers l\'image" value="">Description:<input type="text" class="alt" placeholder="Description de l\'image" value=""><button class="validate-btn btn-primary">Valider</button></div></div>';
    var vidEditPopup = '<div class="edit-popup"><h3 class="edit-popup__title">Modifier la vidéo</h3><div class="edit-popup__content">Source:<input type="text" class="src" placeholder="Lien vers l\'image" value="">Description:<input type="text" class="alt" placeholder="Description de l\'image" value="">Lien vers la vidéo:<input type="text" class="vidUrl" placeholder="Lien vers la vidéo" value=""><br><button class="validate-btn btn-primary">Valider</button></div></div>';
    var txtEditPopup = '<div class="edit-popup"><h3 class="edit-popup__title">Modifier le texte</h3><div class="edit-popup__content"><button type="button" class="btn btn-default btn-sm style-bold"><span class="glyphicon glyphicon-bold" aria-hidden="true"></span> Bold </button><button type="button" class="btn btn-default btn-sm style-italic"><span class="glyphicon glyphicon-italic" aria-hidden="true"></span> Italic </button><div class="edited-txt" contenteditable></div><button class="validate-btn the-text-btn btn-primary">Valider</button></div></div>';
    var btnEditPopup = '<div class="btn-edit-popup"><h3 class="edit-popup__title">Modifier le bouton</h3><div class="edit-popup__content">Lien:<input type="text" class="href" placeholder="Lien de redirection" value="">Texte:<input type="text" class="text" placeholder="Texte du bouton" value=""><button class="validate-btn btn-primary btn-update">Valider</button></div></div>';

    // function called on block 'drop' (cf: droppable)
    function editablePrompt() {
        //enable editable for title(s)
        $('.editable-title').editable({
            url : '/post',
            type : 'text',
            title : 'Modifier titre'
        });
        //enable editable for comment(s)
        $('#comments').editable({
            url: '/post',
            title: 'Enter comments'
        });
        //enablt editable for url(s)
        $('.editable-url').editable({
            url: '/post',
            type: 'text',
            title: 'Modifier l\'url',
            value: '',
            display: function(value, response) {
                return false;
            },
            success: function(response, newValue){
                $(this).attr('href', newValue);
            }
        });
        //enable editable for month(s)
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
        //enable editable for day(s)
        $('.editable-day').editable({
            url: '/post',
            format: 'dd',
            viewformat: 'dd',
            datepicker: {
                weekStart: 1
            }
        });
        //enable editable for week(s)
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
        //enable editable for hour(s)
        $('.editable-hours').editable({
            url: '/post',
            format: 'hh:ii',
            viewformat: 'hh:ii',
            datetimepicker: {
                weekStart: 1
            }
        });
    }


    // enable 'Drag' of block elements
    $(".block-draggable").draggable({
        cancel : '.edit-popup,btn-edit-popup',
        helper :'clone',
        distance : 100
    });

    // enable 'Droppable'on preview-zone for the 'draggable' elements
    $(".preview-zone__sortable").droppable({
        accept : ".block-draggable", //specify which blocs can be appended to this drop zone
        drop : function(event,ui) {
            console.log("Item was Dropped");
            $(this).append($(ui.draggable).clone().data('html'));
            editablePrompt();//launch .editable fn when an el is dropped
            var n = $('.preview-zone__sortable li').size();
            $(this).find("li").last().attr('data-order',n)
                .prepend(rmvBtn);
            var hasMedia = $(this).find("img.editable").last();

            // détection bouton
            var hasApBtn = $(this).find('editable-btn').last();

            if(hasMedia.hasClass('editable-src')){
                $(this).find("img.editable").last().parent().before(imgEditBtn);
                console.log('Regular image is now editable...');
            }
            if(hasMedia.hasClass('editable-ce-src')){
                $(this).find('img.editable-ce-src').last().before(imgEditBtn);
                console.log('Cartesia Education image is now editable...')
            }
            if(hasMedia.hasClass('editable-vid')){
                $(this).find('img').last().parent().before(vidEditBtn);
                console.log('Has media...type:video');
            }
            if(hasApBtn) {
                console.log('btn detected');
                $(this).find('.editable-btn').last().parent().before(btnEditBtn);
            }
        }
    });

    // function to update index on sortable
    function updateIndex() {
        var items = $('.sortable').find('li');
        items.each(function(i) {
            $(this).attr('data-order',i + 1);
        });
    }

    // endable sortable, update index on reorder
    $( ".sortable" ).sortable({
        stop: updateIndex, // launch update index each time an el is sorted to re-number them
        cancel: '.edit-popup,.btn-edit-popup,button,.popover', // prevent 'sortable' from working on these el
        distance: 100 //minimum distance (in px) before 'sortable' starts working
    })
        // indexation des blocs
        .on("click", ".remove-button", function() {
            $(this).parent().remove();
            updateIndex();
        })

        // add custom btn-edit popup
        .on('click', '.edit-btn__button', function() {
            $(this).parent().prepend(btnEditPopup);
            var url = $(this).closest('td').find('a').attr('href');
            var txt = $(this).closest('td').find('span').text();
            var editor = $(this).parent();
            var link = editor.find('.href');
            var text = editor.find('.text');
            link.val(url);
            text.val(txt);
            link.focus();
        })

        // add custom img-edit popup
        .on('click', ".edit-img__button", function() {
            $(this).parent().prepend(imgEditPopup);
            var img = $(this).closest('td').find("img");
            var src = $(this).parent().find('.src');
            var alt = $(this).parent().find('.alt');
            src.attr('value', img.attr('src'));
            alt.attr('value', img.attr('alt'));
        })

        // add custom vid-edit popup
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

        // add custom text-edit popup
        .on('click', ".editable-text", function() {
            console.log(this);
            $(this).parent().prepend(txtEditPopup);
            $(this).addClass('current-editing');
            var text = $(this).html();
            var popup = $(this).closest('td');
            var content = $(popup).find('.edited-txt');
            $(content).html(text);
            $('.edited-txt').focus();
        })

        .on('click','.style-bold', function() {
            document.execCommand('bold'); // bolden selection
        })

        .on('click','.style-italic', function() {
            document.execCommand('italic'); // italisize selection
        })

        // txt update button
        .on('click', '.edit-popup .the-text-btn', function() {
            var content = $(this).closest('td').find('.current-editing');
            var txt = $(this).parent().find('.edited-txt');

            if(txt!==''){
                $(content).html($(txt).html());
            }
            $(this).closest('.edit-popup').remove();
        })

        // btn update button
        .on('click', '.btn-edit-popup .btn-update', function() {
            var editorUrl = $(this).parent().find('.href').val();
            var editorTxt = $(this).parent().find('.text').val();

            var targetUrl = $(this).closest('td').find('.editable-btn').parent();
            var targetTxt = $(this).closest('td').find('.editable-btn');

            if(editorUrl!=='') {
                targetUrl.attr('href',editorUrl);
            }
            if(editorTxt!=='') {
                targetTxt.text(editorTxt);
            }
            $(this).closest('.btn-edit-popup').remove();
            console.log('this shit should close');

        })

        // custom edition popup validate button
        .on('click', '.edit-popup .validate-btn', function() {
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


    // PREVENT REDIRECTION ON ANCHOR TAGS
    $(".preview-zone__sortable").on('click', 'a', function(e) {
        e.preventDefault();
    });

    // FUNCTION TO SEND REQUIRED DATA BY POST
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

    // FUNCTION TO TRIM CONTENT and POST to ApiController.
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