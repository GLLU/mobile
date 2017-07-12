import { NativeModules } from 'react-native';
const {CameraUtils} = NativeModules;

export const openCamera = (allowVideo: boolean = true) => CameraUtils.openCamera(allowVideo);