// @flow

import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FilterButton from './FilterButton';
import _ from 'lodash';

type Props = {
  filters: array,
  onSelectionChange: void,
  mode: string,
  activeStyle: object
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

  renderAsScrollView(content) {
    return (
      <ScrollView horizontal>
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
      <View style={styles.container}>
        {_.map(filters, (filter, i) => (
          <FilterButton
            activeStyle={this.props.activeStyle}
            onPress={this.props.mode === 'multi' ? this.onMultipleSelectValue : this.onSingleSelectValue}
            key={i} filter={filter}/>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },

});

export default FilterGroup;
