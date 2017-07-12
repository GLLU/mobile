import {NativeModules} from 'react-native';
const {CameraUtils} = NativeModules;


async function openCamera(allowVideo: boolean  = true) {
  console.log('12345666')
    return CameraUtils.openCamera(allowVideo);
}

export {openCamera};