import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


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

    static propTypes = {
        name:React.PropTypes.string,
        username:React.PropTypes.string,
        aboutMe:React.PropTypes.string,
        avatar:React.PropTypes.object,
        onFollowPress:React.PropTypes.func,
        onUserPress:React.PropTypes.func,
        userid:React.PropTypes.number,
        isFollowing:React.PropTypes.bool
    };

    constructor(props){
        super(props);
        this.renderFollowText=this.renderFollowText.bind(this);
    }

    onUserPress(){
        this.props.onUserPress(this.props);
    }

    renderFollowText(){
        console.log('debug start');
        console.log(this.props);
        console.log('debug end');
        return(
            <View onPress={this.onUserPress.bind(this)} style={styles.textContainer}>
                <View style={styles.followTitle}>
                    <Text >{this.props.name}</Text>
                    <Text style={styles.followUsername}>@{this.props.username}</Text>
                </View>
                <Text style={styles.followAboutMe}>{this.props.about_me}</Text>
            </View>
        )};

    render(){
        return(
            <TouchableOpacity onPress={this.onUserPress.bind(this)} style={[styles.container,this.props.style]}>
                <View style={styles.photoContainer}>
                    <Image resizeMode='cover' source={{ uri: this.props.avatar.url}} style={styles.photo} />
                </View>
                {this.renderFollowText()}
                <FollowView onPress={this.props.onFollowPress} style={styles.followView} user={{id:this.props.user_id, isFollowing:this.props.is_following}}/>
            </TouchableOpacity>
        )};
}

export default FollowRow;