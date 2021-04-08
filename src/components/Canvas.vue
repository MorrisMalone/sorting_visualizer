<template>
    <div id="canvas"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import P5 from 'p5';

export default {
    name: 'Canvas',
    data()
    {
        return {
            canvas: new P5(this.script(), 'canvas'),
            time: new Date()
        };
    },
    props: {
        width: {
            type: Number,
            default: 800
        },
        height: {
            type: Number,
            default: 500
        }
    },
    computed: {
        ...mapGetters([
            'list',
            'generator',
            'speed',
            'isSorting',
            'readyNext'
        ]),
        isSorted: {
            get()
            {
                return this.$store.state.isSorted;
            },
            set(bool)
            {
                this.SET_IS_SORTED(bool);
            }
        }

    },
    methods: {
        ...mapMutations([
            'SET_READY_NEXT',
            'SET_IS_SORTED',
            'SET_IS_SORTING'
        ]),
        script()
        {
            return (p5) =>
            {
                const { width, height } = this;

                p5.setup = () =>
                {
                    p5.createCanvas(width, height);
                };

                p5.draw = () =>
                {
                    p5.background(255);

                    if (this.isSorting && this.readyNext && !this.isSorted)
                    {
                        this.SET_READY_NEXT(false);

                        const { done } = this.generator.next();
                        if (done)
                        {
                            this.SET_IS_SORTED(done);
                            this.SET_IS_SORTING(false);
                        }

                        this.sleep(this.speed)
                            .then(() =>
                            {
                                this.SET_READY_NEXT(true);
                            });
                    }

                    this.list.forEach((bar, i) =>
                    {
                        const color = bar.swapped ? '#d81b60' : '#1A76D2';
                        p5.noStroke();
                        p5.fill(color);

                        if (bar.partitioned) p5.fill('purple');
                        if (bar.swapped) p5.fill('#d81b60');
                        if (bar.curr) p5.fill('#ffd600');
                        p5.rect(i * 16, height - bar.value, 15, bar.value);
                    });
                };
            };
        },
        sleep(ms)
        {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
    }
};
</script>

<style lang="scss">
    #canvas {
        display: flex;
        justify-content: center;
        margin-top: 10vh;
    }
</style>
