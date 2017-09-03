import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux';
import i18n from 'react-native-i18n';
import Autocomplete from './CustomAutocomplete';
import {loadBrands} from '../../../actions';
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
    brand: React.PropTypes.string,
    brands: React.PropTypes.array,
    loadBrands: React.PropTypes.func,
    findOrCreateBrand: React.PropTypes.func,
    onCancel: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      query: props.brand ? props.brand.name : '',
      data: props.brands
    };

    this.doFilterAsync = _.debounce(this.doFilter, 200)
  }

  componentWillMount() {
    this.props.loadBrands().catch(err => {
    });
  }

  handleFindOrCreateBrand(value) {
    this.setState({query: value.name}, () => {
      this.props.findOrCreateBrand(value);
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
  }

  doFilter(text) {
    this.props.loadBrands(text).then(response => {
      this.setState({
        data: response,
      });
    }).catch(err => {
    });
  }

  render() {
    const {query, data} = this.state;
    const {brand} = this.props;
    const selected = !!(brand && query && query.toLowerCase() === brand.toLowerCase());
    return (
      <View style={{paddingBottom: 20, paddingTop: 20, flex: 1}}>
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
          placeholder={i18n.t("TYPE_BRAND_NAME")}
          findOrCreateBrand={this.handleFindOrCreateBrand.bind(this)}
          onCancel={this.props.onCancel}/>
      </View>);
  }
}

function bindActions(dispatch) {
  return {
    loadBrands: (term) => dispatch(loadBrands(term)),
  }
}

const mapStateToProps = state => {
  return ({
    brands: state.filters.brands,
  });
};

export default connect(mapStateToProps, bindActions)(BrandNameInput);
