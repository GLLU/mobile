import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  View,
  Dimensions,
  WebView,
} from 'react-native';

import ListHeader from './lists/ListHeader';
import asScreen from '../common/containers/Screen';

class CustomWebView extends Component {

  render() {
    const { url, headerData } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <ListHeader {...headerData} goBack={this.props.goBack}/>
        <WebView
          scrollEnabled
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true}
          source={{ uri: url }}
          style={[{ flex: 1 }]}
        />
      </View>
    )
  }
}

export default connect(null, null)(asScreen(CustomWebView));