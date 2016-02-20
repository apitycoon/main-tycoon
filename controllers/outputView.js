const stringHandler = require('./stringHandler.js');
const $ = require('jquery');

const trgElem = '#api-window';

function genOutput(target) {

  //parse initial string
  target = stringHandler.strParse(target);

  // create function that stores selected element
  // current --> returns current str
  // shorten --> returns str one element higher in the DOM
  // lengthen --> returns str one element lower in the DOM
  const adjStr = stringHandler.adjustStr(target);

  function inner(option) {
    const txt = $('#textSelect').is(':checked');
    const attr = $('#attrSelect').val();
    const name = $('#nameSelect').val();
    const result = {};
    result[name] = [];

    $(trgElem).contents().find(adjStr(option)).each((index, elem) => {
      result[name].push($(elem).text());
    });

    $('#outputView').html(JSON.stringify(result));
    return adjStr(option);
  }

  return inner;
}

function onShorten(selFunc) {
  selFunc('shorten');
}

function onLengthen(selFunc) {
  selFunc('lengthen');
}

module.exports = {
  genOutput: genOutput,
  onShorten: onShorten,
  onLengthen: onLengthen
};
