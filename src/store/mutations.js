function swap(list, idx1, idx2)
{
    [list[idx1], list[idx2]] = [list[idx2], list[idx1]];
}

function resetElemStates(list)
{
    list.forEach((bar) =>
    {
        bar.swapped = false;
        bar.curr = false;
        bar.partitioned = false;
    });
}

function* animateEnding(list)
{
    resetElemStates(list);
    for (let i = 0; i < list.length; i += 1)
    {
        list[i].curr = true;
        yield;
    }
}

function* BubbleSort(list)
{
    resetElemStates(list);
    let swapped = true;
    let { length } = list;

    while (swapped)
    {
        swapped = false;

        for (let i = 1; i < length; i += 1)
        {
            list.forEach((bar) => { bar.swapped = false; bar.curr = false; });

            if ((list[i - 1]).value > (list[i]).value)
            {
                swap(list, i, i - 1);
                swapped = true;

                list[i].swapped = true;
                list[i - 1].swapped = true;
            }

            list[i].curr = true;
            yield;
        }
        length -= 1;
    }

    yield* animateEnding(list);
}

function* CocktailSort(list)
{
    resetElemStates(list);
    let swapped = true;
    let { length } = list;
    let start = 1;

    while (swapped)
    {
        swapped = false;

        for (let i = start; i < length; i += 1)
        {
            list.forEach((bar) => { bar.swapped = false; bar.curr = false; });

            if ((list[i - 1]).value > (list[i]).value)
            {
                swap(list, i, i - 1);
                swapped = true;

                list[i].swapped = true;
                list[i - 1].swapped = true;
            }

            list[i].curr = true;
            yield;
        }

        if (!swapped)
        {
            yield;
            break;
        }
        length -= 1;
        swapped = false;

        for (let i = length - 1; i >= start; i -= 1)
        {
            list.forEach((bar) => { bar.swapped = false; bar.curr = false; });

            if ((list[i - 1]).value > (list[i]).value)
            {
                swap(list, i, i - 1);
                // [list[i], list[i - 1]] = [list[i - 1], list[i]];
                swapped = true;

                list[i].swapped = true;
                list[i - 1].swapped = true;
            }

            list[i].curr = true;
            yield;
        }
        start += 1;
    }

    yield* animateEnding(list);
}

function* partition(list, left, right)
{
    const pivot = list[right];
    let i = left;

    for (let k = left; k <= right; k += 1)
    {
        list[k].partitioned = true;
    }

    list[i].swapped = true;
    for (let j = left; j < right; j += 1)
    {
        list.forEach((bar) => { bar.swapped = false; bar.curr = false; });
        if (list[j].value < pivot.value)
        {
            swap(list, i, j);
            list[i].swapped = false;
            list[i].partitioned = false;
            i += 1;
            list[i].swapped = true;
        }
        list[j].curr = true;
        yield;
    }
    swap(list, i, right);

    for (let k = left; k <= right; k += 1)
    {
        list[k].partitioned = false;
    }
    return i;
}

function* QuickSort(list)
{
    resetElemStates(list);
    const stack = [];

    const start = 0;
    const end = list.length - 1;

    stack.push({ x: start, y: end });

    while (stack.length)
    {
        const { x, y } = stack.shift();

        const pivot = yield* partition(list, x, y);

        if (pivot - 1 > x)
        {
            stack.push({ x, y: pivot - 1 });
        }

        if (pivot + 1 < y)
        {
            stack.push({ x: pivot + 1, y });
        }
    }

    yield* animateEnding(list);
}

function* InsertionSort(list)
{
    resetElemStates(list);
    let i = 1;

    while (i < list.length)
    {
        let j = i;
        list[j].curr = true;
        list[j - 1].partitioned = true;
        while (j > 0 && list[j - 1].value > list[j].value)
        {
            list[j].curr = false;
            swap(list, j, j - 1);
            j -= 1;
            list[j].partitioned = true;
            list[j].curr = true;
            yield;
        }
        list[j].curr = false;
        i += 1;
    }

    yield* animateEnding(list);
}

function* ShellSort(list)
{
    resetElemStates(list);
    const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    // eslint-disable-next-line no-restricted-syntax
    for (const gap of gaps)
    {
        for (let i = gap; i < list.length; i += 1)
        {
            const temp = list[i];
            let j = i;

            for (; j >= gap && list[j - gap].value > temp.value; j -= gap)
            {
                list[j] = list[j - gap];
                list[j].curr = true;
                yield;
                list[j].curr = false;
            }
            list[j].curr = false;
            list[j] = temp;
        }
    }

    yield* animateEnding(list);
}

function* ReHeap(list, start, end)
{
    while (2 * start < end)
    {
        let j = 2 * start;

        if (j < end && list[j].value < list[j + 1].value)
        {
            list[j].curr = true;
            yield;
            list[j].curr = false;
            j += 1;
        }

        if (list[start].value < list[j].value)
        {
            swap(list, start, j);
            list[j].curr = true;
            const oldStart = start;
            list[start].curr = true;
            start = j;
            yield;
            list[j].curr = false;
            list[oldStart].curr = false;
        }
        else start = end;
    }
}

function* HeapSort(list)
{
    resetElemStates(list);
    const size = list.length - 1;

    for (let i = Math.floor(size / 2); i >= 0; i -= 1)
    {
        yield* ReHeap(list, i, size - 1);
    }

    for (let i = size; i > 1; i -= 1)
    {
        swap(list, i, 0);
        yield* ReHeap(list, 0, i - 1);
    }

    yield* animateEnding(list);
}

const shuffle = (array) =>
{
    for (let i = array.length - 1; i > 0; i -= 1)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const createShuffledList = (size) =>
{
    const list = [...Array(size)].map((_, i) => ({
        value: (i + 1) * (500 / size),
        swapped: false
    }));
    shuffle(list);
    return list;
};

const CREATE_NEW_LIST = (state, size = 800) =>
{
    state.list = createShuffledList(size);
};

const CREATE_GENERATOR_BUBBLE = (state) =>
{
    state.generator = new BubbleSort(state.list, state.speed);
};

const CREATE_GENERATOR_COCKTAIL = (state) =>
{
    state.generator = new CocktailSort(state.list, state.speed);
};

const CREATE_GENERATOR_QUICK = (state) =>
{
    state.generator = new QuickSort(state.list);
};

const CREATE_GENERATOR_INSERTION = (state) =>
{
    state.generator = new InsertionSort(state.list);
};

const CREATE_GENERATOR_SHELL = (state) =>
{
    state.generator = new ShellSort(state.list);
};

const CREATE_GENERATOR_HEAP = (state) =>
{
    state.generator = new HeapSort(state.list);
};

const generators = {
    CREATE_GENERATOR_BUBBLE,
    CREATE_GENERATOR_COCKTAIL,
    CREATE_GENERATOR_QUICK,
    CREATE_GENERATOR_INSERTION,
    CREATE_GENERATOR_SHELL,
    CREATE_GENERATOR_HEAP
};

const CREATE_GENERATOR = (state) =>
{
    generators[state.sortingAlgo.generator](state);
};

// setters
const SET_IS_SORTING = (state, isSorting) =>
{
    state.isSorting = isSorting;
};

const SET_READY_NEXT = (state, isReady) =>
{
    state.readyNext = isReady;
};

const SET_SORTING_ALGO = (state, sortingAlgo) =>
{
    state.sortingAlgo = sortingAlgo;
};

const SET_IS_SORTED = (state, isSorted) =>
{
    state.isSorted = isSorted;
};

export default {
    CREATE_NEW_LIST,
    CREATE_GENERATOR,
    CREATE_GENERATOR_BUBBLE,
    CREATE_GENERATOR_COCKTAIL,
    CREATE_GENERATOR_QUICK,
    SET_IS_SORTING,
    SET_READY_NEXT,
    SET_SORTING_ALGO,
    SET_IS_SORTED
};
