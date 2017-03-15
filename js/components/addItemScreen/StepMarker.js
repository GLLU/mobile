import React, { Component } from 'react';
import BaseComponent from '../common/BaseComponent';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { createLookItem, setTagPosition, pushRoute, popRoute, updateLookItem } from '../../actions';
import ImageWithTags from '../common/ImageWithTags';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Gllu from '../common';
import Container from '../common/Container';

const IMAGE_VIEW_PADDING = 15;

class TagItemPage extends BaseComponent {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    lookId: React.PropTypes.number,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
    mode: React.PropTypes.string,
    onEndEditing: React.PropTypes.func,
    createLookItem: React.PropTypes.func,
    setTagPosition: React.PropTypes.func,
    updateLookItem: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
    };
  }

  handleAddTag(position) {
    this.logEvent('TagItemScreen', { name: 'Marker add' });
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'edit'})
    });
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
    this.props.updateLookItem();
  }

  render() {
    const { items, image, itemId } = this.props;
    const { mode } = this.state;

    return (
      <View
        style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <ImageWithTags
              ref={(ref) => this.imageEditor = ref}
              mode={mode}
              itemId={itemId}
              items={items}
              image={image}
              onMarkerCreate={this.handleAddTag.bind(this)}
              onDragEnd={this.handleOnDragEnd.bind(this)}/>
        </View>
    );
  }
}

TagItemPage.defaultProps = {
  items: [],
  mode: 'create',
}

function bindActions(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    setTagPosition: (position) => dispatch(setTagPosition(position)),
    updateLookItem: () => dispatch(updateLookItem()),
  };
}

const mapStateToProps = state => {
  const { itemId, lookId, image, items } = state.uploadLook;
  return {
    navigation: state.cardNavigation,
    itemId,
    lookId,
    image,
    items,
  };
};

export default connect(mapStateToProps, bindActions)(TagItemPage);
