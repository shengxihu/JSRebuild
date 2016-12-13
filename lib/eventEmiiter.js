/* eslint no-unused-vars:0 */
class EventEmitter {
	constructor() {
		this.events = {}
	}
	emit(eventName,data) {
		const event = this.events[eventName]
		if(event) {
			event.forEach(fn => {
				fn.call(null,data)
			})
		} else {
			console.error('You haven\'t subscrible ' + eventName + '!')
		}
	}
	once(eventName,data){
		this.emit(eventName,data)
		delete this.events[eventName]
	}
	subscrible(eventName,fn) {
		if(!this.events[eventName]) {
			this.events[eventName] = []
		}
		this.events[eventName].push(fn)
	}
}

let emitter = new EventEmitter()

/* eslint no-console: 0 */

const callBack = (name) => {
	console.log('hello world! :' + name)
}

emitter.subscrible('test',callBack)

emitter.once('test', 'hsx')
emitter.emit('test', 'hsx')
