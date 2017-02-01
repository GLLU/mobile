import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Container, Button, Text, Icon} from 'native-base';
import { Row, Col, Grid } from "react-native-easy-grid";

import FontSizeCalculator from './../../../calculators/FontSize';

const styles = StyleSheet.create({
  tagTextContainer: {
    margin: 5,
    backgroundColor: 'black',
    borderRadius: 5,
    flexDirection: 'row'
  },
  tagRemove: {
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: 'transparent',
  },
  tagRemoveText: {
    textAlign: 'center',
    color: '#FFFFFF',
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
      return (
        <View key={index+1} style={[styles.tagTextContainer]}>
          <Button iconRight style={{backgroundColor: 'transparent'}}>
            {tag}
            <Icon name='ios-close' style={{justifyContent: 'flex-end'}} onPress={() => this.props.removeTag(tag)}/>
          </Button>
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
