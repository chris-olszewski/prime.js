Number.prototype.isPrime = function() {
	for (var i = 2; i < this.valueOf(); i++) {
		if (this.valueOf() % i == 0) {
			return false;
		};
	};
	return true;
};

function generatePrime() {
	console.log("Generated Prime");
	$.get('next_number', function(data) {
		console.log("Was assigned " + data)
		var prime = parseInt(data).isPrime();
		$.post(data + '?prime=' + prime, function(data) {
			console.log(data);
		});
	});
};