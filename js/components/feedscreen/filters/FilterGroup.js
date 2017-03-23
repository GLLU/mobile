import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import { View, Text, Button } from 'native-base';
import FilterButton from './FilterButton'
import _ from 'lodash'

class FilterGroup extends Component {
  static propTypes = {
    filters: React.PropTypes.array,
    onSelectionChange: React.PropTypes.func,
    activeStyle: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['single', 'multi'])
  };

  static defaultProps = {
    onSelectionChange: _.noop,
    filters: [],
    mode: 'multi'
  }

  constructor(props) {
    super(props);
    this.onSingleSelectValue = this.onSingleSelectValue.bind(this);
    this.onMultipleSelectValue = this.onMultipleSelectValue.bind(this);
  }

  componentWillUpdate() {
  }

  onSingleSelectValue(filter) {
    let iteratee = () => false;
    if (filter.selected === true) {
      iteratee = (filter1, filter2) => filter1.id === filter2.id;
    }

    const filters = _.map(this.props.filters, item => {
      item.selected = iteratee(item, filter);
      return item;
    });

    this.props.onSelectionChange(filters)
  }

  onMultipleSelectValue(filter) {
    iteratee = (filter1, filter2) => filter1.id === filter2.id;


    const filters = _.map(this.props.filters, item => iteratee(item, filter) ? filter : item);

    this.props.onSelectionChange(filters)
  }

  renderAsScrollView(content) {
    return (
      <ScrollView horizontal={true}>
        {content}
      </ScrollView>
    );
  }

  renderAsView(content) {
    return content;
  }

  render() {
    const {filters} = this.props;
    const renderer = (filters || []).length > 4 ? this.renderAsScrollView : this.renderAsView;
    return renderer(
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
        {_.map(filters, (filter, i) => {
          return (
            <FilterButton activeStyle={this.props.activeStyle}
                          onPress={this.props.mode === 'multi' ? this.onMultipleSelectValue : this.onSingleSelectValue}
                          key={i} filter={filter}/>
          );
        })}
      </View>
    );
  }
}

export default FilterGroup;
