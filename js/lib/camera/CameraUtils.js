import React, {Component} from 'react';
import {View, NativeModules} from 'react-native';

const {CameraUtils} = NativeModules;


async function openCamera(allowVideo : boolean = true) {
    return CameraUtils.openCamera(allowVideo);
}
export {openCamera};