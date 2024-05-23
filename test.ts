// tests go here; this will not be compiled when this package is used as an extension.

let array: any[];
let result: any;

function testCopy() {
    // Test copy
    array = ["a", "b", "c"];
    result = arrays.copy(array);
    (result as any[]).splice(0, 2);
    new tests.AssertNotEqual(array, result);
}

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

    // Test exceptions
    // Test non-integer value
    new tests.AssertRaises(
        () => arrays.findAll([], null, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    new tests.AssertRaises(
        () => arrays.findAll([], null, -1),
        "Value must not be negative (not -1)"
    )
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

    // Test exceptions
    // Test non-integer value
    new tests.AssertRaises(
        () => arrays.removeAll([], null, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    new tests.AssertRaises(
        () => arrays.removeAll([], null, -1),
        "Value must not be negative (not -1)"
    )
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

    // Test exceptions
    // Test non-integer value
    new tests.AssertRaises(
        () => arrays.toRemovedAll([], null, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    new tests.AssertRaises(
        () => arrays.toRemovedAll([], null, -1),
        "Value must not be negative (not -1)"
    )
}

function testSwap() {
    // Test swapping indicies
    result = ["a", "b", "c"];
    arrays.swap(result, 0, 2);
    new tests.AssertEqual(result, ["c", "b", "a"]);

    // Test exceptions
    // Test non-integer value
    // First index
    new tests.AssertRaises(
        () => arrays.swap(["a", "b"], 0.5, 0),
        "Value must be integer (not 0.5)"
    )
    // Second index
    new tests.AssertRaises(
        () => arrays.swap(["a", "b"], 0, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    // First index
    new tests.AssertRaises(
        () => arrays.swap(["a", "b"], -1, 0),
        "Value must not be negative (not -1)"
    )
    // Second index
    new tests.AssertRaises(
        () => arrays.swap(["a", "b"], -1, 0),
        "Value must not be negative (not -1)"
    )
    // Test out of range
    // First index
    new tests.AssertRaises(
        () => arrays.swap(["a", "b"], 0, 2),
        "Index (2) must be in list range (0, 2)"
    )
    // Second index
    new tests.AssertRaises(
        () => arrays.swap(["a", "b"], 2, 0),
        "Index (2) must be in list range (0, 2)"
    )
}

function testToSwapped() {
    // Test swapping indicies
    array = ["a", "b", "c"];
    result = arrays.toSwapped(array, 0, 2);
    new tests.AssertEqual(result, ["c", "b", "a"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);

    // Test exceptions
    // Test non-integer value
    // First index
    new tests.AssertRaises(
        () => arrays.toSwapped(["a", "b"], 0.5, 0),
        "Value must be integer (not 0.5)"
    )
    // Second index
    new tests.AssertRaises(
        () => arrays.toSwapped(["a", "b"], 0, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    // First index
    new tests.AssertRaises(
        () => arrays.toSwapped(["a", "b"], -1, 0),
        "Value must not be negative (not -1)"
    )
    // Second index
    new tests.AssertRaises(
        () => arrays.toSwapped(["a", "b"], -1, 0),
        "Value must not be negative (not -1)"
    )
    // Test out of range
    // First index
    new tests.AssertRaises(
        () => arrays.toSwapped(["a", "b"], 0, 2),
        "Index (2) must be in list range (0, 2)"
    )
    // Second index
    new tests.AssertRaises(
        () => arrays.toSwapped(["a", "b"], 2, 0),
        "Index (2) must be in list range (0, 2)"
    )
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

    // Test exceptions
    // Test non-integer value
    // Test start value
    new tests.AssertRaises(
        () => arrays.fill(["a", "b", "c"], "a", 0.5, 1),
        "Value must be integer (not 0.5)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.fill(["a", "b", "c"], "a", 0, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    // Test start value
    new tests.AssertRaises(
        () => arrays.fill(["a", "b", "c"], "a", -1, 0),
        "Value must not be negative (not -1)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.fill(["a", "b", "c"], "a", 0, -1),
        "Value must not be negative (not -1)"
    )
    // Test out of range value
    // Test start value
    
    new tests.AssertRaises(
        () => arrays.fill(["a", "b", "c"], "a", 4, 0),
        "Index (4) must be in list range (0, 3)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.fill(["a", "b", "c"], "a", 0, 4),
        "Index (4) must be in list range (0, 3)"
    )
    
    // Test invalid range values
    new tests.AssertRaises(
        () => arrays.fill(["a", "b", "c"], "a", 1, 0),
        "Start value (1) must be lower than end value (0)"
    )
}

function testToFilled() {
    // Test fill
    array = ["a", "b", "c", "d", "e"];
    result = arrays.fill(array, "f", 1, 4);
    new tests.AssertEqual(result, ["a", "f", "f", "f", "e"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c", "d", "e"]);

    // Test fill
    result = ["a", "b", "c", "d", "e"];
    arrays.fill(result, "f", 1, 4);
    new tests.AssertEqual(result, ["a", "f", "f", "f", "e"]);

    // Test exceptions
    // Test non-integer value
    // Test start value
    new tests.AssertRaises(
        () => arrays.toFilled(["a", "b", "c"], "a", 0.5, 1),
        "Value must be integer (not 0.5)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.toFilled(["a", "b", "c"], "a", 0, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    // Test start value
    new tests.AssertRaises(
        () => arrays.toFilled(["a", "b", "c"], "a", -1, 0),
        "Value must not be negative (not -1)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.toFilled(["a", "b", "c"], "a", 0, -1),
        "Value must not be negative (not -1)"
    )
    // Test out of range value
    // Test start value

    new tests.AssertRaises(
        () => arrays.toFilled(["a", "b", "c"], "a", 4, 0),
        "Index (4) must be in list range (0, 3)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.toFilled(["a", "b", "c"], "a", 0, 4),
        "Index (4) must be in list range (0, 3)"
    )
    // Test invalid range values
    new tests.AssertRaises(
        () => arrays.toFilled(["a", "b", "c"], "a", 1, 0),
        "Start value (1) must be lower than end value (0)"
    )
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

    // Test exceptions
    // Test non-integer value
    // Test start value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 0, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test step value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 0, 1, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    // Test start value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], -1),
        "Value must not be negative (not -1)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 0, -1),
        "Value must not be negative (not -1)"
    )
    // Test step value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 0, 1, -1),
        "Value must not be negative (not -1)"
    )
    // Test out of range value
    // Test start value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 4),
        "Index (4) must be in list range (0, 3)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 0, 4),
        "Index (4) must be in list range (0, 3)"
    )
    // Test zero step value
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 0, 1, 0),
        "Stepping value cannot be 0"
    )
    // Test invalid range values
    new tests.AssertRaises(
        () => arrays.slice(["a", "b", "c"], 1, 0),
        "Start value (1) must be lower than end value (0)"
    )
}

function testToSliced() {
    // Test slice
    array = ["a", "b", "c", "d"];
    result = arrays.toSliced(array, 1, 3);
    new tests.AssertEqual(result, ["b", "c"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c", "d"]);

    // Test exceptions
    // Test non-integer value
    // Test start value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 0, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test step value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 0, 1, 0.5),
        "Value must be integer (not 0.5)"
    )
    // Test negative value
    // Test start value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], -1),
        "Value must not be negative (not -1)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 0, -1),
        "Value must not be negative (not -1)"
    )
    // Test step value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 0, 1, -1),
        "Value must not be negative (not -1)"
    )
    // Test out of range value
    // Test start value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 4),
        "Index (4) must be in list range (0, 3)"
    )
    // Test end value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 0, 4),
        "Index (4) must be in list range (0, 3)"
    )
    // Test zero step value
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 0, 1, 0),
        "Stepping value cannot be 0"
    )
    // Test invalid range values
    new tests.AssertRaises(
        () => arrays.toSliced(["a", "b", "c"], 1, 0),
        "Start value (1) must be lower than end value (0)"
    )
}

function testInRange() {
    // Test in range
    result = arrays.inRange(["a", "b", "c"], 2);
    new tests.AssertTrue(result);
    // Test not in range
    result = arrays.inRange(["a", "b", "c"], 3);
    new tests.AssertFalse(result);

    // Test exceptions
    // Test non-integer value
    new tests.AssertRaises(
        () => arrays.inRange([], 0.5),
        "Value must be integer (not 0.5)"
    )
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

function testClear() {
    // Test clearing
    result = ["a", "b", "c"];
    arrays.clear(result);
    new tests.AssertEqual(result, []);
}

function testIsEmpty() {
    // Test empty array
    result = arrays.isEmpty([]);
    new tests.AssertTrue(result);
    // Test non-empty array
    result = arrays.isEmpty(["a", "b", "c"]);
    new tests.AssertFalse(result);
}

function testUnion() {
    // Test union
    array = ["a", "b", "c"];
    arrays.union(array, ["b", "c", "d"]);
    new tests.AssertEqual(array, ["a", "b", "c", "d"]);
}

function testToUnion() {
    // Test union
    array = ["a", "b", "c"];
    result = arrays.toUnion(array, ["b", "c", "d"]);
    new tests.AssertEqual(result, ["a", "b", "c", "d"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testIntersection() {
    // Test intersection
    array = ["a", "b", "c"];
    arrays.intersection(array, ["b", "c", "d"]);
    new tests.AssertEqual(array, ["b", "c"]);
}

function testToIntersection() {
    // Test intersection
    array = ["a", "b", "c"];
    result = arrays.toIntersection(array, ["b", "c", "d"]);
    new tests.AssertEqual(result, ["b", "c"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testDifference() {
    // Test difference
    array = ["a", "b", "c"];
    arrays.difference(array, ["b", "c", "d"]);
    new tests.AssertEqual(array, ["a"]);
}

function testToDifference() {
    // Test difference
    array = ["a", "b", "c"];
    result = arrays.toDifference(array, ["b", "c", "d"]);
    new tests.AssertEqual(result, ["a"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testPurge() {
    // Test removing duplicates
    array = ["a", "a", "b", "b", "c"];
    arrays.purge(array);
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testToPurged() {
    // Test removing duplicates
    array = ["a", "a", "b", "b", "c"];
    result = arrays.toPurged(array);
    new tests.AssertEqual(result, ["a", "b", "c"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "a", "b", "b", "c"]);
}

function testExtract() {
    // Test extracting
    result = arrays.extract(["a", "b", "a", "c", "a"], "a");
    new tests.AssertEqual(result, ["a", "a", "a"]);
}

function testSort() {
    // Test sorting ascending
    array = [4, 2, 3, 1, 5];
    arrays.sort(array, SortOrder.Ascending);
    new tests.AssertEqual(array, [1, 2, 3, 4, 5]);
    // Test sorting descending
    array = [4, 2, 3, 1, 5];
    arrays.sort(array, SortOrder.Descending);
    new tests.AssertEqual(array, [5, 4, 3, 2, 1]);
}

function testToSorted() {
    // Test sorting ascending
    array = [4, 2, 3, 1, 5];
    result = arrays.toSorted(array, SortOrder.Ascending);
    new tests.AssertEqual(result, [1, 2, 3, 4, 5]);
    // Test sorting descending
    result = arrays.toSorted(array, SortOrder.Descending);
    new tests.AssertEqual(result, [5, 4, 3, 2, 1]);
    // Test that original array is not modified
    new tests.AssertEqual(array, [4, 2, 3, 1, 5]);
}

function testAllTrue() {
    // Test all true
    result = arrays.allTrue(["a", "b", "c"]);
    new tests.AssertTrue(result);
    // Test not all true
    result = arrays.allTrue(["a", "b", 0]);
    new tests.AssertFalse(result);
}

function testAnyTrue() {
    // Test any true
    result = arrays.anyTrue(["a", 0, false]);
    new tests.AssertTrue(result);
    // Test none true
    result = arrays.anyTrue([false, 0, null]);
    new tests.AssertFalse(result);
}

function testAllEqual() {
    // Test all equal
    result = arrays.allEqual(["a", "a"], "a");
    new tests.AssertTrue(result);
    // Test not all equal
    result = arrays.allEqual(["a", "b"], "a");
    new tests.AssertFalse(result);
}

function testSum() {
    // Test sum
    result = arrays.sum([1, 2, 3]);
    new tests.AssertEqual(result, 6);
}

function testRange() {
    // Test range
    result = arrays.range(0, 4);
    new tests.AssertEqual(result, [0, 1, 2, 3]);
    // Test stepping
    result = arrays.range(0, 8, 2);
    new tests.AssertEqual(result, [0, 2, 4, 6]);
}

function testEnumerate() {
    // Test enumeration
    array = ["a", "b", "c"];
    arrays.enumerate(array);
    new tests.AssertEqual(array, [["a", 0], ["b", 1], ["c", 2]]);
}

function testToEnumerated() {
    // Test enumeration
    array = ["a", "b", "c"];
    result = arrays.toEnumerated(array);
    new tests.AssertEqual(result, [["a", 0], ["b", 1], ["c", 2]]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testRandomIndex() {
    // Test random index
    array = ["a", "b", "c"];
    for (let i = 0; i < 10; i++) {
        result = arrays.randomIndex(array);
        new tests.AssertGreaterEqual(result, 0);
        new tests.AssertLess(result, array.length);
    }
}

function testJoin() {
    // Test joining
    result = arrays.join(["a", "b", "c"]);
    new tests.AssertEqual(result, "abc");
    // Test separator
    result = arrays.join(["a", "b", "c"], ".");
    new tests.AssertEqual(result, "a.b.c");
}

function testMinIndex() {
    // Test finding min index
    result = arrays.minIndex([4, 3, 1, 2, 5]);
    new tests.AssertEqual(result, 2);
}

function testMin() {
    // Test finding min element
    result = arrays.min([4, 3, 1, 2, 5]);
    new tests.AssertEqual(result, 1);
}

function testMaxIndex() {
    // Test finding max index
    result = arrays.maxIndex([4, 3, 1, 2, 5]);
    new tests.AssertEqual(result, 4);
}

function testMax() {
    // Test finding max element
    result = arrays.max([4, 3, 1, 2, 5]);
    new tests.AssertEqual(result, 5);
}

function testSplice() {
    // Test splice
    array = ["a", "b", "c", "d", "e"];
    arrays.splice(array, 0, 2);
    new tests.AssertEqual(array, ["c", "d", "e"]);
    // Test splice offset
    array = ["a", "b", "c", "d", "e"];
    arrays.splice(array, 2, 2);
    new tests.AssertEqual(array, ["a", "b", "e"]);
}

function testToSpliced() {
    // Test splice
    array = ["a", "b", "c", "d", "e"];
    result = arrays.toSpliced(array, 0, 2);
    new tests.AssertEqual(result, ["c", "d", "e"]);
    // Test splice offset
    array = ["a", "b", "c", "d", "e"];
    result = arrays.toSpliced(array, 2, 2);
    new tests.AssertEqual(result, ["a", "b", "e"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c", "d", "e"]);
}

function testUnzip() {
    // Test unzip
    array = [[0, "a"], [1, "b"], [2, "c"]];
    arrays.unzip(array, 0);
    new tests.AssertEqual(array, [0, 1, 2]);
    // Test target
    array = [[0, "a"], [1, "b"], [2, "c"]];
    arrays.unzip(array, 1);
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testToUnzipped() {
    // Test unzip
    array = [[0, "a"], [1, "b"], [2, "c"]];
    result = arrays.toUnzipped(array, 0);
    new tests.AssertEqual(result, [0, 1, 2]);
    // Test target
    result = arrays.toUnzipped(array, 1);
    new tests.AssertEqual(result, ["a", "b", "c"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, [[0, "a"], [1, "b"], [2, "c"]]);
}

function testShift() {
    // Test shift
    array = ["a", "b", "c"];
    arrays.shift(array);
    new tests.AssertEqual(array, ["b", "c"]);
    // Test number of elements
    array = ["a", "b", "c"];
    arrays.shift(array, 2);
    new tests.AssertEqual(array, ["c"]);
}

function testToShifted() {
    // Test shift
    array = ["a", "b", "c"];
    result = arrays.toShifted(array);
    new tests.AssertEqual(result, ["b", "c"]);
    // Test number of elements
    result = arrays.toShifted(array, 2);
    new tests.AssertEqual(result, ["c"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, ["a", "b", "c"]);
}

function testEqual() {
    // Test equal
    result = arrays.equal(["a", [0, 1]], ["a", [0, 1]]);
    new tests.AssertTrue(result);
    // Test not equal
    result = arrays.equal(["a", [0, 1]], ["b", [0, 1]]);
    new tests.AssertFalse(result);
}

function testConcatMany() {
    // Test concat many
    result = arrays.concatMany([[0, 1], [2, 3], [4, 5]]);
    new tests.AssertEqual(result, [0, 1, 2, 3, 4, 5]);
}

function testZipMany() {
    // Test zip many
    result = arrays.zipMany([[0, 1, 2], ["a", "b", "c"], ["A", "B", "C"]]);
    new tests.AssertEqual(result, [[0, "a", "A"], [1, "b", "B"], [2, "c", "C"]]);
}

function testFlatten() {
    // Test flatten
    array = [[0, 1, [2, 3]], ["a", "b"], "c"];
    arrays.flatten(array);
    new tests.AssertEqual(array, [0, 1, 2, 3, "a", "b", "c"]);
    // Test depth
    array = [[0, 1, [2, 3]], ["a", "b"], "c"];
    arrays.flatten(array, 1);
    new tests.AssertEqual(array, [0, 1, [2, 3], "a", "b", "c"]);
}

function testToFlattened() {
    // Test flatten
    array = [[0, 1, [2, 3]], ["a", "b"], "c"];
    result = arrays.toFlattened(array);
    new tests.AssertEqual(result, [0, 1, 2, 3, "a", "b", "c"]);
    // Test depth
    result = arrays.toFlattened(array, 1);
    new tests.AssertEqual(result, [0, 1, [2, 3], "a", "b", "c"]);
    // Test that original array is not modified
    new tests.AssertEqual(array, [[0, 1, [2, 3]], ["a", "b"], "c"]);
}

testCopy();
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
testClear();
testIsEmpty();
testUnion();
testToUnion();
testIntersection();
testToIntersection();
testDifference();
testToDifference();
testPurge();
testToPurged();
testExtract();
testSort();
testToSorted();
testAllTrue();
testAnyTrue();
testAllEqual();
testSum();
testRange();
testEnumerate();
testToEnumerated();
testRandomIndex();
testJoin();
testMinIndex();
testMin();
testMaxIndex();
testMax();
testSplice();
testToSpliced();
testUnzip();
testToUnzipped();
testShift();
testToShifted();
testConcatMany();
testZipMany();
testFlatten();
testToFlattened();