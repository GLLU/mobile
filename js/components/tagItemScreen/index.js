import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { createLookItem, setTagPosition, pushRoute, popRoute, updateLookItem } from '../../actions';
import ImageWithTags from '../common/ImageWithTags';
import Gllu from '../common';

const IMAGE_VIEW_PADDING = 15;

class TagItemPage extends BasePage {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    lookId: React.PropTypes.number,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
    mode: React.PropTypes.string,
    pushRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
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

  handleBackButton() {
    this.goBack(true);
  }

  handleAddTag(position) {
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'edit'})
    });
  }

  handleOnDragEnd(position) {
    this.props.setTagPosition(position);
  }

  handleContinue() {
    this.props.updateLookItem().then(response => {
      this.props.pushRoute({key: 'addItemScreen'}, this.props.navigation.key);
    });
  }

  handleLayoutImage(e) {
    const { width, height } = e.nativeEvent.layout;
    console.log('handleLayoutImage', width, height);
    const w = parseInt(width - IMAGE_VIEW_PADDING * 2, 10);
    this.setState({
      imageWidth: w
    })
  }

  render() {
    const { items, image } = this.props;
    const { mode } = this.state;

    const allowContinue = items.length > 0;
    const bgColor = '#000000';
    const fgColor = '#F2F2F2';
    return (
      <Gllu.Screen
        backgroundColor={bgColor}
        foregroundColor={fgColor}
        onBackPress={() => this.handleBackButton()}
        onNextPress={() => this.handleContinue()}
        title='Tap item to add'
        showNext={allowContinue}
      >
        <View 
          onLayout={this.handleLayoutImage.bind(this)}
          style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <ImageWithTags
                ref={(ref) => this.imageEditor = ref}
                mode={mode}
                items={items}
                image={image}
                onMarkerCreate={this.handleAddTag.bind(this)}
                onDragEnd={this.handleOnDragEnd.bind(this)}/>
          </View>
      </Gllu.Screen>
    );
  }
}

TagItemPage.defaultProps = {
  items: [],
  mode: 'create',
}

function bindActions(dispatch) {
  return {
    popRoute: (key) => dispatch(popRoute(key)),
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
