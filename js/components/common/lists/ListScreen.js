import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ListViewHeader from './ListHeader';
import { isEmpty, noop } from "lodash";
import FullscreenView from "../containers/FullscreenView";

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

  render() {
    return (
      <FullscreenView style={{backgroundColor:'white'}}>
        <ListViewHeader {...this.props.headerData} goBack={this.props.goBack}/>
        <FlatList
          style={styles.container}
          data={this.props.data}
          keyExtractor={this.props.keyExtractor}
          renderItem={({item}) => this.props.renderItem(item)}
          onEndReached={this.state.isTrueEndReached? noop:this.props.onEndReached}
          onEndReachedThreshold={100}
        />
      </FullscreenView>
    );
  }
}

