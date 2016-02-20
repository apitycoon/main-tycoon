function getPathTo(element) {
  if (element.id !== '') return 'id("' + element.id + '")';
  if (element === document.body) return element.tagName;
  var ix = 0;
  var siblings = element.parentNode.childNodes;

  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];
      if (sibling === element) {
        return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
      }
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
  }
}

function strParse(str) {
  str = getPathTo(str);
  var jqArr = str.split('/');
  var id = jqArr.shift();
  jqArr.unshift('class("undefined")'); //remove once class added to output function
  var objClass = jqArr.shift();
  var retStr = '';
  jqArr.forEach(element => {
    retStr += parseObj(element);
  });
  return retStr;
}

function parseObj(str) {
  var parsedStr = str.split('[');
  var element = parsedStr[0].toLowerCase();
  var nth = parsedStr[1].slice(0, -1);

  return (element === 'html' || element === 'body') ? element + ' ' : element + ':nth-of-type(' + nth + ') '
}

function adjustStr(str) {
  var strHistory = [];

  function shortenStr(option) {
    if (option === 'current') {
      return str;
    }

    if (option === 'shorten') {

      if (str !== strHistory[strHistory.length -1]) {
        strHistory.push(str);
      }
      var elArr = str.trim().split(' ');
      var baseElement = elArr.pop().split(':');
      if (baseElement.length === 2) {
        baseElement = baseElement[0];
        str = elArr.concat(baseElement).join(' ');
        return str;
      }
      var lastElement = elArr.pop();
      if (lastElement !== 'body') {
        if (lastElement.indexOf(':') > 0) {
          var last = lastElement.split(':');
          lastElement = last[0];
        } else {
          lastElement = [];
        }
        str = elArr.concat(lastElement, baseElement).join(' ');
      }
    } else if (option === 'lengthen') {
      var temp = strHistory.pop();
      if (temp) {
        str = temp
      }
    }
    return str;
  }

  return shortenStr;
}

module.exports = {
  strParse: strParse,
  adjustStr: adjustStr,
  getPathTo: getPathTo
}
