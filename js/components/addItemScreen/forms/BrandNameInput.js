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
    const query = this.props.brand ? this.props.brand.name : '';
    this.state = {
      query,
      selected: (this.props.brand != null)
    };
  }

  componentWillReceiveProps(nextProps) {
    const query = nextProps.brand ? nextProps.brand.name : '';
    console.log('componentWillReceiveProps query', query, nextProps.brand);
    this.setState({
      query,
      selected: (nextProps.brand != null)
    });
  }

  componentWillMount() {
    this.props.loadBrands();
  }

  handleFindOrCreateBrand(value, act) {
    const query = act ? value : value.name;
    const selected = true;
    this.setState({query, selected}, () => {
      this.props.findOrCreateBrand(value, act);
    });
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
    console.log('onChangeText', text, this.state.query);
    this.setState({ query: text, selected: false });
    // const name = this.props.brand ? this.props.brand.name : '';
    // if (text != name || text == '') {
    //   this.props.clearBrandName();
    // }
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
            value={query}
            onChangeText={text => this.onChangeText(text)}
            placeholder="Type a brand name"
            findOrCreateBrand={this.handleFindOrCreateBrand.bind(this)}/>
      </View>);
  }
}

function bindActions(dispatch) {
  return {
    loadBrands: () => dispatch(loadBrands()),
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
