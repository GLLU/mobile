import React, { Component } from 'react';
import { StyleSheet, Image, UIManager, LayoutAnimation } from 'react-native'
import { View, Text, Button } from 'native-base';

const styles = StyleSheet.create({
  categoryItem: {
    height: 100,
    width: 80,
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  categoryItemTitle: {
    color: '#757575',
    fontSize: 13,
    textAlign: 'center',
    alignSelf: 'center',
    height: 25,
    marginBottom: 5,
  },
  categoryItemImage: {
    height: 60,
    width: 60 * 150 / 170,
    alignSelf: 'center',
  },
  btnCategoryItem: {
    alignSelf: 'center',
    height: 60,
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
    const uri = selected ? icon['url_hover'] : icon['url'];
    return <Image source={{uri: uri}} style={[styles.categoryItemImage, { width, height }]} resizeMode={'contain'}/>;
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
    return (<View style={[styles.categoryItem, { width: itemWidth}]}>
              <Text style={styles.categoryItemTitle}>{item.name}</Text>
              <Button
                transparent
                onPress={() => this.handlePressItem(item)}
                style={[styles.btnCategoryItem, { width: (itemWidth * 7 / 8)}]}>
                {this._renderIcon(item.icon, selected, iconWidth, iconHeight)}
              </Button>
            </View>);
    }
}

export default CategoryItem;
