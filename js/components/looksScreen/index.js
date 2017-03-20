import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import {View, Image, Animated, InteractionManager, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import Spinner from '../loaders/Spinner';
import LooksContainer from './looksContainer';
import { actions } from 'react-native-navigation-redux-helpers';

class LooksScreen extends BasePage {
  static propTypes = {
    flatLook: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.number
    ]),
  }
  constructor(props) {
    super(props);
    this.state = {
      renderScroll: false,
      showLoader: Platform.OS !== 'ios'
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderScroll: true})
    });
  }

  renderLoader() {
    return (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Spinner color='#666666'/>
      </View>
    )
  }

  renderScrollView() {
    return (
    <View>
      <LooksContainer {...this.props} renderScroll={this.state.renderScroll} removeLoader={() => this.removeLoader()} />
      {this.state.showLoader ? this.renderLoader() : null}
    </View>
    )
  }

  removeLoader() {
    this.setState({showLoader: false})
  }

  render() {
      return this.state.renderScroll ? this.renderScrollView() : this.renderLoader()
    }
}

export default LooksScreen;
