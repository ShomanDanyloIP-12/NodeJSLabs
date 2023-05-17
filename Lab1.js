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