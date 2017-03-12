import React, {Component} from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  descriptionStyle: {
    paddingLeft:12,
    paddingRight:12,
    color:"black",
    fontSize:16
  }

});

export default class DescriptionView extends Component {

  constructor(props) {
    super(props);
    this.state= {
      fadeAnimContent : new Animated.Value(-300)
    };
  }

  static propTypes = {
    description: React.PropTypes.string.isRequired,
    style:React.PropTypes.oneOfType([React.PropTypes.style,React.PropTypes.object]),
    isHidden:React.PropTypes.bool
  };

  static defaultProps = {
    style:{},
    isHidden:true
  };

  componentDidMount(){
    //this._animateShow()
  }

  componentWillUnmount(){
    //this._animateHide()
  }

  _animateShow(){
    Animated.spring(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 0,
        friction: 9
      }            // Configuration
    ).start();
  }

  _animateHide(){
    Animated.spring(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: -300,
        friction: 9
      }            // Configuration
    ).start();
  }

  render() {
    if(this.props.isHidden){
      this._animateHide()
    }
    else{
      this._animateShow()
    }
    return(
      <Animated.View style={[{bottom: this.state.fadeAnimContent},this.props.style,styles.container]}>
        <View>
          <Text style={styles.descriptionStyle}>
            {this.props.description + 'sdfjklf kjhafj sadhfjk hfjk hasjk hajksdh jkasdhf jkdshfjk hdsjkfh ajksdfhjk asf'}
          </Text>
        </View>
        <View style={{height:70}}/>
      </Animated.View>
    );
  }
}
