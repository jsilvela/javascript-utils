// Functions to generate a list of numbers with a tolerance interval
// around them. For instance, given epsilon = 0.5, the numbers 4.2 and 4.4
// would fall in the same interval.
// Wile one could think of using interval trees, that solution is overkill
// if we just want an epsilon band around each number.

/*jslint white*/
/*property
    abs, forEach, push, reps, val
*/

function addToClusters(x, clusters, epsilon) {
	"use strict";
	var found = false;
	clusters.forEach(
		function (cluster) {
			if (!found && Math.abs(x - cluster.val) < (cluster.reps * epsilon)) {
				cluster.reps = cluster.reps + 1;
				found = true;
			}
		}
	);
	if (!found) {
		clusters.push({val:x, reps:1});
	}
}

function buildClusters(nums, epsilon) {
	"use strict";
	var clusters = [];
	nums.forEach(
		function (num) {
			addToClusters(num, clusters, epsilon);
		}
	);
	return clusters;
}
