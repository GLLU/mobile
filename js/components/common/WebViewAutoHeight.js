import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  View,
  Dimensions,
  WebView,
} from 'react-native';

import ListHeader from './lists/ListHeader';
import asScreen from '../common/containers/Screen';


const injectedScript = function () {
  function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200);
    }
    else {
      let height = 0;
      if (document.documentElement.clientHeight > document.body.clientHeight) {
        height = document.documentElement.clientHeight
      }
      else {
        height = document.body.clientHeight
      }
      postMessage(height)
    }
  }

  waitForBridge();
};

 class WebViewAutoHeight extends Component {
  state = {
    webViewHeight: Number
  };

  static defaultProps = {
    autoHeight: true,
  }

  constructor(props: Object) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }

    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage(e) {
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data)
    });
  }

  render() {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
    const { goBack, url } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1}}>
        <ListHeader {...this.props.headerData} goBack={this.props.goBack}/>
        <WebView
          injectedJavaScript={'(' + String(injectedScript) + ')();'}
          scrollEnabled={this.props.scrollEnabled || false}
          onMessage={this._onMessage}
          javaScriptEnabled={true}
          automaticallyAdjustContentInsets={true}
          startInLoadingState={true}
          source={{ uri: url }}
          style={[{ width: _w , height: _h, flex: 1 }]}
        />
      </View>
    )
  }
}

export default connect(null, null)(asScreen(WebViewAutoHeight));