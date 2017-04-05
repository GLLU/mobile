import React, { Component } from 'react';
import { StyleSheet, Image, UIManager, LayoutAnimation } from 'react-native'
import { View, Text, Button } from 'native-base';

const styles = StyleSheet.create({
  categoryItem: {
    height: 70,
    width: 75,
    margin: 10,

    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 10
  },
  categoryItemTitle: {
    color: 'white',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 5
  },
  categoryItemImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  btnCategoryItem: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});

class CategoryItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
    itemWidth: React.PropTypes.number,
    selected: React.PropTypes.bool,
    onPress: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    }

    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    })
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _renderIcon(icon, selected, width, height) {
    console.warn('width',width, 'height',height)
    const uri = selected ? icon['url_hover'] : icon['url'];
    return <Image source={{uri: uri}} style={[styles.categoryItemImage]} resizeMode={'contain'}/>;
  }

  handlePressItem(item) {
    this.setState({selected: !this.state.selected}, () => {
      this.props.onPress(item)
    });
  }

  render() {
    const { item, itemWidth, onPress } = this.props;
    const { selected } = this.state;
    const iconWidth = itemWidth * 5 / 8;
    const iconHeight = iconWidth * 150 / 170;
    return (<View style={[styles.categoryItem]}>
              <Text style={styles.categoryItemTitle}>{item.name}</Text>
              <Button
                transparent
                onPress={() => this.handlePressItem(item)}
                style={[styles.btnCategoryItem, ]}>
                {this._renderIcon(item.icon, selected, iconWidth, iconHeight)}
              </Button>
            </View>);
    }
}

export default CategoryItem;
