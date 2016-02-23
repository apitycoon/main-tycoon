// add require dependencies
const outputView = require('./controllers/outputView.js');
const stringHandler = require('./controllers/stringHandler.js');
const cssHighlight = require('./controllers/cssHighlight.js');
const gui = require('./controllers/gui.js')

const $ = require('jquery');
const createGUI = require('./controllers/gui');
let selFunc;
let highlight;

const trgElem = '#api-window';


// make post request but don't reload page
$(document).ready(function() {

  $('#api-prevent').on('click', function(e) {
    e.preventDefault();
    $('#api-window').remove();

    $.ajax({
      url: 'apireqpost/post.stf',
      type: 'POST',
      data: {
        website: $('#api-location').val()
      },
      success: function(data) {
        $('#window-container').append('<iframe id="api-window" class="container" width="100%" height="900px" src="/apireqget/get.stf" name="iframe_a"></iframe>')

        $('#api-window').load(function() {

          $('#api-window').contents().click(function(e) {
            e.preventDefault();
						console.log('e.target ', e.target);
            selFunc = outputView.genOutput(e.target);
            selFunc('current');
            $('#guiSelector').remove();
            $('#dropDownMenu').remove();
            gui.buildGUI(selFunc('current'));
            outputView.onAttr(selFunc, '#guiDropDown');

            // create the initial highlight function when first element is selected
            if (highlight) highlight(null, 'clear');
            highlight = cssHighlight();
            highlight(selFunc('current'), 'initial');
                            
            $('#shorten').click((e) => {
              e.preventDefault();
              outputView.onShorten(selFunc);
              highlight(selFunc('current'), 'shorten');
              const attrSelect = $('#guiDropDown').val();
              gui.buildDropDown(selFunc('current'));
              $('#guiDropDown').val(attrSelect)
              outputView.onAttr(selFunc, '#guiDropDown');
            });

            $('#lengthen').click((e) => {
              e.preventDefault();
              outputView.onLengthen(selFunc);
              highlight(selFunc('current'), 'lengthen');
              const attrSelect = $('#guiDropDown').val();
              gui.buildDropDown(selFunc('current'));
              $('#guiDropDown').val(attrSelect)
              outputView.onAttr(selFunc, '#guiDropDown');
            });


            $('#guiSelector').submit((e) => {
              e.preventDefault();
              var body = {};
              body.name = $('#propName').val();
              body.string = selFunc('current');
              body.text = ($('#guiDropDown').val() === 'text');
              body.attr = $('#guiDropDown').val();

              $.ajax({
                type: 'POST',
                url: '/apisubmit',
                data: body,

                success: function(data) {
                  console.log('data is', data);
                  $('#api-window').remove();
                  $('#window-container').append(
                    '<iframe id="api-window" class="container" width="100%" height="900px" src="goodbye.html" name="iframe_a"></iframe>'
                  );
                  setTimeout(function() {
                    $('#api-window').contents().find('#url').append(`<p><a href="http://localhost:4000/api/${data}" target="_blank">http://localhost:4000/api/${data}</a></p>`);
                  }, 500);
                }
              });
            })
          })
        });
      }
    })
  })
})
