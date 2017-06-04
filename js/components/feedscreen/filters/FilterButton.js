import React, { Component } from 'react';
import { StyleSheet, Image,View } from 'react-native'
import {  Button } from 'native-base';
import * as _ from 'lodash';
import BaseComponent from "../../common/base/BaseComponent";

const styles = StyleSheet.create({
  categoryItem: {
    height: 52.5,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 45,
    width: 45,
    alignSelf: 'center',
  },
  btnCategoryItem: {
    alignSelf: 'center',
    height: 50,
    alignItems: 'center',
  },
});

class FilterButton extends BaseComponent {
  static propTypes = {
    activeStyle: React.PropTypes.object,
    filter: React.PropTypes.object,
    onPress: React.PropTypes.func,
  }

  static defaultProps = {
    activeStyle: {
      color: '#00D7B2',
      underline: false
    },
    onPress: _.noop,
    filter: {
      selected: false,
      name: 'Items',
      highlight: false,
      icon: {
        url: require('../../../../images/filters/filter-categories.png'),
        url_hover: require('../../../../images/filters/filter-categories-active.png')
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.filter.selected
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.filter.selected
    })
  }

  _renderIcon(icon, selected) {
    let uri = this.props.filter.highlight || (selected && !this.props.activeStyle.underline) ? icon['url_hover'] : icon['url'];
    if (!_.isNumber(uri)) {
      uri = {uri: uri};
    }
    return <Image source={uri} style={styles.categoryItemImage} resizeMode={'contain'}/>;
  }

  handlePressItem(filter) {
    const shouldSelect = !this.state.selected;
    this.logEvent('FeedScreen', {name: `filter ${this.props.filter.name} was clicked!`,selected:shouldSelect});
    this.props.filter.selected = shouldSelect;
    this.props.onPress(filter);
    this.setState({selected: shouldSelect});
  }

  getHiglight(shouldHighlight) {
    if (shouldHighlight) {
      return {
        borderBottomColor: this.props.activeStyle.color,
        borderBottomWidth: 3
      }
    }
    return {}
  }

  render() {
    const {filter} = this.props;
    const {selected} = this.state;
    return (
      <View style={[styles.categoryItem, this.getHiglight(selected && this.props.activeStyle.underline)]}>
        <Button
          transparent
          onPress={() => this.handlePressItem(filter)}
          style={StyleSheet.flatten(styles.btnCategoryItem)}>
          {this._renderIcon(filter.icon, selected)}
        </Button>
      </View>
    );
  }
}

export default FilterButton;
