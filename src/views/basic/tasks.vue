<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12" sm="8" md="7">
                <v-card class="py-3 pr-4 pl-6">
                    <div>
                        <div v-if="edit">
                            <v-textarea
                                rows="1"
                                auto-grow
                                v-for="(item, index) in names"
                                :key="index"
                                :label="item"
                                v-model="tasks[index]"
                                filled
                            >
                            </v-textarea>
                        </div>
                        <div
                            class="thin text--primary"
                            style="font-size: 31px"
                            v-else
                        >
                            <p
                                v-for="(item, index) in names"
                                :key="index"
                                class="ma-0"
                                style="
                                    word-break: break-all;
                                    white-space: pre-wrap;
                                "
                            >
                                <font v-if="tasks[index]">
                                    <font
                                        class="indigo--text text--lighten-3"
                                        >{{ names[index] }}</font
                                    >
                                    <font v-if="names[index]">:</font>
                                    {{ tasks[index] }}
                                </font>
                            </p>
                        </div>
                    </div>
                    <v-card-actions>
                        <v-spacer /><v-btn
                            class="ma-2"
                            @click="editDone()"
                            tile
                            outlined
                            color="success"
                            >{{ edit ? "确认" : "编辑" }}</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col v-if="exist" cols="12" sm="4" md="3" class="pa-0">
                <v-col cols="12">
                    <v-card>
                        <div v-if="weather.onload">
                            <v-skeleton-loader
                                ref="skeleton"
                                type="article"
                                tile
                                class="mx-auto"
                            />
                        </div>
                        <div
                            v-else
                            v-for="(weather, index) in weather.data"
                            :key="index"
                        >
                            <v-card-title
                                :class="{ 'pt-0': index == 1 }"
                                style="word-wrap: break-word"
                            >
                                <font class="display-1 font-weight-light">{{
                                    weather.tmp_min
                                }}</font
                                >~<font class="display-1 font-weight-light">{{
                                    weather.tmp_max
                                }}</font
                                >℃ {{ weather.cond_txt_d }}
                                <template v-if="index == 0">今天</template
                                ><template v-if="index == 1">明天</template>
                            </v-card-title>
                            <v-card-subtitle style="word-break: break-all">
                                降水概率 {{ weather.pop }}%，相对湿度
                                {{ weather.hum }}%，气压
                                {{ weather.pres }}hPa，{{ weather.wind_dir
                                }}{{ weather.wind_sc }}级
                            </v-card-subtitle>
                        </div>
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card>
                        <div v-if="sentence.onload">
                            <v-skeleton-loader
                                ref="skeleton"
                                type="article"
                                tile
                                class="mx-auto"
                            />
                        </div>
                        <span v-else>
                            <v-card-title>
                                {{ sentence.data.motto }}
                            </v-card-title>
                            <v-card-subtitle>
                                {{ sentence.data.translate }}
                            </v-card-subtitle>
                        </span>
                    </v-card>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Vue from "vue";
// var that;
export default Vue.extend({
    name: "App",
    data() {
        return {
            edit: 0,
            tasks: ["", "", "", "", "", "", "", "", "", ""],
            names: ["", "语", "数", "英", "物", "化", "生"],
            exist: 1,
            sentence: {
                onload: 1,
                data: {},
            },
            weather: {
                onload: 1,
                data: {},
            },
            time: {
                time: "",
                tip: "",
            },
        };
    },
    methods: {
        editDone() {
            this.edit = !this.edit;
            localStorage.setItem("tasks1", JSON.stringify(this.tasks));
        },
    },
    created() {
        if (localStorage.getItem("tasks1"))
            this.tasks = JSON.parse(localStorage.getItem("tasks1"));
        window.ipcRenderer.send("basicTasksLoad");
        window.ipcRenderer.once("basicTasksWeatherLoaded", (event, data) => {
            this.weather.onload = 0;
            this.weather.data = [data[0], data[1]];
        });
        window.ipcRenderer.once("basicTasksPaperLoaded", (event, data) => {
            this.sentence.onload = 0;
            this.sentence.data = data;
        });
        window.ipcRenderer.once("basicTasksWeatherLoadFailed", () => {
            this.$store.commit("openDialog", {
                title: "天气加载错误",
                text: "天气加载失败,可能由于API错误",
                btna: "我知道啦",
                btnb: "",
                funa: () => {},
                funb: () => {},
            });
        });
        window.ipcRenderer.once("basicTasksPaperLoadFailed", () => {
            this.$store.commit("openDialog", {
                title: "一言加载错误",
                text: "一言加载失败,可能由于API错误",
                btna: "我知道啦",
                btnb: "",
                funa: () => {},
                funb: () => {},
            });
        });
        window.ipcRenderer.once("basicTasksLoadFailed", () => {
            this.$store.commit("openDialog", {
                title: "错误",
                text:
                    "文件读取失败,可能的原因是你没有处于春晖内网或文件服务器停止工作",
                btna: "我知道啦",
                btnb: "",
                funa: () => {},
                funb: () => {},
            });
            this.exist = 0;
        });
        this.$vuetify.theme.dark = true;
    },
    mounted() {},
    beforeDestroy() {
        this.$vuetify.theme.dark = false;
    },
});
</script>