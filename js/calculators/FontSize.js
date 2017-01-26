'use strict';

import { Dimensions } from 'react-native';

let Window = Dimensions.get('window');
const deviceWidth = Window.width;

var FontSize = function (size) {
  this.size = size;
};


FontSize.prototype.getSize = function() {
  return deviceWidth * this.size / 375;
};

export default FontSize;
