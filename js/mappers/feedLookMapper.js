import {map as userLookMap} from './lookMapper'


export function map(look, index, flatLooksDataLength) {
  const mapping=userLookMap(look)
  mapping.originalIndex= flatLooksDataLength + index;
  return mapping;
}
