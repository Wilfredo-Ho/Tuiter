import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Alert,
    ToastAndroid,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SERVER_URL } from '../util/urls';

import axios from 'axios';

const paddingWidth = Dimensions.get('window').width * 0.15;

export default class Register extends Component { 
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordRepeat: ''
        };
        this._usernameChange = this._usernameChange.bind(this);
        this._passwordChange = this._passwordChange.bind(this);
        this._passwordRepeatChange = this._passwordRepeatChange.bind(this);
        this._onPressButton = this._onPressButton.bind(this);
        this._toLogin = this._toLogin.bind(this);
    }

    _usernameChange (text) {
        this.setState({
            username: text
        })
    }

    _passwordChange (text) {
        this.setState({
            password: text
        })
    }

    _passwordRepeatChange (text) {
        this.setState({
            passwordRepeat: text
        });
    }

    _onPressButton () {
        let text = '';
        if (!this.state.username && !this.state.password && !this.state.passwordRepeat){
            text = '用户名/密码不能为空';
        }
        if (this.state.password != this.state.passwordRepeat) {
            text = '两次密码输入不一致';
        }
        if (text) {
            Alert.alert("校验失败", text);
        } else {
            axios.post(SERVER_URL + '/users/register', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => response.data)
            .then(res => {
                ToastAndroid.show(res.message, ToastAndroid.SHORT);
                if(res.status === 0) {
                    this.props.navigation.navigate("Login");
                }
            })
        }
    }

    _toLogin() {
        this.props.navigation.navigate('Login');
    }

    render () {
        return(
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Icon name="twitter" size={50} color="#2196F3" />
                    <Text style={styles.brandEn}>TUITTER</Text>
                    <Text style={styles.brandCh}>开启交友新模式</Text>
                </View>
                <View style={styles.group}>
                   < TextInput 
                   style={styles.input}
                   onChangeText={this._usernameChange}
                   placeholder = "请输入手机号"
                   placeholderTextColor = "#ddd" / >
                </View>
                <View style={styles.group}>
                   <TextInput 
                   style={styles.input}
                   onChangeText={this._passwordChange}
                   placeholder="请输入密码"
                   secureTextEntry={true}
                   placeholderTextColor="#ddd" />
                </View>
                 <View style={styles.group}>
                   <TextInput 
                   style={styles.input}
                   onChangeText={this._passwordRepeatChange}
                   placeholder="确认密码"
                   secureTextEntry={true}
                   placeholderTextColor="#ddd" />
                </View>
                <TouchableHighlight onPress={this._onPressButton} underlayColor="white" style={styles.buttonWpt}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>注册</Text>
                    </View>
                </TouchableHighlight>
                <View style={{ flexDirection: 'row', marginTop: 10}}>
                    <Text>已有账号，前往</Text>
                    <TouchableHighlight onPress={this._toLogin}>
                        <Text style={{color: '#2196F3'}}>登录</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 80,
        paddingLeft: paddingWidth,
        paddingRight: paddingWidth
    },
    logo: {
        alignItems: 'center',
        marginBottom: 30,
    },
    brandEn: {
        fontWeight: 'bold',
        letterSpacing: 10,
    },
    brandCh: {
        fontSize: 12,
        color: '#999'
    },
    group: {
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1,
        marginTop: 10
    },
    input: {
        paddingLeft: 4,
    },
    buttonWpt: {
        marginTop: 30,
    },
    button: {
        backgroundColor: '#2196F3',
        alignItems: 'center',
    },
    buttonText: {
        padding: 14,
        color: 'white',
        fontSize: 14
    }
});