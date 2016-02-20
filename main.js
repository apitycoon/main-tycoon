// add require dependencies
const outputView = require('./controllers/outputView.js');
const stringHandler = require('./controllers/stringHandler.js');
const cssHighlight = require('./controllers/cssHighlight.js');
const $ = require('jquery');
let selFunc;
let highlight;

const trgElem = '#api-window';

// make post request but don't reload page
$(document).ready(function() {

  $('#submit-post').on('click', function(e) {
    e.preventDefault();

    $.ajax({
      url: 'apitest/',
      type: 'POST',
      data: {data: selFunc('current'), url: $('#api-location').val()},
      success: function(data) {
        alert(data);
      }
    })
  })


  $('#api-prevent').on('click', function(e) {
    e.preventDefault();
    $('#api-window').remove();

    $.ajax({
      url: 'apireqpost/post.stf',
      type: 'POST',
      data: {website: $('#api-location').val()},
      success: function(data) {
        $('#window-container').append('<iframe id="api-window" class="container" width="100%" height="600px" src="/apireqget/get.stf" name="iframe_a"></iframe>')

        $('#api-window').load(function() {
          $('#api-window').contents().click(function(e) {
            e.preventDefault();

            selFunc = outputView.genOutput(e.target);
            selFunc('current');

            // create the initial highlight function when first element is selected
            if (highlight) highlight(null, 'clear');
            highlight = cssHighlight();
            highlight(selFunc('current'), 'initial');

          });
          $('#shorten').click(() => {
            outputView.onShorten(selFunc);
            highlight(selFunc('current'), 'shorten');
          });
          $('#lengthen').click(() => {
            outputView.onLengthen(selFunc);
            highlight(selFunc('current'), 'lengthen');
          });
        })
      }
    });
  });
});
