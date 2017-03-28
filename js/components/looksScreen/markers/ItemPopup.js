import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux'
import { showInfo } from '../../../actions'

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
    containerDimensions: React.PropTypes.object,
    position: React.PropTypes.object,
    brand: React.PropTypes.object,
    price: React.PropTypes.number,
    currency: React.PropTypes.string,
    url: React.PropTypes.string,
  };

  static defaultProps = {
    position: {x: 0, y: 0},
    price: 0,
    brand: {name: 'N/A'},
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

  limitPosition(containerDimensions, position) {
    if (containerDimensions !== undefined && containerDimensions.width - position.x < 100) {
      position.x -= 20;
    }

    if (containerDimensions !== undefined && containerDimensions.height - position.y < 100) {
      position.y -= 20;
    }
    return position;
  }

  render() {
    const title = this.getTitle(this.props.brand);

    const position = this.limitPosition(this.props.containerDimensions, this.props.position);
    return (
      <TouchableWithoutFeedback onPress={this.handleOpenLink}>
        <View style={[styles.container, {top: position.y, left: position.x}]}>
          <Text style={[styles.row, styles.titleColors, styles.topRoundCorners]}>{title}</Text>
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(ItemPopup);