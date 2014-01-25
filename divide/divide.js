var Divide = function(num1, num2) {
	this.num1 = num1;
	this.num2 = num2;
	this.list = [];
};



Divide.prototype = {
	parseNum: function(num) {
		var list = [];
		for (;;) {
			if (num / 10 >= 1) {
				list.unshift(num % 10);
				num = Math.floor(num / 10);
			} else {
				list.unshift(num);
				break;
			}
		}
		return list;
	},

	joinNum: function(Arr) {
		var sum = 0;
		Arr.forEach(function(item, index) {
			sum = sum * 10 + item;
		});
		return sum;
	},

	getAnswer: function() {
		// var list1 = this.parseNum(num1);
		var list = this.parseNum(this.num2);
		var answer = [];
		var remainder = [];
		var num = list.shift();
		for (;;) {
			if (num >= this.num1) {
				answer.push(Math.floor(num / this.num1));
				remainder.push(num % this.num1);
				if (list.length == 0) {
					break;
				}
				num = (num % this.num1) * 10 + list.shift();
			} else {
				answer.push(0);
				if (list.length == 0) {
					if (num != 0) {
						remainder.push(num);
					}
					break;
				}
				num = num * 10 + list.shift();
			}
		}
		this.makeNum({
			answer: answer,
			remainder: remainder
		});
	},

	makeNum: function(obj) {
		//var list = [];
		this.list.push(this.parseNum(this.num1));
		this.list.push(obj.answer);
		this.list.push(this.parseNum(this.num2));
		//this.list[2].remainder = true;



		this.list[1].forEach(function(item, index) {
			if (item != 0) {
				this.list.push(this.parseNum(item * this.num1));
				for (;;) {
					if (this.list[this.list.length - 1].length < (index + 1)) {
						this.list[this.list.length - 1].unshift(-1);
					} else {
						break;
					}
				}
				this.list[this.list.length - 1].answer = true;
			}
		}.bind(this));


		for (var i = this.list.length; i >= 4; i--) {
			this.list.splice(i, 0, this.parseNum(obj.remainder.pop()));
			this.list[i].remainder = true;
		}

		var len = 0;

		for (var i = 0; i < this.list[1].length; i++) {
			if (this.list[1][i] != 0) {
				len = this.parseNum(this.list[1][i] * this.num1).length;
				break;
			}
		}
		//console.log(len);

		//prepare for format array
		for (var i = 0; i < this.list.length - 1; i++) {
			for (;;) {
				if (this.list[i].remainder && (this.joinNum(this.list[i]) < this.num1)) {
					this.list[i].push(this.list[2][len++]);
					this.list[i].len = len;
				} else {
					break;
				}
			}
		}

		//format array
		this.list.forEach(function(item, index) {
			if (index == this.list.length - 1) {
				for (;;) {
					if (item.length < (this.list[2].length - this.list[index - 1].length + 1)) {
						item.unshift(0);
					} else {
						break;
					}
				}
				for (;;) {
					if (item.length < this.list[2].length) {
						item.unshift(-1);
					} else {
						break;
					}
				}
			} else if (item.remainder) {
				for (;;) {
					if (item.length < item.len - this.list[index - 1].length + 1) {
						item.unshift(0);
					} else {
						break;
					}
				}
				for (;;) {
					if (item.length < item.len) {
						item.unshift(-1);
					} else {
						break;
					}
				}
			}
		}.bind(this));


		//console.log(this.list);
		this.borrowAndCarry(this.list);
	},

	borrowAndCarry: function(arr) {
		console.log(arr);
		var index = 3;
		var len = arr[0].length

		//change to object
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				arr[i][j] = new DivideModel({
					value: arr[i][j]
				});
			}
		}

		//init borrow
		for (var i = 2; i < arr.length - 1; i += 2) {
			for (var j = 0; j < arr[i + 1].length; j++) {
				if ((arr[i][j].getValue() < arr[i + 1][j].getValue())) {
					arr[i][j - 1].setBorrow(true);
				}
			}
		}


		//init carry
		for (var i = 0; i < arr[1].length; i++) {
			if (arr[1][i].getValue() > 0) {
				for (var j = len - 1; j >= 0; j--) {
					var carry = arr[1][i].getValue() * arr[0][j].getValue() + arr[index][arr[index].length - len + j].getCarry();
					if (arr[1][i].getValue() && carry >= 10) {
						arr[index][arr[index].length - len + j - 1].setCarry(Math.floor(carry / 10));
					}
				}
				index += 2;
			}
		}


		//test
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				if (arr[i][j].getBorrow()) {
					console.log("borrow: " + arr[i][j].getValue());
				}
				if (arr[i][j].getCarry()) {
					console.log("carry: " + arr[i][j].getCarry() + ":" + arr[i][j].getValue());
				}
			}
		}
	}
};

var DivideModel = function(obj) {
	this.value = obj.value,
	this.carry = obj.carry,
	this.borrow = obj.borrow
};

DivideModel.prototype = {
	setBorrow: function(boo) {
		this.borrow = boo;
		return this;
	},
	getBorrow: function() {
		return this.borrow;
	},
	setCarry: function(num) {
		this.carry = num;
		return this;
	},
	getCarry: function() {
		return this.carry;
	},
	getValue: function() {
		return this.value;
	}
};