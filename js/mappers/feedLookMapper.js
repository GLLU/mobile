import {map as userLookMap} from './userLookMapper'


export function map(look, index, flatLooksDataLength) {
  const mapping=userLookMap(look)
  mapping.originalIndex= flatLooksDataLength + index;
  return mapping;
}
