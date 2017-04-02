import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux'
import { showInfo } from '../../../actions'
import { noop } from 'lodash'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'stretch',
  },
  row: {
    flex: 1,
    padding: 5,
    textAlign: 'center'
  },
  titleColors: {
    color: 'black',
    backgroundColor: '#f4b85a',
  },
  buyColors: {
    color: '#f4b85a',
    backgroundColor: 'black'
  },
  topRoundCorners: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  bottomRoundCorners: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  }
});

class ItemPopup extends Component {
  constructor(props) {
    super(props);
    this.handleOpenLink = this.handleOpenLink.bind(this);
  }

  static propTypes = {
    brand: React.PropTypes.object,
    price: React.PropTypes.number,
    currency: React.PropTypes.string,
    url: React.PropTypes.string,
    onLayout: React.PropTypes.func,
    dimensions: React.PropTypes.object,
    showInfo: React.PropTypes.func
  };

  static defaultProps = {
    price: 0,
    brand: {name: 'N/A'},
    currency: '£',
    url: '',
    onLayout: noop
  }

  handleOpenLink() {
    const url = this.props.url;
    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        }
        else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }
    else {
      this.props.showInfo("Sorry, we're still working on finding this item online for you. ")
    }
  }

  getTitle(brand) {
    const titleLength=12;
    let title = brand ? brand.name : 'N/A';
    title = title.length > titleLength ? title.slice(0, titleLength-3) + '...' : title;
    return title;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleOpenLink}>
        <View style={this.props.dimensions? this.props.dimensions:null}>
          <Text style={[styles.row, styles.titleColors, styles.topRoundCorners]}>{this.getTitle(this.props.brand)}</Text>
          <Text style={[styles.row, styles.buyColors, styles.bottomRoundCorners]}>Buy
            Now!</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps= ()=>({});

export default connect(mapStateToProps, bindActions)(ItemPopup);