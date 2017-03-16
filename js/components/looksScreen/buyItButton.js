import React, { Component } from 'react';
import { StyleSheet, View, Text, Linking, TouchableWithoutFeedback, TouchableOpacity,Image, Dimensions } from 'react-native';
import {connect} from 'react-redux'
import {showInfo} from '../../actions'

const buyItImage = require('../../../images/buyItButton-noprice.png');
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'flex-start',
  },
  row: {
    height: 30,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class BuyItButton extends Component {
  constructor(props) {
    super(props);
    this.handleOpenLink = this.handleOpenLink.bind(this);
  }

  static propTypes = {
    title: React.PropTypes.string,
    price: React.PropTypes.number,
    btnText: React.PropTypes.string,
    currency: React.PropTypes.string,
    positionTop: React.PropTypes.number,
    positionLeft: React.PropTypes.number,
    url: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  static defaultProps = {
    price: 0,
    title: 'N/A',
    currency: '£',
    btnText: 'BUY',
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
    else{
      this.props.showInfo("Sorry, we're still working on finding this item online for you. ")
    }
  }

  getTitle() {
    let title = this.props.title;
    title = title.length > 9 ? title.slice(0, 6) + '...' : title;
    return title;
  }

  render() {
    const title = this.getTitle();
    const { positionTop, positionLeft, currency, price, btnText, width, height } = this.props;
    console.log('buyItButton render', positionTop * height, positionLeft * width,  positionTop, positionLeft, currency, price, width, height);
    return (
      <TouchableWithoutFeedback onPress={this.handleOpenLink}>
      <View
        style={[
          styles.container,
          { top: parseInt(positionTop * height), left: parseInt(positionLeft * width), transform: [{ translateX: -120 }, {translateY: -20}] }
        ]}>
        <Image
          source={buyItImage}
          style={{width: 120, height: 70, resizeMode: 'contain', paddingRight: 20, alignItems: 'flex-start'}}
        >
          <View style={[styles.row,{paddingLeft:25,paddingTop:10}]}>
            <Text
              style={{fontFamily: 'Montserrat-Bold', color: '#000', backgroundColor: 'transparent'}}
            >
              {title}
            </Text>
          </View>
          {/*/!*Price is currently not relevant*!/*/}
          {/*<View style={styles.row}>*/}
            {/*<Text*/}
              {/*style={{fontFamily: 'Montserrat-Regular', color: '#fff', backgroundColor: 'transparent'}}*/}
            {/*>*/}
              {/*{currency} {price}*/}
            {/*</Text>*/}
          {/*</View>*/}
          <View style={[styles.row,{paddingLeft:25,paddingTop:10}]}>
            <Text
              style={{fontFamily: 'Montserrat-Bold', color: '#f4b85a', backgroundColor: 'transparent'}}
            >
              {btnText}
            </Text>
          </View>
        </Image>
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

export default connect(mapStateToProps, bindActions)(BuyItButton);