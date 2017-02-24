import React, { Component } from 'react';
import { StyleSheet, Image, UIManager, LayoutAnimation } from 'react-native'
import { View, Text, Button } from 'native-base';

const styles = StyleSheet.create({
  categoryItem: {
    width: 80,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemTitle: {
    color: '#757575',
    fontSize: 13,
    textAlign: 'center',
    height: 32
  },
  categoryItemImage: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  btnCategoryItem: {
    height: 80,
    width: 70,
    alignSelf: 'center',
  },
});

class CategoryItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
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

  _renderIcon(icon, selected) {
    const uri = selected ? icon['url_hover'] : icon['url'];
    return <Image source={{uri: uri}} style={styles.categoryItemImage} resizeMode={'contain'}/>;
  }

  handlePressItem(item) {
    this.setState({selected: !this.state.selected}, () => {
      this.props.onPress(item)
    });
  }

  render() {
    const { item, onPress } = this.props;
    const { selected } = this.state;
    return (<View style={styles.categoryItem}>
              <Text style={styles.categoryItemTitle}>{item.name}</Text>
              <View style={styles.btncategoryItem}>
                <Button transparent onPress={() => this.handlePressItem(item)} >
                  {this._renderIcon(item.icon, selected)}
                </Button>
              </View>
            </View>);
    }
}

export default CategoryItem;
