import React, { Component } from 'react';
import BaseComponent from '../common/BaseComponent';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { createLookItem, setTagPosition, pushRoute, updateLookItem } from '../../actions';
import ImageWithTags from '../common/ImageWithTags';
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

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
    this.logEvent('AddItemScreen', { name: 'Marker add' });
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'view'})
    });
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
    this.props.updateLookItem();
  }

  createLookItemForVideo(position) {
    this.logEvent('AddItemScreen', { name: 'Marker add video' });
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'view'})
    });
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
   )
  }

  renderVideoWithTags() {
    const { items, image, itemId } = this.props;
    const { mode } = this.state;
    return (
      <View
        style={{height: h, width: w, flexDirection: 'column', alignItems: 'center'}}>
          <ImageWithTags
              ref={(ref) => this.imageEditor = ref}
              mode={mode}
              itemId={itemId}
              items={items}
              image={image}
              onMarkerCreate={this.handleAddTag.bind(this)}
              onDragEnd={this.handleOnDragEnd.bind(this)}
              createLookItemForVideo={this.createLookItemForVideo.bind(this)}/>
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
