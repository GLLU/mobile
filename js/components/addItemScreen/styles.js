import React, { Component } from 'react';
import { ScrollView, Image, TextInput, Dimensions, StyleSheet } from 'react-native';

const w = Dimensions.get('window').width;
export const IMAGE_VIEW_WIDTH = parseInt(w - w * 0.5);

export default StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
});
