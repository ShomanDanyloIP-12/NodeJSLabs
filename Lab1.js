function add(n) {
    let sum = n;
    function f(n) {
        if (n !== undefined) {
            sum += n;
            return f;
        } else {
            return sum;
        }
    }
    return f;
}

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37
console.log(add(2)(5)(7)(1)(6)(5)(11)(3)()); // 40

function areAnagrams(stringA, stringB) {
    let sortedStringA = stringA.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
    let sortedStringB = stringB.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
    return sortedStringA === sortedStringB;
}

console.log(areAnagrams('shoman', 'hmanos')); // True
console.log(areAnagrams('anagram', 'alagram')); // False
