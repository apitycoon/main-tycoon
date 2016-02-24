// const stringHandler = require('./stringHandler.js');
// const $ = require('jquery');
//
// const trgElem = '#api-window';
//
// function genOutput(target) {
//
//   //parse initial string
//   target = stringHandler.strParse(target);
//
//   // create function that stores selected element
//   // current --> returns current str
//   // shorten --> returns str one element higher in the DOM
//   // lengthen --> returns str one element lower in the DOM
//   const adjStr = stringHandler.adjustStr(target);
//
//   function inner(option) {
//     const att = $('#guiDropDown').val() || '';
//     const txt = att === 'text';
//     const name = $('#propName').val();
//     const result = {};
//     result[name] = [];
//
//     $(trgElem).contents().find(adjStr(option)).each((index, elem) => {
//       if (txt) {
//         result[name].push($(elem).text());
//       } else {
//         result[name].push($(elem).attr(att));
//       }
//     });
//
//     $('#api-preview').remove()
//     $('#gui-bottom').append(makePretty(result));
//     return adjStr(option);
//   }
//
//   return inner;
// }
//
// function onShorten(selFunc) {
//   selFunc('shorten');
// }
//
// function onLengthen(selFunc) {
//   selFunc('lengthen');
// }
//
// function onAttr(selFunc, elem) {
//   $(elem).on('change', e => {
//     e.preventDefault();
//     selFunc('current');
//   })
//   $('#propName').change(e => {
//     e.preventDefault();
//     selFunc('current');
//   })
//
// }
//
// function makePretty(obj) {
//   var title = Object.keys(obj)[0];
//   var contents = obj[title].slice(0,5);
//   var htmlArray = [];
//
//   // contents = contents.slice(0,5);
//
//   if (!title) title = 'You Forgot to Name Me~!';
//
//   contents.forEach(function(input, index, array) {
//     if (index !== array.length - 1) {
//       htmlArray.push(`<p style='margin: 0; padding: 0'>{ "<span style='color: purple; font-weight: bold;'>${title}</span>": "<span style='color: green;'>${input}</span>" },<p>`);
//     } else {
//       htmlArray.push(`<p style='margin: 0; padding: 0'>{ "<span style='color: purple; font-weight: bold;'>${title}</span>": "<span style='color: green;'>${input}</span>" }<p>`);
//     }
//   });
//
//   var html =
//     `<div id='api-preview'>
//       <p>[</p>
//       ${htmlArray.join('')}
//       <p>]</p>
//     </div>`
//
//   return html;
//
// }
//
// module.exports = {
//   genOutput: genOutput,
//   onShorten: onShorten,
//   onLengthen: onLengthen,
//   onAttr: onAttr
// };
