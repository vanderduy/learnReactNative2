import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
})

export default class DragAndDrop extends Component {
    constructor(props){
        super(props)
        this.top = 0
        this.left = 0
        this.box = null
        this.customStyle= {
            style : {
                top: this.top,
                left: this.left
            }
        }
    }
    componentWillMount(){
        this._panResponder= PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState)=>true,
            onMoveShouldSetPanResponder: (event, gestureState)=>true,
            onPanResponderGrant:(event, gestureState)=>{
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaa'+event)
            },
            onPanResponderMove:(event, gestureState)=>{
                this.customStyle.top = this.top + gestureState.dy
                this.customStyle.left = this.left + gestureState.dx
                this.updateNativeProps()
            },
            onPanResponderRelease:(event,gestureState)=>{
                this.top += gestureState.dy
                this.left += gestureState.dx
            }
        })
    }

    updateNativeProps(){
        this.box && this.box.setNativeProps(this.customStyle)
    }

    render(){
        return(
            <View style={styles.container} >
                <View ref={(_view)=>this.box= _view} style={styles.box} {...this._panResponder.panHandlers}>

                </View>
            </View>
        )
    }
}
