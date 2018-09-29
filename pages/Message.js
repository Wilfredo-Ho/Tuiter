import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ToastAndroid,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { formatDatetime, SERVER_URL } from '../util/urls';
import axios from 'axios';

let current_user_id = -1;



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
        this.state = {
            news: []
        };
        this._handlePress = this._handlePress.bind(this);
        this.getNewsList = this.getNewsList.bind(this);
        this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
            new Promise((resolve, reject) => {
                AsyncStorage.getItem('userid', (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
            }).then(userid => {
                current_user_id = userid;
                this.getNewsList(userid);
            }).catch(error => {
                ToastAndroid.show(error.message, ToastAndroid.LONG);
            })
        });
    }

    _handlePress () {
        alert(11);
         this.props.navigation.navigate('Detail');
    }

    _renderItem({item}) {
        return (
            <TouchableHighlight onPress={() => this._handlePress} underlayColor='white'>
                <View style={ styles.itemWpt }>
                    <Image source={require('../images/avatar/2.jpeg')} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    <View style={ styles.contentWpt }>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.username}</Text>
                            <Text style={styles.time}>{formatDatetime(item.time)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>{item.text}</Text>
                            <Text style={styles.badge}>{(item.count > 99) ? 99 : item.count}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    getNewsList (value) {
        axios.post(SERVER_URL + '/news/unreadList', {
                id: value
            })
            .then(reponse => reponse.data)
            .then(res => {
                if (res.status === 0) {
                    this.setState({
                        news: res.lists
                    })
                } else {
                    ToastAndroid.show(res.message, ToastAndroid.LONG);
                }
            })
    }

    componentWillUnmount() {
        this.navigationWillFocusListener.remove();
    }

    render () {
        if (this.state.news.length === 0) {
            return (<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}><Text>暂无消息</Text></View>)
        }

        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.news}
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
    },
    itemWpt: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contentWpt: {
        flex: 1,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 4
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 4
    },
    title: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#000'
    },
    time: {
        color: '#bfbfbf'
    },
    text: {
        color: '#595959'
    },
    badge: {
        width: 16,
        height: 16,
        lineHeight: 16,
        backgroundColor: '#f5222d',
        borderRadius: 8,
        fontSize: 10,
        color: '#fff',
        textAlign: 'center'
    }
});