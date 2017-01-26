import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Container, Button, Text} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";

import FontSizeCalculator from './../../../calculators/FontSize';

const styles = StyleSheet.create({
  tagTextContainer: {
    height: 30,
    padding: 5,
    margin: 10,
    marginLeft: 0,
    backgroundColor: 'black',
    borderRadius: 5
  },
  tagRemove: {
    margin: 0,
    padding: 0,
    width: 30,
    height: 30,
    backgroundColor: 'transparent'
  },
  tagRemoveText: {
    textAlign: 'center',
    color: '#FFFFFF',
    position: 'absolute',
    right: 5,
    top: 0,
    fontSize: new FontSizeCalculator(15).getSize(),
  }
});

class Tags extends Component {

  static propTypes = {
    tags: React.PropTypes.array,
    removeTag: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  _renderTags() {
    return this.props.tags.map((tag, index) => {
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
              <Button transparent onPress={() => this.props.removeTag(tag)} style={styles.tagRemove}>
                <Text style={styles.tagRemoveText}>x</Text>
              </Button>
            </Col>
          </Grid>
        </View>
      )
    })
  }

  render () {
    return (<Container style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
              {this._renderTags()}
            </Container>)
  }

}

export default Tags;
