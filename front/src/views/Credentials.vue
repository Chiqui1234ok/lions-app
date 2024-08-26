<template>
    <main>
        <form class="form">
            <input type="email" v-model="user.email" class="input" :placeholder="t('emailInput')">
            <input type="password" v-model="user.password" class="input" :placeholder="t('passwordInput')">
            <input type="submit" :value="t('submitBtn')">
        </form>
    </main>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { BaseUser } from '@/interfaces/BaseUser';

export default {
  setup() {
    const { t } = useI18n();
    const user = ref<BaseUser>({
        name: '',
        email: '',
        password: '',
    });    
    return {
        t,
        user,
    }
  },
}
</script>