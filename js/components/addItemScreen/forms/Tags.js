import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Button, Icon} from 'native-base';

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

class Tags extends Component {

  static propTypes = {
    itemTags: React.PropTypes.array,
    removeTag: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  _renderTags() {
    return this.props.itemTags.map((tag, index) => {
      return (
        <View key={index} style={[styles.tagTextContainer]}>
          <Button iconRight style={{backgroundColor: '#000'}} textStyle={{fontSize: 13}}>
            {tag.name}
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
