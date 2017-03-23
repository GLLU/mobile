import React, { Component } from 'react';
import { StyleSheet, Image, UIManager, LayoutAnimation } from 'react-native'
import { View, Text, Button } from 'native-base';
import {noop} from 'lodash'

const styles = StyleSheet.create({
  categoryItem: {
    height: 85,
    width: 80,
    marginHorizontal:4,
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
    height: 50,
    alignItems: 'center',
  },
});

class FilterButton extends Component {
  static propTypes = {
    filter: React.PropTypes.object,
    onPress: React.PropTypes.func,
  }

  static defaultProps={
    onPress:noop,
    filter:{
      selected:false,
      name:'Items',
      icon:{
        url: require('../../../../images/filters/filter-categories.png'),
        url_hover: require('../../../../images/filters/filter-categories-active.png')
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: props.filter.selected
    }

    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.filter.selected
    })
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  _renderIcon(icon, selected, width, height) {
    const uri = selected ? icon['url_hover'] : icon['url'];
    return <Image source={uri} style={[styles.categoryItemImage, { width, height }]} resizeMode={'contain'}/>;
  }

  handlePressItem(filter) {
    const shouldSelect=!this.state.selected;
    this.props.filter.selected=shouldSelect;
    this.props.onPress(filter);
    this.setState({selected: shouldSelect});
  }

  render() {
    const { filter } = this.props;
    const { selected } = this.state;
    const iconWidth = 50;
    const iconHeight = 50;
    return (<View style={[styles.categoryItem]}>
      <Text style={styles.categoryItemTitle}>{filter.name}</Text>
      <Button
        transparent
        onPress={() => this.handlePressItem(filter)}
        style={[styles.btnCategoryItem]}>
        {this._renderIcon(filter.icon, selected, iconWidth, iconHeight)}
      </Button>
    </View>);
  }
}

export default FilterButton;
