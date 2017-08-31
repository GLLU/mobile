import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ListHeader from './ListHeader';
import { isEmpty, noop } from "lodash";
import FullscreenView from "../containers/FullscreenView";
import Separator from "./Separator";

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6'
  }
})

export default class ListScreen extends Component {

  static propTypes = {
    headerData: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    onEndReached: React.PropTypes.func,
    keyExtractor: React.PropTypes.func,
    renderItem: React.PropTypes.func,
    renderEmpty: React.PropTypes.func,
  };

  static defaultProps={
    keyExtractor:(item,index)=>item.id!==-1?item.id:index,
  };

  constructor(props) {
    super(props);
    this.state = {
      isTrueEndReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.data)) {
      this.setState({isTrueEndReached: true});
    }
  }

  renderList=()=>{
    return (
      <FlatList
        style={styles.container}
        data={this.props.data}
        keyExtractor={(item, index) => item.id !== -1 ? item.id : index}
        ItemSeparatorComponent={()=><Separator/>}
        renderItem={({item}) => this.props.renderItem(item)}
        onEndReached={this.state.isTrueEndReached? noop:this.props.onEndReached}
        onEndReachedThreshold={100}
    />
    );
  };

  render() {
    return (
      <FullscreenView style={{backgroundColor:'white'}}>
        <ListHeader {...this.props.headerData} goBack={this.props.goBack}/>
        {this.props.data.length > 0 ? this.renderList() : this.props.renderEmpty() }
      </FullscreenView>
    );
  }
}

