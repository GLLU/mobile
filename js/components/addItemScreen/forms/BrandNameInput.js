import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { View } from 'native-base';

import Autocomplete from './CustomAutocomplete';
import { readEndpoint } from '../../../actions';

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
    const query = this.props.brand ? this.props.brand.name : '';
    this.state = {
      query,
      selected: false
    };
  }

  componentWillMount() {
    this.props.loadBrands().then(response => {
      console.log('loadBrands', response);
    });
  }

  componentDidMount() {
  }

  handleFindOrCreateBrand(value, act) {
    this.state.query = act ? value : value.name;
    this.state.selected = !act;
    this.props.findOrCreateBrand(value, act);
  }

  findBrand(query) {
    if (query === '') {
      return [];
    }

    const { brands } = this.props;
    const regex = new RegExp(`${query.trim()}`, 'i');
    let result = brands.filter(brand => brand.name.search(regex) >= 0);
    return result;
  }

  onChangeText(text) {
    this.setState({ query: text, selected: false });
    const name = this.props.brand ? this.props.brand.name : '';
    if (text != name || text == '') {
      this.props.clearBrandName();
    }
  }

  render() {
    const { query } = this.state;
    const brands = this.findBrand(query);
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
    let l = Object.keys(brands).length;
    let height = (l == 0 || this.state.selected ? 40 : 220);
    if ( l == 0 && this.state.query !== '') {
      height = 80;
    }
    return (
      <View style={{marginBottom: 20}}>
        <Autocomplete
          query={this.state.query}
          autoCapitalize="none"
          autoCorrect={false}
          selected={this.state.selected}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={[styles.autocompleteContainer, {height: height}]}
          listStyle={styles.slistStyle}
          data={brands.length === 1 && comp(query, brands[0].name) ? [] : brands}
          defaultValue={query}
          onChangeText={text => this.onChangeText(text)}
          placeholder="Type a brand name"
          findOrCreateBrand={this.handleFindOrCreateBrand.bind(this)}/>
      </View>);
  }
}

function bindActions(dispatch) {
  return {
    loadBrands: () => dispatch(readEndpoint('brands')),
  }
}

const mapStateToProps = state => {
  let brands = [];
  if (state.api.brands) {
    brands = state.api.brands.data.map(x => {
      return {id: x.id, name: x.attributes['name'] };
    });
  }
  return ({
    brands,
    brand: state.uploadLook.brand
  });
};

export default connect(mapStateToProps, bindActions)(BrandNameInput);
