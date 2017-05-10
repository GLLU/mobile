import React, { Component } from 'react';
import { StyleSheet,View } from 'react-native';
import {  Container, Button, Icon} from 'native-base';
import BaseComponent from '../../common/BaseComponent';
import FontSizeCalculator from './../../../calculators/FontSize';

const styles = StyleSheet.create({
  tagTextContainer: {
    margin: 3,
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
    fontSize: new FontSizeCalculator(13).getSize(),
  }
});

class Tags extends BaseComponent {

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
        <View key={index} style={[styles.tagTextContainer]}>
          <Button iconRight style={{backgroundColor: '#000', height: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}} textStyle={{fontSize: 13}}>
            {tag.name}
            <Icon name='ios-close' style={{justifyContent: 'flex-end', backgroundColor: 'transparent', marginTop: 3}} onPress={() => this.props.removeTag(tag)}/>
          </Button>
        </View>
      )
    })
  }

  render () {
    return (<Container style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
              {this._renderTags()}
            </Container>)
  }
}

export default Tags;
