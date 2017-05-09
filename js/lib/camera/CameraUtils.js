import React, {Component} from 'react';
import {View, NativeModules} from 'react-native';

const {CameraUtils} = NativeModules;


async function openCamera() {
    return CameraUtils.openCamera();
}
export {openCamera};