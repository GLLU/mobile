import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, TouchableOpacity, View, BackAndroid, Platform, Text } from 'react-native';
import { Container, Content, Thumbnail, H2, Grid, Row, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { addNewLook } from '../../actions';
import SocialShare from '../../lib/social';
import Gllu from '../common';
import glluTheme from '../../themes/gllu-theme';
import SelectPhoto from '../common/SelectPhoto';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    color: '#000000',
    lineHeight: 40,
    fontFamily: 'Montserrat-Regular',
  }
});

class FinishLookPage extends BasePage {

  static propTypes = {
    lookId: React.PropTypes.number,
    items: React.PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      photoModal: false,
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if(this.state.photoModal) {
        this.setState({photoModal: false})
        return true;
      }
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  resetToOriginalPlace() {
    this.resetTo('feedscreen')
  }

  handleClose() {
    this.logEvent('CongratsScreen', { name: 'Close click' });
    this.resetToOriginalPlace();
  }

  handleFacebookPress() {
    this.logEvent('CongratsScreen', { name: 'Facebook Share click' });
    SocialShare.facebookShare(this.props.shareToken);
  }

  handleOthersPress() {
    this.logEvent('CongratsScreen', { name: 'Other Share click' });
    SocialShare.nativeShare(this.props.shareToken);
  }

  handleGlluAgainPress() {
    this.logEvent('CongratsScreen', { name: 'Lets GLLU Again click' });
    this.setState({photoModal: true});
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.resetToOriginalPlace();
        this.navigateTo('addItemScreen');
      }).catch(err => {
        console.log('addNewLook err', err);
      });  
    })
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <Content scrollEnabled={false} style={{backgroundColor: '#F2F2F2'}} contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center', flex: 1, paddingVertical: 20}}>
          <View style={{flex: 6, justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
            <H2
              style={StyleSheet.flatten(styles.text)}
            >
              YEAHHH!
            </H2>
            <H2
              style={StyleSheet.flatten(styles.text)}
            >
              YOUR POST IS LIVE
            </H2>
            <Thumbnail
              size={150}
              source={require('../../../images/badge.png')} />
            <H2
              style={StyleSheet.flatten(styles.text)}
            >
              SHARE YOUR STYLE WITH OTHER FRIENDS
            </H2>
          </View>
          <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-around', paddingTop: 20}}>
              <Button transparent iconLeft onPress={this.handleFacebookPress.bind(this)}>
                <Icon size={30} name='logo-facebook'  style={{fontSize: 20, color: 'black', alignSelf: 'center'}}/>
                <Text>Share on Facebook</Text>
              </Button>
              <Button transparent iconLeft onPress={this.handleOthersPress.bind(this)}>
                <Icon size={30} name='md-share'  style={{fontSize: 20, color: 'black', alignSelf: 'center'}}/>
                <Text>Share on other channels</Text>
              </Button>
          </View>
          <View style={{flex: 2}}>
            <Gllu.Button
              onPress={this.handleGlluAgainPress.bind(this)}
              style={{alignSelf: 'center', width: 200}}
              text="Post another look!"
            />
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 40,
              right: 10,
              width: 40,
              height: 40,
              borderRadius: 20,
              elevation: 4,
              shadowColor: '#222',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
              shadowRadius: 4,
              backgroundColor: '#F2F2F2'
            }}
            onPress={this.handleClose.bind(this)}
          >
            <Icon name="md-close" style={{fontSize: 20}} color='#F2F2F2' />
          </TouchableOpacity>
          <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem.bind(this)}/>
        </Content>
      </Container>
    );
  }
}

FinishLookPage.defaultProps = {
  items: [],
}

function bindActions(dispatch) {
  return {
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
  };
}

const mapStateToProps = state => {
  const { itemId, lookId, image, items } = state.uploadLook;
  return {
    itemId,
    lookId,
    image,
    items,
    shareToken: state.user.invitation_share_token
  };
};

export default connect(mapStateToProps, bindActions)(FinishLookPage);
