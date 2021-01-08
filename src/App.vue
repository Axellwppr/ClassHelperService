<template>
    <v-app>
        <!-- <v-btn color="pink" dark fixed top right fab to="/">
      <v-icon>mdi-plus</v-icon>
    </v-btn> -->
        <Axellsnackbar />
        <Axelldialog />
        <Axellloading />
        <router-view v-if="isRouterAlive" />
    </v-app>
</template>
<script>
import Axellsnackbar from "./components/snackbar";
import Axelldialog from "./components/dialog";
import Axellloading from "./components/loading";
export default {
    name: "App",
    components: {
        Axellsnackbar,
        Axelldialog,
        Axellloading,
    },
    provide() {
        return {
            reload: this.reload,
        };
    },
    data: () => ({
        isRouterAlive: true,
    }),
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },
    },
};
</script>
<style>
html,
  body {
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    display: none
  }

  #app,
  .container,
  .row {
    min-height: 100%;
  }
</style>