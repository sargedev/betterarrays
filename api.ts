
enum SortOrder {
    Ascending,
    Descending
}

//% groups=["Mutual Operations", "Checks"]
namespace arrays {

    const NON_INTEGER_VALUE = new text.Format("Value must be integer (not {})");
    const NEGATIVE_VALUE = new text.Format("Value must not be negative (not {})");
    const OUT_OF_RANGE = new text.Format("Index ({}) must be in list range ({}, {})");
    const ZERO_STEP = new text.Format("Stepping value cannot be 0");
    const INVALID_RANGE = new text.Format("Start value ({}) must be lower than end value ({})");
    const EMPTY_ARRAY = new text.Format("Operation cannot be performed on empty array");
    const NOT_ARRAY = new text.Format("Expected array type (not {})");
    const INVALID_SHIFT = new text.Format("Shift value ({}) cannot be bigger than array length ({})");

    function isInteger(value: number): boolean {
        return Math.floor(value) === value;
    }

    function verifyInteger(value: number): number {
        if (!isInteger(value)) throw NON_INTEGER_VALUE.format([value.toString()]);
        return value;
    }

    function verify(value: number): number {
        value = verifyInteger(value);
        if (value < 0) throw NEGATIVE_VALUE.format([value.toString()]);
        return value;
    }

    function verifyIndex(value: number, array: any[]): number {
        value = verify(value);
        if (!arrays.inRange(array, value)) throw OUT_OF_RANGE.format([
            value.toString(), "0", array.length.toString()
        ])
        return value;
    }

    /**
     * Create shallow copy of array
     * @param array Array to copy
     */
    //% blockId=arrays_copy
    //% block="copy $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function copy(array: any[]): any[] {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(array[i]);
        }
        return result;
    }

    /**
     * Internal method; modify array directly with new items
     * @param array Original array
     * @param items New items
     */
    function reassign(array: any[], items: any[]): void {
        array.splice(0, array.length);
        for (let i = 0; i < items.length; i++) {
            array[i] = items[i];
        }
    }

    /**
     * Find last occurence of item in array
     * @param array Array to search
     * @param item Item to find
     * @returns Index of found item (-1 if not found)
     */
    //% blockId=arrays_findLast
    //% block="find last occurence of $item in $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function findLast(array: any[], item: any): number {
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === item) return i;
        }
        return -1;
    }

    /**
     * Find all occurences of item in array;
     * Throws NON_INTEGER_VALUE if max is not an integer;
     * Throws NEGATIVE_VALUE if max is less than 0;
     * @param array Array to search
     * @param item Item to find
     * @param max Max number of ocurrences to match (0 for unlimited)
     * @returns Array of indicies 
     */
    //% blockId=arrays_findAll
    //% block="find occurences of $item in $array || up to $max"
    //% group="Read"
    //% expandableArgumentMode=enabled
    //% array.defl=list
    //% array.shadow=variables_get
    //% max.defl=0
    export function findAll(array: any[], item: any, max: number = 0): number[] {
        max = verify(max);

        let result = [];
        for (let i = 0; i < array.length; i++) {
            if (checkEquality.equal(array[i], item)) result.push(i);
            if (max !== 0 && result.length >= max) break;
        }
        return result;
    }

    /**
     * Count the number of times an item occurs in an array
     * @param array Array to count in
     * @param item Item to count
     * @returns Number of occurences
     */
    //% blockId=arrays_count
    //% block="count occurences of $item in $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function count(array: any[], item: any): number {
        return findAll(array, item).length;
    }

    /**
     * Remove all ocurrences of an item;
     * Throws NON_INTEGER_VALUE if max is not an integer;
     * Throws NEGATIVE_VALUE if max is less than 0;
     * @param array Array to search
     * @param item Item to remove
     * @param max Max number of items to remove (0 for unlimited)
     */
    //% blockId=arrays_removeAll
    //% block="remove ocurrences of $item in $array || up to $max"
    //% group="Modify"
    //% expandableArgumentMode=enabled
    //% array.shadow=variables_get
    //% array.defl=list
    //% max.defl=0
    export function removeAll(array: any[], item: any, max: number = 0): void {
        max = verify(max);

        let indicies = findAll(array, item, max);
        for (let i = indicies.length - 1; i >= 0; i--) {
            array.removeAt(indicies[i]);
        }
    }

    /**
     * Return array copy with removed occurences of item;
     * Throws NON_INTEGER_VALUE if max is not an integer;
     * Throws NEGATIVE_VALUE if max is less than 0;
     * @param array Array to copy and remove from
     * @param item Item to remove
     * @param max Max number of items to remove (0 for unlimited)
     * @returns Array with removed items
     */
    //% blockId=arrays_toRemovedAll
    //% block="remove ocurrences of $item in $array || up to $max"
    //% group="Operations"
    //% expandableArgumentMode=enabled
    //% array.shadow=variables_get
    //% array.defl=list
    //% max.defl=0
    export function toRemovedAll(array: any[], item: any, max: number = 0): any[] {
        let result = copy(array);
        removeAll(result, item, max);
        return result;
    }

    /**
     * Swap two items in an array;
     * Throws NON_INTEGER_VALUE if first or second are not integers;
     * Throws NEGATIVE_VALUE if first or second are less than 0;
     * Throws OUT_OF_RANGE if first or second are out of list range;
     * @param array Array to modify
     * @param first Index of first item
     * @param second Index of second item
     */
    //% blockId=arrays_swap
    //% block="swap items at $first and $second in $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    //% first.defl=0
    //% second.defl=1
    export function swap(array: any[], first: number, second: number): void {
        first = verifyIndex(first, array);
        second = verifyIndex(second, array);

        let temp = array[first];
        array[first] = array[second];
        array[second] = temp;
    }

    /**
     * Return array copy with swapped items;
     * Throws NON_INTEGER_VALUE if first or second are not integers;
     * Throws NEGATIVE_VALUE if first or second are less than 0;
     * Throws OUT_OF_RANGE if first or second are out of list range;
     * @param array Array to copy and modify
     * @param first Index of first item
     * @param second Index of second item
     * @returns Array with swapped elements
     */
    //% blockId="arrays_toSwapped"
    //% block="swap items at $first and $second in $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    //% first.defl=0
    //% second.defl=1
    export function toSwapped(array: any[], first: number, second: number): any[] {
        let result = copy(array);
        swap(result, first, second);
        return result;
    }

    /**
     * Replaces all occurences of item with a replacement
     * @param array Array to modify
     * @param item Item to replace
     * @param replacement Item to replace with
     */
    //% blockId=arrays_replace
    //% block="replace all occurences of $item with $replacement in $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function replace(array: any[], item: any, replacement: any): void {
        let indicies = findAll(array, item);
        for (let i = 0; i < indicies.length; i++) {
            array[indicies[i]] = replacement;
        }
    }

    /**
     * Returns array copy with all occurences of item replaced with a replacement
     * @param array Array to modify and return
     * @param item Item to replace
     * @param replacement Item to replace with
     * @returns Array with replaced items
     */
    //% blockId=arrays_toReplaced
    //% block="replace all occurences of $item with $replacement in $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toReplaced(array: any[], item: any, replacement: any): any[] {
        let result = copy(array);
        replace(result, item, replacement);
        return result;
    }

    /**
     * Fill array with constant item from start to end;
     * Throws NON_INTEGER_VALUE if start or end are not integers;
     * Throws NEGATIVE_VALUE if start or end are less than 0;
     * Throws OUT_OF_RANGE if start or end are out of list range;
     * Throws INVALID_RANGE if end value is smaller than start value;
     * @param array Array to modify
     * @param start Start position (optional)
     * @param end End position (optional, not included)
     * @param item Item to fill with
     */
    //% blockId=arrays_fill
    //% block="fill $array with $item || from $start | to $end"
    //% group="Modify"
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% array.shadow=variables_get
    //% array.defl=list
    //% start.defl=0
    //% end.defl=1
    export function fill(array: any[], item: any, start?: number, end?: number): void {
        start = verifyIndex(start, array);
        end = verifyIndex(end, array);
        if (end <= start) throw INVALID_RANGE.format([start.toString(), end.toString()]);

        array.fill(item, start, end);
    }

    /**
     * Return array copy with constant item filled from start to end;
     * Throws NON_INTEGER_VALUE if start or end are not integers;
     * Throws NEGATIVE_VALUE if start or end are less than 0;
     * Throws OUT_OF_RANGE if start or end are out of list range;
     * Throws INVALID_RANGE if end value is smaller than start value;
     * @param array Array to modify and return
     * @param start Start position (optional)
     * @param end End position (optional, not included)
     * @param item Item to fill with
     * @returns Array copy filled with items
     */
    //% blockId=arrays_toFilled
    //% block="fill $array with $item || from $start | to $end"
    //% group="Operations"
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% array.shadow=variables_get
    //% array.defl=list
    //% start.defl=0
    //% end.defl=1
    export function toFilled(array: any[], item: any, start?: number, end?: number): any[] {
        let result = array;
        fill(result, item, start, end);
        return result;
    }

    /**
     * Concatenate second array to first
     * @param first First array (modified)
     * @param second Second array
     */
    //% blockId=arrays_toConcated
    //% block="concatenate $second to $first"
    //% group="Modify"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function concat(first: any[], second: any[]): void {
        reassign(first, first.concat(second));
    }

    /**
     * Return concatenation of two arrays
     * @param first First array
     * @param second Second array
     * @returns Concatenated array
     */
    //% blockId=arrays_toConcated
    //% block="$first concatenated with $second"
    //% group="Operations"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function toConcated(first: any[], second: any[]): any[] {
        return first.concat(second);
    }

    /**
     * Slice an array;
     * Throws NON_INTEGER_VALUE if start, end or step are not integers;
     * Throws NEGATIVE_VALUE if start, end or step are less than 0;
     * Throws OUT_OF_RANGE if start or end are out of list range;
     * Throws ZERO_STEP if stepping value is 0;
     * Throws INVALID_RANGE if end value is smaller than start value;
     * @param array Array to slice
     * @param start Starting index
     * @param end Stopping index (not included)
     * @param step Stepping value
     */
    //% blockId=arrays_slice
    //% block="slice $array || from $start | to $end | with step $step"
    //% group="Modify"
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% array.shadow=variables_get
    //% array.defl=list
    //% start.defl=0
    //% end.defl=1
    //% step.defl=1
    export function slice(array: any[], start?: number, end?: number, step: number = 1): void {
        reassign(array, toSliced(array, start, end, step));
    }

    /**
     * Return a sliced section of the array;
     * Throws NON_INTEGER_VALUE if start, end or step are not integers;
     * Throws NEGATIVE_VALUE if start, end or step are less than 0;
     * Throws OUT_OF_RANGE if start or end are out of list range;
     * Throws ZERO_STEP if stepping value is 0;
     * Throws INVALID_RANGE if end value is smaller than start value;
     * @param array Array to slice
     * @param start Starting index
     * @param end Stopping index (not included)
     * @param step Stepping value
     * @returns Slice of array
     */
    //% blockId=arrays_toSliced
    //% block="slice $array || from $start | to $end | with step $step"
    //% group="Operations"
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% array.shadow=variables_get
    //% array.defl=list
    //% start.defl=0
    //% end.defl=1
    //% step.defl=1
    export function toSliced(array: any[], start?: number, end?: number, step: number = 1): any[] {
        start = verifyIndex(start || 0, array);
        end = verifyIndex(end || array.length, array);
        if (end <= start) throw INVALID_RANGE.format([start.toString(), end.toString()]);

        step = verify(step);
        if (step === 0) throw ZERO_STEP;

        let result = [];
        for (let i = start; i < end; i += step) {
            result.push(array[i]);
        }
        return result;
    }

    /**
     * Check if index is in range;
     * Throws NON_INTEGER_VALUE if index is not an integer;
     * @param array Array to check against
     * @index Index to validate
     * @returns True if index is within array bounds, false if not
     */
    //% blockId=arrays_inRange
    //% block="$index is in range of $array"
    //% group="Checks"
    //% array.shadow=variables_get
    //% array.defl=list
    //% index.defl=0
    export function inRange(array: any[], index: number): boolean {
        index = verifyInteger(index);
        return index >= 0 && index < array.length;
    }

    /**
     * Create array by repeating a single item;
     * Throws NON_INTEGER_VALUE if repeat is not an integer;
     * Throws NEGATIVE_VALUE if repeat is less than 0;
     * @param item Item to repeat
     * @param repeat Final array length
     * @returns Resulting array
     */
    //% blockId=arrays_repeat
    //% block="repeat $item $repeat times"
    //% blockSetVariable=list
    //% group="Create"
    //% times.defl=5
    export function repeat(item: any, repeat: number): any[] {
        repeat = verify(repeat);

        let result = [];
        for (let i = 0; i < repeat; i++) {
            result.push(item);
        }
        return result;
    }

    /**
     * Check if array includes a value
     * @param array Array to search
     * @param item Item to search for
     * @returns True if item is found, false if not
     */
    //% blockId=arrays_includes
    //% block="$array includes $item"
    //% group="Checks"
    //% array.shadow=variables_get
    //% array.defl=list
    export function includes(array: any[], item: any): boolean {
        return !!count(array, item);
    }

    /**
     * Zip second array with first
     * @param first First array
     * @param second Second array
     */
    //% blockId=arrays_zip
    //% block="zip $first with $second"
    //% group="Modify"
    //% first.shadow=variables_get
    //% first.defl=list
    //% second.shadow=variables_get
    //% second.defl=list
    export function zip(first: any[], second: any[]): void {
        reassign(first, toZipped(first, second));
    }

    /**
     * Create pairs from two arrays;
     * arrays must be the same lengths otherwise excess items will be ignored
     * @param first First array
     * @param second Second array
     * @returns Array of pairs
     */
    //% blockId=arrays_toZipped
    //% block="zip $first with $second"
    //% group="Operations"
    //% first.shadow=variables_get
    //% first.defl=list
    //% second.shadow=variables_get
    //% second.defl=list
    export function toZipped(first: any[], second: any[]): any[][] {
        return zipMany([first, second]);
    }

    /**
     * Return reversed copy of array
     * @param array Array to reverse
     */
    //% blockId=arrays_toReversed
    //% block="reversed $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toReversed(array: any[]): any[] {
        let result = copy(array);
        result.reverse();
        return result;
    }

    /**
     * Iterate through array elements
     * @param handler Method ran on every iteration (takes in value and index)
     * @param array Array to iterate through
     */
    //% blockId=arrays_forEach
    //% block="for $value $index in $array"
    //% draggableParameters
    //% handlerStatement
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function forEach(array: any[], handler: (value: any, index: number) => void): void {
        for (let i = 0; i < array.length; i++) {
            handler(array[i], i);
        }
    }

    /**
     * Remove all items from array
     * @param array Array to clear
     */
    //% blockId=arrays_clear
    //% block="clear $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function clear(array: any[]): void {
        reassign(array, []);
    }

    /**
     * Check if array is empty
     * @param array Array to check
     * @returns True if array length is 0, false if not
     */
    //% blockId=arrays_isEmpty
    //% block="$array is empty"
    //% group="Checks"
    //% array.shadow=variables_get
    //% array.defl=list
    export function isEmpty(array: any[]): boolean {
        return array.length === 0;
    }

    /**
     * Unionize first array with second;
     * Removes all duplicates;
     * @param first First array
     * @param second Second array
     */
    //% blockId=arrays_union
    //% block="unionize $first with $second"
    //% group="Modify"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function union(first: any[], second: any[]): void {
        reassign(first, toUnion(first, second));
    }

    /**
     * Return union of two arrays;
     * Removes all duplicates
     * @param first First array
     * @param second Second array
     * @returns Union of two arrays
     */
    //% blockId=arrays_toUnion
    //% block="union of $first and $second"
    //% group="Mutual Operations"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function toUnion(first: any[], second: any[]): any[] {
        return toPurged(toConcated(first, second));
    }

    /**
     * Intersect first array with second;
     * Removes all duplicates
     * @param first First array
     * @param second Second array
     */
    //% blockId=arrays_intersection
    //% block="intersect $first with $second"
    //% group="Modify"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function intersection(first: any[], second: any[]): void {
        reassign(first, toIntersection(first, second));
    }

    /**
     * Return intersection of two arrays;
     * Removes all duplicates
     * @param first First array
     * @param second Second array
     * @returns Intersection of arrays
     */
    //% blockId=arrays_toIntersection
    //% block="intersection of $first and $second"
    //% group="Mutual Operations"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function toIntersection(first: any[], second: any[]): any[] {
        return toPurged(first.filter((value) => includes(second, value)));
    }

    /**
     * Subtract second array from first
     * @param first First array
     * @param second Second array
     */
    //% blockId=arrays_difference
    //% block="subtract $second from $first"
    //% group="Modify"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function difference(first: any[], second: any[]): void {
        reassign(first, toDifference(first, second));
    }

    /**
     * Returns difference of two arrays
     * @param first First array
     * @param second Second array
     * @returns Difference of arrays
     */
    //% blockId=arrays_toDifference
    //% block="difference of $first and $second"
    //% group="Mutual Operations"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function toDifference(first: any[], second: any[]): any[] {
        return first.filter((value) => !includes(second, value));
    }

    /**
     * Remove all duplicates from array
     * @param array Array to purge
     */
    //% blockId=arrays_purge
    //% block="remove duplicates from $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function purge(array: any[]): void {
        let result: any[] = [];
        for (let i = 0; i < array.length; i++) {
            if (!includes(result, array[i])) {
                result.push(array[i]);
            }
        }
        reassign(array, result);
    }

    /**
     * Returns copy of array with all duplicates removed
     * @param array Array to copy and purge
     * @returns Array copy with removed duplicates
     */
    //% blockId=arrays_toPurged
    //% block="remove duplicates from $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toPurged(array: any[]): any[] {
        let result = copy(array);
        purge(result);
        return result;
    }

    /**
     * Extract all occurences of an item into a new array
     * @param array Array to search
     * @param item Item to extract
     * @returns Array of extracted items
     */
    //% blockId=arrays_extract
    //% block="extract $item from $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function extract(array: any[], item: any): any[] {
        return repeat(item, count(array, item));
    }

    /**
     * Convert array to string
     * @param array Array to stringify
     * @returns Stringified array
     */
    //% blockId=arrays_toString
    //% block="convert $array to string"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toString(array: any[]): string {
        return text.stringify(array);
    }

    /**
     * Sort array
     * @param array Array to sort
     * @param order Order (default is ascending)
     */
    //% blockId=arrays_sort
    //% block="sort $array in order $order"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function sort(array: any[], order: SortOrder = SortOrder.Ascending): void {
        array.sort();
        if (order === SortOrder.Descending) {
            array.reverse();
        }
    }

    /**
     * Return sorted copy of array
     * @param array Array to copy and sort
     * @param order Order (default is ascending)
     * @returns Sorted array
     */
    //% blockId=arrays_toSorted
    //% block="sorted $array in order $order"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toSorted(array: any[], order: SortOrder = SortOrder.Ascending): any[] {
        let result = copy(array);
        sort(result, order);
        return result;
    }

    /**
     * Check if every element in array is true
     * @param array Array to check
     * @returns True if all items evaluate to true
     */
    //% blockId=arrays_allTrue
    //% block="all elements in $array are true"
    //% group="Checks"
    //% array.shadow=variables_get
    //% array.defl=list
    export function allTrue(array: any[]): boolean {
        return array.every((value) => !!value);
    }

    /**
     * Check if any element in array is true
     * @param array Array to check
     * @returns True if any item evaluates to true
     */
    //% blockId=arrays_anyTrue
    //% block="any element in $array is true"
    //% group="Checks"
    //% array.shadow=variables_get
    //% array.defl=list
    export function anyTrue(array: any[]): boolean {
        return array.filter((value) => !!value).length >= 1;
    }

    /**
     * Check if every element in array equals a given item
     * @param array Array to check
     * @param item Item to compare against
     * @returns True if all elements match item
     */
    //% blockId=arrays_allEqual
    //% block="all elements in $array = $item"
    //% group="Checks"
    //% array.shadow=variables_get
    //% array.defl=list
    export function allEqual(array: any[], item: any): boolean {
        return array.every((value) => checkEquality.equal(value, item));
    }

    /**
     * Return sum of all elements; works only on number arrays
     * @param array Number array to sum
     * @returns Sum of all elements (number)
     */
    //% blockId=arrays_sum
    //% block="sum of $array elements"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function sum(array: number[]): number {
        return array.reduce((prev, value) => prev + value, 0);
    }

    /**
     * Return a range of numbers;
     * Throws NON_INTEGER_VALUE if start or end are not integers;
     * Throws INVALID_RANGE if end value is smaller than start value;
     * @param start Starting value
     * @param end Stopping value (not included)
     * @param step Stepping value (default is 1)
     * @returns Number array
     */
    //% blockId=arrays_range
    //% block="range from $start to $end || with step $step"
    //% blockSetVariable=range
    //% inlineInputMode=inline
    //% expandableArgumentMode=enabled
    //% group="Create"
    //% start.defl=0
    //% end.defl=5
    //% step.defl=1
    export function range(start: number, end: number, step: number = 1): number[] {
        start = verifyInteger(start);
        end = verifyInteger(end);
        if (end <= start) throw INVALID_RANGE.format([start.toString(), end.toString()]);

        let result: number[] = [];
        for (let i = start; i < end; i += step) {
            result.push(i);
        }
        return result;
    }

    /**
     * Enumerate array (value-index pairs)
     * @param Array to enumerate
     */
    //% blockId=arrays_enumerate
    //% block="enumerate $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function enumerate(array: any[]): void {
        reassign(array, toEnumerated(array));
    }

    /**
     * Return enumerated array (value-index pairs)
     * @param array Array to enumerate
     * @returns Enumeration
     */
    //% blockId=arrays_toEnumerated
    //% block="enumerated $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toEnumerated(array: any[]): any[] {
        return toZipped(array, range(0, array.length));
    }

    /**
     * Return random index from array;
     * Throws EMPTY_ARRAY if array is empty;
     * @param array Array to generate index from
     * @returns Array index
     */
    //% blockId=arrays_randomIndex
    //% block="random index from $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function randomIndex(array: any[]): number {
        if (array.length === 0) throw EMPTY_ARRAY;
        return Math.randomRange(0, array.length - 1);
    }

    /**
     * Join all array elements and return the string (string array only)
     * @param array String array to join
     * @param separator String used to separate items (optional)
     * @returns Joined string
     */
    //% blockId=arrays_join
    //% block="join $array || with $separator"
    //% inlineInputMode=inline
    //% expandableArgumentMode=enabled
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    //% separator.defl=""
    export function join(array: string[], separator?: string): string {
        return array.join(separator || "");
    }

    /**
     * Returns index of smallest number in array (number array only)
     * @param array Number array to search
     * @retuns Index of smallest number
     */
    //% blockId=arrays_minIndex
    //% block="index of smallest element in $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function minIndex(array: number[]): number {
        if (array.length === 0) throw EMPTY_ARRAY;

        let smallestIndex;
        for (let i = 0; i < array.length; i++) {
            if (i === 0) smallestIndex = i;
            else if (array[i] < array[smallestIndex]) smallestIndex = i;
        }
        return smallestIndex;
    }

    /**
     * Returns smallest number in array (number array only)
     * @param array Number array to search
     * @returns Smallest number in array
     */
    //% blockId=arrays_min
    //% block="smallest element in $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function min(array: number[]): number {
        return array[minIndex(array)];
    }

    /**
     * Returns index of biggest number in array (number array only)
     * @param array Number array to search
     * @returns Index of biggest number in array
     */
    //% blockId=arrays_maxIndex
    //% block="index of biggest element in $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function maxIndex(array: number[]): number {
        if (array.length === 0) throw EMPTY_ARRAY;

        let biggestIndex;
        for (let i = 0; i < array.length; i++) {
            if (i === 0) biggestIndex = i;
            else if (array[i] > array[biggestIndex]) biggestIndex = i;
        }
        return biggestIndex;
    }

    /**
     * Returns biggest number in array (number array only)
     * @param array Number array to search
     * @returns Biggest number in array
     */
    //% blockId=arrays_max
    //% block="biggest element in $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function max(array: number[]): number {
        return array[maxIndex(array)];
    }

    /**
     * Delete multiple elements from given index;
     * Throws NON_INTEGER_VALUE if start or count are not integers;
     * Throws NEGATIVE_VALUE if start or count are less than 0;
     * Throws OUT_OF_RANGE if start is out of list range;
     * @param array Array to splice
     * @param start Starting index
     * @param count Delete count
     */
    //% blockId=arrays_splice
    //% block="delete $count elements from $start in $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    //% start.defl=0
    //% count.defl=1
    export function splice(array: any[], start: number, count: number): void {
        start = verifyIndex(start, array);
        count = verify(count);

        array.splice(start, count);
    }

    /**
     * Return spliced copy of array;
     * Throws NON_INTEGER_VALUE if start or count are not integers;
     * Throws NEGATIVE_VALUE if start or count are less than 0;
     * Throws OUT_OF_RANGE if start is out of list range;
     * @param array Array to splice
     * @param start Starting index
     * @param count Delete count
     * @returns Spliced array
     */
    //% blockId=arrays_toSpliced
    //% block="delete $count elements from $start in $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    //% start.defl=0
    //% count.defl=1
    export function toSpliced(array: any[], start: number, count: number): any[] {
        let result = copy(array);
        result.splice(start, count);
        return result;
    }

    /**
     * Extract values from zipped pairs;
     * Throws NON_INTEGER_VALUE if target is not an integer;
     * Throws NEGATIVE_VALUE if target is less than 0;
     * Throws NOT_ARRAY if element to unpack is not an array;
     * Throws OUT_OF_RANGE if target index is bigger than pair length;
     * @param Array to unzip
     * @param target Index of desired pair element to retrieve
     */
    //% blockId=arrays_unzip
    //% block="unzip index $target from $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    //% target.defl=0
    export function unzip(array: any[], target: number): void {
        reassign(array, toUnzipped(array, target));
    }

    /**
     * Return extracted values from zipped pairs;
     * Throws NON_INTEGER_VALUE if target is not an integer;
     * Throws NEGATIVE_VALUE if target is less than 0;
     * Throws NOT_ARRAY if element to unpack is not an array;
     * Throws OUT_OF_RANGE if target index is bigger than pair length;
     * @param array Array to unzip
     * @param target Index of desired pair element to retrieve
     * @returns Array containing extracted elements
     */
    //% blockId=arrays_toUnzipped
    //% block="unzip index $target from $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    //% target.defl=0
    export function toUnzipped(array: any[], target: number): any[] {
        target = verify(target);

        let result: any[] = [];
        for (let i = 0; i < array.length; i++) {
            if (!Array.isArray(array[i])) throw NOT_ARRAY.format([typeof array[i]]);
            if ((array[i] as any[]).length <= target) throw OUT_OF_RANGE.format([
                target.toString(), "0", (array[i] as any[]).length.toString()
            ])
            result.push((array[i] as any[])[target]);
        }
        return result;
    }

    /**
     * Shift array backwards by given distance;
     * Throws NON_INTEGER_VALUE if elements is not an integer;
     * Throws NEGATIVE_VALUE if elements is less than 0;
     * Throws INVALID_SHIFT if shift value is bigger than array length;
     * @param array Array to shift
     * @param elements Number of elements to shift
     */
    //% blockId=arrays_shift
    //% block="shift $array by $elements"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    //% elements.defl=1
    export function shift(array: any[], elements: number = 1): void {
        elements = verify(elements);

        if (array.length < elements) {
            throw INVALID_SHIFT.format([elements.toString(), array.length.toString()]);
        }
        reassign(array, array.slice(elements));
    }

    /**
     * Return shifted copy of array;
     * Throws NON_INTEGER_VALUE if elements is not an integer;
     * Throws NEGATIVE_VALUE if elements is less than 0;
     * Throws INVALID_SHIFT if shift value is bigger than array length;
     * @param array Array to shift
     * @param elements Number of elements to shift
     */
    //% blockId=arrays_toShifted
    //% block="shift $array by $elements"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    //% elements.defl=1
    export function toShifted(array: any[], elements: number = 1): any[] {
        let result = copy(array);
        shift(result, elements);
        return result;
    }

    /**
     * Check if two arrays are equal
     * @param first First array
     * @param second Second array
     * @returns True if arrays are equal
     */
    //% blockId=arrays_equal
    //% block="$first = $second"
    //% group="Checks"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function equal(first: any[], second: any[]): boolean {
        return checkEquality.equal(first, second);
    }

    /**
     * Concatenate multiple arrays together and return the result
     * @param arrays Array containing arrays to be concatenated
     * @returns Concatenated array
     */
    //% blockId=arrays_concatMany
    //% block="concatenate $arrays"
    //% group="Operations"
    //% arrays.shadow=variables_get
    //% arrays.defl=list
    export function concatMany(arrays: any[][]): any[] {
        let result: any[] = [];
        for (let i = 0; i < arrays.length; i++) {
            concat(result, arrays[i]);
        }
        return result;
    }

    /**
     * Create pairs of n-length from multiple arrays;
     * arrays must be the same lengths otherwise excess items will be ignored
     * @param arrays Array of arrays to zip
     * @returns Array of n-length pairs
     */
    //% blockId=arrays_zipMany
    //% block="zip $arrays"
    //% group="Operations"
    //% arrays.shadow=variables_get
    //% arrays.defl=list
    export function zipMany(arrays: any[][]): any[][] {
        let result: any[][] = [];
        for (let i = 0; arrays.every((value) => i < value.length); i++) {
            result.push(toUnzipped(arrays, i));
        }
        return result;
    }

    function _flatten(array: any[], max: number, depth: number = 0): any[] {
        let result: any[] = [];
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i]) && (max === 0 || depth < max)) {
                result = result.concat(_flatten(array[i], max, depth + 1));
            } else {
                result.push(array[i]);
            }
        }
        return result;
    }

    /**
     * Flatten array from n-dimensional array to 1D array;
     * Throws NON_INTEGER_VALUE if max is not an integer;
     * Throws NEGATIVE_VALUE if max is less than 0;
     * @param array Array to flatten
     * @param max Maximum depth (0 is unlimited)
     */
    //% blockId=arrays_flatten
    //% block="flatten $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    //% max.defl=0
    export function flatten(array: any[], max: number = 0): void {
        reassign(array, toFlattened(array, max));
    }

    /**
     * Return flattened 1D array from n-dimensional array;
     * Throws NON_INTEGER_VALUE if max is not an integer;
     * Throws NEGATIVE_VALUE if max is less than 0;
     * @param array Array to flatten
     * @param max Maximum depth (0 is unlimited)
     * @returns Flattened array
     */
    //% blockId=arrays_toFlattened
    //% block="flattened $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    //% max.defl=0
    export function toFlattened(array: any[], max: number = 0): any[] {
        max = verify(max);
        return _flatten(array, max);
    }
}