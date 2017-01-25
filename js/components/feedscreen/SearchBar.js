import React, { Component } from 'react';
import { View, Text, Button, Input, InputGroup } from 'native-base';

import styles from './styles';

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
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clearText === ''){
      this.setState({
        text: ''
      })
    }
  }

  handleTextInput(text){
    this.setState({
      text: text
    })
    this.props.handleSearchInput(text)
  }

  render() {
    return(
      <View style={styles.searchBar}>
        <View style={styles.searchInputBorder}></View>
        <InputGroup style={styles.searchInputGroup}>
          <Input style={styles.searchInput} placeholder='Search' onChangeText={(text) => this.handleTextInput(text)} value={this.state.text}/>
        </InputGroup>
      </View>
    )
  }
}

export default SearchBar;
