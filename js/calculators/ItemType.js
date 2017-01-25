'use strict';

import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const itemWidth = Math.round(((deviceWidth - 40) / 5)) + 10;
const blankItemWidth = Math.round(((deviceWidth - 40) / 5)) * 2 + 20;

var ItemType = function (node) {
  this.node = node;
};

ItemType.prototype.findNextPosition = function() {
  return itemWidth * (this.node + 2) + ((deviceWidth - 40) / 5) * 2 + blankItemWidth - 10;
};

ItemType.prototype.findPrevPosition = function() {
  return itemWidth * (this.node) + 10 + blankItemWidth;
};

ItemType.prototype.findCurrentPosition = function() {
  return (this.node - 1) * itemWidth - (itemWidth / 2) + blankItemWidth - 2;
};

export default ItemType;
