import React, { Component } from 'react';
import BasePage from '../common/base/BasePage';
import { StyleSheet, Text, Dimensions, Platform, View, TouchableOpacity } from 'react-native';
import { Grid, Row, Button, Icon} from 'native-base';
import { setUser, updateLookItem, publishLookItem, createLookItem, setTagPosition } from '../../actions';
import StepMarker from './StepMarker';
import StepZeroBrand from './StepZeroBrand';
import StepOneCategory from './StepOneCategory';
import StepTwoOccasions from './StepTwoOccasions';
import StepThreePublish from './StepThreePublish';
import { LOOK_STATES } from '../../constants';
import ImageWithTags from '../common/ImageWithTags';
import _ from 'lodash';
import Utils from '../../utils';
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
    look: React.PropTypes.object,
    item: React.PropTypes.object,
    state: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.handleContinue=this.handleContinue.bind(this);
    this.state = {
      isVideo: this.props.isVideo,
      currentStep: -1,
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
      allowContinue: false,
      currMode: 'tagging',
      currItem: {id: -1}
    };

  }

  setCurrentItem(item) {
    console.log('itemmmm2',item)
    this.setState({currItem: item})
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
    if(nextProps.items !== this.props.items){
      const item = _.find(nextProps.items, item => item.id === this.state.currItem.id);
      this.setState({currItem: item})
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
        this.goBack()
      } else {
        this.navigateTo('finishLookScreen');
      }
    });
  }

  getHeadingTitle() {
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
    const { currItem } = this.state;
    let title = 'Choose a Category'
    if(currItem.category !== null) {
      title = 'Now Pick the brand';
    }
    if(currItem.brand) {
      title = 'For which Occasion?';
    }
    if(currItem.occasions.length > 0) {
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

  handleAddItem(position) {
    //this.logEvent('AddItemScreen', { name: 'Marker add' });
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item})
    });
  }

  handleNewItem() {
    const locationX = w/2;
    const locationY = h/2;
    const left = locationX / w;
    const top = locationY / h;
    const position = {locationX: left, locationY: top};
    this.props.createLookItem(position).then((data) => {
      this.setState({currItem: data.payload.item})
    });
  }

  handleOnDragEnd(position) {
    console.log('handleOnDragEnd')
    this.props.setTagPosition(position);
    this.props.updateLookItem();
  }

  renderImageWithTags() {
    const { items, image } = this.props;
    const mode = this.getCurrentMode();
    return (
      <ImageWithTags
        mode={mode}
        items={items}
        image={image}
        setCurrentItem={(item) => this.setCurrentItem(item)}
        onMarkerCreate={this.handleAddItem.bind(this)}
        onDragEnd={this.handleOnDragEnd.bind(this)}
        currStep={this.state.currentStep}
        currItem={this.state.currItem}>
        {this.state.currentStep === -1 ? null : this.renderActions()}
      </ImageWithTags>
    );
  }

  renderVideoWithTags() {
    const { fileLocalPath } = this.props;
    const mode = this.getCurrentMode();
    return (
      <VideoWithTags
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
    const { currItem } = this.state
    return (
      <View style={{ height: h}}>
        <View style={{ width: w, justifyContent: 'space-between', flexDirection: 'row', marginTop: 70, height:h-70}}>
          <StepTwoOccasions item={currItem}  onValid={this.continueAction.bind(this)}/>
          <StepOneCategory item={currItem} onValid={this.continueAction.bind(this)}/>
        </View>
        <StepZeroBrand item={currItem} onValid={this.handleStepZeroValid.bind(this)}/>
      </View>
    )
  }

  getAllowContinue() {
    const { currItem } = this.state;
    switch(this.state.currentStep) {
      case -1:
        return currItem !== null;
      case 0:
        return currItem && currItem.brand && currItem.category !== null ;
      case 1:
        return false;
      default:
        return true;
    }
  }

  getAllowAddAnotherItem() {
    const { items } = this.props;
    let lol = _.filter(items, item => !(item.brand && item.category !== null));
    return lol.length === 0
  }

  createLookItemForVideo(position) {
    this.logEvent('AddItemScreen', { name: 'Marker add video' });
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'view'})
    });
  }

  renderContent() {

    if (true) {
      return (
        <View>
            {this.state.isVideo ? this.renderVideoWithTags() : this.renderImageWithTags()}
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

  renderAddAnotherItemBtn() {
    return (
      <TouchableOpacity onPress={() => this.handleNewItem()} style={{height: 20, width: 100, backgroundColor: 'rgba(32, 32, 32, 0.8)', justifyContent: 'center', alignSelf: 'center',borderBottomWidth: 2, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
        <View style={{}}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 11}}>Tag another Item</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    const allowContinue = this.getAllowContinue();
    const fgColor = (this.state.currentStep !== 2 ? '#F2F2F2' : '#000000');
    return (
    <View>
      <View style={styles.headerContainer}>
        <Button transparent onPress={() => this.handleBackButton()} style={{width: 30, height: 30}}>
          <Icon style={{ color: fgColor }} name="ios-arrow-back" />
        </Button>
        <Text style={styles.headerTitle}>{this.getHeadingTitle()}</Text>
        {allowContinue ? this.renderNext(fgColor) : <View style={{width: 30, height: 30}}/>}
      </View>
      {this.state.currentStep === 0 && _.filter(this.props.items, item => !(item.brand && item.category !== null)).length === 0 ? this.renderAddAnotherItemBtn() : null}
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
    setUser: name => dispatch(setUser(name)),
    updateLookItem: (look) => dispatch(updateLookItem(look)),
    publishLookItem: (look) => dispatch(publishLookItem(look)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    setTagPosition: (position) => dispatch(setTagPosition(position)),
  };
}

const mapStateToProps = state => {
  const { lookId, image, items, localFilePath} = state.uploadLook;
  const isVideo = Utils.isVideo(image)
  return {
    lookId,
    image,
    isVideo,
    fileLocalPath: localFilePath,
    items,
    state: state.uploadLook.state,
  };
}

export default connect(mapStateToProps, bindActions)(AddItemPage);
