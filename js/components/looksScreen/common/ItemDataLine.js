import React, { Component } from 'react';
import { View, Image, TouchableHighlight, TouchableOpacity, StyleSheet, Text, Animated, Linking } from 'react-native';
import * as _ from 'lodash'
import { showInfo } from '../../../actions'
import { connect } from 'react-redux'

import withAnalytics from '../../common/analytics/WithAnalytics';

const bagItImage = require('../../../../images/icons/bag-white.png');

const styles = StyleSheet.create({
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    minHeight: 45,
    minWidth: 45,
    borderRadius: 25,
    paddingHorizontal:5
  },
  footerButtonIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12
  }
});

class ItemDataLine extends Component {
  constructor(props) {
    super(props);
    this.handleOpenLink = this.handleOpenLink.bind(this);
  }

  static propTypes = {
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    onPress: _.noop,
  };

  handleOpenLink() {
    const { url, is_verified, look_id, id } = this.props.data;
    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
        }
        else {
          return Linking.openURL(url);
          this.props.logEvent('lookScreen', {name: 'click on item', isVerified: is_verified, lookId: look_id, item_id: id});
        }
      }).catch(err => console.error('An error occurred', err));
    }
    else {
      this.props.showInfo("Sorry, we're still working on finding this item online for you. ")
    }
  }


  render() {
    return this.props.isOpen ? (
      <TouchableHighlight>
        <TouchableOpacity onPress={this.handleOpenLink}>
          <View style={styles.footerButton}>
            <Text style={[styles.footerButtonText, {marginHorizontal: 10}]}>{this.props.data.brand.name}</Text>
            <View style={{margin: 5, borderLeftWidth: 2, borderColor: 'gray'}}>
              <Image source={bagItImage}
                     style={[styles.footerButtonIcon, {width: 20, height: 20, margin: 2.5, marginLeft: 10}]}/>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableHighlight>
    ) : null;

  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, bindActions)(withAnalytics(ItemDataLine));

