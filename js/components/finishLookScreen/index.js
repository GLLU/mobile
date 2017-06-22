import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, BackAndroid, Platform, Text, Image } from 'react-native';
import { Container, Content, Thumbnail, H2, Grid, Row, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { addNewLook } from '../../actions';
import SocialShare from '../../lib/social';
import NativeBaseButton from '../common/buttons/NativeBaseButton';
import glluTheme from '../../themes/gllu-theme';
import { formatInvitationMessage } from "../../lib/messages/index";
import {openCamera} from '../../lib/camera/CameraUtils'
import finishPhoto from '../../../images/upload/finish-upload-look.png'
import asScreen from "../common/containers/Screen"
import {NavigationActions} from "react-navigation";

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

class FinishLookPage extends Component {

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
      this.props.logEvent('FinishLookScreen', { name: 'Back click' });
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
    this.props.resetTo('feedscreen')
  }

  handleClose() {
    this.props.logEvent('FinishLookScreen', { name: 'Close click' });
    this.resetToOriginalPlace();
  }

  handleFacebookPress() {
    this.props.logEvent('FinishLookScreen', { name: 'Facebook Share click' });
    const message=SocialShare.generateShareMessage(formatInvitationMessage(this.props.shareToken));
    SocialShare.facebookShare(message);
  }

  handleOthersPress() {
    this.props.logEvent('FinishLookScreen', { name: 'Other Share click' });
    const message=SocialShare.generateShareMessage(formatInvitationMessage(this.props.shareToken));
    SocialShare.nativeShare(message);
  }

  handleGlluAgainPress() {
    this.props.logEvent('FinishLookScreen', { name: 'Lets inFash Again click' });
    this.openCamera()
  }

  async openCamera() {
    this.props.logEvent('FinishLookScreen', { name: 'Open Camera click' });
    let file = {};
    file.path = await openCamera(true);
    if(file.path.search(".mp4") > -1) {
      file.localPath = file.path
      file.path = file.path.replace('file://', '')
      file.type = 'look[video]'
    } else {
      file.type = 'look[image]'
    }
    this.goToAddNewItem(file);
  }

  goToAddNewItem(imagePath) {
      this.props.addNewLook(imagePath).then(() => {
        this.props.resetWithPayload({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'feedscreen' }),
            NavigationActions.navigate({ routeName: 'addItemScreen',params:{ mode: 'create' }})
          ]
        });
      }).catch(err => {
        console.log('addNewLook err', err);
      });
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <Content scrollEnabled={false} style={{backgroundColor: '#F2F2F2'}} contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center', flex: 1, paddingVertical: 20}}>
          <View style={{flex: 6, justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
            <H2 style={StyleSheet.flatten(styles.text)}>
              YEAHHH!
            </H2>
            <H2 style={StyleSheet.flatten(styles.text)}>
              YOUR POST IS LIVE
            </H2>
            <Image source={finishPhoto} resizeMode='contain' style={{height:150}}/>
            <H2 style={StyleSheet.flatten(styles.text)}>
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
            <NativeBaseButton
              onPress={this.handleGlluAgainPress.bind(this)}
              style={{alignSelf: 'center', width: 200}}
              label="Post another look!"
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

export default connect(mapStateToProps, bindActions)(asScreen(FinishLookPage));