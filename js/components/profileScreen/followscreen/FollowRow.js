import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


import FollowView from '../FollowView'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex:7,
        flexDirection:'column',
        marginLeft: 12
    },
    followTitle: {
        flex:0.5,
        flexDirection:'row',
    },
    followUsername:{
        color:'#00a9ff',
        marginLeft:12
    },
    followAboutMe: {
        flex:0.5,
    },
    photoContainer: {
        flex:2,
    },
    photo: {
        flex:1,
        // //weird responsive bug :D
        // width:null,
        // height:null,
        width:50,
        height:50,
        borderRadius:25
    },
    followView: {
        flex:3
    }
});

class FollowRow extends Component {

    constructor(props){
        super(props);
        this.renderFollowText=this.renderFollowText.bind(this);
    }

    renderFollowText(){
        return(
            <View style={styles.textContainer}>
                <View style={styles.followTitle}>
                    <Text >{this.props.name}</Text>
                    <Text style={styles.followUsername}>@{this.props.username}</Text>
                </View>
                <Text style={styles.followAboutMe}>{this.props.aboutMe}</Text>
            </View>
        )};

    render(){
        return(
            <View style={[styles.container,this.props.style]}>
                <View style={styles.photoContainer}>
                    <Image resizeMode='cover' source={{ uri: this.props.avatar.url}} style={styles.photo} />
                </View>
                {this.renderFollowText()}
                <FollowView style={styles.followView} user={{id:this.props.userid, isFollowing:this.props.isFollowing}}/>
            </View>
        )};
}

export default FollowRow;