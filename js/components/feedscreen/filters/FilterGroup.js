import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import { View, Text, Button } from 'native-base';
import FilterButton from './FilterButton'
import _ from 'lodash'

const styles = StyleSheet.create({});

class FilterGroup extends Component {
  static propTypes = {
    filters: React.PropTypes.array,
    onSelectionChange: React.PropTypes.func,
  }

  static defaultProps = {
    onSelectionChange: _.noop,
    filters: []
  }

  constructor(props) {
    super(props);
    this.onSelectValue = this.onSelectValue.bind(this);
  }

  componentWillUpdate() {
  }

  onSelectValue(filter) {
    let iteratee = () => false;
    if (filter.selected === true) {
      iteratee = (filter1, filter2) => filter1.name === filter2.name;
    }

    const filters = _.map(this.props.filters, item => {
      item.selected = iteratee(item, filter);
      return item;
    });

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
            <FilterButton onPress={this.onSelectValue} key={i} filter={filter}/>
          );
        })}
      </View>
    );
  }
}

export default FilterGroup;
