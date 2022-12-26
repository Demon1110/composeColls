
function QXHXinit(data) {
    var content = data.data;
    if (content) {
        // 爱信诺编码
        $(".qyxx_wrapper h2").html(content.qymc);
        var ixinnuoBm = content.ixinnuoBm;
        if (ixinnuoBm) {
            $("#aisino_no").text(ixinnuoBm);
        }
        var process5 = 0;
        // 是否是联盟成员
        var creditAlliance = content.creditAlliance;
        var isCreditAlliance = "no";
        if (creditAlliance) {
            isCreditAlliance = creditAlliance.msg;
        }
        if ("yes" == isCreditAlliance) {
            process5 += 1;
            $("#xylm_id").show();
        }
        // 经营数据清晰
        var businessStanding = content.businessStanding;
        var isBusinessStanding = "no";
        if (businessStanding) {
            isBusinessStanding = businessStanding.msg;
        }
        if ("yes" == isBusinessStanding) {
            process5 += 1;
            $("#jysj_id").show();
        }
        var gsjcxx = content.gsjcxx;
        var isGsjcxx = "no";
        if (gsjcxx) {
            isGsjcxx = gsjcxx.msg;
        }
        if ("yes" == isGsjcxx) {
            process5 += 1;
        }
        if (process5 == 3) {
            $(".qylm_process_wrapper").show();
        } else if (process5 == 1) {
            $(".qylm_process_wrapper").show();
            $(".qylm_process_wrapper .ps3").hide();
            $(".qylm_process_wrapper .ps2").hide();
        } else if (process5 == 2) {
            $(".qylm_process_wrapper").show();
            $(".qylm_process_wrapper .ps3").hide();
        }
        var xypfmd = content.xypfmd;
        $("#xypfmd").text(xypfmd);
        if ("良好" == xypfmd) {
            $(".process-5 .ps1").addClass("hl");
        } else if ("一般" == xypfmd) {
            $(".process-5 .ps2").addClass("hl");
        } else if ("应关注" == xypfmd) {
            $(".process-5 .ps3").addClass("hl");
        }
        var xypfqj = content.xypfqj;
        if (!xypfqj) {
            xypfqj = "信息不足无法输出排名";
        }
        // <b id="xypfpm"></b>
        if (xypfqj.indexOf("超过") >= 0) {
            xypfqj = xypfqj.replace(/超过/, "超过<b id='xypfpm'>");
            xypfqj = xypfqj.replace(/企业/, "</b>企业");
        } else if (xypfqj.indexOf("处于") >= 0) {
            xypfqj = xypfqj.replace(/处于/, "处于<b id='xypfpm'>");
            xypfqj = xypfqj + "</b>";
        }
        // xypfqj = xypfqj.replace(/~/, "</br>~</br>");
        $("#qyhx_percent").html(xypfqj);
        var xypfpm = content.xypfpm;
        $("#xypfpm").text(xypfpm);
        handlePm(xypfpm);
        // 五维模型
        var xypfScore = content.swxypf;
        if (!xypfScore) {
            xypfScore = 500;
        }
        var swxypfList = content.xypf;
        if (swxypfList) {
            var list = new Array();
            list.push(swxypfList["企业特质"]);
            list.push(swxypfList["经营能力"]);
            list.push(swxypfList["供应链健壮"]);
            list.push(swxypfList["践约评估"]);
            list.push(swxypfList["涉税信用"]);
            swxypfList = list;
        }
        if (!swxypfList) {
            swxypfList = [670, 775, 854, 453, 960];
        }
        showWwzhpf2(swxypfList, xypfScore);
        $("#xypfScore").text(xypfScore);
        // 企业画像
        var wordData = content.qyhx;
        if (!wordData || wordData.length == 0) {
            wordData = [{
                "name": "初创期企业"
            }, {
                "name": "销售业绩较差"
            }, {
                "name": "供应商数量丰富"
            }, {
                "name": "纳税信用良"
            }];
        }
        showQyhx(wordData);
    }

}
function handlePm(xypfpm) {
	if(xypfpm) {
		xypfpm = xypfpm.replace(/%/g, "");
		// xypfpm = 75;
		var deg = 90 / 100 * xypfpm - 90;
		$(".xypf_process").css("-webkit-transform", "rotate(" + deg + "deg)");
	}
}

/* 显示企业画像 */
function showQyhx(data) {
	if(data && data.length > 0) {
		data = data.sort(function(a, b) {
			if(a.value && b.value) {
				return b.value - a.value;
			}
			return 0;
		});
		$.each(data, function(i, item) {
			var index = i + 1;
			if(index <= 7) {
				if(item.name) {
					$("#qyhx_" + index).text(item.name);
				}
			}
		});
	}
}

function dragFun() {
	$(".container").on({
		mousedown : function(e) {
			var el = $(this);
			var os = el.offset();
			dx = e.pageX - os.left, dy = e.pageY - os.top;
			$(document).on('mousemove.drag', function(e) {
				var x = e.pageX;
				$(".piece-box").css("-webkit-transform", "rotateX(-23deg) rotateY(" + (x - dx) + "deg) rotateZ(0deg)");
			});
		},
		mouseup : function(e) {
			$(document).off('mousemove.drag');
		}
	});
}
Array.max = function(array) {
	return Math.max.apply(Math, array);
};
/**
 * 新版五维模型
 */
function showWwzhpf2(detail, score) {
	var maxValue = Array.max(detail);
	if(!maxValue) {
		maxValue = 900;
	}else {
		maxValue *= 1.1;
	}
	console.log("maxValue:",maxValue);
	var ixnpfChars = echarts.init(document.getElementById("score_echarts"), 'macarons');
	var radiusNum = 45;
	var temWidth = $("#score_echarts").width();
	if(temWidth < 250) {
		radiusNum = 30;
	}
	var qypfoption = {
		title : {
			show : false,
			text : '商务信用评分',
			x : 'center',
			y : '30%',
			textStyle : {
				color : "#fff",
				fontSize : "18",
				fontFamily : "Microsoft YaHei"
			},
			subtext : score,
			subtextStyle : {
				// color : "rgba(255,255,255,0.8)",
				color : "rgba(255,255,255,0.95)",
				fontWeight : "bold",
				fontSize : "42",
				fontFamily : "Microsoft YaHei"
			}
		},
		tooltip : {
			show : false,
			trigger : 'axis'
		},
		polar : [{
			indicator : [{
				text : '企业特质',
				max : maxValue,
				color : '#eee'
			}, {
				text : '经营能力',
				max : maxValue,
				color : '#eee'
			}, {
				text : '供应链健壮',
				max : maxValue,
				color : '#eee'
			}, {
				max : maxValue,
				text : '践约评估',
				color : '#eee'
			}, {
				text : '涉税信用',
				max : maxValue,
				color : '#eee'
			}],
			radius : radiusNum,
			splitNumber : 5,
			name : {
				formatter : '{value}',
				textStyle : {
					color : '#989997'
				}
			},
			center : ['50%', '50%'],
			axisLine : {
				show : false
			},
			splitLine : {
				lineStyle : {
					color : '#3877AA'
				}
			},
			splitArea : {
				show : true,
				areaStyle : {
					color : ['rgba(25,29,60,0.3)', 'rgba(25,29,60,0.3)']
				}
			}
		}],
		calculable : false,// 禁止拖动合并
        animation:false,
		series : [{
			name : '维度评分',
			type : 'radar',
			clickable : false,
			itemStyle : {
				normal : {
					color : "#3877AA",
					label : {
						textStyle : {
							color : "#fff"
						}
					},
					areaStyle : {
						type : 'default',
						color : "#3877AA"
					}
				}
			},
			lineStyle : {
				color : "#3877AA"
			},
			data : [{
				value : detail,
				name : '维度评分',
				itemStyle : {
					normal : {
						label : {
							show : false,
							formatter : function(params) {
								return params.value;
							}
						}
					}
				}
			}]
		}]
	};
	ixnpfChars.setOption(qypfoption);
}