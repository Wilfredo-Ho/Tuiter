export const SERVER_URL = 'http://192.168.10.100:3000';


//格式化时间显示：
export const formatDatetime = (value) => {
    let datetime = new Date(value);
    let now = new Date();
    let nowDay = now.getDate();
    let targetDay = datetime.getDate();

    //时间差
    let times = now.getTime() - datetime.getTime();
    if (times > 7 * 24 * 60 * 60 * 1000 || now.getDay() < datetime.getDay()) { //超过一周 或 不在同一周
        return `${datetime.getMonth() + 1}月${targetDay}日`;    //eg: 8月3日
    } else {
        if (nowDay == targetDay) {
            return `${toTwo(datetime.getHours())}:${toTwo(datetime.getMinutes())}`;
        } else if (nowDay - targetDay === 1) {
            return '昨天';
        } else {
            return `周${numToChz(datetime.getDay())}`;
        }
    }
};

const toTwo = (num) => {
    return Number(num) < 10 ? ('0' + num) : num; 
};

const numToChz = (num) => {
    var chzArr = ['一', '二', '三', '四', '五', '六', '七'];
    return chzArr[num - 1];
}