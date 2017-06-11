import {noop} from 'lodash'
import * as selfRef from './KeychainUtils'

export default selfRef

export const disableConsole=()=>{
  console.log =
    console.group =
      console.info =
        console.error =
          console.warn =
            console.debug =
              console.trace = noop
}