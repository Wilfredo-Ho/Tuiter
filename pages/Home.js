import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AvatarArr from '../images/avatar';

const block_width = Math.floor((Dimensions.get('window').width - 16) / 4);
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
            data: null
        };
        this.generateData = this.generateData.bind(this);
        this.renderList = this.renderList.bind(this);
    } 

    generateData () {
        const arr = [];
        for(let i = 0; i < 100; i++) {
            arr.push({
                key: i + 1,
                online: Math.random() > 0.7 ? true : false,
                avatar: Math.ceil(Math.random() * 10),
                level: Math.ceil(Math.random() * 5),
                distance: (Math.random() * 10).toFixed(2)
            });
        };
        //按照距离重排数组
        this.setState({
            data: arr.sort((item1, item2) => item1.distance - item2.distance)
        })
    }

    componentDidMount () {
        this.generateData();
    }

    renderMessage () {
        return (
            <View style={styles.message}>
                <Text>数据加载中...</Text>
            </View>
        );
    }

    _onPressSingle (key) {
        this.props.navigation.navigate('Detail');
    }

    renderList ({item}) {
        return (
            <TouchableHighlight onPress={() => this._onPressSingle(item.key)}>
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
                numColumns={4}
                columnWrapperStyle={styles.columnWrapper}
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