<template>
    <v-container fluid class="back">
        <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12" md="8" style="text-shadow:1px 1px 3px #000;">
                <div class="text-h3 font-weight-light text-center white--text text--lighten-4" style="min-height:150px">
                    {{items[id]}}
                </div>
                <div class="text-center">
                    <v-btn class="ma-2" tile color="indigo" :disabled="loading" @click="random()" dark>
                        下一条
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="390">
            <v-card>
                <v-card-title class="pt-5 headline">导入外部题库</v-card-title>
                <v-card-text class="pb-0">
                    <v-row justify="center">
                        <v-col cols="12">
                            <template>
                                <v-file-input accept="text/*" label="File input" @ @change="upload"></v-file-input>
                            </template>
                        </v-col>
                    </v-row>
                    你可以选择导入外部题库,或者直接点击确认来使用内部题库<br />
                    设置一经确认不可更改,如需更改请重启程序
                </v-card-text>
                <v-card-actions class="px-4">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" tile text @click="set()">
                        确认
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style lang="scss">
    .back {
        background: url("../../assets/background.jpg") left;
        background-size: cover
    }
</style>

<script>
    import Vue from 'vue';
    import data from './truth.json'
    var sleep = (time) => {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }
    var random = (n, m) => {
        return Math.floor(Math.random() * (m - n + 1)) + n;
    }
    export default Vue.extend({
        methods: {
            async random() {
                this.loading = true;
                for (var i = 1; i <= 30; ++i) {
                    this.id = random(0, this.items.length - 1);
                    await sleep(Math.max(5 * i, 50));
                }
                this.id = random(0, this.items.length - 1);
                this.loading = false;
            },
            upload(file){
                if (file.size<=100000){
                    var reader = new FileReader();
                    reader.onload = ()=>{
                        var data = reader.result.split('\n');
                        this.items = data;
                    };
                    reader.readAsText(file);
                }
            },
            set(){
                this.dialog = 0;
            }
        },
        data: () => ({
            id: 0,
            dialog: 1,
            loading: false,
            items: data.data
        })
    });
</script>