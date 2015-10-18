// Functions to generate a list of numbers with a tolerance interval
// around them. For instance, given epsilon = 0.5, the numbers 4.2 and 4.4
// would fall in the same interval.
// Wile one could think of using interval trees, that solution is overkill
// if we just want an epsilon band around each number.

// Worried about efficiency? Go the BST route.

function addToBst(x, bst, epsilon) {
	if (bst.length === 0) {
		return {num: x, rep: 1, left: bst, right: bst};
	}
	if (Math.abs(bst.num - x) < (epsilon * bst.rep)) {
		bst.rep++;
		return bst;
	} else if (x > bst.num) {
		return {num: bst.num, rep: bst.rep,
			left: bst.left, right:addToBst(x, bst.right, epsilon)};
	} else {
		return {num: bst.num, rep: bst.rep,
			left: addToBst(x, bst.left, epsilon), right: bst.right};
	}
}

function addBst(xs, epsilon) {
	var bst = [];
	for (i=0; i<xs.length; i++) {
		bst = addToBst(xs[i], bst, epsilon);
	}
	return bst;
}

function flattenBst(bst) {
	if (bst.length === 0) {
		return [];
	}
	return flattenBst(bst.left).
		concat([bst]).
		concat(flattenBst(bst.right));
}


// If we're not worried about efficiency

function addInterval(x, xs, epsilon) {
	if (xs.length ===0) {
		xs = {val:x, reps:1, next:xs};
	} else if (Math.abs(x - xs.val) < (xs.reps * epsilon)) {
		xs.reps++;
	} else {
		xs.next = addInterval(x, xs.next, epsilon);
	}
	return xs;
}

function addIntervals(xs, epsilon) {
	var bst = [];
	for (i=0; i<xs.length; i++) {
		bst = addInterval(xs[i], bst, epsilon);
	}
	return bst;
}

function printIntervals(xs) {
	if (xs.length === 0) {
		;
	} else {
		console.log(xs.val + "--" + xs.reps);
		printIntervals(xs.next);
	}
}
