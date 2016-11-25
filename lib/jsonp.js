var res
function test () {
	var _data = function (data) {
	res = data
	}
	var script = document.createElement('script')
	var url = 'https://api.douban.com/v2/book/search?q=追风筝的人'
	script.src=url + '?callback=' + _data
	var node = document.getElementsByTagName('body')[0]
	node.appendChild(script)
}	

try {
	test()
} catch(err) {
	err
} finally {
   console.log(res)
}