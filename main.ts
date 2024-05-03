
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
     * @param max Max number of ocurrences to match
     * @returns Array of indicies 
     */
    export function findAll(array: any[], item: any, max: number): number[] {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) result.push(i);
            if (result.length >= max) break;
        }
        return result;
    }
}