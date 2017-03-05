import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Container, Header, Content, Button, Icon, Title, View, Grid, Row } from 'native-base';
import { createLookItem, setTagPosition, pushRoute, popRoute, updateLookItem } from '../../actions';
import ImageWithTags from '../common/ImageWithTags';
import glluTheme from '../../themes/gllu-theme';
import Gllu from '../common';

const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;
const IMAGE_VIEW_PADDING = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
  },
  draggableContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  itemBgImage: {
    height: 48,
    width: TAG_WIDTH,
  },
  itemsContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: BORDER_WIDTH,
    borderColor: '#FFFFFF'
  },
  itemItem: {
    position: 'absolute',
    height: 48,
    width: TAG_WIDTH,
  },
});

class TagItemPage extends BasePage {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    lookId: React.PropTypes.number,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
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
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
    };
  }

  handleBackButton() {
    this.goBack(true);
  }

  _handleAddTag(position) {
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'edit'})
    });
  }

  _handleOnDragEnd(position) {
    this.props.setTagPosition(position);
  }

  _handleContinue() {
    this.props.updateLookItem().then(response => {
      this.props.pushRoute({key: 'addItemScreen'}, this.props.navigation.key);
    });
  }

  _handleLayoutImage(e) {
    const { width, height } = e.nativeEvent.layout;
    console.log('_handleLayoutImage', width, height);
    const w = parseInt(width - IMAGE_VIEW_PADDING * 2, 10);
    this.setState({
      imageWidth: w
    })
  }

  render() {
    const { items, itemId, image, createLookItem} = this.props;
    const { imageWidth, mode } = this.state;

    const disabledContinue = items.length == 0;
    return (
      <Container style={styles.container} theme={glluTheme}>
        <Header style={{backgroundColor: '#000000'}}>
          <Button transparent onPress={() => this.handleBackButton()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title style={{fontFamily: 'PlayfairDisplay-Regular', color: '#ffffff'}}>Tap item to add</Title>
        </Header>
        <Content scrollEnabled={false} contentContainerStyle={{backgroundColor: '#000000', flexDirection: 'column', flexGrow: 1}}>
          <Grid style={{flex: 1}}>
            <Row size={70} onLayout={this._handleLayoutImage.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
              <ImageWithTags
                  ref={(ref) => this.imageEditor = ref}
                  width={imageWidth}
                  mode={mode}
                  items={items}
                  image={image}
                  onMarkerCreate={this._handleAddTag.bind(this)}
                  onDragEnd={this._handleOnDragEnd.bind(this)}/>
            </Row>
            <Row size={30} style={{flexDirection: 'column', alignItems: 'center'}}>
              <Gllu.Button disabled={disabledContinue} onPress={this._handleContinue.bind(this)} text='CONTINUE'/>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

TagItemPage.defaultProps = {
  items: [],
  mode: 'view',
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
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
