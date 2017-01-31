import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Container, Header, Content, Button, Icon, Title, View } from 'native-base';
import { createLookItem, setTagPosition, navigateTo, popRoute } from '../../actions';
import ImageWithTags from '../common/ImageWithTags';

const TAG_WIDTH = 100;
const BORDER_WIDTH = 5;

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

class TagItemPage extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    createLookItem: React.PropTypes.func,
    setTagPosition: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    lookId: React.PropTypes.number,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
    editingTag: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      locationX: 0,
      locationY: 0,
    };
  }

  handleBackButton() {
    console.log('handleBackButton', this.props.navigation.key);
    const item = this.imageEditor.getTag();
    if (item.locationX && item.locationY) {
      this.props.setTagPosition(item);
      this.props.navigateTo('addItemScreen', 'feedscreen');
    } else {
      this.props.popRoute(this.props.navigation.key);
    }
  }

  _handleAddTag(position) {
    console.log('_handleAddTag', this.props.navigation.key);
    console.log('_handleAddTag', position);
    this.props.createLookItem(position).then(() => {
      console.log('done createLookItem');
      if (this.props.items.length > 1) {
        this.props.popRoute(this.props.navigation.key);
      } else {
        this.props.navigateTo('addItemScreen', 'feedscreen');
      }
    });
  }

  render() {
    const { items, image, createLookItem, setTagPosition } = this.props;
    console.log('render with items', items);
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor: '#000000'}}>
          <Button transparent onPress={() => this.handleBackButton()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title style={{fontFamily: 'PlayfairDisplay-Regular', color: '#ffffff'}}>Tap item to add</Title>
        </Header>
        <View contentContainerStyle={{backgroundColor: '#000000', padding: 10}}>
          <ImageWithTags ref={(ref) => this.imageEditor = ref} editMode={true} items={items} image={image} createLookItem={this._handleAddTag.bind(this)} setTagPosition={setTagPosition}/>
        </View>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: (key) => dispatch(popRoute(key)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    setTagPosition: (position) => dispatch(setTagPosition(position)),
  };
}

const mapStateToProps = state => {
  // const look = state.api.look

  return {
    navigation: state.cardNavigation,
    ...state.uploadLook,
  };
};

export default connect(mapStateToProps, bindActions)(TagItemPage);
