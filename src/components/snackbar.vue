<template>
    <v-snackbar v-model="snackbar" :timeout="$store.state.snackbar.timeout"
        :color="$store.state.snackbar.color">
        {{$store.state.snackbar.message}}
    </v-snackbar>
</template>

<script>
export default {
    name: "axell-snackbar",
    computed: {
        snackbar: {
            get() {
                return this.$store.state.snackbar.open
            },
            set(newVal) {
                if (newVal == 0) this.$store.commit('closeSnackbar')
            }
        }
    }
}
</script>