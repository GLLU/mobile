import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {Container, Header, Content, Button, Icon, Title, View } from 'native-base';
import { addTag, setTagPosition, navigateTo, popRoute } from '../../actions';
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
  tagBgImage: {
    height: 48,
    width: TAG_WIDTH,
  },
  tagsContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: BORDER_WIDTH,
    borderColor: '#FFFFFF'
  },
  tagItem: {
    position: 'absolute',
    height: 48,
    width: TAG_WIDTH,
  },
});

class TagItemPage extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    addTag: React.PropTypes.func,
    setTagPosition: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    image: React.PropTypes.object,
    tags: React.PropTypes.array,
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
    const tag = this.imageEditor.getTag();
    if (tag.locationX && tag.locationY) {
      this.props.setTagPosition(tag);
      this.props.navigateTo('addItemScreen', 'feedscreen');
    } else {
      this.props.popRoute(this.props.navigation.key);
    }
  }

  render() {
    const { tags, image, addTag, setTagPosition } = this.props;
    console.log('render with tags', tags);
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor: '#000000'}}>
          <Button transparent onPress={() => this.handleBackButton()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title style={{fontFamily: 'PlayfairDisplay-Regular', color: '#ffffff'}}>Tap item to add</Title>
        </Header>
        <Content contentContainerStyle={{flex: 1, backgroundColor: '#000000', padding: 10}}>
          <View>
            <ImageWithTags ref={(ref) => this.imageEditor = ref} tags={tags} image={image} addTag={addTag} setTagPosition={setTagPosition}/>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: (key) => dispatch(popRoute(key)),
    addTag: (tag) => dispatch(addTag(tag)),
    setTagPosition: (position) => dispatch(setTagPosition(position)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(TagItemPage);
