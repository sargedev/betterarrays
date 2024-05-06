
enum SortOrder {
    Ascending,
    Descending
}

namespace arrays {
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
    //% expandableArgumentMode=toggle
    //% array.defl=list
    //% array.shadow=variables_get
    //% max.defl=0
    export function findAll(array: any[], item: any, max: number=0): number[] {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) result.push(i);
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
    //% expandableArgumentMode=toggle
    //% array.shadow=variables_get
    //% array.defl=list
    //% max.defl=0
    export function removeAll(array: any[], item: any, max: number): void {
        let indicies = findAll(array, item, max);
        indicies.forEach((value) => {
            array.removeAt(value);
        })
    }

    /**
     * Swap two items in an array
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
     * Replaces all occurences of item with a replacement
     * @param array Array to modify
     * @param item Item to replace
     * @param replace Item to replace with
     */
    //% blockId=arrays_replace
    //% block="replace all occurences of $item with $replace in $array"
    //% group="Modify"
    //% array.shadow=variables_get
    //% array.defl=list
    export function replace(array: any[], item: any, replace: any): void {
        let indicies = findAll(array, item);
        array = array.map((value, index) => includes(indicies, index) ? replace : value);
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
    export function fill(array: any[], item: any, start?: number, end?: number) {
        array.fill(item, start, end);
    }

    /**
     * Concatenate two arrays
     * @param first First array
     * @param second Second array
     * @returns Concatenated array
     */
    //% blockId=arrays_concat
    //% block="$first concatenated with $second"
    //% group="Operations"
    //% first.shadow=variables_get
    //% first.defl=list1
    //% second.shadow=variables_get
    //% second.defl=list2
    export function concat(first: any[], second: any[]): any[] {
        return first.concat(second);
    }

    /**
     * Return a sliced section of the array
     * @param array Array to slice
     * @param start Starting index
     * @param end Stopping index
     * @param step Stepping value
     * @returns Slice of array
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
    export function slice(array: any[], start?: number, end?: number, step: number=1): any[] {
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
     * Create pairs from two arrays;
     * arrays must be the same lengths otherwise excess items will be ignored
     * @param first First array
     * @param second Second array
     * @returns Array of pairs
     */
    //% blockId=arrays_zip
    //% block="zip $first with $second"
    //% blockSetVariable=zipped
    //% group="Create"
    //% first.shadow=variables_get
    //% first.defl=list
    //% second.shadow=variables_get
    //% second.defl=list
    export function zip(first: any[], second: any[]): any[][] {
        let result: any[][] = [];
        for (let i = 0; i < first.length && i < second.length; i++) {
            result.push([first[i], second[i]]);
        }
        return result;
    }

    /**
     * Return reversed copy of array
     * @param array Array to reverse
     */
    //% blockId=arrays_reversed
    //% block="reversed $array"
    //% group="Operations"
    //% array.shadow=variables_get
    //% array.defl=list
    export function reversed(array: any[]): any[] {
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
    export function forEach(handler: (value: any, index: number) => void, array: any[]): void {
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
     * Returns array containing elements that are in both arrays;
     * Removes all duplicates
     * @param first First array
     * @param second Second array
     * @returns Union of both arrays
     */
    //% blockId=arrays_union
    //% block="union of $first and $second"
    //% group="Operations"
    //% first.shadow=variables_get
    //% first.defl=list
    //% second.shadow=variables_get
    //% second.defl=list
    export function union(first: any[], second: any[]): any[] {
        let result = first.filter((value) => includes(second, value));
        purge(result);
        return result;
    }

    /**
     * Remove all duplicates from array
     * @param array Array to purge
     */
    export function purge(array: any[]): void {
        let result: any[] = [];
        array.forEach((value) => {
            if (!includes(result, value)) result.push(value);
        })
        array = result;
    }

    /**
     * Extract all occurences of an item into a new array
     * @param array Array to search
     * @param item Item to extract
     * @returns Array of extracted items
     */
    export function extract(array: any[], item: any): any[] {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) result.push(item);
        }
        return result;
    }

    /**
     * Convert array to string
     * @param array Array to stringify
     * @returns Stringified array
     */
    export function toString(array: any[]): string {
        return text.stringify(array);
    }

    /**
     * Sorts array
     * @param array Array to sort
     * @param order Order (default is ascending)
     */
    export function sort(array: any[], order: SortOrder=SortOrder.Ascending): void {
        array.sort();
        if (order === SortOrder.Descending) {
            array.reverse();
        }
    }
}