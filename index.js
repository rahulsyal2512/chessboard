function Board(el, n) {
	this.el = document.querySelector(el);
	this.n = n;
	this.createBoard();
	this.handleEvents();
}

Board.prototype.createBoard = function () {
	let fragment = new DocumentFragment();
	for (var i = 0; i < this.n; i++) {
		for (var j = 0; j < this.n; j++) {
			let box = document.createElement('div');
			box.setAttribute('style', `width: ${300 / this.n}px; height: ${300 / this.n}px `);
			box.dataset['row'] = i;
			box.dataset['col'] = j;
			box.setAttribute('class', 'box');
			if ((i + j) % 2 === 0) {
				box.classList.add('white');
			} else {
				box.classList.add('black');
			}
			fragment.append(box);
			document.getElementById('board').append(fragment);
		}
	}
};

Board.prototype.handleEvents = function () {
	this.el.addEventListener(
		'click',
		(e) => {
			this.findDiagnols(e);
		},
		false
	);
	document.querySelector('body').addEventListener(
		'click',
		(e) => {
			const boxes = document.getElementsByClassName('box');
			this.clearDiagnols(boxes);
		},
		true
	);
};

Board.prototype.findDiagnols = function (e) {
	const r = +e.target.dataset['row'];
	const c = +e.target.dataset['col'];
	const boxes = document.getElementsByClassName('box');
	this.clearDiagnols(boxes);

	let diag = [];
	for (let k = 0; k < boxes.length; k++) {
		let cards = boxes[k];
		let boxRow = +cards.dataset['row'];
		let boxCol = +cards.dataset['col'];

		if (boxRow + boxCol === r + c) {
			diag.push(boxes[k]);
		}
		if (boxRow - boxCol === r - c) {
			diag.push(boxes[k]);
		}
	}

	this.fillDiagnols(diag);
};

Board.prototype.fillDiagnols = function (boxes) {
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].classList.add('red');
	}
};

Board.prototype.clearDiagnols = function (boxes) {
	for (let k = 0; k < boxes.length; k++) {
		boxes[k].classList.remove('red');
	}
};

new Board('#board', 6);
