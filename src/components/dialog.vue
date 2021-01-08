<template>
    <div>
        <v-dialog v-for="(item,index) in dialog" :key="index" v-model="item.open" persistent  max-width="390">
            <v-card>
                <v-card-title class="pt-5 headline">{{item.title}}</v-card-title>
                <v-card-text v-html="item.text">
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn v-if="item.btna!=''" color="primary" tile text @click="close(index); item.funa();">
                        {{item.btna}}
                    </v-btn>
                    <v-btn v-if="item.btnb!=''" color="primary" tile text @click="close(index); item.funb();">
                        {{item.btnb}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "axell-dialog",
    methods: {
        close(id){
            this.$store.commit('closeDialog',{id: id});
        }
    },
    computed: {
        dialog(){
            return this.$store.state.dialog;
        }
    }
}
</script>