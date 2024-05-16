// tests go here; this will not be compiled when this package is used as an extension.

let array: any[];
let result: any;

function testFindLast() {
    // Test finding single item
    result = arrays.findLast(["a", "b", "c"], "b");
    new tests.AssertEqual(result, 1);
    // Test finding last of multiple items
    result = arrays.findLast(["a", "b", "a"], "a");
    new tests.AssertEqual(result, 2);
    // Test finding non-existent item
    result = arrays.findLast(["a", "b", "c"], "d");
    new tests.AssertEqual(result, -1);
}

function testFindAll() {
    // Test finding items
    result = arrays.findAll(["a", "b", "a", "c"], "a");
    new tests.AssertEqual(result, [0, 2]);
    // Test limit
    result = arrays.findAll(["a", "b", "a", "c"], "a", 1);
    new tests.AssertEqual(result, [0]);
    // Test finding non-existent item
    result = arrays.findAll(["a", "b", "c"], "d");
    new tests.AssertEqual(result, []);
}

function testCount() {
    // Test counting item
    result = arrays.count(["a", "b", "a", "c", "a"], "a");
    new tests.AssertEqual(result, 3);
    // Test counting non-existent item
    result = arrays.count(["a"], "b");
    new tests.AssertEqual(result, 0);
}

function testRemoveAll() {
    // Test removing all items
    result = ["a", "b", "c", "a", "d"];
    arrays.removeAll(result, "a");
    new tests.AssertEqual(result, ["b", "c", "d"]);
    // Test limit
    result = ["a", "b", "c", "a", "d"];
    arrays.removeAll(result, "a", 1);
    new tests.AssertEqual(result, ["b", "c", "a", "d"]);
}

function testToRemovedAll() {
    // Test removing all items
    array = ["a", "b", "c", "a", "d"];
    result = arrays.toRemovedAll(array, "a");
    new tests.AssertEqual(result, ["b", "c", "d"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c", "a", "d"]);
    // Test limit
    result = arrays.toRemovedAll(array, "a", 1);
    new tests.AssertEqual(result, ["b", "c", "a", "d"]);
}

function testSwap() {
    // Test swapping indicies
    result = ["a", "b", "c"];
    arrays.swap(result, 0, 2);
    new tests.AssertEqual(result, ["c", "b", "a"]);
}

function testToSwapped() {
    // Test swapping indicies
    array = ["a", "b", "c"];
    result = arrays.toSwapped(array, 0, 2);
    new tests.AssertEqual(result, ["c", "b", "a"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testReplace() {
    // Test replacing items
    result = ["a", "b", "a", "c", "a"];
    arrays.replace(result, "a", "d");
    new tests.AssertEqual(result, ["d", "b", "d", "c", "d"]);
}

function testToReplaced() {
    // Test replacing items
    array = ["a", "b", "a", "c", "a"];
    result = arrays.toReplaced(array, "a", "d");
    new tests.AssertEqual(result, ["d", "b", "d", "c", "d"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "a", "c", "a"]);
}

function testFill() {
    // Test fill
    result = ["a", "b", "c", "d", "e"];
    arrays.fill(result, "f", 1, 4);
    new tests.AssertEqual(result, ["a", "f", "f", "f", "e"]);
}

function testToFilled() {
    // Test fill
    array = ["a", "b", "c", "d", "e"];
    result = arrays.fill(array, "f", 1, 4);
    new tests.AssertEqual(result, ["a", "f", "f", "f", "e"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c", "d", "e"]);
}

function testConcat() {
    // Test concat
    result = ["a", "b", "c"];
    arrays.concat(result, ["d", "e", "f"]);
    new tests.AssertEqual(result, ["a", "b", "c", "d", "e", "f"]);
}

function testToConcated() {
    // Test concat
    array = ["a", "b", "c"];
    result = arrays.toConcated(array, ["d", "e", "f"]);
    new tests.AssertEqual(result, ["a", "b", "c", "d", "e", "f"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testSlice() {
    // Test slice
    result = ["a", "b", "c", "d"];
    arrays.slice(result, 1, 3);
    new tests.AssertEqual(result, ["b", "c"]);
}

function testToSliced() {
    // Test slice
    array = ["a", "b", "c", "d"];
    result = arrays.toSliced(array, 1, 3);
    new tests.AssertEqual(result, ["b", "c"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c", "d"]);
}

function testInRange() {
    // Test in range
    result = arrays.inRange(["a", "b", "c"], 2);
    new tests.AssertTrue(result);
    // Test not in range
    result = arrays.inRange(["a", "b", "c"], 3);
    new tests.AssertFalse(result);
}

function testRepeat() {
    // Test repeat
    result = arrays.repeat("a", 3);
    new tests.AssertEqual(result, ["a", "a", "a"]);
}

function testIncludes() {
    // Test existing item
    result = arrays.includes(["a", "b", "c"], "b");
    new tests.AssertTrue(result);
    // Test non-exsitent item
    result = arrays.includes(["a", "b", "c"], "d");
    new tests.AssertFalse(result);
}

function testZip() {
    // Test zip
    result = ["a", "b", "c"];
    arrays.zip(result, [0, 1, 2]);
    new tests.AssertEqual(result, [["a", 0], ["b", 1], ["c", 2]]);
}

function testToZipped() {
    // Test zip
    array = ["a", "b", "c"];
    result = arrays.toZipped(array, [0, 1, 2]);
    new tests.AssertEqual(result, [["a", 0], ["b", 1], ["c", 2]]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testToReversed() {
    // Test reversing
    array = ["a", "b", "c"];
    result = arrays.toReversed(array);
    new tests.AssertEqual(result, ["c", "b", "a"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testForEach() {
    // Test foreach loop
    array = ["a", "b", "c"];
    arrays.forEach(array, (value, index) => {
        new tests.AssertEqual(value, array[index]);
    })
}

testFindLast();
testFindAll();
testCount();
testRemoveAll();
testToRemovedAll();
testSwap();
testToSwapped();
testReplace();
testToReplaced();
testFill();
testConcat();
testToConcated();
testSlice();
testToSliced();
testInRange();
testRepeat();
testIncludes();
testZip();
testToZipped();
testToReversed();
testForEach();