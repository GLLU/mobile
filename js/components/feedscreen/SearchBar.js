import React, { Component } from 'react';
import { View, Text, Button, Input, InputGroup, Icon } from 'native-base';

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

  clearSearch() {
    this.setState({
      text: ''
    })
    this.props.handleSearchInput('')
  }

  render() {
    return(
      <View style={styles.searchBar}>
        <InputGroup style={styles.searchInputGroup}>
          <Input style={styles.searchInput} placeholder='( e.g. Yellow Shirt ZARA )' onChangeText={(text) => this.handleTextInput(text)} value={this.state.text}/>
        </InputGroup>
        <Button transparent iconRight onPress={() => this.clearSearch()} style={[styles.btnCloseFilter]}>
          <Icon name="ios-close-circle-outline" style={[styles.smallBtn]} />
        </Button>
      </View>
    )
  }
}

export default SearchBar;
