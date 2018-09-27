import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';

const dialogData = [
    {
        id: 1,
        user: 'self',
        time: '2018/9/27 11:30',
        text: '中午好'
    },
    {
        id: 2,
        user: 'Tom',
        time: '2018/9/27 11:32',
        text: '中午好，待会儿咱们吃什么'
    },
    {
        id: 3,
        user: 'self',
        time: '2018/9/27 11:34',
        text: '不知道，不太有胃口，你来定吧'
    },
    {
        id: 4,
        user: 'Tom',
        time: '2018/9/27 11:36',
        text: '听说楼下新开了一家粥铺，我们去尝尝吧'
    },
    {
        id: 5,
        user: 'self',
        time: '2018/9/27 11:38',
        text: '好的'
    },
    {
        id: 6,
        user: 'self',
        time: '2018/9/27 13:10',
        visible: false,
        text: '你到哪里了?怎么半天不回复我消息，你是不是有什么事情耽误了，需要我帮你带饭吗？'
    }
];

export default class Message extends Component { 
    static navigationOptions = {
        tabBarLabel: '消息',
        tabBarIcon: ({focused}) => {
            let color = focused ? '#4BC1D2' : '#999';
            return <Icon name="message" color={color} size={26} />
        }
    }

    constructor(props){
        super(props);
        this._handlePress = this._handlePress.bind(this);
    }

    _handlePress () {
        alert(11);
         this.props.navigation.navigate('Detail');
    }

    _renderItem({item}) {
        return (
            <View style={{marginTop: 4}}>
                {
                    item.visible && (<Text style={{backgroundColor: '#ccc', color: '#fff', padding: 2, margin: 10, alignItems: 'center', width: 100}}>5分钟前</Text>)
                }
                <View style={ item.user === 'self' ? styles.selfDialog : styles.otherDialog }>
                    <TouchableHighlight onPress={() => this._handlePress}>
                        <Image source={require('../images/avatar/2.jpeg')} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    </TouchableHighlight>
                    <View>
                        <Text style={[styles.textWpt, item.user === 'self' ? styles.selfText : styles.otherText]} >{item.text}</Text>
                        <View style={item.user === 'self' ? styles.rightTriangle : styles.leftTriangle} />
                    </View>
                </View>
            </View>
        );
    }

    render () {
        return(
            <View style={styles.container}>
                <FlatList
                    data={dialogData}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    selfDialog: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    otherDialog: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    selfText: {
        backgroundColor: '#69c0ff',
        color: '#fff',
        marginRight: 10,
    },
    otherText: {
        backgroundColor: '#f5f5f5',
        color: '#333',
        marginLeft: 10,
    },
    textWpt: {
        padding: 10,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 4,
        maxWidth: Dimensions.get('window').width * 0.7
    },
    rightTriangle: {
        width: 0,
        height: 0,
        borderTopWidth: 4,
        borderTopColor: 'transparent',
        borderBottomWidth: 4,
        borderBottomColor: 'transparent',
        borderRightWidth: 4,
        borderRightColor: 'transparent',
        borderLeftWidth: 4,
        borderLeftColor: '#69c0ff',
        position: 'absolute',
        right: 2,
        top: 10
    },
    leftTriangle: {
        width: 0,
        height: 0,
        borderTopWidth: 4,
        borderTopColor: 'transparent',
        borderBottomWidth: 4,
        borderBottomColor: 'transparent',
        borderRightWidth: 4,
        borderRightColor: '#f5f5f5',
        borderLeftWidth: 4,
        borderLeftColor: 'transparent',
        position: 'absolute',
        left: 2,
        top: 10
    }
});