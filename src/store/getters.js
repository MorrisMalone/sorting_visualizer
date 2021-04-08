const list = (state) => state.list;
const generator = (state) => state.generator;
const speed = (state) => state.speed;
const isSorting = (state) => state.isSorting;
const isSorted = (state) => state.isSorted;
const readyNext = (state) => state.readyNext;
const sortingAlgo = (state) => state.sortingAlgo;
const sortingAlgos = (state) => state.sortingAlgos;

export default {
    list,
    generator,
    speed,
    isSorting,
    readyNext,
    sortingAlgo,
    sortingAlgos,
    isSorted
};
