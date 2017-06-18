import { each, noop } from 'lodash'
import * as selfRef from './DevUtils'

export default selfRef

export const disableConsole=()=>{
  const consoleMethods=[
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn',
  ];
  each(consoleMethods, setConsolePropertyAsNoop)
}

const setConsolePropertyAsNoop=propertyName=>{
  console[propertyName]=noop
}