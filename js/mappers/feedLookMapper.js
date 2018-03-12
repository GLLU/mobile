import {serializeLook as userLookMap} from './lookMapper'


export function map(look) {
  const mapping=userLookMap(look)
  return mapping;
}
