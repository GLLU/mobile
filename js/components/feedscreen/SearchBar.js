import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, Input, InputGroup } from 'native-base';
import _ from 'lodash';

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
    borderLeftWidth: 1,
    backgroundColor: 'white',
    borderLeftColor: 'black',
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 18,
    fontWeight: '800'
  },
  searchInputBorder: {
    borderRightWidth: 2,
    borderColor: '#7F7F7F',
    height: 30,
    marginLeft: 10
  },
});

class SearchBar extends Component {
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
    this.props.handleSearchInput(text)
  }

  handleTextInput(text){
    this.setState({
      text: text
    }, () => {
      this.doSearch(text);
    });
  }

  render() {
    return(
      <View style={myStyles.searchBar}>
        <View style={myStyles.searchInputBorder}></View>
        <InputGroup style={myStyles.searchInputGroup}>
          <Input style={myStyles.searchInput} placeholder='Search' onChangeText={(text) => this.handleTextInput(text)} value={this.state.text}/>
        </InputGroup>
      </View>
    )
  }
}

export default SearchBar;
