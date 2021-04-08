<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <div class="nav-container">
            <div class="algo-selection">
                <v-menu
                    offset-y
                    class="align-self-start"
                >

                    <template v-slot:activator="{ attrs, on }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            Sorting Algorithm
                            <v-icon>mdi-menu-down</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="algo in sortingAlgos"
                            :key="algo.name"
                            link
                            @click="setNewGenerator(algo)"
                        >
                            <v-list-item-title
                                v-text="algo.name"
                            />
                        </v-list-item>
                    </v-list>
                </v-menu>

                <div
                    class="sorting-name"
                >
                    {{sortingAlgo.name}}
                </div>
            </div>

            <div class="commands">
                <v-btn
                    v-if="!isSorting"
                    fab
                    dark
                    small
                    :disabled="isSorted"
                    color="primary"
                    @click="SET_IS_SORTING(true)"
                >
                    <v-icon dark>
                        mdi-play
                    </v-icon>
                </v-btn>
                <v-btn
                    v-else
                    fab
                    dark
                    small
                    color="primary"
                    @click="SET_IS_SORTING(false)"
                >
                    <v-icon dark>
                        mdi-pause
                    </v-icon>
                </v-btn>
                <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    @click="restart"
                >
                    <v-icon dark>
                        mdi-restart
                    </v-icon>
                </v-btn>
            </div>

            <v-btn
                fab
                dark
                small
                class="github-link"
                color="grey darken-2"
            >
                <v-icon dark>
                    mdi-github
                </v-icon>
            </v-btn>
        </div>

    </v-app-bar>

    <v-main>
        <v-canvas />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import VCanvas from './components/Canvas.vue';

export default {
    name: 'App',

    components: {
        VCanvas
    },
    computed: {
        ...mapGetters([
            'isSorting',
            'isSorted',
            'sortingAlgo',
            'sortingAlgos'
        ])
    },
    created()
    {
        this.CREATE_NEW_LIST(50);
        this.SET_SORTING_ALGO(this.sortingAlgos.bubbleSort);
        this.CREATE_GENERATOR();
    },
    methods: {
        ...mapMutations([
            'SET_IS_SORTING',
            'SET_SORTING_ALGO',
            'CREATE_NEW_LIST',
            'CREATE_GENERATOR',
            'SET_IS_SORTED'
        ]),
        setNewGenerator(generatorAlgo)
        {
            if (this.sortingAlgo === generatorAlgo) return;

            this.SET_SORTING_ALGO(generatorAlgo);
            this.CREATE_GENERATOR();
        },
        restart()
        {
            this.CREATE_NEW_LIST(50);
            this.SET_IS_SORTED(false);
            this.SET_SORTING_ALGO(this.sortingAlgo);
            this.CREATE_GENERATOR();
        }
    }
};
</script>

<style lang="scss">
    .nav-container {
        display: grid;
        grid-template-columns: 1fr min-content 1fr;
        align-items: center;
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;

        > .algo-selection {
            display: grid;
            grid-template-columns: min-content 1fr;
            align-items: center;
            justify-items: center;

            > .sorting-name {
                padding: 0 5px;
                font-size: 20px;
            }
        }

        > .commands {
            display: grid;
            align-items: center;
            grid-template-columns: min-content 1fr;
            gap: 10px;
        }

        > .github-link {
            justify-self: end;
        }
    }
</style>
