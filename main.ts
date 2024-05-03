
namespace arrays {
    /**
     * Find first occurence of item in array
     * @param array Array to search
     * @param item Item to find
     * @returns Index of found item
     */
    export function find(array: any[], item: any): number {
        let result = findAll(array, item, 1);
        return result.length ? result[0] : -1;
    }

    /**
     * Find all occurences of item in array
     * @param array Array to search
     * @param item Item to find
     * @param max Max number of ocurrences to match (0 for unlimited)
     * @returns Array of indicies 
     */
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
    export function count(array: any[], item: any): number {
        return findAll(array, item).length;
    }

    /**
     * Find an item and remove it
     * @param array Array to search
     * @param item Item to remove
     */
    export function remove(array: any[], item: any): void {
        let index = find(array, item);
        if (index !== -1) array.removeAt(index);
    }

    /**
     * Remove all ocurrences of an item
     * @param array Array to search
     * @param item Item to remove
     * @param max Max number of items to remove (0 for unlimited)
     */
    export function removeAll(array: any[], item: any, max: number): void {
        let indicies = findAll(array, item, max);
        indicies.forEach((value) => {
            array.removeAt(value);
        })
    }
}