import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Modal,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {SERVER_URL} from '../util/urls';

const dict = {
    gender: ["保密", "男", "女"],
    status: ["保密", "单身", "约会中", "已婚"],
}

export default class Mine extends Component { 
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused}) => {
            let color = focused ? '#4BC1D2' : '#999';
            return <Icon name="user" color={color} size={26} />
        }
    }

     constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            modalTitle: '昵称',
            modalContent: null,
            hasFooter: true,
            text: '',
            changeType: 'username', //输入类型： 用户名、签名
            user: {
                username: '',
                gender: '',
                status: '',
                sign: '' 
            }
        };
        this._onPressButton = this._onPressButton.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this._changeName = this._changeName.bind(this);
        this._renderGenderList = this._renderGenderList.bind(this);
        this._changeGender = this._changeGender.bind(this);
        this._renderStatusList = this._renderStatusList.bind(this);
        this._changeStatus = this._changeStatus.bind(this);
        this._changeSign = this._changeSign.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.changeMsg = this.changeMsg.bind(this);
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
                this.getUserInfo(userid);
            }).catch(error => {
                ToastAndroid.show(error.message, ToastAndroid.LONG);
            })
        });
    }

    _onPressButton () {
        AsyncStorage.removeItem('userid', (err) => {
            if(!err) {
                this.props.navigation.navigate('Login');
            } else {
                ToastAndroid.show('退出登录失败，请稍候重试', ToastAndroid.SHORT);
            }
        });
    }

    getUserInfo (value) {
        axios.post(SERVER_URL + '/users/getUserById', {
                id: value
            })
            .then(reponse => reponse.data)
            .then(res => {
                if (res.status === 0) {
                    this.setState({
                        user: {
                            username: res.lists[0].username,
                            gender: res.lists[0].gender,
                            status: res.lists[0].status,
                            sign: res.lists[0].sign
                        }
                    })
                } else {
                    ToastAndroid.show(res.message, ToastAndroid.LONG);
                }
            })
    }

    _changeName() {
        let view = (<TextInput
                        onChangeText={(text) => this.setState({text})}
                        style={{ borderBottomWidth: 2, borderBottomColor: '#1890ff'}}
                        autoFocus={true}
                    />);
        this.setState({
            modalTitle: '昵称',
            modalContent: view,
            modalVisible: true,
            hasFooter: true,
            changeType: 'username'
        })
    }

    _renderGenderList () {
        let viewItems = dict.gender.map((item, index) => (<TouchableHighlight onPress={() => this._changeGender(item)} key={index} style={styles.item}><Text style={styles.itemText}>{item}</Text></TouchableHighlight>));
        this.setState({
            modalTitle: '性别',
            modalContent: viewItems,
            modalVisible: true,
            hasFooter: false
        })
    }

    _changeGender (value) {
        this.changeMsg('/users/changeGender', dict.gender.indexOf(value));
    }

    _renderStatusList () {
        let viewItems = dict.status.map((item, index) => (<TouchableHighlight onPress={() => this._changeStatus(item)} key={index} style={styles.item}><Text style={styles.itemText}>{item}</Text></TouchableHighlight>));
        this.setState({
            modalTitle: '当前状态',
            modalContent: viewItems,
            modalVisible: true,
            hasFooter: false
        })
    }

    _changeStatus (value) {
        this.changeMsg('/users/changeStatus', dict.status.indexOf(value));
    }

    _changeSign () {
        let view = (<TextInput
                        onChangeText={(text) => this.setState({text})}
                        style={{ borderBottomWidth: 2, borderBottomColor: '#1890ff'}}
                        autoFocus={true}
                    />);
        this.setState({
            modalTitle: '签名',
            modalContent: view,
            modalVisible: true,
            hasFooter: true,
            changeType: 'sign'
        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    changeMsg (url, value) {
        axios.post(SERVER_URL + url, {
            id: current_user_id,
            value
        })
        .then(response => response.data)
        .then(res => {
            if (res.status === 0) {
                this.getUserInfo(current_user_id);
            } else {
                ToastAndroid.show(res.message, ToastAndroid.LONG);
            }
        })

        this.setState({
            text: '',
            modalVisible: false
        });
    }

    submitChange () {
        if (this.state.changeType === 'sign') {
            this.changeMsg('/users/changeSign', this.state.text);
        }

        if(this.state.changeType === 'username') {
            this.changeMsg('/users/changeName', this.state.text);
        }
    }

    componentWillUnmount () {
        this.navigationWillFocusListener.remove();
    }

    render () {
        const { username, gender, status, sign} = this.state.user;
        return(
            <View style={styles.container}>
                <View style={styles.groupWpt}>
                    <View style={styles.group}>
                        <Text style={styles.title}>头像</Text>
                        <Image source={require('../images/avatar/3.jpeg')} style={{ width: 80, height: 80 }} />
                    </View>
                    <TouchableOpacity onPress={this._changeName} style={styles.group}>
                        <Text style={styles.title}>昵称</Text>
                        <Text>{username}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._renderGenderList} style={styles.group}>
                        <Text style={styles.title}>性别</Text>
                        <Text>{dict.gender[gender]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._renderStatusList} style={styles.group}>
                        <Text style={styles.title}>状态</Text>
                        <Text>{dict.status[status]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._changeSign} style={{...styles.group, borderBottomWidth: 0}}>
                        <Text style={styles.title}>签名</Text>
                        <Text>{sign}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 40, alignItems: 'center',}}>
                    <Button onPress={this._onPressButton} title="退出登录"></Button>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                    >
                    <View style={styles.ModalBg}>
                        <View style={styles.ModalContainer}>
                            <Text style={styles.title}>{this.state.modalTitle}</Text>
                            <View style={styles.modalContent}>
                                { this.state.modalContent }
                            </View>
                            { this.state.hasFooter && 
                                (<View style={styles.footer}>
                                    <TouchableHighlight
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        }}
                                    >
                                        <Text style={{ color: '#096dd9', marginRight: 40 }}>取消</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        onPress={this.submitChange}
                                    >
                                        <Text style={{ color: '#096dd9' }}>确定</Text>
                                    </TouchableHighlight>
                                </View>)
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    groupWpt: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
    group: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: 14,
        paddingBottom: 14,
    },
    title: {
        color:'#333',
        fontSize: 16
    },
    ModalBg: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 40
    },
    ModalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 6
    },
    footer: {
        flexDirection: 'row',
        color: '#1890ff',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10
    },
    item: {
        margin: 10,
        marginLeft: 0
    },
    itemText: {
        fontSize: 14
    }
});