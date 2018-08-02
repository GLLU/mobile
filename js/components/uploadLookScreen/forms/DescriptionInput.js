import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Animated, BackAndroid, TouchableOpacity, Dimensions } from 'react-native';
import i18n from 'react-native-i18n';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';

const w = Dimensions.get('window').width;

const styles = StyleSheet.create({
  descriptionContainer: {
    zIndex: 4,
  },
  descriptionInputContainer: {
    width: w,
    borderRadius: 10,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundGrey,
    overflow: 'hidden',
    maxHeight: 30,
  },
  descriptionHeaderText: {
    borderRadius: 10,
    padding: 5,
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
  },
  descriptionInput: {
    paddingLeft: 5,
    fontSize: generateAdjustedSize(16),
    backgroundColor: 'white',
    color: Colors.textColor,
    textAlignVertical: 'top',
    height: generateAdjustedSize(90),
  },
  decriptionButtonContainer: {
    height: generateAdjustedSize(50),
    alignItems: 'flex-end',
    backgroundColor: 'white',
  },
  decriptionButton: {
    backgroundColor: '#d5d5d5',
    height: generateAdjustedSize(35),
    marginRight: 15,
    width: 85,
  },
  decriptionButtonText: {
    paddingTop: 7,
    textAlign: 'center',
    color: Colors.black,
    fontSize: generateAdjustedSize(18),
    fontFamily: Fonts.boldContentFont,
  },
});

class DecriptionInput extends Component {

  constructor(props) {
    super(props);
    this._handleNextClick = this._handleNextClick.bind(this);
    this.state = {
      isTabShown: false,
      description: props.description,
      animContent: new Animated.Value(1),
      animContentOnPress: new Animated.Value(0),
    };
  }

  updateDescription(value) {
    this.setState({ description: value });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('descriptionBackPress');
  }

  _handleNextClick() {
    const { onClickNext } = this.props;
    const { description } = this.state;
    onClickNext(description);
  }

  render() {
    const { description } = this.state;
    return (
      <View style={styles.descriptionContainer}>
        <View style={styles.descriptionInputContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder={i18n.t('WRITE_COMMENT_OR_HASHTAG')}
            underlineColorAndroid="transparent"
            value={description}
            editable
            multiline
            autoCorrect={false}
            onChangeText={text => this.updateDescription(text)} />
        </View>
        <View style={styles.decriptionButtonContainer}>
          <TouchableOpacity style={styles.decriptionButton} onPress={this._handleNextClick}>
            <Text style={styles.decriptionButtonText}>{i18n.t('PUBLISH')} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DecriptionInput;
