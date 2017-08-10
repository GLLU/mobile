import {hexToRgb} from '../utils/FormatUtils';

export function serializeColors(colors) {
  const serializedColors = colors.map(currColor => _serializeColor(currColor));
  return serializedColors;
}

function _serializeColor(color) {
  return {
    id: color.id,
    name: color.name,
    color: hexToRgb(color.hexa),
  };
}
