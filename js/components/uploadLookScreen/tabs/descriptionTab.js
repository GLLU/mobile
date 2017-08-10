// @flow

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Colors from '../../../styles/Colors.styles';

type Props = {
  addDescription: () => void,
  description: string,
};

class DescriptionTab extends Component {

  props: Props

  constructor(props) {
    super(props);
    this.handleDescriptionEndEditing = this.handleDescriptionEndEditing.bind(this);
    this.state = {
      description: props.description
    }
  }

  updateDescription(value) {
    this.setState({
      description: value
    });
  }

  handleDescriptionEndEditing() {
    //this.logEvent('UploadLookScreen', {name: 'Additional Info Description', description: this.props.description});
    this.props.addDescription(this.state.description);
  }

  render() {
    return (

        <View
          style={[styles.filtersGroupContainer]}>
          <TextInput
            textAlignVertical='top'
            multiline={true}
            style={[styles.describe, {minHeight: 80}]}
            value={this.state.description}
            placeholder="Describe what you're wearing..."
            underlineColorAndroid='transparent'
            onEndEditing={this.handleDescriptionEndEditing}
            onChangeText={(text) => this.updateDescription(text)}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  rowEdgeShadow: {
    position: 'absolute',
    width: 15,
    backgroundColor: Colors.white,
    opacity: 0.8,
  },

});

export default DescriptionTab;
