'use strict';

import React, { Component } from 'react';
import { ScrollView, Image, TextInput, Dimensions, StyleSheet } from 'react-native';
import { View, Content, Button, Text, Picker, Item, Icon } from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";
import ImagePicker from 'react-native-image-crop-picker';
import ImageWithTags from '../common/ImageWithTags';

import FontSizeCalculator from './../../calculators/FontSize';

const addMorePhotoIcon = require('../../../images/icons/add-more-photo.png');
const addMoreVideoIcon = require('../../../images/icons/add-more-video.png');
const us = require('../../../images/flags/us.png');
const uk = require('../../../images/flags/uk.png');
const trustLevelIcon = require('../../../images/icons/trust-level.png');
const checkboxUncheckIcon = require('../../../images/icons/checkbox-uncheck.png');
const checkboxCheckedIcon = require('../../../images/icons/checkbox-checked.png');
const locationIcon = require('../../../images/icons/location.png');

const w = Dimensions.get('window').width;

import styles from './mystyles';

class StepTwo extends Component {
  static propTypes = {
    image: React.PropTypes.string,
    continueAction: React.PropTypes.func,
    addTag: React.PropTypes.func,
    image: React.PropTypes.object,
    tags: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
        tags: ['dresses', 'black', 'red', 'white'],
        image1: '',
        image2: '',
        image3: '',
        video: '',
        tmpValue: '',
        location: 'us',
        trustLevel: '0',
        confirm: true,
        flags: [
          {name: 'uk', icon: uk},
          {name: 'us', icon: us}
        ]
    }
  }

  addPhoto(number) {
    console.log(`Add photo ${number}`);
    ImagePicker.openPicker({
      cropping: false
    }).then(image => {
      var path = image.path;
      var Extension = path.substring(path.lastIndexOf('.')+1).toLowerCase();
      if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "jpg") {
        this.setState({[`image${number}`]: path});
      }
    });
  }

  addVideo() {
    console.log('Add video');
    ImagePicker.openPicker({
      cropping: false
    }).then(video => {
      var path = video.path;
      var Extension = path.substring(path.lastIndexOf('.')+1).toLowerCase();
      if (Extension == "mp4" || Extension == "avi" || Extension == "flv" || Extension == "mov" || Extension == "webm") {
        console.log(`${path} will upload and get thumbnail via api`);
      }
    });
  }

  addTags(name) {
    var tags = this.state.tags;
    var pos = tags.indexOf(name);
    if (pos < 0) {
      tags.push(name);
      this.setState({tags: tags, tmpValue: ''});
    }
  }

  removeTag(name) {
    var tags = this.state.tags;
    var pos = tags.indexOf(name);
    tags.splice(pos, 1);
    this.setState({tags: tags});
  }

  _renderPhotoOrIcon(number) {
    return this.state[`image${number}`] == '' ? <Image source={addMorePhotoIcon} style={styles.btnWithImage} /> : <Image source={{uri: this.state[`image${number}`]}} style={styles.morePhotoItem} />
  }

  _renderAddMore() {
    return (
      <Content scrollEnabled={false} style={{height: 90, margin: 5}}>
        <Text style={styles.titleLabelInfo}>Add up to 3 photos and 1 video</Text>
        <Grid>
            <Col size={25}>
                <Button transparent onPress={() => this.addPhoto(1)} style={styles.btnAddMorePhoto}>
                    {this._renderPhotoOrIcon(1)}
                </Button>
            </Col>
            <Col size={25}>
                <Button transparent onPress={() => this.addPhoto(2)} style={styles.btnAddMorePhoto}>
                    {this._renderPhotoOrIcon(2)}
                </Button>
            </Col>
            <Col size={25}>
                <Button transparent onPress={() => this.addPhoto(3)} style={styles.btnAddMorePhoto}>
                    {this._renderPhotoOrIcon(3)}
                </Button>
            </Col>
            <Col size={25}>
                <Button transparent onPress={() => this.addVideo()} style={styles.btnAddMorePhoto}>
                    <Image source={addMoreVideoIcon} style={styles.btnWithImage} />
                </Button>
            </Col>
        </Grid>
      </Content>
      )
  }

  getHeight(number) {
    var l = this.state.tags.length;
    var rH = 80;
    var numR = Math.round(l / number);
    if (l > numR * number) {
      numR = numR + 1;
    }
    return numR == 0 ? 250 : numR * rH + 270;
  }

  _renderForm() {
    var number = w < 375 ? 2 : 3;
    var height = this.getHeight(number);
    return (
        <Content scrollEnabled={false} style={{height: height, margin: 5}}>
            <Text style={styles.titleLabelInfo}>Describe what you're wearing</Text>
            <Text adjustsFontSizeToFit={true} numberOfLines={4} style={styles.describe}>
                {"Add some details about the items you've tagged and some relevant #hashtags to make it easier for people to find it"}
            </Text>
            <Text style={[styles.titleLabelInfo, {marginTop: 20}]}>Add tags</Text>
            <TextInput onSubmitEditing={(event) => this.addTags(event.nativeEvent.text)} returnKeyType="done" placeholder="" value={this.state.tmpValue} keyboardType="default" placeholderTextColor="#BDBDBD"  style={styles.textInput} onChangeText={(text) => this.setState({tmpValue: text})} />
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
              {this._renderTags()}
            </View>
        </Content>
    )
  }

  _renderTags() {
    return this.state.tags.map((tag, index) => {
      var width = tag.length * 15;
      var left = 70;
      var right = 30;
      if (width < 90) {
          width = width + 20;
          left = 50;
          right = 50;
      }
      return (
        <View key={index+1} style={[styles.tagTextContainer, {width: width}]}>
          <Grid>
            <Col size={left}>
              <Text style={{color: '#FFFFFF', textAlign: 'center'}}>{tag}</Text>
            </Col>
            <Col size={right}>
              <Button transparent onPress={() => this.removeTag(tag)} style={styles.tagRemove}>
                <Text style={styles.tagRemoveText}>x</Text>
              </Button>
            </Col>
          </Grid>
        </View>
      )
    })
  }

  _renderLocation() {
    let flagIcon = null;
    this.state.flags.map((flag) => {
      if (flag.name == this.state.location) {
        flagIcon = flag.icon;
      }
    });
    return (
      <View style={{height: 100, marginTop: 10, marginBottom: 10}}>
        <Grid style={styles.gridInput}>
            <Row>
              <Grid>
                <Col size={15}>
                  <Image source={locationIcon} style={styles.normalIconImage} />
                </Col>
                <Col size={35}>
                  <Text style={[styles.titleLabelInfo, {paddingTop: 10}]}>Location</Text>
                </Col>
                <Col size={10}>
                  <Image source={flagIcon} style={styles.flagSelectOptions} />
                </Col>
                <Col size={20}>
                  <Picker
                    style={styles.selectOptions}
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.location}
                    onValueChange={(value) => this.setState({ location: value })}>
                    <Item label="UK" value="uk" />
                    <Item label="US" value="us" />
                  </Picker>
                </Col>
                <Col size={20}>
                  <Icon style={[styles.arrowSelect, {textAlign: 'center'}]} name='ios-arrow-forward-outline' />
                </Col>
              </Grid>
            </Row>
            <Row>
              <Grid>
                <Col size={15} />
                <Col size={85}><Text style={styles.smallTextInput}>Keep country updated to increase sales</Text></Col>
              </Grid>
            </Row>
        </Grid>
      </View>
    )
  }
  _renderTrustLevel() {
    return (
      <View style={{height: 100, marginTop: 10, marginBottom: 10}}>
        <Grid style={styles.gridInput}>
            <Row>
              <Grid>
                <Col size={15}>
                  <Image source={trustLevelIcon} style={styles.normalIconImage} />
                </Col>
                <Col size={35}>
                  <Text style={[styles.titleLabelInfo, {paddingTop: 10}]}>Trust Level</Text>
                </Col>
                <Col size={30}>
                  <Picker
                    style={styles.selectOptions}
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.trustLevel}
                    onValueChange={(value) => this.setState({ trustLevel: value })}>
                    <Item label="0/5" value="0" />
                    <Item label="1/5" value="1" />
                    <Item label="2/5" value="2" />
                    <Item label="3/5" value="3" />
                    <Item label="4/5" value="4" />
                    <Item label="5/5" value="5" />
                  </Picker>
                </Col>
                <Col size={20}>
                  <Icon style={[styles.arrowSelect, {textAlign: 'center'}]} name='ios-arrow-forward-outline' />
                </Col>
              </Grid>
            </Row>
            <Row>
              <Grid>
                <Col size={15} />
                <Col size={85}><Text style={styles.smallTextInput}>Increase sales by upgrading your level</Text></Col>
              </Grid>
            </Row>
        </Grid>
      </View>
    )
  }

  _renderForm2(){
    const checkBoxIcon = this.state.confirm ? checkboxCheckedIcon : checkboxUncheckIcon;
    return (
        <Content scrollEnabled={false} style={{height: 400, margin: 5}}>
            <Text style={[styles.titleLabelInfo, {color: '#333333'}]}>Improve your sales experience</Text>
            {this._renderLocation()}
            {this._renderTrustLevel()}
            <Grid>
              <Col size={10}>
                <Button transparent onPress={() => this.setState({confirm: !this.state.confirm})} style={styles.fakeCheckbox}>
                  <Image source={checkBoxIcon} style={[styles.normalIconImage, {width: 25, height: 25}]} />
                </Button>
              </Col>
              <Col size={90}>
                <Text adjustsFontSizeToFit={true} numberOfLines={5} style={styles.confirmText}>
                  {'You will now become a "Glluer Presenter" while your exact measurements will still be hiddden. People that will view this item. Will see a % value of matching between their measurements and yours.'}
                </Text>
              </Col>
            </Grid>
        </Content>
    )
  }

  render() {
    const { tags, addTag, image} = this.props;
    return(
      <ScrollView scrollEnabled={true}>
        <View style={{padding: 20}}>
          <ImageWithTags tags={tags} image={image} addTag={addTag} width={w - 40}/>
        </View>
        <View style={styles.itemInfoView}>
            {this._renderAddMore()}
            {this._renderForm()}
            {this._renderForm2()}
            <Button transparent onPress={() => this.props.continueAction()} style={styles.btnGoToStep3}>
                <Text style={styles.btnGoToStep3Text}>PUBLISH</Text>
            </Button>
        </View>
      </ScrollView>
    )
  }
}

import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    addTag: (tag) => dispatch(addTag(tag)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(StepTwo);
