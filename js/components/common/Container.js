import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Container, Header, Content, View } from 'native-base';

import ExtraDimensions from 'react-native-extra-dimensions-android';
export default class MyContainer extends Container {

  render() {
    if (Platform.OS == 'ios') {
      return(
        <View ref={c => this._root = c} {...this.prepareRootProps()}>
          {this.renderHeader()}

          {this.renderContent()}

          {this.renderFooter()}

        </View>
      );
    }

    return (
      <View ref={c => this._root = c} {...this.prepareRootProps()}>
        <View style={{flexGrow: 1}}>
          {this.renderHeader()}

          {this.renderContent()}

          {this.renderFooter()}
        </View>
        <View style={{height: ExtraDimensions.SOFT_MENU_BAR_HEIGHT}}/>
      </View>
    )
  }
}