import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View, Image, TextInput, Text, Animated, Platform, BackAndroid } from 'react-native';
import i18n from 'react-native-i18n';
import Colors from '../../../styles/Colors.styles';
import { generateAdjustedSize } from './../../../utils/AdjustabaleContent';

const DESCRIPTION_ICON_SIZE = 22;
const EXIT_ICON_SIZE = 13;
const descriptionIcon = require('../../../../images/icons/blackBubble.png');
const exitIcon = require('../../../../images/icons/cancel-clear-x.png');

const styles = StyleSheet.create({
  decriptionContainer: {
    left: 15,
    top: Platform.OS === 'ios' ? 100 : 78,
    padding: 5,
    position: 'absolute',
  },
  descriptionButton: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    width: DESCRIPTION_ICON_SIZE + 10,
    height: DESCRIPTION_ICON_SIZE + 10,
  },
  commentImage: {
    top: 6,
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
    left: 10,
    top: 40,
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
    fontSize: 14,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    height: generateAdjustedSize(100),
  },
});

class DecriptionInput extends Component {

  constructor(props) {
    super(props);
    this._toggleDesciption = this._toggleDesciption.bind(this);
    this.animatedInput = this.animatedInput.bind(this);
    this.state = {
      isTabShown: false,
      description: props.description,
      animContent: new Animated.Value(1),
      animContentOnPress: new Animated.Value(0),
    };
  }

  _toggleDesciption() {
    const { addDescription } = this.props;
    const { description } = this.state;
    const self = this;
    if (this.state.animContentOnPress._value !== 0) {
      BackAndroid.removeEventListener('descriptionBackPress');
      this.animatedInput(0).start(function onComplete() {
        self.setState({ isTabShown: false });
        addDescription(description);
      });
    } else {
      BackAndroid.addEventListener('descriptionBackPress', () => {
        BackAndroid.removeEventListener('descriptionBackPress');
        this.animatedInput(0).start(function onComplete() {
          self.setState({ isTabShown: false });
          addDescription(description);
        });
        return true;
      });
      this.setState({ isTabShown: true });
      this.animatedInput(generateAdjustedSize(350)).start();
      
    }
  }

  animatedInput(number, delay = 250) {
    return Animated.timing(          // Uses easing functions
      this.state.animContentOnPress,    // The value to drive
      {
        toValue: number,
        delay,
      }
    );
  }

  updateDescription(value) {
    const { addDescription } = this.props;
    this.setState({ description: value });
  }

  componentWillMount() {
    const { animContent } = this.state;
    Animated.timing(          // Uses easing functions
      animContent,    // The value to drive
      {
        toValue: generateAdjustedSize(350),
        delay: 250,
      }            // Configuration
    ).start();
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('descriptionBackPress');
  }

  render() {
    const { isTabShown, description, animContentOnPress } = this.state;
    return (
      <View style={styles.decriptionContainer}>
        <TouchableHighlight style={styles.descriptionButton} onPress={this._toggleDesciption}>
          <Image source={descriptionIcon} style={styles.commentImage} />
        </TouchableHighlight>
        { isTabShown ?
          <Animated.View style={[styles.descriptionInputContainer, { width: animContentOnPress }]}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.descriptionHeaderText}> {i18n.t('SELECT_ITEM_DESCRIPTION')} </Text>
              <TouchableOpacity onPress={this._toggleDesciption}>
                <Image source={exitIcon} style={styles.exitImage} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.descriptionInput}
              underlineColorAndroid="transparent"
              value={description}
              editable
              multiline
              autoCorrect={false}
              onChangeText={text => this.updateDescription(text)} />
          </Animated.View> : null }
      </View>
    );
  }
}

export default DecriptionInput;
