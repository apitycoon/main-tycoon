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
            console.log("all stuff: ", e);
            console.log('e.target ', e.target);
            var results = [];
            var tempTarget = e.target

            while (tempTarget) {
              results.push(tempTarget.parentNode);
              tempTarget = tempTarget.parentNode;
            }
            console.log("results 0: ", results[0]);
            console.log("results Array: ", results);
            var temp = results.splice(0, 1);
            console.log("temp: ", temp);
            console.log("spliced results: ", results);
            // console.log(temp[0].textContent);
            console.log(results)
            var ancestryChain = '';
            for (var i = (results.length - 4); i > 0; i--) {
              // ancestryChain = ancestryChain.(results[i].nodeName)
              ancestryChain += results[i].nodeName + ' ';
            }
            // ancestryChain = ancestryChain.find(temp[0].nodeName)
            // ancestryChain.selector.val();
            console.log(ancestryChain.toLowerCase());
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
              body.string = ancestryChain;
              body.text = ($('#guiDropDown').val() === 'text');
              body.attr = $('#guiDropDown').val();
              console.log("This is the body: ", body);

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
            });
          });
        });
      }
    });
  });
});
