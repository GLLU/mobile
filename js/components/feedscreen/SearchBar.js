import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, Platform, View, TouchableHighlight } from 'react-native';
import withAnalytics from '../common/analytics/WithAnalytics';
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
    justifyContent: 'center',
    alignItems: 'center',
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

class SearchBar extends Component {
  static propTypes = {
    handleSearchInput: React.PropTypes.func,
    clearText: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    this.clearSearch=this.clearSearch.bind(this);
    this.handleTextInput=this.handleTextInput.bind(this);
    this.doSearch = _.debounce(this._doSearch, 500);
    this.state = {
      text: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearText === '') {
      this.setState({
        text: ''
      })
    }
  }

  _doSearch(text) {
    this.props.logEvent('Feedscreen', {name: 'Search'});
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
    this.props.logEvent('Feedscreen', {name: 'Clear search'});
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
          placeholder='Search'
          underlineColorAndroid='transparent'
          onChangeText={this.handleTextInput}
          value={this.state.text}/>
        <TouchableHighlight onPress={this.clearSearch} style={styles.btnCloseFilter}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default withAnalytics(SearchBar);
