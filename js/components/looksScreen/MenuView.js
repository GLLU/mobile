import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { noop } from 'lodash'
import BottomHalfScreenModal from "./common/BottomHalfScreenModal";
import SolidButton from "../common/buttons/SolidButton";
import * as _ from "lodash";
import withAnalytics from '../common/analytics/WithAnalytics'

const cancelIcon = require('../../../images/icons/cancel-black.png');

class MenuView extends Component {

  static propTypes = {
    style: React.PropTypes.any,
    isOpen: React.PropTypes.bool,
    onReportPress: React.PropTypes.func,
    onEditPress: React.PropTypes.func,
    onShareClicked: React.PropTypes.func,
    actions: React.PropTypes.arrayOf(React.PropTypes.string)
  };

  static defaultProps = {
    style: {},
    isOpen: false,
    onRequestClose: noop,
    onDeletePress: noop,
    onEditPress: noop,
    onReportPress: noop,
    onShareClicked: noop
  };

  actionsConfig = [
    {id: 'share', label: 'Share', onPress: this.props.onShareClicked},
    {id: 'edit', label: 'Edit', onPress: this.props.onEditPress},
    {id: 'delete', label:'Delete',onPress:this.props.onDeletePress},
    {id: 'report', label: 'Report', onPress: this.props.onReportPress},
  ];

  renderSeparator=()=><View style={{height: 5, backgroundColor: 'black'}}/>;

  renderRow({label, onPress}) {
    return (
      <View style={{height: 100, paddingVertical: 20}}>
        <SolidButton style={{backgroundColor: '#00D7B2'}} label={label} onPress={onPress}/>
      </View>
    );
  }

  getActionParams=(id)=>_.find(this.actionsConfig, actionEntry => actionEntry.id === id);

  render() {
    return (
      <BottomHalfScreenModal {...this.props} style={{borderWidth: 5}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.props.onRequestClose}>
            <Image style={{height: 25, width: 25, margin: 5}} source={cancelIcon}/>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 25}}>
          <FlatList
            data={this.props.actions}
            keyExtractor={(item,index)=>index}
            renderItem={({item}) => this.renderRow(this.getActionParams(item))}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </BottomHalfScreenModal>
    );
  }
}

export default withAnalytics(MenuView);