<template>
  <v-container fluid class="back">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12">
        <v-col cols="12" style="text-shadow:1px 1px 3px #000;">
          <div class="text-h1 font-weight-light text-center white--text text--lighten-4">
            {{number}}
          </div>
          <div class="text-center pt-10">
            <v-btn class="ma-2" tile color="indigo" :disabled="loading||list.length<=0" @click="next()" dark>
              下一位{{!multi?`(剩余${list.length}人)`:''}}
            </v-btn>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="390">
      <v-card>
        <v-card-title class="pt-5 headline">设置</v-card-title>
        <v-card-text class="pb-0">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="left" hide-details label="最小值" type="number" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="right" hide-details label="最大值" type="number" required></v-text-field>
            </v-col>
          </v-row>
          <v-checkbox class="pt-0" v-model="multi" label="是否允许重复"></v-checkbox>
          设置一经确认不可更改,如需更改请重启程序
          <p v-if="warning" class="red--text">{{warning}}</p>
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

<script>
  var sleep = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  var random = (n, m) => {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }
  export default {
    data() {
      return {
        number: '≧▽≦',
        loading: false,
        list: [],
        all: [],
        dialog: 1,
        left: 1,
        right: 40,
        multi: false,
        warning: ''
      }
    },
    methods: {
      set() {
        if (this.right - this.left < 4) {
          this.warning = "需要至少5人"
          return;
        } else this.warning = "";
        this.dialog = 0;
        for (var i = this.left; i <= this.right; ++i) {
          this.list.push(i);
          this.all.push(i);
        }
      },
      async next() {
        this.loading = true;
        for (var i = 1; i <= 30; ++i) {
          this.number = this.all[random(0, this.all.length - 1)];
          await sleep(Math.max(5 * i, 50));
        }
        var select = random(0, this.list.length - 1);
        this.number = this.list[select];
        if (!this.multi) this.list.splice(select, 1);
        this.loading = false;
      }
    },
    created() {},
    beforeDestroy() {}
  }
</script>

<style lang="scss">
  .back {
    background: url("../../assets/background.jpg") left;
    background-size: cover
  }
</style>