import {map as userLookMap} from './lookMapper'


export function map(look, index, flatLooksDataLength=0) {
  const mapping=userLookMap(look)
  mapping.originalIndex= flatLooksDataLength + index;
  return mapping;
}
