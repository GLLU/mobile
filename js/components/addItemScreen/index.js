import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Text, Dimensions, Platform, View, TouchableOpacity } from 'react-native';
import { Grid, Row, Button, Icon} from 'native-base';
import { setUser, replaceAt, popRoute, pushRoute, navigateTo, updateLookItem, publishLookItem, createLookItem, setTagPosition } from '../../actions';
import StepMarker from './StepMarker';
import StepZeroBrand from './StepZeroBrand';
import StepOneCategory from './StepOneCategory';
import StepTwoOccasions from './StepTwoOccasions';
import StepThreePublish from './StepThreePublish';
import { LOOK_STATES } from '../../constants';
import ImageWithTags from '../common/ImageWithTags';
import _ from 'lodash';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;
import VideoWithTags from '../common/VideoWithTags';

const IMAGE_VIEW_PADDING = 80;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  backIcon: {
    color: 'blue'
  },
  wrapper: {
    backgroundColor: 'red',
    width: w,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  headerContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 10,
    height: 30,
    flexDirection: 'row',
    zIndex: 2,
    width: w,
    justifyContent: 'space-around'
  },
  headerTitle: {
    backgroundColor: 'transparent',
    fontWeight: '600',
    fontSize: 17,
    alignSelf: 'center'
  },
  nextBtn: {
    color: 'white',
    alignSelf: 'center',
    fontSize:22
  },
  nextBtnContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#05d7b2'
  },
});

class AddItemPage extends BasePage {

  static propTypes = {
    publishLookItem: React.PropTypes.func,
    updateLookItem: React.PropTypes.func,
    mode: React.PropTypes.string,
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    look: React.PropTypes.object,
    item: React.PropTypes.object,
    state: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.handleContinue=this.handleContinue.bind(this);
    isVideo = this.props.coverType;
    this.state = {
      isVideo,
      currentStep: -1,
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
      allowContinue: false,
    };
  }

  componentDidMount() {
    console.log('image from redux',this.props.image)
  }


  _handleLayoutImage(e) {
    const { width } = e.nativeEvent.layout;
    const w = parseInt(width - IMAGE_VIEW_PADDING * 2, 10);
    this.setState({
      imageWidth: w
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.item && this.state.currentStep === -1 && this.state.isVideo) {
        this.handleContinue();
    }
  }

  handleContinue() {
    const { currentStep } = this.state;
    if (currentStep < 1) {
      this.setState({currentStep: this.state.currentStep + 1});  
    }
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('addItemScreen', { key: route }, this.props.navigation.key);
  }

  selectTab(step) {
    this.swiper.scrollBy(step);
  }


  continueAction() {
    this.props.updateLookItem().then(response => {
      this.selectTab(this.state.currentStep + 1);
    });
  }

  publishAction() {
    this.logEvent('UploadLookScreen', { name: 'Publish click' });
    this.props.publishLookItem().then(response => {
      if (this.props.state === LOOK_STATES.PUBLISHED) {
        this.props.popRoute(this.props.navigation.key);  
      } else {
        this.props.pushRoute({key: 'finishLookScreen'}, this.props.navigation.key);  
      }
    });
  }

  getHeadingTitle() {
    const { item } = this.props;
    let title = '';
    switch (this.state.currentStep) {
      case 0:
        title = this.getStepsTitle();
        break;
      case 1:
        title = 'Additional Info';
        break;
      default:
        title = 'Place marker to tag an item';
    }
    return title;
  }

  getStepsTitle() {
    const { item } = this.props;
    let title = 'Choose a Category'
    if(item.category !== null) {
      title = 'Now Pick the brand';
    }
    if(item.brand) {
      title = 'For which Occasion?';
    }
    if(item.occasions.length > 0) {
      title = 'Edit or Continue';
    }
    return title;
  }

  handleBackButton() {
    if (this.state.currentStep > -1 && this.state.isVideo === false) {
      this.setState({currentStep: this.state.currentStep - 1});
    } else {
      this.goBack();
    }
  }

  getCurrentMode() {
    switch(this.state.currentStep) {
      default:
        return 'view';
    }
  }

  renderImageWithTags() {
    const { items, image, itemId } = this.props;
    const mode = this.getCurrentMode();
    return (
      <ImageWithTags
        itemId={itemId}
        mode={mode}
        items={items}
        image={image}/>
    );
  }

  renderVideoWithTags() {
    const { fileLocalPath, itemId } = this.props;
    const mode = this.getCurrentMode();
    return (
      <VideoWithTags
        itemId={itemId}
        mode={mode}
        image={fileLocalPath}
        createLookItemForVideo={this.createLookItemForVideo.bind(this)}
      />
    );
  }

  handleStepZeroValid() {
    this.setState({
      allowContinue: true
    })
  }

  renderActions() {
    return (
      <View style={{position: 'absolute', height: h, zIndex: 2}}>
        <View style={{ width: w, justifyContent: 'space-between', flexDirection: 'row', marginTop: 70, height:h-70}}>
          <StepTwoOccasions  onValid={this.continueAction.bind(this)}/>
          <StepOneCategory onValid={this.continueAction.bind(this)}/>
        </View>
        <StepZeroBrand onValid={this.handleStepZeroValid.bind(this)}/>
      </View>
    )
  }

  getAllowContinue() {
    const { item } = this.props;
    switch(this.state.currentStep) {
      case -1:
        return item !== null;
      case 0:
        return item && item.brand && item.category !== null ;
      case 1:
        return false;
      default:
        return true;
    }
  }

  createLookItemForVideo(position) {
    this.logEvent('AddItemScreen', { name: 'Marker add video' });
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'view'})
    });
  }

  renderContent() {
    if (this.state.currentStep === -1) {
      const { mode, isVideo } = this.state;
      return (
        <StepMarker
          mode={mode}
          isVideo={isVideo}
          />
      );
    }

    if (this.state.currentStep !== 1) {
      return (
        <View>
            {this.state.isVideo ? this.renderVideoWithTags() : this.renderImageWithTags()}
            {this.renderActions()}
        </View>
      );
    }
    return <StepThreePublish key={2} publishItem={this.publishAction.bind(this)}/>;
  }

  renderNext() {
    return (
      <TouchableOpacity style={styles.nextBtnContainer} onPress={this.handleContinue}>
        <Icon style={StyleSheet.flatten(styles.nextBtn)} name="ios-arrow-forward"/>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    const allowContinue = this.getAllowContinue();
    const fgColor = (this.state.currentStep !== 2 ? '#F2F2F2' : '#000000');
    return (
      <View style={styles.headerContainer}>
        <Button transparent onPress={() => this.handleBackButton()} style={{width: 30, height: 30}}>
          <Icon style={{ color: fgColor }} name="ios-arrow-back" />
        </Button>
        <Text style={styles.headerTitle}>{this.getHeadingTitle()}</Text>
        {allowContinue ? this.renderNext(fgColor) : <View style={{width: 30, height: 30}}/>}
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderContent()}
        {this.renderHeader()}
      </View>
    );
  }
}

import { connect } from 'react-redux';

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: (key) => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    setUser: name => dispatch(setUser(name)),
    updateLookItem: (look) => dispatch(updateLookItem(look)),
    publishLookItem: (look) => dispatch(publishLookItem(look)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    setTagPosition: (position) => dispatch(setTagPosition(position)),
  };
}

const mapStateToProps = state => {
  const { itemId, lookId, image, items, localFilePath} = state.uploadLook;
  const item = itemId !== null ? _.find(items, x => x.id === itemId) : null;
  return {
    navigation: state.cardNavigation,
    item,
    itemId,
    lookId,
    image,
    fileLocalPath: localFilePath,
    items,
    state: state.uploadLook.state,
  };
}

export default connect(mapStateToProps, bindActions)(AddItemPage);
