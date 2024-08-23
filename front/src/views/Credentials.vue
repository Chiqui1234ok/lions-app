<template>
    <main>
        <form class="form">
            <input type="email" v-model="email" class="input" :placeholder="t('emailInput')">
            <input type="password" v-model="password" class="input" :placeholder="t('passwordInput')">
            <input type="submit" :value="t('submitBtn')">
        </form>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Options, Component } from 'vue-class-component';

@Options ({
    props: {

    }
})

@Component
class Credentials extends Vue {
    t = useI18n();
}

export default Credentials;
</script>