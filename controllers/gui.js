var $ = require('jquery');

function buildGUI(attrArr) {

  $('#gui').append(`<form id="guiSelector">
    <input id="propName" type='text' placeholder='Name of Property' name='propName'/><br/>
    <button id = "shorten"> More </button>
    <button id = "lengthen"> Less </button>
    <button id = "addObj"> Add Element </button>
    <input type="submit">
    </form>
    <div id="dropDownMenu"></div>
  `)

//   buildDropDown(attrArr);
// }
//
// function buildDropDown(attrArr) {
  $('#guiDropDown').remove();

  const jqueryString = "$('#api-window').contents().find('" + attrArr[0] + "')";
  var attObj = {};
  for (var i = 0; i < attrArr.length; i++) {
    attObj[attrArr[i].name] = attrArr[i].value;
  }

  // var textQuery = jqueryString + '.text()';
  // attObj.text = eval(textQuery);

  var attNames = Object.keys(attObj);
  var dropDown = '<select id="guiDropDown" name="attr" form="guiSelector"><option value="text">text</option>';

  attNames.forEach(att => {
    dropDown += '<option value="' + att + '">' + att + '</option>'
  })

  dropDown += '</select>';

  $('#dropDownMenu').append(dropDown);

}
module.exports = {
  buildGUI:buildGUI,
  // buildDropDown: buildDropDown
}
