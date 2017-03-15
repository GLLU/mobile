import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Input, InputGroup, Icon } from 'native-base';
import BaseComponent from '../common/BaseComponent';
import _ from 'lodash';
import styles from './styles';
import FontSizeCalculator from './../../calculators/FontSize';

const myStyles = StyleSheet.create({
  searchBar: {
    position: 'relative',
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInputGroup: {
    borderBottomWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  searchInput: {
    borderLeftWidth: 0,
    backgroundColor: 'white',
    borderLeftColor: 'black',
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: new FontSizeCalculator(14).getSize(),
    fontWeight: '200'
  },
  btnCloseFilter: {
    marginLeft: 15,
    alignSelf: 'center',
    marginRight: 5,
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
    if(nextProps.clearText === ''){
      this.setState({
        text: ''
      })
    }
  }

  _doSearch(text) {
    this.logEvent('Feedscreen', { name: 'Search' });
    this.props.handleSearchInput(text)
  }

  handleTextInput(text){
    this.setState({
      text: text
    }, () => {
      this.doSearch(text);
    });
  }

  clearSearch() {
    this.logEvent('Feedscreen', { name: 'Clear search' });
    this.setState({
      text: ''
    })
    this.props.handleSearchInput('')
  }

  render() {
    return(
      <View style={myStyles.searchBar}>
        <InputGroup style={myStyles.searchInputGroup}>
          <Input style={myStyles.searchInput} placeholder='( e.g. Yellow Shirt ZARA )' onChangeText={(text) => this.handleTextInput(text)} value={this.state.text}/>
        </InputGroup>
        <Button transparent iconRight onPress={() => this.clearSearch()} style={[myStyles.btnCloseFilter]}>
          <Icon name="ios-close-circle-outline" style={[styles.smallBtn]} />
        </Button>
      </View>
    )
  }
}

export default SearchBar;
