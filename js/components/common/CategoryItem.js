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
    height: 30,
    marginBottom: 5,
  },
  categoryItemImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  btnCategoryItem: {
    alignSelf: 'center',
    height: 60,
    flexDirection: 'row',
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
    const iconHeight = iconWidth * 6 / 5;
    return (<View style={[styles.categoryItem, { width: itemWidth}]}>
              <Text style={styles.categoryItemTitle}>{item.name}</Text>
              <View style={[styles.btnCategoryItem, { width: (itemWidth * 7 / 8)}]}>
                <Button transparent onPress={() => this.handlePressItem(item)} >
                  {this._renderIcon(item.icon, selected, iconWidth, iconHeight)}
                </Button>
              </View>
            </View>);
    }
}

export default CategoryItem;
