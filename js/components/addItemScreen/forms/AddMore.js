import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Container, Content, Button, Text} from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

const addMorePhotoIcon = require('../../../../images/icons/add-more-photo.png');
const addMoreVideoIcon = require('../../../../images/icons/add-more-video.png');

const styles = StyleSheet.create({
  titleLabelInfo: {
    color: '#757575',
    fontWeight: '400',
    marginBottom: 8
  },
  btnAddMorePhoto: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 0
  },
  btnWithImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  morePhotoItem: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  }
});

class AddMore extends Component {

  static propTypes = {
    images: React.PropTypes.array,
    video: React.PropTypes.string,
    addPhoto: React.PropTypes.func,
    addVideo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  _renderPhotoOrIcon(number) {
    let images = this.props.images;
    return images[number-1] == '' ? <Image source={addMorePhotoIcon} style={styles.btnWithImage} /> : <Image source={{uri: images[number-1]}} style={styles.morePhotoItem} />
  }


  render () {
    return (<Content scrollEnabled={false} style={{height: 90, margin: 5}}>
              <Text style={styles.titleLabelInfo}>Add up to 3 photos and 1 video</Text>
              <Grid>
                  <Col size={25}>
                      <Button transparent onPress={() => this.props.addPhoto(1)} style={styles.btnAddMorePhoto}>
                          {this._renderPhotoOrIcon(1)}
                      </Button>
                  </Col>
                  <Col size={25}>
                      <Button transparent onPress={() => this.props.addPhoto(2)} style={styles.btnAddMorePhoto}>
                          {this._renderPhotoOrIcon(2)}
                      </Button>
                  </Col>
                  <Col size={25}>
                      <Button transparent onPress={() => this.props.addPhoto(3)} style={styles.btnAddMorePhoto}>
                          {this._renderPhotoOrIcon(3)}
                      </Button>
                  </Col>
                  <Col size={25}>
                      <Button transparent onPress={() => this.props.addVideo()} style={styles.btnAddMorePhoto}>
                          <Image source={addMoreVideoIcon} style={styles.btnWithImage} />
                      </Button>
                  </Col>
              </Grid>
            </Content>)
  }

}

export default AddMore;
