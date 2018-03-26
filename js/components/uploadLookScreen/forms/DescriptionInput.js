import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View, Image, TextInput, Text } from 'react-native';
import Colors from '../../../styles/Colors.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';

const DESCRIPTION_ICON_SIZE = 22;
const EXIT_ICON_SIZE = 13;
const descriptionIcon = require('../../../../images/icons/blackBubble.png');
const exitIcon = require('../../../../images/icons/cancel-clear-x.png');

const styles = StyleSheet.create({
  decriptionContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    right: 20,
    top: 130,
    backgroundColor: Colors.secondaryColor,
    padding: 5,
    borderRadius: 15,
    position: 'absolute',
  },
  commentImage: {
    width: DESCRIPTION_ICON_SIZE,
    height: DESCRIPTION_ICON_SIZE,
  },
  exitImage: {
    marginTop: 8,
    marginRight: 8,
    width: EXIT_ICON_SIZE,
    height: EXIT_ICON_SIZE,
  },
  descriptionInputContainer: {
    borderRadius: 10,
    position: 'absolute',
    left: 20,
    top: 130,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: generateAdjustedSize(350),
    backgroundColor: Colors.backgroundGrey,
  },
  descriptionHeaderText: {
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionInput: {
    paddingLeft: 5,
    fontSize: 14,
    backgroundColor: 'white',
    width: generateAdjustedSize(350),
    height: generateAdjustedSize(100),
  },
});

class DecriptionInput extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDescriptionEndEditing = this.handleDescriptionEndEditing.bind(this);
    this.state = {
      isTabShown: false,
      description: props.description,
    };
  }

  handleClick(isTabShown) {
    this.setState({ isTabShown });
  }

  updateDescription(value) {
    this.setState({ description: value });
  }

  handleDescriptionEndEditing() {
    const { addDescription } = this.props;
    const { description } = this.state;
    addDescription(description);
  }

  render() {
    const { isTabShown, description } = this.state;
    return (
      !isTabShown ?
        <TouchableHighlight style={styles.decriptionContainer} onPress={() => this.handleClick(true)}>
          <Image source={descriptionIcon} style={styles.commentImage} />
        </TouchableHighlight>
        :
        <View style={styles.descriptionInputContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionHeaderText}> Describe your look </Text>
            <TouchableOpacity onPress={() => this.handleClick(false)}>
              <Image source={exitIcon} style={styles.exitImage} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            editable
            multiline
            autoCorrect={false}
            onEndEditing={this.handleDescriptionEndEditing}
            onChangeText={text => this.updateDescription(text)} />
        </View>
    );
  }
}

export default DecriptionInput;
