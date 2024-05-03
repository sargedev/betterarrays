
namespace arrays {
    export function find(array: any[], item: any) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) return i;
        }
        return -1;
    }

    export function findAll(array: any[], item: any) {
        
    }
}