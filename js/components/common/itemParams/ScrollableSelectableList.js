// @flow

import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SelectableItem from './SelectableItem';
import _ from 'lodash';

type Props = {
  filters: array,
  onSelectionChange: void,
  mode: string
};

class ScrollableSelectableList extends Component {

  props: Props

  static defaultProps = {
    onSelectionChange: _.noop,
    filters: [],
    mode: 'multi',
  }

  constructor(props) {
    super(props);
    this.onSingleSelectValue = this.onSingleSelectValue.bind(this);
    this.checkMultiSelectedQuery = this.checkMultiSelectedQuery.bind(this);
    this.checkSingleSelectedQuery = this.checkSingleSelectedQuery.bind(this);
  }

  onSingleSelectValue(filter) {
    this.props.onSelectionChange(filter);
  }

  checkSingleSelectedQuery() {
    const checkedFilters = _.map(this.props.filters, (filter, i) => {
      const {currentFilter} = this.props;
      const clonedFilter = _.cloneDeep(filter);
      if (currentFilter === filter.id) {
        clonedFilter.selected = true;
      }
      return clonedFilter;
    });
    return checkedFilters;
  }

  checkMultiSelectedQuery() {
    const checkedFilters = _.map(this.props.filters, (filter, i) => {
      const {currentFilter} = this.props;
      const clonedFilter = _.cloneDeep(filter);
      for (i = 0; i < currentFilter.length; i++) {
        if (currentFilter[i] === clonedFilter.id) {
          clonedFilter.selected = true;
        }
      }
      return clonedFilter
    })
    return checkedFilters
  }

  render() {
    const {mode} = this.props
    const filters = mode === 'single' ? this.checkSingleSelectedQuery() : this.checkMultiSelectedQuery()
    return (
      <ScrollView horizontal style={styles.container}
                  contentContainerStyle={[filters.length < 7 ? styles.contentContainerStyle : null]}>
        {_.map(filters, (filter, i) => (
          <SelectableItem
            onPress={this.onSingleSelectValue}
            key={i} filter={filter}/>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 7
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ScrollableSelectableList;
