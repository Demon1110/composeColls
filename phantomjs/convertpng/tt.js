// Example using HTTP POST operation

phantom.outputEncoding = "utf-8";

var server = require('webserver').create(),
    system = require('system');
console.log('args data : ' + system.args);
if (system.args.length !== 2) {
    //console.log('Usage: postserver.js <portnumber>');
    phantom.exit(1);
}

var data = '';
var port = system.args[1];


service = server.listen(port, function (request, response) {
    console.log('Request received at ' + new Date());
    response.statusCode = 200;
    response.headers = {
        'Cache': 'no-cache',
        'Content-Type': 'text/plain;charset=utf-8'
    };

    var page = require('webpage').create();
    // 显示控制台日志.
    page.onConsoleMessage = function(msg) {
      system.stderr.writeLine( 'console: ' + msg );
    };
    console.log('post data : ' + request.postRaw);
    contentData=request.postRaw;
    //contentData = decodeURIComponent(request.postRaw);
    /*console.log(6666666666)
    console.log("contentData",contentData)
    console.log(contentData.indexOf('data='))*/

    if (contentData.indexOf('data=') == 0) {

        contentData = contentData.substring(5);
        console.log("echart option")
        console.log(contentData)

        //contentData='%7B%22type%22%3A%22%22%2C%22data%22%3A'+contentData+'%7D';
        //console.log("contentData",contentData)
        //contentData = decodeURI(contentData)
        //console.log(11111)

    }
    console.log("已拿到请求的数据字符串 getjson")

    //console.log('Request data : ' + contentData);

    eval('var data = ' + contentData);
    console.log("请求数据已转为对象 parse object")
    console.log('data.type==' + data.type);

    /*成长指数*/
    if (data.type == 'czzs') {
        page.open('./czzs.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {

                    var czzsv = 0;
                    if (s.czzs == '—') {
                        czzsv = 0;
                    } else {
                        czzsv = Number(s.czzs);
                    }
                    var x0 = 60.0, x1 = 135.0, x2 = 655.0, x3 = 730.0;
                    var x = 0, y = 0, t = 1.0, k = 0.0;
                    if (czzsv <= 300) {
                        x = x0;
                        y = x1;
                        t = 300.0;
                        k = 0.0;
                    } else if (czzsv > 300 && czzsv <= 650) {
                        x = x1;
                        y = x2;
                        t = 350.0;
                        k = 300.0;
                    } else if (czzsv > 650 && czzsv <= 1000) {
                        x = x2;
                        y = x3;
                        t = 350.0;
                        k = 650.0;
                    }

                    document.getElementById('czline').style.left = ((czzsv - k) * (y - x) / t + x - 6) + "px";
                    document.getElementById('czlegend').style.left = ((czzsv - k) * (y - x) / t + x - 6) + "px";
                    document.getElementById('czlegend').innerHTML = "成长指数：" + s.czzs;
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response ' + new Date());
        });
    }
    else if (data.type == 'output') {
        page.viewportSize = {
          width: 980,
          height: 550
        };
        page.open('./output.html', function(status) {
            if (status === 'success') {
                page.evaluate(function (l) {
                    console.log(Object.prototype.toString.call(l))
                    var rectWidth = document.querySelector('.gradient-rect').offsetWidth
                    var triangleList = document.querySelectorAll('.triangle')
                    for(var i = 0; i < triangleList.length; i++) {
                        triangleList[i].style.left = -8 + l[i]*rectWidth + 'px'
                    }
                }, data.list)
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
        })
    }
    else if (data.type == 'czzs01') {
        page.open('./czzs01.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {

                    var czzsv = 0;
                    var czlineLeft = 0;
                    var czline=document.getElementById('czline')
                    document.getElementById('czlegend').innerHTML = "成长指数：" + s.czzs;
                    var width = document.getElementById('czlegend').offsetWidth;
                    if (s.czzs == '—') {
                        czzsv = 0;
                    } else {
                        czzsv = Number(s.czzs);
                        czzsv = czzsv.toFixed(2);
                    }
                    /*线位置*/
                    if (czzsv <= 300) {
                        czlineLeft = ((czzsv - 0) * (82 - 35) / 300 + 34);

                    } else if (czzsv > 300 && czzsv <= 650) {
                        czlineLeft = ((czzsv - 300) * (425 - 82) / 350 + 82);

                    } else if (czzsv > 650 && czzsv <= 1000) {
                        czlineLeft = ((czzsv - 650) * (473 - 425) / 350 + 424);

                    } else {
                        czlineLeft = 475 ;
                    }
                    document.getElementById('czline').style.left = czlineLeft + "px";
                    /*左右位置判断*/
                    if((czlineLeft+width)>=500){
                        document.getElementById('czlegend').style.left=(czlineLeft-width)+"px";
                    }else{
                        document.getElementById('czlegend').style.left=(czlineLeft)+"px";
                    }

                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'ylzs') {
        page.open('./ylzs.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                    var ylzsv = 0;
                    if (s.ylzs == '—') {
                        ylzsv = 0;
                    } else {
                        ylzsv = Number(s.ylzs);
                    }
                    var x = 50.0, y = 682.0;
                    document.getElementById('ylline').style.left = (ylzsv * (y - x) / 100.0 + x) + "px";
                    document.getElementById('yllegend').style.left = (ylzsv * (y - x) / 100.0 + x) + "px";
                    document.getElementById('yllegend').innerHTML = "盈利指数：" + s.ylzs;
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    /*违约指数 履约指数企业全量分布*/
    else if (data.type == 'wyzs') {
        page.open('./wyzs.html', function (status) {
            console.log(status, 111);

            if (status === 'success') {
                page.evaluate(function (s) {
                    var wyzsv = 0;
                    if (s.wyzs == '—') {
                        wyzsv = 0;
                    } else {
                        wyzsv = Number(s.wyzs);
                    }
                    if (wyzsv < 300.0) {
                        var x = 56.0, y = 127.0;
                        document.getElementById('wyline').style.left = (wyzsv * (y - x) / 300.0 + x - 6) + "px";
                        document.getElementById('wylegend').style.left = (wyzsv * (y - x) / 300.0 + x) + "px";
                    } else if (wyzsv <= 650.0) {
                        var x = 127.0, y = 620.0;
                        document.getElementById('wyline').style.left = ((wyzsv - 300.0) * (y - x) / 350.0 + x - 6) + "px";
                        document.getElementById('wylegend').style.left = ((wyzsv - 300.0) * (y - x) / 350.0 + x) + "px";
                    } else {
                        var x = 620.0, y = 690.0;
                        document.getElementById('wyline').style.left = ((wyzsv - 650.0) * (y - x) / 350.0 + x - 6) + "px";
                        document.getElementById('wylegend').style.left = ((wyzsv - 650.0) * (y - x) / 350.0 + x) + "px";
                    }
                    document.getElementById('wylegend').innerHTML = "履约指数：" + s.wyzs;

                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    /*违约指数01 履约指数企业全量分布*/
    else if (data.type == 'wyzs01') {
        page.open('./wyzs01.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                    var wyzsv = 0;
                    var wylegendleft =0;
                    document.getElementById('wylegend').innerHTML = "履约指数：" + s.wyzs;
                    var width = document.getElementById('wylegend').offsetWidth;
                    if (s.wyzs == '—') {
                        wyzsv = 0;
                    } else {
                        wyzsv = Number(s.wyzs);
                        wyzsv = wyzsv.toFixed(2);
                    }
                    if (wyzsv >= 0 && wyzsv < 500.0) {
                        wylegendleft = (wyzsv * ((89 - 34) / 500) + 34) ;
                    } else if (wyzsv >= 500.0 && wyzsv <= 950.0) {
                        wylegendleft= ((wyzsv - 500) * ((433 - 90) / 400) + 90);
                    } else if(wyzsv > 950.0){
                        wylegendleft= 474;
                    }
                    /*标注左右换位置*/
                    document.getElementById('wyline').style.left =wylegendleft+ "px";
                    if((width+wylegendleft)>=502){
                        document.getElementById('wylegend').style.left = wylegendleft - width + "px";
                    }else{
                        document.getElementById('wylegend').style.left = wylegendleft+ "px";
                    }

                }, data.data);
                setTimeout(function () {

                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    /*违约指数01 履约指数企业全量分布*/
    else if (data.type == 'wyzs02') {
        page.open('./wyzs02.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                    var wyzsv = 0;
                    var wylegendleft =0;
                    document.getElementById('wylegend').innerHTML = "履约指数：" + s.wyzs;
                    var width = document.getElementById('wylegend').offsetWidth;
                    var xlimit=722;//X轴刻度极限
                    if (s.wyzs == '—') {
                        wyzsv = 0;
                    } else {
                        wyzsv = Number(s.wyzs);
                        wyzsv = wyzsv.toFixed(2);
                    }
                    if (wyzsv >= 0 && wyzsv < 500.0) {
                        var x1=52,x2=135,zoom=500;//刻度1,2left，刻度区间差值

                        wylegendleft = (wyzsv * ((x2 - x1) / zoom) + x1) ;
                    } else if (wyzsv >= 500.0 && wyzsv <= 950.0) {
                        var x1=135,x2=657,zoom=400,zoom1=500;//刻度1,2left，刻度区间差值,初始刻度
                        wylegendleft= ((wyzsv - zoom1) * ((x2 - x1) / zoom) + x1);
                    } else if(wyzsv > 950.0){

                        wylegendleft= xlimit;
                    }
                    /*标注左右换位置*/
                    document.getElementById('wyline').style.left =wylegendleft+ "px";

                    if((width+wylegendleft)>=xlimit){
                        document.getElementById('wylegend').style.left = wylegendleft - width + "px";
                    }else{
                        document.getElementById('wylegend').style.left = wylegendleft+ "px";
                    }

                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'wdzssy') {
        page.open('./wdzssy.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                    var x = 58.0, y = 672.0;
                    var wdzsv = 0;
                    if (s.wdzs == '—') {
                        wdzsv = 0;
                    } else {
                        wdzsv = Number(s.wdzs);
                    }

                    if (wdzsv > 1) wdzsv = 1;
                    if (wdzsv < 0) wdzsv = 0;

                    document.getElementById('wdline').style.left = (wdzsv * (y - x) + x) + "px";
                    document.getElementById('wdlegend').style.left = (wdzsv * (y - x) + x) + "px";
                    document.getElementById('wdlegend').innerHTML = "稳定指数：" + s.wdzs;
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'wdzsxy') {
        page.open('./wdzsxy.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                    var x = 58.0, y = 672.0;
                    var wdzsv = 0;
                    if (s.wdzs == '—') {
                        wdzsv = 0;
                    } else {
                        wdzsv = Number(s.wdzs);
                    }

                    if (wdzsv > 1) wdzsv = 1;
                    if (wdzsv < 0) wdzsv = 0;

                    document.getElementById('wdline').style.left = (wdzsv * (y - x) + x) + "px";
                    document.getElementById('wdlegend').style.left = (wdzsv * (y - x) + x) + "px";
                    document.getElementById('wdlegend').innerHTML = "稳定指数：" + s.wdzs;
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'wdzs') {
        page.open('./wdzs.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                    var x = 58.0, y = 672.0;
                    var wdzsv = 0;
                    if (s.wdzs == '—') {
                        wdzsv = 0;
                    } else {
                        wdzsv = Number(s.wdzs);
                    }

                    if (wdzsv > 1) wdzsv = 1;
                    if (wdzsv < 0) wdzsv = 0;

                    document.getElementById('wdline').style.left = (wdzsv * (y - x) + x) + "px";
                    document.getElementById('wdlegend').style.left = (wdzsv * (y - x) + x) + "px";
                    document.getElementById('wdlegend').innerHTML = "稳定指数：" + s.wdzs;
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'wydz') {
        page.open('./wydz.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'wydz01') {
        page.open('./wydz01.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    //response.write("666");
                    response.close();
                    page.close();
                }, 0);
            }

            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'wydz02') {
        page.open('./wydz02.html', function (status) {
            console.log(status);
            if (status === 'success') {
                page.evaluate(function (s) {
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    //response.write("666");
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'barcode') {
        page.open('./barcode.html', function (status) {
            console.log(status,data.data);
            if (status === 'success') {
                page.evaluate(function (s) {
                    JsBarcode("#barcode", s);
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 1000);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'line_bar_back'){
        console.log("已经进入echart判断 echart3.0 type jude",data.type3);

        if(data.type3 =='shareholder_investedCompany'){

            function hh(v){
                var strs = v.split('');

                var str = '';

                for (var i = 0, s; s = strs[i++];) {

                    str= str + s;

                    if (!(i % 4)) {str += '\n'}
                }

                return str
            }
            option = {
                backgroundColor: '#fff',
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                    type: 'graph',
                    layout: 'none',
                    symbolSize: [100, 80],
                    symbol: "rect",
                    coordinateSystem: null,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            color: '#3278ff',
                            formatter: function (val) {
                                var strs = val.data.name.split('');
                                var str = ''
                                for (var i = 0, s; s = strs[i++];) {
                                    str += s;
                                    if (!(i % 4)) {str += '\n'};
                                }
                                return str
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#ddd',
                            borderWidth: 3,
                            shadowBlur: 2,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },
                    roam: true,
                    focusNodeAdjacency: true,
                    edgeSymbol: ['none', 'arrow'],
                    edgeSymbolSize: 20,
                    emphasis: {
                        lineStyle: {
                            width: 100
                        }
                    },
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 15
                            },
                            color:"#050cff",
                            formatter: function (val) {
                                var strs = val.data.value;
                                console.log(222222222222,params.data.value,strs);
                                return strs
                            }
                        }
                    },
                    categories: [{
                        name: '股东',
                        itemStyle: {
                            normal: {
                                color: "#fff",
                                /*borderColor: '#f78802',
                                borderWidth: 3,*/
                            }
                        },
                        label: {
                            normal: {
                                fontSize: '14'
                            }
                        },
                    }, {
                        name: '本公司',
                        itemStyle: {
                            normal: {
                                color: "#fff",
                                borderColor: '#0f68dd',
                            }
                        },
                        label: {
                            normal: {
                                fontSize: '14'
                            }
                        },
                    }, {
                        name: '对外投资公司',
                        itemStyle: {
                            normal: {
                                color: "#fff",
                            }
                        },
                        label: {
                            normal: {
                                fontSize: '14'
                            }
                        },
                    }],
                    data: [],
                    links: []
                }]
            };

            function cal(i, length, item) {
                var curveness = 0;
                if (length === 1) {
                    curveness = 0;
                } else if (i < length / 2) {
                    curveness = -item * (i + 1);
                } else if (i * 1.0 === parseInt(length / 2)) {
                    curveness = 0;
                } else {
                    curveness = item * (length - i);
                }
                return curveness;
            }

            function getRandomNum(Min, Max) {
                var Range = Max - Min;
                var Rand = Math.random();
                return (Min + Math.round(Rand * Range));
            }

            var data1 = [];
            var links = [];
            if(data.shareholder.length){
                var source =  data.shareholder.length;
                for (var i = 0; i < data.shareholder.length; i++) {
                    data1.push({
                        name: hh(data.shareholder[i].name),
                        y: 300,
                        x: cal(i, data.shareholder.length, 100),
                        value: data.shareholder[i].value,
                        category: 0
                    });
                    links.push({
                        source: hh(data.shareholder[i].name),
                        target: hh(data.currentCompany[0].name),
                        y: 300,
                        x: cal(i, data.shareholder.length, 100),
                        value: data.shareholder[i].value,
                        category: 0,
                        lineStyle: {
                            normal: {
                                curveness: cal(i, data.shareholder.length, 0.03),
                                color: '#f78802',
                                width: 3,

                            }
                        }
                    });
                }
            }
            if(data.investedCompany.length){
                var direction =  data.investedCompany.length;
                for (var i = 0; i < direction; i++) {
                    data1.push({
                        name:hh( data.investedCompany[i].name),
                        y: 750,
                        x: cal(i, direction, 100),
                        value: data.investedCompany[i].value,
                        category: 2
                    });
                    links.push({
                        source: hh(data.currentCompany[0].name),
                        target: hh(data.investedCompany[i].name),
                        y: 750,
                        x: cal(i, direction, 100),
                        value: data.investedCompany[i].value,
                        category: 2,
                        lineStyle: {
                            normal: {
                                curveness: cal(i, direction, 0.03),
                                color: '#43a6f7',
                                width: 3
                            }
                        }
                    });
                }
            }


            data1.push({
                name: hh(data.currentCompany[0].name),
                y: 522,
                x: cal(0, 1, 50),
                value: data.currentCompany[0].value,
                category: 1
            });
            option.series[0].data = data1;
            option.series[0].links = links;
            console.log(JSON.stringify( option));
            data.data=option;

        }

        page.open('./line_bar_3.html', function (status) {
            console.log(status);
            console.log("line_bar_back,3.0");
            console.log(data);
            data.data["animation"]=false;
            if (status === 'success') {
                page.evaluate(function (s) {
                    var macarons = {
                        color: [
                            '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                            '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                            '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
                            '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
                        ]
                    };

                    var myChart = echarts3.init(document.getElementById('main'),macarons);
                    myChart.setOption(s);
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if(data.type=="mapList"){
        page.open('./maplist.html', function (status) {
            console.log(status);
            console.log("maplist");
            //console.log(JSON.stringify(data.data));
            console.log(JSON.stringify(data.data.series[0].data));
            data.data["animation"]=false;

            if (status === 'success') {
                page.evaluate(function (s) {
                    var myChart = echarts.init(document.getElementById('main'));
                    var li="";
                    var lia=s.series[0].data;
                    for (var key in lia){
                        if( (Number(key)+1) <11 ){
                            li+='<ol style="margin-top: 10px">\n' +
                                '                    <span style="padding: 2px 4px;background: #00b6ff;color:#fff;" >'+ (Number(key)+1)+'</span>\n' +
                                '                    <span>\n' +lia[key].name+
                                '\n' +
                                '                    </span>\n' +
                                '                    <span style="color: red">\n' +
                                '\n' +lia[key].value+'家'+
                                '                    </span>\n' +
                                '                </ol>'
                        }

                    }
                    $(".maplist").html(li);

                    myChart.setOption(s);


                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                },0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if(data.type=="tree8"){
        page.open('./tree8.html', function (status) {
            console.log(status);
            console.log("maplist");
            //console.log(JSON.stringify(data.data));
            //console.log(JSON.stringify(data.data.series[0].data));
            data.data["animation"]=false;

            if (status === 'success') {
                page.evaluate(function (s) {
                    var myChart = tree8.init(document.getElementById('main'));


                    myChart.setOption(s);


                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                },0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if(data.type=="pw"){
        page.open('./pw.html', function (status) {
            console.log(status);
            console.log("pw");
            //console.log(JSON.stringify(data.data));
            //console.log(JSON.stringify(data.data.series[0].data));
            data.data["animation"]=false;


            if (status === 'success') {
                page.evaluate(function (s) {
                    function pwInit(id,xs,qy,xspm,qypm,pwtitle) {
                        var str='<p class="pwtitle" style="line-height:45px;font-size: 18px">\n' +
                            '        </p>'+
                            '<ul class="pwline clearset">\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    %10\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    20\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    30\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    40\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    50\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    60\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    70\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    80\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    90\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="lf">\n' +
                            '                <span>\n' +
                            '                    100\n' +
                            '                </span>\n' +
                            '            </li>\n' +
                            '            <li class="pwback">\n' +
                            '            </li>\n' +
                            '            <li class="pwxs">\n' +
                            '\n' +
                            '            </li>\n' +
                            '            <li class="pwqu">\n' +
                            '\n' +
                            '            </li>\n' +
                            '        </ul>'+'' +
                            '<p style="margin-top:30px;line-height: 30px ;">\n' +
                            '            <span style="color: #E98F52">■</span>\n' +
                            '            该企业的销售额在区域排名前\n' +
                            '            <span class="qypm"></span>\n' +
                            '        </p>\n' +
                            '        <p style="line-height: 30px ;">\n' +
                            '            <span style="color: #F7C52B">■</span>\n' +
                            '            所属区域内销售额平均值排名为\n' +
                            '            <span class="xspm"></span>\n' +
                            '        </p>'

                        $("#"+id).html(str);

                        var w=$("#"+id).find(".pwline").width();
                        $("#"+id).find(".pwback").width(w*0.9);
                        $("#"+id).find(".pwxs").width((xs[1]-xs[0])/100*w);
                        $("#"+id).find(".pwxs").css("left",xs[0]-10+"%");
                        $("#"+id).find(".pwqu").width((qy[1]-qy[0])/100*w);
                        $("#"+id).find(".pwqu").css("left",qy[0]-10+"%");
                        $("#"+id).find(".qypm").html(qypm);
                        $("#"+id).find(".xspm").html(xspm);
                        $("#"+id).find(".pwtitle").html(pwtitle);
                    }

                    pwInit("main",s.xsqj,s.qyqj,s.xspm,s.qypm,s.title);

                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                },0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'd3_gqct'){
        page.open('./d3-2way-tree-master/index.html', function (status) {
            console.log(status);
            console.log("d3_gqct");
            console.log(data);
            data.data["animation"]=false;
            if (status === 'success') {
                page.evaluate(function (s) {

                    var tree = CollapsibleTree("#categoryHierarchy",1200,600);
                    tree.init(s);
                }, data.data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else if (data.type == 'qyhx'){
        //page.open('./qyqxhx.html', function (status) {
        page.open('./test00.html', function (status) {
            console.log(status);
            console.log("qyhx");
            //console.log(data);
            data.data["animation"]=false;
            if (status === 'success') {
                page.evaluate(function (s) {
                    QXHXinit(s);
                }, data);
                setTimeout(function () {
                    page.render('ss1.png');
                    response.write(page.renderBase64());
                    response.close();
                    page.close();
                }, 0);
            }
            console.log( 'response end：' + new Date());
        });
    }
    else {

        console.log("已经进入echart判断 echart2.0 type jude ")
        console.log("echart type",data.series[0].type)
        data["animation"]=false;


        if(data.series[0].type=="graph"){
            page.open('./graph.html', function (status) {
                console.log(status);
                console.log("graph");
                console.log(data);
                if (status === 'success') {
                    page.evaluate(function (s) {
                        var myChart = echarts.init(document.getElementById('main'));
                        myChart.setOption(s);
                    }, data);
                    setTimeout(function () {
                        page.render('ss1.png');
                        response.write(page.renderBase64());
                        response.close();
                        page.close();
                    }, 0);
                }
                console.log( 'response end：' + new Date());
            });
        }


        else if(data.series[0].type=="wordCloud"){
            page.open('./word1.html', function (status) {
                console.log(status);
                console.log("wordCloud");
                console.log(data);
                if (status === 'success') {
                    page.evaluate(function (s) {
                        var myChart = wordcloud.init(document.getElementById('main'));

                        var color_arr=[];
                        var index=-1;

                        for(var key in s.series[0].data){
                            color_arr.push(s.series[0].data[key].itemStyle.normal.color);
                        };

                        var option = {
                            tooltip: {
                                show: false
                            },
                            series: [{
                                type: 'wordCloud',
                                size: ['80%', '80%'],
                                textRotation : [0,0],
                                // 设置字符字体大小的范围
                                textPadding: 0,
                                sizeRange: [22, 32],
                                rotationRange: [0, 0],
                                rotationStep: 90,
                                gridSize: 2,
                                shape: 'square',
                                left: 'center',
                                top: 'center',
                                drawOutOfBound: false,
                                textStyle: {
                                    normal: {
                                        //color: '#60ACFC',
                                        color: function () {
                                            index++;
                                            return color_arr[index];
                                        }
                                    },
                                    emphasis: {
                                        color: 'red',
                                        shadowBlur: 6,
                                        shadowColor: '#dddddd'
                                    }
                                },
                                data: s.series[0].data
                            }]
                        };
                        myChart.setOption(option);


                    }, data);
                    setTimeout(function () {
                        page.render('ss1.png');
                        response.write(page.renderBase64());
                        response.close();
                        page.close();
                    },1500);
                }
                console.log( 'response end：' + new Date());
            });
        }

        else {
            page.open('./index.html', function (status) {
                console.log(status);
                console.log("type :",data.series[0].type);
                console.log(data);
                if (status === 'success') {
                    page.evaluate(function (s) {
                        var myChart = echarts.init(document.getElementById('main'));
                        myChart.setOption(s);
                    }, data);
                    setTimeout(function () {
                        page.render('ss1.png');
                        response.write(page.renderBase64());
                        response.close();
                        page.close();
                    }, 0);
                }
                console.log( 'response end：' + new Date());
            });
        }
    }
});
