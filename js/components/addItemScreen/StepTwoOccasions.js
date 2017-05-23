import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text,StyleSheet, Platform, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  loadOccasionTags,
  toggleOccasionTag
} from '../../actions';
import OccasionsStrip from '../common/OccasionsStrip';
import FontSizeCalculator from '../../calculators/FontSize';
import _ from 'lodash';
import Gllu from '../common';
import BaseComponent from '../common/base/BaseComponent';
import ExtraDimensions from 'react-native-extra-dimensions-android';
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;


const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  titleLabelInfo: {
    fontFamily: 'Montserrat',
    flexWrap: 'nowrap',
    color: 'white',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(14).getSize(),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingTop: 5,
  },
  textBtn: {
    fontWeight: '500',
    fontSize: new FontSizeCalculator(18).getSize(),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  headinSharing: {
    fontFamily: 'Montserrat',
    color: '#000000',
    fontSize: new FontSizeCalculator(20).getSize(),
    fontWeight: '300',
    marginTop: 15,
    paddingTop: 20
  },
  legendLabel: {
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '500',
    paddingTop: 8
  },
  containerStyle: {
  },
  labelStyle: {
    flex: 1
  },
  checkboxStyle: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderRadius: 13,
  },
  checkboxLabelStyle: {
    fontFamily: 'Montserrat',
    fontSize: new FontSizeCalculator(15).getSize(),
    fontWeight: '300',
    paddingTop: 15
  },
  textInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
  textInfo: {
    color: '#000',
    fontFamily: 'Montserrat',
    fontWeight: '300',
    fontSize: new FontSizeCalculator(12).getSize(),
    paddingTop: 5,
    paddingLeft: 10
  },
  iconInfo: {
    fontSize: new FontSizeCalculator(35).getSize()
  }
});

class StepTwoOccasions extends BaseComponent {
  static propTypes = {
    categories: React.PropTypes.array,
    selectedCategory: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  }

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimContentOnPress: new Animated.Value(0),
      selectedOccasions: props.item.occasions ? props.item.occasions : []
    }
  }

  componentWillMount() {
    this.props.loadOccasionTags().catch(err => {
      console.log('unable to load occasionTags');
    });
  }

  componentWillReceiveProps(nextProps) {
    const selectedCategory = nextProps.item.category ? nextProps.item.category : false
    const brand = nextProps.item ? nextProps.item.brand : null
      if(selectedCategory && brand && this.state.selectedOccasions.length === 0 && this.state.fadeAnimContentOnPress._value === 0) {
        this.toggleBottomContainer()
      }
      if(nextProps.item.id !== this.props.item.id) {
        this.setState({selectedOccasions: nextProps.item.occasions})
      }
  }

  selectOccasion(selectedOccasion) {
    this.logEvent('UploadLookScreen', { name: 'Category select', category: selectedOccasion.name });
    let { selectedOccasions } = this.state;
    let isSelected = _.find(selectedOccasions, Occasion => Occasion.id === selectedOccasion.id) ? true : false;
    this.props.toggleOccasionTag(selectedOccasion, isSelected, this.props.item.id)
    if(isSelected) {
      selectedOccasions =  _.filter(selectedOccasions, function(occasion) { return occasion.id !== selectedOccasion.id; })
    } else {
      selectedOccasions.push(selectedOccasion)
    }
    this.setState({selectedOccasions})
      let that = this
      setTimeout(function(){ that.toggleBottomContainer(); }, 1500);
  }

  toggleBottomContainer() {
    if (this.state.fadeAnimContentOnPress._value === 90) {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 0,
          delay: 250
        }            // Configuration
      ).start();
    } else {
      Animated.timing(          // Uses easing functions
        this.state.fadeAnimContentOnPress,    // The value to drive
        {
          toValue: 90,
          delay: 250
        }            // Configuration
      ).start();
    }
  }

  renderOpenButton() {
    const btnColor = this.state.selectedOccasions.length === 0 ? 'rgba(32, 32, 32, 0.4)' : 'rgba(0, 255, 128, 0.6)'
    return (
      <TouchableWithoutFeedback onPress={() => this.toggleBottomContainer()}>
        <View style={{width: 20, height: 50, backgroundColor: btnColor, alignSelf: 'center'}}>
          <FontAwesome style={{transform: [{ rotate: '90deg'}], fontSize: 16, marginTop: 20}} name="bars"/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() { //
    const { occasionTags } = this.props;
    const selectedOccasions = this.state.selectedOccasions;
    return(
      <View style={{ flexDirection: 'row', height: h / 1.8, overflow: 'hidden'}}>
        <Animated.View style={{backgroundColor: 'rgba(32, 32, 32, 0.8)',  width: this.state.fadeAnimContentOnPress, borderRadius: 10}}>
          <Text numberOfLines={1} style={styles.titleLabelInfo}>Occasions</Text>
          <OccasionsStrip
            occasions={occasionTags}
            selectedOccasions={selectedOccasions}
            onOccasionSelected={(cat) => this.selectOccasion(cat)}
            currItemId={this.props.item.id}/>
        </Animated.View>
        {this.renderOpenButton()}
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    loadOccasionTags: () => dispatch(loadOccasionTags()),
    toggleOccasionTag: (tag, selected, itemId) => dispatch(toggleOccasionTag(tag, selected, itemId)),
  };
}

const mapStateToProps = state => {
  return {
    categories: state.filters.categories,
    occasionTags: state.filters.occasion_tags,

  };
};

export default connect(mapStateToProps, bindActions)(StepTwoOccasions);