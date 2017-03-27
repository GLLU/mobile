import React, { Component } from 'react';
import { View } from 'native-base';

// When you need to make something invisible, but still mounted
class VisibilityContainer extends Component {
  static propTypes = {
    visible: React.PropTypes.bool
  };

  static defaultProps = {
    visible: true
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={this.props.visible ? null:{height:0,width:0}}>
        {this.props.children}
      </View>
    )
  }
}

export default VisibilityContainer;

