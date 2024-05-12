
enum SortOrder {
    Ascending,
    Descending
}

namespace arrays {

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
        let reversed = toReversed(array);
        let result = reversed.find((value) => checkEquality.equal(value, item));
        return result === undefined ? -1 : result;
    }

    /**
     * Find all occurences of item in array
     * @param array Array to search
     * @param item Item to find
     * @param max Max number of ocurrences to match (0 for unlimited)
     * @returns Array of indicies 
     */
    //% blockId=arrays_findAll
    //% block="find occurences of $item in $array || up to $max"
    //% group="Operations"
    //% expandableArgumentMode=enabled
    //% array.defl=list
    //% array.shadow=variables_get
    //% max.defl=0
    export function findAll(array: any[], item: any, max: number=0): number[] {
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
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function count(array: any[], item: any): number {
        return findAll(array, item).length;
    }

    /**
     * Remove all ocurrences of an item
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
    export function removeAll(array: any[], item: any, max: number=0): void {
        let indicies = findAll(array, item, max);
        for (let i = 0; i < indicies.length; i++) {
            indicies.removeAt(array[i]);
        }
    }

    /**
     * Remove all occurences of an item from a copy of the array and return it
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
    export function toRemovedAll(array: any[], item: any, max: number=0): any[] {
        let result = array;
        removeAll(result, item, max);
        return result;
    }

    /**
     * Swap two items in an array
     * @param array Array to modify
     * @param first Index of first item
     * @param second Index of second item
     */
    //% blockId=arrays_swap
    //% block="swap items at indicies $first and $second in $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    //% first.defl=0
    //% second.defl=1
    export function swap(array: any[], first: number, second: number): void {
        let temp = array[first];
        array[first] = array[second];
        array[second] = temp;
    }

    /**
     * Swap items in array copy and return it
     * @param array Array to copy and modify
     * @param first Index of first item
     * @param second Index of second item
     * @returns Array with swapped elements
     */
    //% blockId="arrays_toSwapped"
    //% block="swap items at indicies $first and $second in $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    //% first.defl=0
    //% second.defl=1
    export function toSwapped(array: any[], first: number, second: number): any[] {
        let result = array;
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
    //% block="replace all occurences of $item with $replace in $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function replace(array: any[], item: any, replacement: any): void {
        let indicies = findAll(array, item);
        array = array.map((value, index) => includes(indicies, index) ? replacement : value);
    }

    /**
     * Replaces all occurences of item with a replacement in a copy and returns it
     * @param array Array to modify and return
     * @param item Item to replace
     * @param replacement Item to replace with
     * @returns Array with replaced items
     */
    //% blockId=arrays_toReplaced
    //% block="replace all occurences of $item with $replace in $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toReplaced(array: any[], item: any, replacement: any): any[] {
        let result = array;
        replace(result, item, replacement);
        return result;
    }

    /**
     * Fill array with constant item from start to end
     * @param array Array to modify
     * @param start Start position
     * @param end End position (not included)
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
        array.fill(item, start, end);
    }

    /**
     * Fill array copy with constant item from start to end and return it
     * @param array Array to modify and return
     * @param start Start position
     * @param end End position (not included)
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
     * Concatenate one array to another
     * @param first First array (modified)
     * @param second Second array
     */
    //% blockId=arrays_toConcated
    //% block="$first concatenated with $second"
    //% group="Operations"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function concat(first: any[], second: any[]): void {
        first = first.concat(second);
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
     * Slice an array
     * @param array Array to slice
     * @param start Starting index
     * @param end Stopping index
     * @param step Stepping value
     */
    //% blockId=arrays_slice
    //% block="slice $array || from $start | to $end | with step $step"
    //% group="Operations"
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% array.shadow=variables_get
    //% array.defl=list
    //% start.defl=0
    //% end.defl=1
    //% step.defl=1
    export function slice(array: any[], start?: number, end?: number, step: number=1): void {
        array = toSliced(array, start, end, step);
    }

    /**
     * Return a sliced section of the array
     * @param array Array to slice
     * @param start Starting index
     * @param end Stopping index
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
    export function toSliced(array: any[], start?: number, end?: number, step: number=1): any[] {
        let result = [];
        for (let i = start; i < end; i += step) {
            result.push(array[i]);
        }
        return result;
    }

    /**
     * Check if index is in range
     * @param array Array to check against
     * @index Index to validate
     * @returns True if index is within array bounds, false if not
     */
    //% blockId=arrays_inRange
    //% block="$index is in range of $array"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    //% index.defl=0
    export function inRange(array: any[], index: number): boolean {
        return index >= 0 && index < array.length;
    }

    /**
     * Create array by repeating a single item
     * @param item Item to repeat
     * @param times Final array length
     * @returns Resulting array
     */
    //% blockId=arrays_repeat
    //% block="create array from $item repeated $times times"
    //% blockSetVariable=list
    //% group="Create"
    //% times.defl=5
    export function repeat(item: any, times: number): any[] {
        let result = [];
        for (let i = 0; i < times; i++) {
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
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function includes(array: any[], item: any): boolean {
        return !!count(array, item);
    }

    /**
     * Create pairs from two arrays
     * @param first First array
     * @param second Second array
     */
    //% blockId=arrays_zip
    //% block="zip $first with $second"
    //% blockSetVariable=zipped
    //% group="Create"
    //% first.shadow=variables_get
    //% first.defl=list
    //% second.shadow=variables_get
    //% second.defl=list
    export function zip(first: any[], second: any[]): void {
        first = toZipped(first, second);
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
    //% blockSetVariable=zipped
    //% group="Create"
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
        let result = array;
        result.reverse();
        return result;
    }

    /**
     * Iterate through array elements
     * @param handler Method ran on every iteration (takes in value and index)
     * @param array Array to iterate through
     */
    //% blockId=arrays_forEach
    //% block="for each $value $index in $array"
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
     * Removes all items from array
     * @param array Array to clear
     */
    //% blockId=arrays_clear
    //% block="clear $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function clear(array: any[]): void {
        array = [];
    }

    /**
     * Checks if array is empty
     * @param array Array to check
     * @returns True if array length is 0, false if not
     */
    //% blockId=arrays_isEmpty
    //% block="$array is empty"
    //% group="Read"
    //% array.shadow=variables_get
    //% array.defl=list
    export function isEmpty(array: any[]): boolean {
        return array.length === 0;
    }

    /**
     * Adds elements from second array to first array;
     * Removes all duplicates
     * @param first First array
     * @param second Second array
     */
    //% blockId=arrays_union
    //% block="unionize $first with $second"
    //% group="Operations"
    //% first.shadow=variables_get
    //% first.defl=list
    //% second.shadow=variables_get
    //% second.defl=list
    export function union(first: any[], second: any[]): void {
        first = toUnion(first, second);
    }

    /**
     * Returns array containing elements that are in both arrays;
     * Removes all duplicates
     * @param first First array
     * @param second Second array
     * @returns Union of both arrays
     */
    //% blockId=arrays_toUnion
    //% block="union of $first and $second"
    //% group="Operations"
    //% first.shadow=variables_get
    //% first.defl=list
    //% second.shadow=variables_get
    //% second.defl=list
    export function toUnion(first: any[], second: any[]): any[] {
        return toPurged(toConcated(first, second));
    }

    /**
     * Remove all duplicates from array
     * @param array Array to purge
     */
    //% blockId=arrays_purge
    //% block="remove duplicates from $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function purge(array: any[]): void {
        let result: any[] = [];
        for (let i = 0; i < array.length; i++) {
            if (!includes(result, array[i])) {
                result.push(array[i]);
            }
        }
        array = result;
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
        let result = array;
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
        let result = [];
        for (let i = 0; i < array.length; i++) {
            if (checkEquality.equal(array[i], item)) result.push(item);
        }
        return result;
    }

    /**
     * Convert array to string
     * @param array Array to stringify
     * @returns Stringified array
     */
    //% blockId=arrays_toString
    //% block="convert $array to string"
    //% array.shadow=variables_get
    //% array.defl=list
    export function toString(array: any[]): string {
        return text.stringify(array);
    }

    /**
     * Sorts array
     * @param array Array to sort
     * @param order Order (default is ascending)
     */
    //% blockId=arrays_sort
    //% block="sort $array in order $order"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function sort(array: any[], order: SortOrder=SortOrder.Ascending): void {
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
    export function toSorted(array: any[], order: SortOrder=SortOrder.Ascending): any[] {
        let result = array;
        sort(result, order);
        return result;
    }

    /**
     * Check if every element in array is true
     * @param array Array to check
     * @returns True if all items evaluate to true
     */
    export function allTrue(array: any[]): boolean {
        return array.every((value) => !!value);
    }

    /**
     * Check if any element in array is true
     * @param array Array to check
     * @returns True if any item evaluates to true
     */
    export function anyTrue(array: any[]): boolean {
        return array.filter((value) => !!value).length >= 1;
    }

    /**
     * Check if every element in array equals a given item
     * @param array Array to check
     * @param item Item to compare against
     * @returns True if all elements match item
     */
    export function allEqual(array: any[], item: any): boolean {
        return array.every((value) => checkEquality.equal(value, item));
    }

    /**
     * Return sum of all elements; works only on number arrays
     * @param array Number array to sum
     * @returns Sum of all elements (number)
     */
    export function sum(array: number[]): number {
        return array.reduce((prev, value) => prev + value, 0);
    }

    /**
     * Return a range of numbers
     * @param start Starting value
     * @param end Stopping value
     * @param step Stepping value (default is 1)
     * @returns Number array
     */
    export function range(start: number, end: number, step: number=1): number[] {
        let result: number[] = [];
        for (let i = start; i < end; i += step) {
            result.push(i);
        }
        return result;
    }

    /**
     * Enumerate array
     * @param Array to enumerate
     */
    export function enumerate(array: any[]): void {
        array = toEnumerate(array);
    }
    
    /**
     * Return enumerated array (index-value pairs)
     * @param array Array to enumerate
     * @returns Enumeration
     */
    export function toEnumerate(array: any[]): any[] {
        return toZipped(array, range(0, array.length));
    }

    /**
     * Return random index from array
     * @param array Array to generate index from
     * @returns Array index
     */
    export function randomIndex(array: any[]): number {
        if (array.length === 0) return 0; // todo: throw error
        return Math.randomRange(0, array.length - 1);
    }

    /**
     * Join all array elements and return the string (string array only)
     * @param array String array to join
     * @param separator String used to separate items (optional)
     * @returns Joined string
     */
    export function join(array: string[], separator: string): string {
        return array.join(separator);
    }

    /**
     * Returns index of smallest number in array (number array only)
     * @param array Number array to search
     * @retuns Index of smallest number
     */
    export function minIndex(array: number[]): number {
        if (array.length === 0) return 0; //todo: throw error
        
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
    export function min(array: number[]): number {
        return array[minIndex(array)];
    }

    /**
     * Returns index of biggest number in array (number array only)
     * @param array Number array to search
     * @returns Index of biggest number in array
     */
    export function maxIndex(array: number[]): number {
        if (array.length === 0) return 0;

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
    export function max(array: number[]): number {
        return array[maxIndex(array)];
    }

    /**
     * Splice the array
     * @param array Array to splice
     * @param index Starting index
     * @param count Delete count
     */
    export function splice(array: any[], index: number, count: number): void {
        array.splice(index, count);
    }

    /**
     * Return spliced copy of array
     * @param array Array to splice
     * @param index Starting index
     * @param count Delete count
     * @returns Spliced array
     */
    export function toSpliced(array: any[], index: number, count: number): any[] {
        let result = array;
        result.splice(index, count);
        return result;
    }

    /**
     * Reverse of zip method
     * @param Array to unzip
     * @param target Index of desired pair element to retrieve
     */
    export function unzip(array: any[], target: number): void {
        array = toUnzipped(array, target);
    }

    /**
     * Return reverse of zip method
     * @param array Array to unzip
     * @param target Index of desired pair element to retrieve
     * @returns Array containing extracted elements
     */
    export function toUnzipped(array: any[], target: number): any[] {
        let result: any[] = [];
        for (let i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) {
                if ((array[i] as any[]).length > target) result.push((array[i] as any[])[target]);
                else return []; // todo: throw error
            } else return []; // todo: throw error
        }
        return result;
    }

    /**
     * Shift array backwards by given distance
     * @param array Array to shift
     * @param elements Number of elements to shift
     */
    export function shift(array: any[], elements: number=1): void {
        if (array.length < elements) return; // todo: throw error
        array = array.slice(elements);
    }

    /**
     * Return shifted copy of array
     * @param array Array to shift
     * @param elements Number of elements to shift
     */
    export function toShifted(array: any[], elements: number=1): any[] {
        let result = array;
        shift(result, elements);
        return result;
    }

    /**
     * Check if two array are equal
     * @param first First array
     * @param second Second array
     * @returns True if all elements are equal
     */
    export function equal(first: any[], second: any[]): boolean {
        return checkEquality.equal(first, second);
    }

    /**
     * Concatenate multiple arrays together and return the result
     * @param arrays Array containing arrays to be concatenated
     * @returns Concatenated array
     */
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
    export function zipMany(arrays: any[][]): any[][] {
        let result: any[][] = [];
        for (let i = 0; arrays.every((value) => i < value.length); i++) {
            result.push(toUnzipped(arrays, i));
        }
        return result;
    }
}