export default {
    list: null,
    generator: null,
    sortingAlgo: null,
    speed: 50,
    isSorting: false,
    isSorted: false,
    readyNext: true,
    sortingAlgos: {
        bubbleSort: {
            name: 'Bubble Sort',
            generator: 'CREATE_GENERATOR_BUBBLE'
        },
        cocktailSort: {
            name: 'Cocktail Sort',
            generator: 'CREATE_GENERATOR_COCKTAIL'
        },
        quickSort: {
            name: 'Quick Sort',
            generator: 'CREATE_GENERATOR_QUICK'
        },
        insertionSort: {
            name: 'Insertion Sort',
            generator: 'CREATE_GENERATOR_INSERTION'
        },
        shellSort: {
            name: 'Shell Sort',
            generator: 'CREATE_GENERATOR_SHELL'
        },
        heapSort: {
            name: 'Heap Sort',
            generator: 'CREATE_GENERATOR_HEAP'
        }
    }
};
