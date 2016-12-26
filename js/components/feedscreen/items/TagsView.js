'use strict';

import React, { Component } from 'react';
import { View } from 'native-base';

import Tag from './Tag';

import styles from './styles';

class TagsView extends Component {

  static propTypes = {
    tags: React.PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  _renderTags() {
    return this.props.tags.map((tag, index) => {
      return  (<Tag key={index} tag={tag} />);
    });
  }

  render() {
    return(<View style={styles.tagsContainer} >{this._renderTags()}</View>)
  }

}

export default TagsView;
