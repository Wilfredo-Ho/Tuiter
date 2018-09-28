import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    Image,
    Dimensions,
    TouchableHighlight,
    TextInput,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import io from 'socket.io-client';

let socket = null;

const dialogData = [
    {
        id: 1,
        user: 'self',
        time: '2018/9/27 11:30',
        text: '中午好'
    }
];

export default class Chat extends Component { 
    constructor(props){
        super(props);
        this.state = {
            text: '',
            dialog: []
        };
        this._handlePress = this._handlePress.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
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
                    <TouchableHighlight onPress={this._handlePress} underlayColor='rgba(0,0,0,0)'>
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

    _sendMessage () {
        if(this.state.text){
            socket.emit('sendMsg', {
                userid: this.props.navigation.state.params.title,
                text: this.state.text
            });
            this.refs.textInput.clear();
            this.setState({
                text: ''
            });
        }
    }

    componentDidMount () {
        socket = io('ws://192.168.10.100:3001');
        socket.on('connect', () => {
            new Promise((resolve, reject) => {
                AsyncStorage.getItem('userid', (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
            }).then(userid => {
                socket.emit('login', {
                    userid: userid
                });
            });
        });

        socket.on('receiveMsg', (data) => {
            console.log(data);
            let obj = {};
            if (data.userid === this.props.navigation.state.params.title) {
                obj['user'] = 'self';
            } else {
                obj['user'] = 'Tom';
            }
            obj['time'] = new Date().getTime();
            obj['text'] = data.text;

            this.setState({
                dialog: this.state.dialog.concat(obj)
            })
        });
    }

    render () {
        return(
            <View style={styles.container}>
                <FlatList
                    data = { this.state.dialog }
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.footer}>
                    <TextInput
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        multiline={true}
                        ref="textInput"
                        style={{ borderWidth: 1, borderColor: '#aaa', borderRadius: 6, flex: 1, height: 40}}
                    />
                    <View style={{ width: 60, textAlign: 'center',  marginLeft: 10}}>
                        <Button title="发送" onPress={this._sendMessage} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    selfDialog: {
        alignItems: 'flex-start',
        flexDirection: 'row-reverse',
    },
    otherDialog: {
        alignItems: 'flex-start',
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
    },
    footer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        padding: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    }
});