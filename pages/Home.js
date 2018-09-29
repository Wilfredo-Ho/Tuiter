import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
    TouchableHighlight,
    ToastAndroid,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AvatarArr from '../images/avatar';
import axios from 'axios';
import { SERVER_URL } from '../util/urls';

const block_width = Math.floor((Dimensions.get('window').width - 16) / 4);

let current_user_id = -1;

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
});
export default class Home extends Component { 
    static navigationOptions = {
        tabBarLabel: '身边',
        tabBarIcon: ({focused}) => {
            let color = focused ? '#4BC1D2' : '#999';
            return <Icon name="map-marker-alt" color={color} size={26} />
        }
    }

    constructor (props) {
        super(props);
        this.state = {
            data: null,
            userArr: []
        };
        this.renderList = this.renderList.bind(this);
        this.getGeoLocation = this.getGeoLocation.bind(this);
        this.getAllUser = this.getAllUser.bind(this);
    } 

    getAllUser () {
        axios.get(SERVER_URL + '/users/allUser')
        .then(response => response.data)
        .then(res => {
            if(res.status === 0) {
                let arr = res.lists.filter(item => item.uid != current_user_id).map(item => {
                    return {
                        uid: item['uid'],
                        name: item['username'],
                        online: true,
                        avatar: 2,
                        level: 5,
                        distance: 0.1
                    }
                });
                this.setState({
                    data: arr
                })
            }
        })
    }

    //获取用户地理位置
    getGeoLocation () {
        navigator.geolocation.getCurrentPosition(
            location => {
                new Promise((resolve, reject) => {
                    AsyncStorage.getItem('userid', (error, result) => {
                        if(!error){
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    })
                })
                .then(res => {
                    axios.post(SERVER_URL + '/users/addLocation', {
                            uid: res,
                            lat: location.coords.latitude,
                            lng: location.coords.longitude
                        })
                        .then(response => response.data)
                        .then(res => {
                            if (res.status !== 0) {
                                ToastAndroid.show("存储定位信息失败" + res.message, ToastAndroid.SHORT);
                            }
                        })
                })
            },
            error => {
                ToastAndroid.show(error, ToastAndroid.SHORT);
            })
    }

    componentDidMount () {
        this.getAllUser();
        this.getGeoLocation();
    }

    renderMessage () {
        return (
            <View style={styles.message}>
                <Text>数据加载中...</Text>
            </View>
        );
    }

    _onPressSingle (key) {
        this.props.navigation.navigate('Chat', {
            title: key,
        });
    }

    renderList ({item}) {
        return (
            <TouchableHighlight onPress={() => this._onPressSingle(item.uid)}>
                <View style={styles.block}>
                    <Image source={AvatarArr[`avatar${item.avatar}`]} resizeMode="cover" style={{width: block_width, height: block_width}} />
                    <View style={styles.info}>
                        { item.online && (<View style={styles.online} />) }
                        { item.level === 5 && <Text style={styles.levelHigh}>V</Text>}
                        { item.level === 3 && <Text style={styles.levelLow}>V</Text>}
                        <Text style={styles.distance}>{`${item.distance}km`}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render () {
        if(!this.state.data) {
            return this.renderMessage();
        }
        return(
            <View style={styles.container}>
               <FlatList
                data={this.state.data}
                renderItem={this.renderList}
                extraData={this.state}
                numColumns={4}
                columnWrapperStyle={styles.columnWrapper}
                keyExtractor={(item, index) => index.toString()}
               />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 4,
    },
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    block: {
        marginRight:2,
        marginLeft: 2,
    },
    columnWrapper: {
        marginBottom: 4,
    },
    info: {
        position: 'relative',
    },
    online: {
        position: 'absolute',
        top: -block_width + 2,
        left: 2,
        width: 10,
        height: 10,
        backgroundColor: '#52c41a',
        borderRadius: 5,
    },
    levelHigh: {
        position: 'absolute',
        color: 'white',
        top: -14,
        left: 2,
        backgroundColor: '#f5222d',
        width: 12,
        height: 12,
        fontSize: 10,
        lineHeight: 12,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    levelLow: {
        position: 'absolute',
        color: 'white',
        top: -14,
        left: 2,
        backgroundColor: '#fa8c16',
        width: 12,
        height: 12,
        fontSize: 10,
        lineHeight: 12,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    distance: {
        position: 'absolute',
        color: '#f1f1f1',
        top: -20,
        right: 2
    }
});