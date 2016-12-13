function ajax (options) {
	options = options || {}
	options.type = (options.type || "GET").toUpperCase()
	options.dataType = options.dataType || "json"
	params = formatParams(options.data)
	/**
	创建一个ajax对象
	*/
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest()
	} else {
		var xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}
	/**
	请求状态
	*/
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4) {
			var status = xhr.status
			if (status >= 200 && status < 300) {
            	options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
            	options.fail && options.fail(status)
            }
		}
	}
	/** 
	链接和发送
	*/
	if (options.type) {
		xhr.open("GET", options.url + "?" + params, true)
		alert("GET")
        xhr.send(null)
	} else if (options.type == "POST") {
        xhr.open("POST", options.url, true)
        /**
        设置表单提交时的内容类型
        */
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        xhr.send(params)
    }
}

function formatParams(data) {
	var arr = []
	for (var key in data) {
		arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
	}
	return arr.join("&")
}
/** 
测试
*/
ajax({
	url: "http://www.html-js.com/article/1882",
	data: { name: "super", age: 20 },
	type: "post",
	success: function (response, data) {
        console.log(response + "  " + data)
    },
    fail: function (status) {
    	console.log(status)
    }
})