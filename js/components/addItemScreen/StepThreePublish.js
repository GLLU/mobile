'use strict';

import React, { Component } from 'react';
import { ScrollView, Image, TextInput, Dimensions, StyleSheet, Modal, TouchableOpacity, View,Text, Platform } from 'react-native';
import { Grid, Row, Col } from 'native-base';
import TagInput from './forms/TagInput';
import BrandUrlInput from './forms/BrandUrlInput';
import NativeBaseButton from '../common/buttons/NativeBaseButton';
import BaseComponent from '../common/base/BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {
    createLookItem,
    addDescription,
    addUrl,
    addLocation,
    addItemTag,
    removeItemTag,
} from '../../actions';
import _ from 'lodash';
import { LOOK_STATES } from '../../constants';

import FontSizeCalculator from './../../calculators/FontSize';
import Utils from '../../utils';
import WantMoreMony from '../../../images/upload/want-more-money.png';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const BTN_RADIO_MARGIN_TOP = deviceWidth < 375 ? 0 : 10;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 10,
  },
  itemInfoView: {
    backgroundColor: 'transparent',
    padding: 20,
    paddingBottom: 60,
  },
  titleLabelInfo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: new FontSizeCalculator(15).getSize(),
    color: '#7f7f7f',
    fontWeight: '300',
  },
  describe: {
    flex: 1,
    minHeight: 40,
    flexGrow: 100,

    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: new FontSizeCalculator(15).getSize(),
    color: '#9E9E9E',
    backgroundColor: '#FFFFFF',

  },
  textInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRightWidth: 1,
    borderColor: 'lightgrey'
  },
  confirmText: {
    flex: 1,
    height: 120,
    fontFamily: 'Montserrat-Regular',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '300',
    color: '#000',
    backgroundColor: 'transparent',
    padding: 2
  },
  normalIconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 5
  },
  btnGoToStep3: {
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#05d7b2',
    height: 45,
    width: (deviceWidth / 8) * 6,
    borderRadius: 0,
    alignSelf: 'center'
  },
  btnGoToStep3Text: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: new FontSizeCalculator(18).getSize(),
    fontWeight: '400',
    textAlign: 'center'
  },
  hashTag: {
    color: '#05d7b2'
  },
  fakeCheckbox: {
    marginTop: BTN_RADIO_MARGIN_TOP,
  },
  text: {
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  link: {
    color: '#00ABED',
    fontSize: 12,
    fontWeight: 'normal',
  },
});

class StepThreePublish extends BaseComponent {
  static propTypes = {
    image: React.PropTypes.string,
    state: React.PropTypes.string,
    publishItem: React.PropTypes.func,
    description: React.PropTypes.string,
    items: React.PropTypes.array,
    occasions: React.PropTypes.array,
    addDescription: React.PropTypes.func,
    addItemTag: React.PropTypes.func,
    removeItemTag: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      images:['', '', ''],
      video: '',
      videoUrl: '',
      location: 'us',
      confirm: false,
      imageOverlayVisible: false,
      urlOverlayVisible: false,
      description: props.description,
      url: props.url,
      shouldFocus: false
    }

    this.urlDialogShown = false;
  }

  updateSelectValue(key, value) {
    switch (key) {
      case 'location':
        this.props.addLocation(value);
        break;
      case 'description':
        this.setState({
          description: value
        });
        break;
    }
  }

  checkUrlOk() {
    const { items } = this.props;
    let missingItemUrl = _.findIndex(items, function(item) { return !!item.url });
    // it is ok if it is not empty and not the same as item brand url (means no change made)
    if (missingItemUrl) {
      return false;
    }


    return true;
  }

  handlePublishPress() {
    // we don't show the dialog during editing look
    // we only show it one time
    this.logEvent('UploadLookScreen', { name: 'user pressed continue'});
    if (!this.urlDialogShown && !this.checkUrlOk()) {
      this.setState({urlOverlayVisible: true}, () => {
        this.urlDialogShown = true;
      });
    } else {
      this.props.publishItem();
    }
  }

  handleOkPress() {
    this.logEvent('UploadLookScreen', { name: 'user came back to edit url'});
    this.setState({urlOverlayVisible: false, shouldFocus: true})
  }

  handleContinuePress() {
    this.logEvent('UploadLookScreen', { name: 'user pressed continue anyway'});
    this.handleUrlEndEditing();
    this.setState({urlOverlayVisible: false}, () => {
      this.props.publishItem();
    });
  }

  handleImagePress() {
    this.setState({imageOverlayVisible: true});
  }

  handleDescriptionEndEditing() {
    this.logEvent('UploadLookScreen', { name: 'Additional Info Description', description: this.props.description });
    this.props.addDescription(this.state.description);
  }

  handleUrlEndEditing(event, itemId) {
    if(event) {
      const text = event.nativeEvent.text
      this.logEvent('UploadLookScreen', { name: 'Url', url: text });
      console.log('end edit uri',text)
      this.props.addUrl(text, itemId);
    }

  }

  renderImageOverlay() {
    if (this.state.imageOverlayVisible) {
      return (
          <Modal animationType='fade'
             transparent={true}
             visible={this.state.imageOverlayVisible}
             onRequestClose={() => this.setState({imageOverlayVisible: false})}>
              <Image source={{uri: this.props.image}} style={{flex: 1}} resizeMode='cover'>
                <TouchableOpacity
                  style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}
                  onPress={() => this.setState({imageOverlayVisible: false})}>
                </TouchableOpacity>
              </Image>
          </Modal>

      );
    }

    return null;
  }

  renderConfirmUrlOverlay() {
    if (this.state.urlOverlayVisible) {
      return (
          <Modal
            animationType='none'
            transparent={true}
            visible={this.state.urlOverlayVisible}
            onRequestClose={() => this.setState({urlOverlayVisible: false})}>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', opacity: 0.8, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
              <View style={{backgroundColor: '#FFFFFF', height: 350, width: 300}}>
                <View style={{flex: 1,  alignItems: 'center', padding: 20}}>
                  <View style={{flex: 6,  paddingBottom: 10}}>
                    <Text
                      style={[styles.text, {fontSize: 18}]}
                    >
                      Want to make more money?
                    </Text>
                    <View style={{justifyContent:'center', flexDirection: 'row', paddingVertical: 15}}>
                      <Image resizeMode={'contain'} source={WantMoreMony} style={{width: 100, height: 100}}/>
                    </View>
                    <Text
                      style={[styles.text, {fontSize: 14}]}
                    >
                      Make sure to copy-paste the exact
                      webpage of the item in your image
                    </Text>
                  </View>
                  <View style={{flex: 4, justifyContent: 'space-around', alignItems: 'center'}}>
                    <NativeBaseButton
                      onPress={this.handleOkPress.bind(this)}
                      style={{alignSelf: 'center', width: 200}}
                      label="OK. Let's do it"
                    />
                    <Text style={styles.link} onPress={this.handleContinuePress.bind(this)}>
                      Continue Anyway
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
      );
    }

    return null;
  }

  renderFirstRowWithImage(image) {
    return (
      <Row style={[styles.row, { flexDirection: 'row' }]}>
        <Col size={25} style={{paddingRight: 20}}>
          <TouchableOpacity onPress={this.handleImagePress.bind(this)}>
            <Image
              style={{width: 90, height: 160}}
              source={{uri: image}}
              resizeMode={'stretch'}
            />
          </TouchableOpacity>
        </Col>
        <Col size={75} style={{flexDirection: 'column'}}>
          <TextInput
            textAlignVertical='top'
            multiline={true}
            style={styles.describe}
            value={this.state.description}
            placeholder="Describe what you're wearing..."
            underlineColorAndroid='transparent'
            onEndEditing={this.handleDescriptionEndEditing.bind(this)}
            onChangeText={(text) => this.updateSelectValue('description', text)}/>
        </Col>
      </Row>
    )
  }

  renderFirstRowWithOutImage() {
    return (
      <Row style={[styles.row, { flexDirection: 'row' }]}>
        <Col size={100} style={{flexDirection: 'column'}}>
          <TextInput
            textAlignVertical='top'
            multiline={true}
            style={[styles.describe, {minHeight: 80}]}
            value={this.state.description}
            placeholder="Describe what you're wearing..."
            underlineColorAndroid='transparent'
            onEndEditing={this.handleDescriptionEndEditing.bind(this)}
            onChangeText={(text) => this.updateSelectValue('description', text)}/>
        </Col>
      </Row>
    )
  }

  renderBrandsUrl() {

    const { items } = this.props;
    return _.map(items, (item, index) => {
      const iconUrl =  item.category.icon.url
      let url;
      if (item.url) {
        url = item.url;
      } else {
        url = item.brand ? item.brand.url : null;
      }
      return <BrandUrlInput key={index}  itemUrl={url} itemId={item.id} iconUrl={iconUrl} shouldFocus={this.state.shouldFocus} handleUrlEndEditing={(event,text) =>this.handleUrlEndEditing(event,text)} />
    });
  }

  renderItemTags() {
    const { items } = this.props
    return _.map(items, (item, index) => {
      const iconUrl =  item.category.icon.url
      return (
      <View key={index} style={{flexDirection: 'row'}}>
        <TagInput
          categoryIcon={iconUrl}
          itemId={item.id}
          tags={item.tags}
          addItemTag={this.props.addItemTag}
          removeItemTag={this.props.removeItemTag}
        />
        <View style={{height: 40, padding: 2, backgroundColor: 'white', marginTop: 10, marginBottom: 10}}>
          <Image source={{uri: iconUrl}} style={[{height: 36, backgroundColor: 'white', borderLeftWidth: 2,width: 30,
            resizeMode: 'contain',
            alignSelf: 'center',}]} />
        </View>
      </View>
      );
    });
  }

  render() {
    const { image } = this.props;
    return(
      <View style={{height: deviceHeight-50, paddingVertical:20}}>
      <ScrollView scrollEnabled={true} style={{paddingHorizontal: 20}}>
        <View style={{flexGrow: 1}} >
          {this.props.isVideo ? this.renderFirstRowWithOutImage() : this.renderFirstRowWithImage(image)}
          <View style={styles.row}>
            <Text style={styles.titleLabelInfo}>Add tags</Text>
            {this.renderItemTags()}
          </View>

          <View style={styles.row}>
            <Text style={styles.titleLabelInfo}>Link to the webpage of the item</Text>
            {this.renderBrandsUrl()}
          </View>
          <View style={[styles.row, {height: 50}]}>
            <SolidButton
              style={{backgroundColor: '#05d7b2'}}
              onPress={() => this.handlePublishPress()}
              label={ this.props.state === LOOK_STATES.PUBLISHED ? 'SAVE' : 'PUBLISH'}
            />
          </View>
        </View>
        {this.renderImageOverlay()}
        {this.renderConfirmUrlOverlay()}
      </ScrollView>
      </View>
    )
  }
}

import { connect } from 'react-redux';
import SolidButton from "../common/buttons/SolidButton";
function bindActions(dispatch) {
  return {
    createLookItem: (tag) => dispatch(createLookItem(tag)),
    addDescription: (description) => dispatch(addDescription(description)),
    addUrl: (url, itemId) => dispatch(addUrl(url, itemId)),
    addLocation: (location) => dispatch(addLocation(location)),
    addItemTag: (name, itemId) => dispatch(addItemTag(name, itemId)),
    removeItemTag: (name, itemId) => dispatch(removeItemTag(name, itemId)),
  };
}

const mapStateToProps = state => {
  const { image } = state.uploadLook;
  const isVideo = Utils.isVideo(image)
  return {
    isVideo,
    image,
    categories: state.filters.categories,
  }
};

export default connect(mapStateToProps, bindActions)(StepThreePublish);
