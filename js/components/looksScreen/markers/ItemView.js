import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux'
import { showInfo } from '../../../actions'

const buyItImage = require('../../../../images/buyItButton-noprice.png');
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  row: {
    height: 30,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class ItemView extends Component {
  constructor(props) {
    super(props);
    this.handleOpenLink = this.handleOpenLink.bind(this);
  }

  static propTypes = {
    position: React.PropTypes,
    brand: React.PropTypes.string,
    price: React.PropTypes.number,
    currency: React.PropTypes.string,
    url: React.PropTypes.string,
  };

  static defaultProps = {
    position: {x: 0, y: 0},
    price: 0,
    brand: {name:'N/A'},
    currency: '£',
    url: ''
  }

  handleOpenLink() {
    const url = this.props.url;
    console.log(`item of brand ${this.props.title} that costs ${this.props.price} ${this.props.currency} clicked!`);
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
    let title = brand ? brand.name : 'N/A';
    title = title.length > 9 ? title.slice(0, 6) + '...' : title;
    return title;
  }

  render() {
    const title = this.getTitle(this.props.brand);
    const {position, currency, price, btnText, width, height} = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handleOpenLink}>
        <View style={[styles.container, {top: position.y, left: position.x}]}>
          <Text>{title}</Text>
          <Text>Buy Now!</Text>
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(ItemView);