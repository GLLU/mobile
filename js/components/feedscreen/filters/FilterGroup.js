// @flow

import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FilterButton from './FilterButton';
import _ from 'lodash';

type Props = {
  filters: array,
  onSelectionChange: void,
  mode: string
};

class FilterGroup extends Component {

  props: Props

  static defaultProps = {
    onSelectionChange: _.noop,
    filters: [],
    mode: 'multi',
  }

  constructor(props) {
    super(props);
    this.onSingleSelectValue = this.onSingleSelectValue.bind(this);
    this.onMultipleSelectValue = this.onMultipleSelectValue.bind(this);
  }

  onSingleSelectValue(filter) {
    this.props.onSelectionChange(filter);
  }

  onMultipleSelectValue(filter) {
    const iteratee = (filter1, filter2) => filter1.id === filter2.id;
    const filters = _.map(this.props.filters, item => iteratee(item, filter) ? filter : item);
    this.props.onSelectionChange(filters);
  }

  render() {
    const {filters} = this.props;
    return (
      <ScrollView horizontal style={styles.container}
                  contentContainerStyle={[filters.length < 7 ? {flex: 1, justifyContent: 'space-around'} : null]}>
        {_.map(filters, (filter, i) => (
          <FilterButton
            onPress={this.props.mode === 'multi' ? this.onMultipleSelectValue : this.onSingleSelectValue}
            key={i} filter={filter}/>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },

});

export default FilterGroup;
