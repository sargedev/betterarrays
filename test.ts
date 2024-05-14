// tests go here; this will not be compiled when this package is used as an extension.

let result;

function testFindLast() {
    // Test finding single item
    result = arrays.findLast(["a", "b", "c"], "b");
    new tests.AssertEqual(result, 1);
    // Test finding last of multiple items
    result = arrays.findLast(["a", "b", "a"], "a");
    new tests.AssertEqual(result, 2);
    // Test 
    result = arrays.findLast(["a", "b", "c"], "d");
    new tests.AssertEqual(result, -1);
}

function testFindAll() {
    // Test findAll
    result = arrays.findAll(["a", "b", "a", "c"], "a");
    new tests.AssertEqual(result, [0, 2]);
    // Test limit
    result = arrays.findAll(["a", "b", "a", "c"], "a", 1);
    new tests.AssertEqual(result, [0]);
    // Test not found
    result = arrays.findAll(["a", "b", "c"], "d");
    new tests.AssertEqual(result, []);
}

testFindLast();
testFindAll();