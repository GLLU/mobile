import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableWithoutFeedback, Text} from 'react-native';
import * as _ from 'lodash';
import BaseComponent from '../../common/base/BaseComponent';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import Colors from '../../../styles/Colors.styles'

const styles = StyleSheet.create({
  categoryItem: {
    marginHorizontal: 5,
    marginVertical: generateAdjustedSize(5),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: generateAdjustedSize(50)
  },
  categoryItemImage: {
    height: generateAdjustedSize(45),
    width: generateAdjustedSize(45),
    alignSelf: 'center',
  },
  btnCategoryItem: {
    alignSelf: 'center',
    height: generateAdjustedSize(50),
    alignItems: 'center',
  },
  filterName: {
    fontSize: generateAdjustedSize(12),
    textAlign: 'center',
    marginTop: generateAdjustedSize(6),
    color: Colors.Gray,
    alignSelf: 'center',
    flex: 1
  }
});

class FilterButton extends BaseComponent {
  static propTypes = {
    filter: React.PropTypes.object,
    onPress: React.PropTypes.func,
  }

  static defaultProps = {
    onPress: _.noop,
    filter: {
      selected: false,
      name: 'Items',
      highlight: false,
      icon: {
        url: require('../../../../images/filters/filter-categories.png'),
        url_hover: require('../../../../images/filters/filter-categories-active.png'),
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.filter.selected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter.selected !== this.state.selected) {
      this.setState({
        selected: nextProps.filter.selected,
      });
    }
  }

  _renderIcon(icon, selected) {
    let uri = this.props.filter.highlight || (selected) ? icon.url_hover : icon.url;
    if (!_.isNumber(uri)) {
      uri = {uri};
    }
    return <Image source={uri} style={styles.categoryItemImage} resizeMode={'contain'}/>;
  }

  handlePressItem(filter) {
    const shouldSelect = !this.state.selected;
    this.logEvent('Feedscreen', {name: `filter ${this.props.filter.name} was clicked!`, selected: `${shouldSelect}`});
    this.props.onPress(filter);
  }

  render() {
    const {filter} = this.props;
    const {selected} = this.state;
    return (
      <View style={[styles.categoryItem]}>
        <TouchableWithoutFeedback
          transparent
          onPress={() => this.handlePressItem(filter)}
        >
          <View style={{justifyContent: 'center', alignItems: 'center', flex: -1}}>
            {this._renderIcon(filter.icon, selected)}
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.filterName}>{filter.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default FilterButton;
