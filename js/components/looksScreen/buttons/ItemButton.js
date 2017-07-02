import React, { PureComponent } from 'react';
import * as _ from 'lodash'
import FooterButton from './FooterButton'

class ItemButton extends PureComponent {

  static propTypes = {
    categoryIcon:React.PropTypes.object,
    onPress: React.PropTypes.func,
    isActive: React.PropTypes.bool
  };

  static defaultProps = {
    categoryIcon:{},
    onPress: _.noop,
    isActive: false
  };

  getIconByActive = (iconObject,isActive) => isActive ? iconObject.url_hover : iconObject.url;

  render() {
    const iconUrl =this.getIconByActive(this.props.categoryIcon,this.props.isActive);
    return (
      <FooterButton {...this.props} isActive={false} iconUrl={iconUrl}/>
    );
  }
}

export default ItemButton;
