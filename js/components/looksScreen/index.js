import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import {View, Image, InteractionManager, Platform } from 'react-native';
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
      renderScroll: Platform.OS === 'ios',
      showLoader: true,
    }
  }

  componentDidMount() {
    let that = this;
    InteractionManager.runAfterInteractions(() => {
      Platform.OS !== 'ios' ? that.setState({renderScroll: true}) : null
    });
  }

  renderLoader() {
    const flatLook = this.props.navigation.state.params;
    return (
      <Image source={{uri: flatLook.uri}} resizeMode={'stretch'} style={[Platform.OS === 'ios' ? {zIndex: 1} : null ,{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
        <Spinner color='#666666'/>
      </Image>
    )
  }

  renderScrollView() {
    const flatLook=this.props.navigation.state.params
    return (
    <View>
      {this.state.showLoader ? this.renderLoader() : null}
      <LooksContainer {...this.props} navigateTo={this.navigateTo} goBack={this.goBack} flatLook={flatLook} renderScroll={this.state.renderScroll} removeLoader={() => this.removeLoader()}/>
    </View>
    )
  }

  removeLoader() {
    this.setState({showLoader: false})
  }

  render() {
    return this.state.renderScroll ? this.renderScrollView() : this.renderLoader(false)
  }
}

export default LooksScreen;
