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
  var res = '';
  var oldLastIndex = 0;
  var match;
  var matchPart;
  var matchPartFormat;

  var maps = {
    M: 'getMonth',
    d: 'getDate',
    h: 'getHours',
    m: 'getMinutes',
    s: 'getSeconds'
  };

  while (match = validPartsReg.exec(format)) {
    res += format.slice(oldLastIndex, match.index);
    matchPart = match[0];

    switch (matchPart[0]) {
      case 'y':
        matchPartFormat = this.getFullYear().toString();

        if (matchPart.length == 2) {
          matchPartFormat = matchPartFormat.slice(2);
        }

        break;
      case 'M':
      case 'd':
      case 'h':
      case 'm':
      case 's':
        matchPartFormat = this[maps[matchPart[0]]].call(this);

        if (matchPart[0] == 'M') matchPartFormat += 1;

        if (matchPart.length == 2 && matchPartFormat < 10) {
          matchPartFormat = '0' + matchPartFormat;
        }

        break;
      default:
        throw new Error('invalid formt part: ' + matchPart);
    }

    res += matchPartFormat;
    oldLastIndex = validPartsReg.lastIndex;
  }

  res += format.slice(oldLastIndex);
  return res;
};

var d = new Date(Date.parse('2017-09-08 23:12:09'))
console.log(d.toString('yyyy-MM-dd hh:mm:ss') === '2017-09-08 23:12:09'); // true
console.log(d.toString('yy-M-d h:m:s') === '17-9-8 23:12:9'); // true
