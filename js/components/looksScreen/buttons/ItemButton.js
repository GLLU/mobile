import React, { Component } from 'react';
import * as _ from 'lodash'
import FooterButton from './FooterButton'
import { connect } from 'react-redux';

class ItemButton extends Component {
  constructor(props) {
    super(props);
    //get the category icon
    const category = _.find(this.props.categories, category => category.name === this.props.category);
    const icon = category? category.icon : {};
    this.state = {
      icon: icon.url,
      iconActive: icon.url_hover
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

  render() {
    return (
      <FooterButton {...this.props} iconUrl={this.props.isActive?this.state.iconActive:this.state.icon}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.filters.categories,
  };
};

export default connect(mapStateToProps)(ItemButton);
