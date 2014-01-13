var event = {
	events: {},
	__fire: function(event) {
		if(!(event instanceof eventType)) {
			throw new Error("Event type is not of correct type");
		}
		if (this.events[event.type]) {
			this.events[event.type].forEach(function(cb, index) {
				cb.call(this, event);
			});
		}
	},

	__on: function(type, cb) {
		this.events[type] ? this.events[type].push(cb) : this.events[type] = [cb];
	},

	__remove: function(type, cb) {
		if (this.events[type]) {
			this.events[type].forEach(function(item, index) {
				if (item == cb) {
					this.events[type].splice(index, 1);
				}
			}.bind(this));
		}
	}
};

var eventType = function(type, params) {
		this.type = type,
		this.params = params
};

var guo = Object.create(event);
guo.name = "guozy";
guo.__on("click", callback);
guo.__on("dd", callback);
guo.__on("alert", mAlert);

var aa = Object.create(event);
aa.__fire(new eventType("click", "guozy"));
aa.__fire(new eventType("dd", "signal"));

function callback(event) {
	console.log(event.type, event.params);
};
function mAlert(event) {
	alert(event.params);
}