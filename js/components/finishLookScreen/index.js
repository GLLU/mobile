import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, TouchableOpacity, View, BackAndroid, Platform } from 'react-native';
import { Container, Content, Thumbnail, H2, Grid, Row, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { reset, addNewLook, navigateTo, replaceAtIndex } from '../../actions';
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
    color: '#000000',
    lineHeight: 40,
    fontFamily: 'Montserrat-Regular',
  }
});

class FinishLookPage extends BasePage {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    lookId: React.PropTypes.number,
    items: React.PropTypes.array,
    pushRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
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

  handleClose() {
    this.logEvent('CongratsScreen', { name: 'Close click' });
    this.resetToFeedscreen();
  }

  handleFacebookPress() {
    this.logEvent('CongratsScreen', { name: 'Facebook Share click' });
    SocialShare.facebookShare();
  }

  handleOthersPress() {
    this.logEvent('CongratsScreen', { name: 'Other Share click' });
    SocialShare.nativeShare(); 
  }

  handleGlluAgainPress() {
    this.logEvent('CongratsScreen', { name: 'Lets GLLU Again click' });
    this.setState({photoModal: true});
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.resetToFeedscreen();
        this.props.navigateTo('addItemScreen', 'feedscreen');
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
              style={[styles.text, {fontSize: 22}]}
            >
              YEAHHH!
            </H2>
            <H2
              style={[styles.text, {fontSize: 22}]}
            >
              YOUR POST IS LIVE
            </H2>
            <Thumbnail
              size={150}
              source={require('../../../images/badge.png')} />
            <H2
              style={[styles.text, {fontSize: 22}]}
            >
              HELP PEOPLE TO KNOW HOW FASHION YOU ARE
            </H2>
          </View>
          <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-around', paddingTop: 20}}>
              <Button transparent iconLeft onPress={this.handleFacebookPress.bind(this)}>
                <Icon size={30} name='logo-facebook'  style={{fontSize: 20, color: 'black', alignSelf: 'center'}}/>
                Share on Facebook
              </Button>
              <Button transparent iconLeft onPress={this.handleOthersPress.bind(this)}>
                <Icon size={30} name='md-share'  style={{fontSize: 20, color: 'black', alignSelf: 'center'}}/>
                Share on others...
              </Button>
          </View>
          <View style={{flex: 2}}>
            <Gllu.Button
              onPress={this.handleGlluAgainPress.bind(this)}
              style={{alignSelf: 'center', width: 200}}
              text="Let's GLLU again!"
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
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    reset: (route, key) => dispatch(reset(route, key)),
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
  };
}

const mapStateToProps = state => {
  const { itemId, lookId, image, items } = state.uploadLook;
  return {
    navigation: state.cardNavigation,
    itemId,
    lookId,
    image,
    items,
  };
};

export default connect(mapStateToProps, bindActions)(FinishLookPage);
