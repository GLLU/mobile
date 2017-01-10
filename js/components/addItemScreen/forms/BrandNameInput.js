import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'native-base';

import Autocomplete from './CustomAutocomplete';

import styles from './styles';

class BrandNameInput extends Component {
  static propTypes = {
    brandName:  React.PropTypes.string,
    brands: React.PropTypes.array,
    findOrCreateBrand: React.PropTypes.func,
    clearBrandName: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      brands: this.props.brands,
      query: this.props.brandName,
      selected: false
    };
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

    const { brands } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    let result = brands.filter(brand => brand.name.search(regex) >= 0);
    return result;
  }

  onChangeText(text) {
    this.setState({ query: text, selected: false });
    if (text != this.state.brandName || text == '') {
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
  return { };
}

const mapStateToProps = state => ({
  brands: state.filters.brands
});

export default connect(mapStateToProps, bindActions)(BrandNameInput);
