// add require dependencies
// const cssHighlight = require('./controllers/cssHighlight.js');
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
      contentType: 'application/json',
      data: JSON.stringify({
        website: $('#api-location').val()
      }),
      success: function(data) {
        $('#window-container').append('<iframe id="api-window" class="container" width="100%" height="900px" src="/apireqget/get.stf" name="iframe_a"></iframe>')

        let mainArray = [];

        $('#api-window').load(function() {

          $('#api-window').contents().click(function(e) {
            e.preventDefault();

            let results = [];
            let tempTarget = e.target

            while (tempTarget) {
              results.push(tempTarget.parentNode);
              tempTarget = tempTarget.parentNode;
            }

            let ancestryChain = "";
            for (let i = (results.length - 4); i > 0; i--) {
              ancestryChain += results[i].nodeName + ' ';
            }

            ancestryChain = ancestryChain.toLowerCase();
            console.log("ancestryChain:", ancestryChain);

            let attributes = [];
            for (let i = 0; i < e.target.attributes.length; i++) {
              attributes.push(e.target.attributes[i]);
            }
            console.log("attributes:", attributes);
            attributes.unshift({name: "text"})
            gui.buildGUI(attributes);

            // when you click the add element button
            $('#addObj').click((e) => {
              e.preventDefault();
              let indivObj = {};
              let indivAttr = $('#guiDropDown').val();
                indivObj.string = ancestryChain;
                indivObj.name = $('#propName').val() || indivAttr;
                indivObj.attr = indivAttr;
                indivObj.text = e.target.textContent || "";

              console.log("main array before: ", mainArray);
              mainArray.push(indivObj);

              console.log("mainArray after:", mainArray);

              indivObj = {};
              ancestryChain = "";

              for (var i = 0; i < mainArray.length; i++) {
                  $('#gui-bottom').append("<p><strong>" + mainArray[i].indivAttr + "</strong></p>");
              }
            });

            $('#guiSelector').submit((e) => {
              e.preventDefault();
              console.log("mainArray before AJAX Post: ", mainArray);
              $.ajax({
                type: 'POST',
                url: '/apisubmit',
                contentType: 'application/json',
                data: JSON.stringify(mainArray),

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
