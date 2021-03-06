$(document).ready(function() {
  var countTests = 10;

  var timetotal = 0;
  var startTime, timeDiff, arrayToSort;

  for (var n = 1; n <= countTests; n++) {
    arrayToSort = getRandomArray(1000);

    // console.log(arrayToSort);

    startTime = new Date().getTime();
    // sort(arrayToSort, 0, arrayToSort.length-1, shell);
    // sort(arrayToSort, 0, arrayToSort.length-1, hibbard);
    // sort(arrayToSort, 0, arrayToSort.length-1, knuth);
    sort(arrayToSort, 0, arrayToSort.length-1, sedgewick);
    timeDiff = new Date().getTime() - startTime;

    timetotal += timeDiff;

    // console.log(arrayToSort);

    console.log('Sorted Array in ' + timeDiff + ' Milisec');
  }

  var timeavg = timetotal / countTests;
  console.log('timeavg: ' + timeavg);
});

function getRandomArray(length) {
  var arr = new Array();

  for(var i = 0; i < length; i++){
    arr[i] = Math.floor((Math.random()*100)+1);
  }
  return arr;
}

/**
 *
 * @param array
 * @param first
 * @param last
 * @param hFactor factor to get next h (will be cut with math.floor())
 */
function sort(array, first, last, hFunc){
  var j, n, h, e;

  n = last - first + 1;
  h = hFunc(n);

  while (h > 0) {

    // console.log(h);

    for (var i = first; i <= (last - h); i++) {
      e = array[i + h];
      j = i;
      while (j >= first && e < array[j]) {
        array[j + h] = array[j];
        j = j - h;
      }
      array[j + h] = e;
    }
    h = hFunc(h);
  }
}

/* different types of algorithm */
/**
 * h = 2^k
 * @param n
 * @returns {number}
 */
shell = function(n) {
  for (var h = 1; h*2 < n; h = h * 2) {
    // console.log(h);
  }

  // console.log('n -> h: ' + n + ' ->' + h);

  if (n == h == 1) {
    // break if input is output -> prevent endless loop
    return 0;
  } else {
    return h;
  }
};

/**
 * h = 2^k - 1 = shell(x)-1
 * @param n
 * @returns {number}
 */
hibbard = function(n) {
  var h = shell(n) - 1;
  return h;
};

/**
 * h_0 = 1
 * h_{s+1} = 3 * h_s + 1
 * @param n
 * @returns {number}
 */
knuth = function(n) {
  for (var h = 1; h*3+1 < n; h = 3*h+1) {
    // console.log(h);
  }

  // console.log('n -> h: ' + n + ' ->' + h);

  if (n == h == 1) {
    // break if input is output -> prevent endless loop
    return 0;
  } else {
    return h;
  }
};

/*
 Src: http://de.wikipedia.org/wiki/Shellsort
  */

/**
 * gerade:    9*2^k - 9*2^(k/2) + 1
 * ungerade:  8*2k - 6*2^((k+1)/2) + 1
 * @param n
 * @returns {number}
 */
sedgewick = function(n) {
  var h = 0;
  var lastH = 1;

  for (var k = 0; h < n; k++) {
    lastH = h;
    if (k % 2 == 0) {
      // gerade
      h = 9 * Math.pow(2, k) - 9 * Math.pow(2, k/2) + 1;
    } else {
      // ungerade
      h = 8 * Math.pow(2, k) - 6 * Math.pow(2, (k+1)/2) + 1;
    }
  }

  if (n === lastH === 1) {
    // break if input is output -> prevent endless loop
    return 0;
  } else {
    return lastH;
  }
};