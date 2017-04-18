import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as _ from 'lodash'
import FooterButton from './FooterButton'
import { connect } from 'react-redux';

const bubbleIcon = require('../../../../images/bubble.png');
//get the category icon
class ItemButton extends Component {
  constructor(props) {
    super(props);
    const category = _.find(this.props.categories, category => category.name === this.props.category);
    this.iconNotActive = category.icon.url
    this.iconActive = category.icon.url_hover
    this.state = {
      icon: this.iconActive
    }
  }

  static propTypes = {
    onPress: React.PropTypes.func,
    isActive: React.PropTypes.bool
  };

  static defaultProps = {
    onPress: _.noop,
    isActive: false
  };
  componentWillReceiveProps(nextProps) {
    if(nextProps.isActive === true) {
      this.setState({icon: this.iconNotActive})
    } else {
      this.setState({icon: this.iconActive})
    }
  }

  render() {
    return (
      <FooterButton {...this.props} iconUrl={this.state.icon}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
  };
}

const mapStateToProps = state => {
  return {
    categories: state.filters.categories,
  };
};

export default connect(mapStateToProps, bindAction)(ItemButton);
