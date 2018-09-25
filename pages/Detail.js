import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
    ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import MomentsArr from '../images/moments';

const news = [
    {
        key: 1,
        time: '2018/9/25 14:10:33',
        address: '天津市水上公园',
        editor: '周婧',
        pics: ['moment1', 'moment2'],
        content: '我还是喜欢你,像风走了八万里,不问归期。',
        praiseNum: 219,
        commentNum: 45,
        commentLists: [
            {
                key: 1,
                user: '张尐',
                comment: '满纸荒唐言'
            },
            {
                key: 2,
                user: '余燊',
                comment: '腹有诗书气自华'
            },
            {
                key: 3,
                user: '韩枏',
                comment: '喜欢一个人一定要用尽全力'
            }
        ]
    },
    {
        key: 1,
        time: '2018/9/25 14:10:33',
        address: '天津市水上公园',
        editor: '周婧',
        pics: ['moment1', 'moment2'],
        content: '我还是喜欢你,像风走了八万里,不问归期。',
        praiseNum: 219,
        commentNum: 45,
        commentLists: [{
                key: 1,
                user: '张尐',
                comment: '满纸荒唐言'
            },
            {
                key: 2,
                user: '余燊',
                comment: '腹有诗书气自华'
            },
            {
                key: 3,
                user: '韩枏',
                comment: '喜欢一个人一定要用尽全力'
            }
        ]
    },
    {
        key: 3,
        time: '2018/9/25 14:10:33',
        address: '天津市水上公园',
        editor: '周婧',
        pics: ['moment1', 'moment2'],
        content: '我还是喜欢你,像风走了八万里,不问归期。',
        praiseNum: 219,
        commentNum: 45,
        commentLists: [{
                key: 1,
                user: '张尐',
                comment: '满纸荒唐言'
            },
            {
                key: 2,
                user: '余燊',
                comment: '腹有诗书气自华'
            },
            {
                key: 3,
                user: '韩枏',
                comment: '喜欢一个人一定要用尽全力'
            }
        ]
    },
    {
        key: 4,
        time: '2018/9/25 14:10:33',
        address: '天津市水上公园',
        editor: '周婧',
        pics: ['moment1', 'moment2'],
        content: '我还是喜欢你,像风走了八万里,不问归期。',
        praiseNum: 219,
        commentNum: 45,
        commentLists: [{
                key: 1,
                user: '张尐',
                comment: '满纸荒唐言'
            },
            {
                key: 2,
                user: '余燊',
                comment: '腹有诗书气自华'
            },
            {
                key: 3,
                user: '韩枏',
                comment: '喜欢一个人一定要用尽全力'
            }
        ]
    }
];

export default class Detail extends Component { 
    static navigationOptions = {
        headerTitle: '详细资料',
        headerTitleStyle: {
            textAlign: 'center'
        }
    };

    _renderItem ({item}) {
        let imgCount = item.pics.length;
        let count = imgCount > 3 ? 3 : imgCount;
        let imgWidth = Math.floor( (Dimensions.get('window').width - 10) / count );
        imgWidth > 300 && (imgWidth = 300);
        const Imgs = item.pics.map((imgItem, index) => <Image source={MomentsArr[imgItem]} key={`${index}`} style={{ width: imgWidth, height: imgWidth }} /> );

        return (
            <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
                <View style={{flexDirection: 'row',}}>
                    <Image source={require('../images/avatar/1.jpeg')} style={{width: 50, height: 50, borderRadius: 25, margin: 10}} />
                    <View style={{paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between'}}>
                        <Text style={{ color: '#333', fontSize: 16}}>{item.editor}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ color: '#aaa', fontSize: 12}}><Icon name="map-marker" />  {item.address}</Text>
                            <Text style={{ color: '#aaa', fontSize: 12, marginLeft: 20}}><Icon name="calendar" /> {item.time}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{marginTop: 10, marginBottom: 10, fontSize: 14}}>&nbsp;&nbsp;&nbsp;&nbsp;{item.content}</Text>
                <View style={{ flexDirection: 'row', justifyContent:'space-around'}}>
                    { imgCount > 0 &&  Imgs}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 4, paddingLeft: 6,paddingRight: 6 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{marginRight: 10,}}><Icon name="thumbs-o-up" /> {item.praiseNum}</Text>
                        <Text><Icon name="commenting-o" style={{}} /> {item.commentNum}</Text>
                    </View>
                    <Text>&#183;&#183;&#183;</Text>
                </View>
            </View>
        );
    }

    _onScroll (event) {
        console.log(event.nativeEvent.contentOffset.y);
    }

    render () {
        return(
            <ScrollView style={styles.container} onScroll={this._onScroll}>
                <View style={{alignItems: 'center',}}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../images/avatar/1.jpeg')} style={{width: 100, height: 100, borderRadius: 50}} />
                        <Text style={{ color: '#000', fontSize: 15, marginTop: 10 }}>周婧</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={{color: '#666'}}>18 岁<Text>&nbsp;&#183;&nbsp;</Text>人事助理<Text>&nbsp;&#183;&nbsp;</Text>热恋中</Text>
                        <Icon name="venus" color='#f759ab' size={12} style={{ textAlignVertical: 'top', marginTop: 3, marginLeft: 10}} />
                    </View>
                    <View style={styles.group}>
                        <Text style={styles.label}>活泼开朗</Text>
                        <Text style={styles.label}>善解人意</Text>
                        <Text style={styles.label}>喜欢旅游</Text>
                    </View>
                    <View style={styles.group}>
                        <Icons name="quote-left" color='#bfbfbf' size={12} />
                        <Text style={{ paddingLeft: 8, paddingRight: 8}}>逆风如解意，容易莫摧残</Text>
                        <Icons name="quote-right" color='#bfbfbf' size={12} />
                    </View>
                    <View style={styles.group}>
                        <Text style={{...styles.star, marginRight: 20}}>关注&nbsp;&nbsp;<Text style={styles.number}>1</Text></Text>
                        <Text style={styles.star}>粉丝&nbsp;&nbsp;<Text style={styles.number}>19980</Text></Text>
                    </View>
                    <View style={{...styles.group, marginTop: 20}}>
                        <TouchableHighlight onPress={() => {}} style={styles.button} underlayColor="white">
                            <Text style={styles.buttonText}>
                                <Icon name="star" style={styles.buttonIcon} /> 关注
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {}} style={styles.button} underlayColor="white">
                            <Text style={styles.buttonText}>
                                <Icon name="rss" style={styles.buttonIcon} /> 聊天
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ alignItems: 'stretch', marginTop: 10 }}>
                    <FlatList
                        data={news}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    group: {
        marginTop: 10,
        flexDirection: 'row',
    },
    label: {
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#ccc',
        color: '#fff',
        borderRadius: 3,
        margin: 4,
        fontSize: 11
    },
    star: {
        color: '#aaa',
        fontSize: 12,
    },
    number: {
        color: '#666',
        padding: 20
    },
    button: {
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: '#40a9ff',
        padding: 16,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 4,
    },
    buttonText: {
        color: '#f1f1f1'
    },
    buttonIcon: {
        textAlignVertical: 'top',
        fontSize: 14
    }
});