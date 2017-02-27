import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { View } from 'native-base';

import Autocomplete from './CustomAutocomplete';
import { loadBrands } from '../../../actions';
import _ from 'lodash';

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    padding: 5
  },
  autocompleteContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});

class BrandNameInput extends Component {
  static propTypes = {
    brand:  React.PropTypes.object,
    brands: React.PropTypes.array,
    loadBrands: React.PropTypes.func,
    findOrCreateBrand: React.PropTypes.func,
    clearBrandName: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      data: props.brands
    };

    this.doFilterAsync = _.debounce(this.doFilter, 200)
  }

  componentWillMount() {
    this.props.loadBrands();
  }

  handleFindOrCreateBrand(value, createNew) {
    const query = createNew ? value : value.name;
    this.setState({query}, () => {
      this.props.findOrCreateBrand(value, createNew);
    });
  }

  onChangeText(text) {
    this.setState({
      query: text
    }, () => {
      this.doFilterAsync(text);  
    })
  }

  onEndEditing(e) {
    // console.log('onEndEditing', e);
  }

  doFilter(text) {
    this.props.loadBrands(text).then(response => {
      this.setState({
        data: response,
      });  
    });
    
  }

  render() {
    const { query, data } = this.state;
    const { brand } = this.props;
    const selected = brand && query.toLowerCase() === brand.name.toLowerCase();
    return (
      <View style={{marginBottom: 20}}>
        <Autocomplete
            query={query}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid='transparent'
            selected={selected}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={[styles.autocompleteContainer]}
            listStyle={styles.slistStyle}
            data={data}
            defaultValue={query}
            value={query}
            onChangeText={text => this.onChangeText(text)}
            onEndEditing={e => this.onEndEditing(e)}
            placeholder="Type a brand name"
            findOrCreateBrand={this.handleFindOrCreateBrand.bind(this)}/>
      </View>);
  }
}

function bindActions(dispatch) {
  return {
    loadBrands: (term) => dispatch(loadBrands(term)),
  }
}

const mapStateToProps = state => {
  const look = state.uploadLook;
  const item = _.find(look.items, item => item.id == look.itemId);
  return ({
    brands: state.filters.brands,
    brand: item ? item.brand : null
  });
};

export default connect(mapStateToProps, bindActions)(BrandNameInput);
