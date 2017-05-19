import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Platform,View } from 'react-native';
import {  Button } from 'native-base';
import BaseComponent from '../common/base/BaseComponent';
import _ from 'lodash';
import FontSizeCalculator from './../../calculators/FontSize';

const styles = StyleSheet.create({
  searchBar: {
    position: 'relative',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 10,
  },
  searchInput: {
    borderBottomWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft:10,
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: new FontSizeCalculator(12).getSize(),
    fontWeight: '200',
    color: '#757575',
    borderRadius: 10,
    height: Platform.OS === 'ios' ? 30 : 40
  },
  btnCloseFilter: {
    marginHorizontal: 5,
    alignSelf: 'center',
    borderWidth: 0.4,
    borderColor: '#757575',
    borderRadius: 10,
    height: 20,
    width: 65
  },
  clearText: {
    color: '#757575',
    fontSize: new FontSizeCalculator(12).getSize(),

  },
});

class SearchBar extends BaseComponent {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }

    this.doSearch = _.debounce(this._doSearch, 500)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearText === '') {
      this.setState({
        text: ''
      })
    }
  }

  _doSearch(text) {
    this.logEvent('Feedscreen', {name: 'Search'});
    this.props.handleSearchInput(text)
  }

  handleTextInput(text) {
    this.setState({
      text: text
    }, () => {
      this.doSearch(text);
    });
  }

  clearSearch() {
    this.logEvent('Feedscreen', {name: 'Clear search'});
    this.setState({
      text: ''
    })
    this.props.handleSearchInput('')
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder='( e.g. Yellow Shirt ZARA )'
          underlineColorAndroid='transparent'
          onChangeText={(text) => this.handleTextInput(text)}
          value={this.state.text}/>
        <Button transparent onPress={() => this.clearSearch()} style={StyleSheet.flatten(styles.btnCloseFilter)}>
          <Text style={styles.clearText}>Clear</Text>
        </Button>
      </View>
    )
  }
}

export default SearchBar;
