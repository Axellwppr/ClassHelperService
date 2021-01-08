<template>
    <v-container fluid class="back">
        <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12">
                <v-row align="center" justify="center" class="fill-height">
                    <v-col cols="12" style="text-shadow:1px 1px 3px #000;">
                        <div class="text-h4 text-md-h2 font-weight-light text-center blue-grey--text text--lighten-4">
                            <font class="red--text text--lighten-1">C</font>lass
                            <font class="indigo--text text--lighten-1">H</font>elper
                            <font class="indigo--text text--lighten-1">S</font>ervice
                        </div>
                        <div
                            class="text-h6 text-md-h4 font-weight-light text-center blue-grey--text text--lighten-4 mt-1">
                            <font class="red--text text--lighten-1">Hi</font>, nice to meet <font
                                class="indigo--text text--lighten-1">you</font>.
                        </div>
                    </v-col>
                    <v-col cols="10" md="8" lg="5">
                        <v-row v-for="(items,index) in item" :key="index">
                            <v-col v-for="(item,i) in items" :key="i" cols="12" sm="6">
                                <v-card elevation="16" class="blue-grey lighten-4">
                                    <v-card-title>{{item.name}}
                                        <v-spacer/>
                                        <v-btn color="primary" icon :to="item.to">
                                            <v-icon>
                                                mdi-arrow-right
                                            </v-icon>
                                        </v-btn>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                item: {
                    basic: [{
                        name: '作业布置',
                        to: '/basic/tasks'
                    }],
                    amuse: [{
                            name: '抽奖',
                            to: '/amuse/lottery'
                        },
                        {
                            name: '真心话大冒险',
                            to: '/amuse/truth'
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss">
    .back {
        background: url("../assets/background.jpg") left;
        background-size: cover
    }
</style>