import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
  }

  static propTypes = {
    description: React.PropTypes.string.isRequired,
    style:React.PropTypes.oneOfType([React.PropTypes.style,React.PropTypes.object])
  };

  static defaultProps = {
    style:{}
  };

  render() {
    return(
      <View style={[this.props.style,styles.container]}>
        <View>
          <Text style={styles.descriptionStyle}>
            {this.props.description + 'sdfjklf kjhafj sadhfjk hfjk hasjk hajksdh jkasdhf jkdshfjk hdsjkfh ajksdfhjk asf'}
          </Text>
        </View>
        <View style={{height:70}}/>
      </View>
    );
  }
}
