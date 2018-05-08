import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  View,
  Dimensions,
  WebView,
  BackAndroid,
} from 'react-native';

import ListHeader from './lists/ListHeader';
import asScreen from '../common/containers/Screen';

class CustomWebView extends Component {

  componentWillMount() {
    BackAndroid.addEventListener('lookScreenBackPress', () => {
      this.props.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('lookScreenBackPress');
  }

  render() {
    const { url, headerData } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <ListHeader {...headerData} goBack={this.props.goBack}/>
        <WebView
          scrollEnabled
          automaticallyAdjustContentInsets
          startInLoadingState
          source={{ uri: url }}
          style={[{ flex: 1 }]}
        />
      </View>
    )
  }
}

export default connect(null, null)(asScreen(CustomWebView));
