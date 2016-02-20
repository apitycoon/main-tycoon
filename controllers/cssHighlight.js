const $ = require('jquery');

function cssHighlight() {
  const history = [];

  function inner(elem, option) {
    if (option === 'lengthen') {
      // remove existing highlights
      $('#api-window').contents().find(history.pop()).css('background-color', 'transparent');
      return $('#api-window').contents().find(elem).css('background-color', 'yellow');
    }

    if (option === 'clear') {
      return history.forEach(val => {
        $('#api-window').contents().find(val).css('background-color', 'transparent');
      });
    }

    history.push(elem);
    return $('#api-window').contents().find(elem).css('background-color', 'yellow')
  }

  return inner;

}

module.exports = cssHighlight;
