const path = require('path')

exports.validateImage = function (value) {
  let isImage = true
  if(value['post_images[]'] && value['post_images[]'].length == undefined) {
    let extension = (path.extname(value['post_images[]'].name)).toLowerCase();
    if (extension != '.jpg' && extension != '.jpeg' && extension != '.png') {
      isImage = false
    }
  }
  for (let i = 0; i < value['post_images[]'].length; i++) {
    let extension = (path.extname(value['post_images[]'][i].name)).toLowerCase();
    if (extension != '.jpg' && extension != '.jpeg' && extension != '.png') {
      isImage = false
      break;
    }
  }
  if (!isImage) {
    throw new Error('Property image must be image(Ex: jpg, jpeg, png)');
  }
  return true
}