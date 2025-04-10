<script setup>
import { computed } from 'vue';
import { router } from '@/router';
import { useStore } from 'vuex';
import { getRegistrationDate } from '@/utils';
import MMainButton from './MMainButton.vue';
import { collectBonus } from '@/api/user';

const store = useStore();

const tgUser = computed(() => store.state.tgUser)
const user = computed(() => store.state.user)


const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    store.dispatch("SET_INDEX", 0)
    router.push('/')
})

const buttonName = 'Забрать бонус'


const getBonus = async() => {
    const money = user.value.is_premium ? 150 : 100;
    const data = {
        "user_id": user.value.id,
        "money": user.value.money + money
    }
    const newUser = await collectBonus(data)
    store.dispatch("SET_USER", newUser)
}
</script>

<template>
    <div class="m-account-container">
        <div class="m-account-info">
            <img :src="tgUser.photo_url" class="m-account-info-photo"/>
            <div class="m-account-info-data">
                <p>{{ tgUser.name }}</p>
                <p>Стандартный аккаунт</p>
                <p>Дата регистрации: {{ getRegistrationDate(user.registration_date) }} г.</p>
            </div>
        </div>
        <button class="m-account-upgrade-btn">Улучшить до премиум</button>
        <div class="m-account-settings">
            <div>
                <p>Язык</p>
                <p>Вид бюджета</p>
                <p>Вид категорий</p>
            </div>
            <div>
                <p class="m-account-settings-value">Русский</p>
                <p class="m-account-settings-value">Шарики</p>
                <p class="m-account-settings-value">Текст</p>
            </div>
        </div>
    </div>
    <div class="m-account-footer">
        <m-main-button :name="buttonName" @click-button="getBonus"></m-main-button>
    </div>
</template>

<style scoped>

.m-account-container{
    width: 100%;
    height: 72vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 15px;
}


.m-account-info{
    width: 80%;
    padding-top: 40px;
    display: flex;
}



.m-account-info-photo{
    width: 100px;
    height: 100px;
    background-color: white;
    border: 2px solid black;
}

.m-account-info-data{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
}

.m-account-upgrade-btn{
    margin: 40px 0px;
    background: none;
    color: white;
    font-size: 14px;
    border: 0px;
    cursor: pointer;
}

.m-account-settings{
    width: 80%;;
    justify-content: space-between;
    display: flex;
}

.m-account-footer{
    height: 11vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.m-account-settings-value{
    cursor: pointer;
}
</style>
