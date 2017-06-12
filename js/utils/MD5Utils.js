import md5 from "md5";
import * as selfRef from './MD5Utils'

export default selfRef

export const encrypt=(str)=>md5(`${str}`);