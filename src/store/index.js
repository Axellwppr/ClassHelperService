import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        snackbar: {
            state: {
                open: 0,
                message: '',
                timeout: -1,
                color: ''
            },
            mutations: {
                openSnackbar(state, payload) {
                    if (!payload.message) return false;
                    state.open = 1;
                    state.message = payload.message;
                    state.timeout = payload.timeout;
                    switch (payload.type) {
                        case 'success':
                            state.color = '#4CAF50';
                            break;
                        case 'info':
                            state.color = '#2196F3';
                            break;
                        case 'warning':
                            state.color = '#FFC107';
                            break;
                        default:
                            state.color = '#FF5252'
                    }
                },
                closeSnackbar(state) {
                    state.open = 0;
                }
            },
        },
        dialog: {
            state: [],
            mutations: {
                openDialog(state, payload) {
                    if (!payload.text || !payload.title) return false;
                    state.push({
                        title: payload.title,
                        text: payload.text,
                        btna: payload.btna,
                        btnb: payload.btnb,
                        funa: payload.funa,
                        funb: payload.funb,
                        open: true
                    });
                },
                closeDialog(state, payload) {
                    state[payload.id].open = false;
                }
            }
        },
        loading: {
            state: {
                loading: false,
                real: false
            },
            mutations: {
                onLoading(state) {
                    state.loading = true;
                    state.real = true;
                },
                offLoading(state) {
                    state.real = false;
                    setTimeout(() => {
                        if (!state.real) state.loading = false;
                    }, 400);
                },
                offLoadingFast(state) {
                    state.real = false;
                    state.loading = false;
                }
            }
        }
    },
})