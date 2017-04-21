/**
 * convert a data to string according to the format
 * @param format String:
 *  - yy, yyyy: year(14), full year(2014)
 *  - M, MM: month, with 0 padding when < 10
 *  - d, dd: day
 *  - h, hh: hour
 *  - m, mm: minutes
 *  - s, ss: seconds
 * @return string
 *
 * example:
 * (new Date()).toString('yy-MM-dd h:m:s') => '17-09-05 6:13:09'
 */
Date.prototype.toString = function(format) {
  var validPartsReg = /(yy)?yy|M?M|d?d|h?h|m?m|s?s/g
  var res = '', oldLastIndex = 0, match, matchPartFormat; 
  var maps = { y: 'getFullYear', M: 'getMonth', d: 'getDate', h: 'getHours', m: 'getMinutes', s: 'getSeconds' };
  while (match = validPartsReg.exec(format)) {
    res += format.slice(oldLastIndex, match.index);
    matchPartFormat = this[maps[match[0][0]]].call(this);
    if (match[0][0] == 'M') matchPartFormat += 1;
    if (match[0].length == 2 && matchPartFormat < 10) matchPartFormat = '0' + matchPartFormat;
    if (match[0].length == 2 && match[0][0] == 'y')   matchPartFormat = matchPartFormat.toString().slice(2);
    res += matchPartFormat;
    oldLastIndex = validPartsReg.lastIndex;
  }
  res += format.slice(oldLastIndex);
  return res;
};

var d = new Date(Date.parse('2017-09-08 23:12:09'))
console.log(d.toString('yyyy-MM-dd hh:mm:ss') === '2017-09-08 23:12:09'); // true
console.log(d.toString('yy-M-d h:m:s') === '17-9-8 23:12:9'); // true
