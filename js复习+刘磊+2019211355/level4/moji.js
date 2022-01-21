let flag = 0;
let city = document.querySelector('.city');
let search = document.querySelector('.search_btn');
let return_btn = document.querySelector('.return');
let index2 = document.querySelector('.index-2');
let index1 = document.querySelector('.index-1');
let wind = document.querySelector('.wind');
let btn = document.querySelector('.btn').querySelector('img');
let sundown = document.querySelector('.tabs').querySelector('strong');
let sp = document.querySelector('.tabs').querySelectorAll('span');
let charts = document.querySelector('.charts');
let info_wea = document.querySelector('.info_wea');
let tem = document.querySelector('.info_about').querySelector('em');
let windDir = document.querySelector('.info_about').querySelector('p');
let today_text = document.querySelector('#today_text');
let toma_text = document.querySelector('#toma_text');
let single_today = document.querySelector('#single_today');
let single_toma = document.querySelector('#single_toma');
let qweather = document.querySelector('#qweather').querySelectorAll('li');
let week_tem = document.querySelector('#week_tem');
let js_input = document.querySelector('.js_input');
let city_s = document.querySelector('.index-2').querySelectorAll('li');
let city_list = document.querySelector('.city_list').querySelector('ul');
let addcity = document.querySelector('.addcity').querySelector('ul');
let dele = document.querySelector('.delete');

const week_data = Mock.mock({
    'weekTem|6': [{
        'maxTem|10-20': 0,
        'minTem|5-10': 0
    }]
});

function empty(e) {
    while (e.children[0]) {
        e.removeChild(e.children[0]);
    }
}
dele.onclick = function () {
    addcity.removeChild(addcity.lastChild);
}

search.onclick = function () {
    index2.style.display = 'block';
    index1.style.display = 'none';
}
return_btn.onclick = function () {
    index2.style.display = 'none';
    index1.style.display = 'block';
}
btn.onclick = function () {
    if (flag === 0) {
        wind.style.height = 137 + 'px';
        sundown.style.display = 'none';
        sp[0].style.display = 'inline-block';
        sp[1].style.display = 'inline-block';
        btn.src = 'img/up-circle.png';
        charts.style.display = 'block';
        flag = 1;
    } else {
        wind.style.height = 29 + 'px';
        sundown.style.display = 'block';
        sp[0].style.display = 'none';
        sp[1].style.display = 'none';
        btn.src = 'img/down-circle.png';
        charts.style.display = 'none';
        flag = 0;
    }

}

let xhr = new XMLHttpRequest();
var url = 'https://devapi.qweather.com/v7/weather/now?&location=101040100&key=bbf39c92f2de4247a8dc7f207c676f98';
xhr.open("GET", url, true);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            const res = JSON.parse(xhr.response);
            console.log(res);
            info_wea.innerHTML = res.now.text;
            tem.innerHTML = res.now.temp;
            windDir.innerHTML = res.now.windDir + res.now.windScale + '级 湿度' + res.now.humidity + "%";
        }
    }
}
xhr.send();

let xhr2 = new XMLHttpRequest();
var url = 'https://devapi.qweather.com/v7/weather/3d?&location=101040100&key=bbf39c92f2de4247a8dc7f207c676f98';
xhr2.open("GET", url, true);
xhr2.onreadystatechange = () => {
    if (xhr2.readyState === 4) {
        if ((xhr2.status >= 200 && xhr2.status < 300) || xhr2.status == 304) {
            const res2 = JSON.parse(xhr2.response);
            sundown.innerHTML = res2.daily[0].sunset;
            today_text.innerHTML = res2.daily[0].textDay;
            toma_text.innerHTML = res2.daily[1].textDay;
            single_today.innerHTML = res2.daily[0].tempMin + '/' + res2.daily[0].tempMax + '°';
            single_toma.innerHTML = res2.daily[1].tempMin + '/' + res2.daily[1].tempMax + '°';
            let myChart = echarts.init(week_tem);
            // //折线图数据
            var option = {
                grid: {
                    show: true,
                    backgroundColor: 'transparent',
                    opacity: 0.3,
                    borderWidth: '0',
                    top: '30',
                    bottom: '0'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    show: false
                },
                xAxis: [

                    {
                        type: 'category',
                        boundaryGap: false,
                        position: 'bottom',
                        offset: 0,
                        zlevel: 100,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                            formatter: [
                                '{a|{value}}'
                            ].join('\n'),
                            rich: {
                                a: {
                                    // color: 'white',
                                    fontSize: 14
                                }
                            }
                        },
                        nameTextStyle: {
                            fontWeight: 'bold',
                            fontSize: 19
                        },
                        data: ["周一", "周二", "周三", "周四", "周五", "周六"]
                    },
                ],
                yAxis: {
                    type: 'value',
                    show: false,
                    axisLabel: {
                        formatter: '{value}',
                        color: 'white'
                    }
                },
                series: [
                    {
                        name: '最高气温',
                        type: 'line',
                        data: [week_data.weekTem[0].maxTem, week_data.weekTem[1].maxTem, week_data.weekTem[2].maxTem, week_data.weekTem[3].maxTem, week_data.weekTem[4].maxTem, week_data.weekTem[5].maxTem],
                        symbol: 'emptyCircle',
                        symbolSize: 5,
                        showSymbol: true,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#ffffff'
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            // color: 'white',
                            formatter: '{c}'
                        },
                        lineStyle: {
                            width: 1,
                            // color: 'white'
                        },
                        areaStyle: {
                            opacity: 1,
                            color: 'transparent'
                        }
                    },
                    {
                        name: '最低气温',
                        type: 'line',
                        data: [week_data.weekTem[0].minTem, week_data.weekTem[1].minTem, week_data.weekTem[2].minTem, week_data.weekTem[3].minTem, week_data.weekTem[4].minTem, week_data.weekTem[5].minTem],
                        symbol: 'emptyCircle',
                        symbolSize: 5,
                        showSymbol: true,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#ffffff'
                            }
                        },
                        label: {
                            show: true,
                            position: 'bottom',
                            // color: 'white',
                            formatter: '{c}'
                        },
                        lineStyle: {
                            width: 1,
                            // color: 'white'
                        },
                        areaStyle: {
                            opacity: 1,
                            color: 'transparent'
                        }
                    }
                ]
            }

            myChart.setOption(option);
        }
    }
}
xhr2.send();


let xhr3 = new XMLHttpRequest();
var url = 'https://devapi.qweather.com/v7/indices/1d?type=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16&location=101040100&key=bbf39c92f2de4247a8dc7f207c676f98';
xhr3.open("GET", url, true);
xhr3.onreadystatechange = () => {
    if (xhr3.readyState === 4) {
        if ((xhr3.status >= 200 && xhr3.status < 300) || xhr3.status == 304) {
            const res3 = JSON.parse(xhr3.response);
            console.log(res3);
            // console.log(res3.daily[0].name.split('指')[0]);
            for (var i = 0; i < 16; i++) {
                let em = document.createElement('em');
                em.innerHTML = res3.daily[i].name.split('指')[0] + " " + res3.daily[i].category;
                qweather[i].appendChild(em);
            }
        }
    }
}
xhr3.send();


let xhr4 = new XMLHttpRequest();
js_input.oninput = function () {
    empty(city_list);
    let loca2 = js_input.value;
    var url = 'https://geoapi.qweather.com/v2/city/lookup?location=' + loca2 + '&key=60001b9fb9da4510be73ae36bfe8b4b4';
    xhr4.open("GET", url, true);
    xhr4.onreadystatechange = () => {
        if (xhr4.readyState === 4) {
            if ((xhr4.status >= 200 && xhr4.status < 300) || xhr4.status == 304) {
                const res4 = JSON.parse(xhr4.response);
                for (var i = 0; i < 10; i++) {
                    let city_li = document.createElement('li');
                    city_li.innerHTML = res4.location[i].name;
                    city_list.appendChild(city_li);
                }
                let city_list_li = city_list.querySelectorAll('li');
                for (var i = 0; i < city_list_li.length; i++) {
                    city_list_li[i].index = i;
                    city_list_li[i].addEventListener('click', exchange.bind(this, city_list_li, city_list_li[i].index));
                }
            }
        }
    }
    xhr4.send();
}


let xhr5 = new XMLHttpRequest();
for (var i = 0; i < city_s.length; i++) {
    city_s[i].index = i;
    city_s[i].addEventListener('click', exchange.bind(this, city_s, city_s[i].index));
}
function empty2(e) {
    while (e.children[0]) {
        e.removeChild(e.children[0]);
    }
}

function exchange(c, i) {
    // empty(qweather);
    index2.style.display = 'none';
    index1.style.display = 'block';
    js_input.value = c[i].innerHTML;
    city.innerHTML = js_input.value;
    let addcity_li = document.createElement('li');
    addcity_li.innerHTML = js_input.value;
    addcity.appendChild(addcity_li);
    let loca = js_input.value;
    var url = 'https://geoapi.qweather.com/v2/city/lookup?location=' + loca + '&key=60001b9fb9da4510be73ae36bfe8b4b4';
    xhr5.open("GET", url, true);
    xhr5.onreadystatechange = () => {
        if (xhr5.readyState === 4) {
            if ((xhr5.status >= 200 && xhr5.status < 300) || xhr5.status == 304) {
                const res5 = JSON.parse(xhr5.response);
                let location = res5.location[0].id;
                let xhr = new XMLHttpRequest();
                var url = 'https://devapi.qweather.com/v7/weather/now?&location=' + location + '&key=bbf39c92f2de4247a8dc7f207c676f98';
                xhr.open("GET", url, true);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            const res = JSON.parse(xhr.response);
                            console.log(res);
                            info_wea.innerHTML = res.now.text;
                            tem.innerHTML = res.now.temp;
                            windDir.innerHTML = res.now.windDir + res.now.windScale + '级 湿度' + res.now.humidity + "%";
                        }
                    }
                }
                xhr.send();

                let xhr2 = new XMLHttpRequest();
                var url = 'https://devapi.qweather.com/v7/weather/3d?&location=' + location + '&key=bbf39c92f2de4247a8dc7f207c676f98';
                xhr2.open("GET", url, true);
                xhr2.onreadystatechange = () => {
                    if (xhr2.readyState === 4) {
                        if ((xhr2.status >= 200 && xhr2.status < 300) || xhr2.status == 304) {
                            const res2 = JSON.parse(xhr2.response);
                            sundown.innerHTML = res2.daily[0].sunset;
                            today_text.innerHTML = res2.daily[0].textDay;
                            toma_text.innerHTML = res2.daily[1].textDay;
                            single_today.innerHTML = res2.daily[0].tempMin + '/' + res2.daily[0].tempMax + '°';
                            single_toma.innerHTML = res2.daily[1].tempMin + '/' + res2.daily[1].tempMax + '°';
                            // let myChart = echarts.init(week_tem);
                            // myChart.setOption(option);
                        }
                    }
                }
                xhr2.send();


                let xhr3 = new XMLHttpRequest();
                var url = 'https://devapi.qweather.com/v7/indices/1d?type=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16&location=' + location + '&key=bbf39c92f2de4247a8dc7f207c676f98';
                xhr3.open("GET", url, true);
                xhr3.onreadystatechange = () => {
                    if (xhr3.readyState === 4) {
                        if ((xhr3.status >= 200 && xhr3.status < 300) || xhr3.status == 304) {
                            const res3 = JSON.parse(xhr3.response);
                            console.log(res3);
                            // console.log(res3.daily[0].name.split('指')[0]);
                            for (var i = 0; i < 16; i++) {
                                let em = qweather[i].querySelector('em');
                                em.innerHTML = res3.daily[i].name.split('指')[0] + " " + res3.daily[i].category;
                            }
                        }
                    }
                }
                xhr3.send();
            }
        }
    }
    xhr5.send();
}
