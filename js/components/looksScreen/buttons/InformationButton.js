import React, {Component} from 'react';
import { View, Image, TouchableHighlight, StyleSheet  } from 'react-native';
import * as _ from 'lodash'

const infoIcon =require('../../../../images/infoIcon.png');
import styles from '../styles'

export default class InformationButton extends Component {
    constructor(props) {
        super(props);
        this._onPress=this._onPress.bind(this)
        this.state={
          isOpen:this.props.isOpen
        }
    }

    static propTypes = {
        onPress: React.PropTypes.func,
        isOpen: React.PropTypes.bool
    };

    static defaultProps = {
        onPress: _.noop,
        isOpen: false
    };

    _getStyle(isActive){
      return isActive ? styles.footerButtonActive : styles.footerButton;
    }

    _onPress(){
      const shouldOpen = !this.state.isOpen;
      this.props.onPress(shouldOpen);
      this.setState({isOpen:shouldOpen})
    }

    render() {
      return (
        <TouchableHighlight style={{marginRight: 10}} onPress={this._onPress}>
            <View style={[this._getStyle(this.state.isOpen), {width:40}]}>
                <Image source={infoIcon} style={{height: 25, width: 25, resizeMode: 'contain', right: 2}}/>
            </View>
        </TouchableHighlight>
      );
    }
}

