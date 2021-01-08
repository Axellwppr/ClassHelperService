<template>
    <div class="text-center">
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
export default {
    name: "axell-loading",
    methods: {
    },
    computed: {
        overlay() {
            return this.$store.state.loading.loading;
        },
    },
};
</script>