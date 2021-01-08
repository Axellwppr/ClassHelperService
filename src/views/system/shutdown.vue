<template>
    <v-container fluid class="back">
        <v-row align="center" justify="center" class="fill-height">
            <v-col cols="12">
                <v-col cols="12" style="text-shadow:1px 1px 3px #000;">
                    <div class="text-h2 font-weight-light text-center white--text text--lighten-4">
                        <font class="red--text text--lighten-1">Have</font> a good <font
                            class="indigo--text text--lighten-1">night</font>
                    </div>
                    <div class="text-h5 font-weight-light text-center white--text text--lighten-4 mt-10">
                        将在 <font class="red--text text--lighten-1">{{time}}</font> 秒后自动关机  
                        <a class="red--text text--lighten-1" @click="cancel()">
                            点此取消
                        </a>
                    </div>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                time: 60
            }
        },
        methods: {
            cancel(){
                window.ipcRenderer.send('autoShutdownCancel');
                this.$router.back();
            }
        },
        created() {
            window.ipcRenderer.send('autoShutdownStart');
            window.ipcRenderer.on('autoShutdownTime', (event, time) => {
                this.time = time;
            });
        },
        beforeDestroy() {}
    }
</script>

<style lang="scss">
    .back {
        background: url("../../assets/background.jpg") left;
        background-size: cover
    }
</style>