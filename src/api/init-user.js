import store from "@/store";
import { getUser } from "./user";

const tgUser = {
    name: '',
    id: null,
    theme: '',
    photoUrl: ''
  };


  const initUser = async() => {
    const tg = window.Telegram.WebApp;
    const initData = tg.initData;
    if (initData) {
      const params = new URLSearchParams(initData);
      const userJsonString = params.get('user');
      if (userJsonString) {
        const userData = JSON.parse(decodeURIComponent(userJsonString));
        tgUser.name = userData.first_name;
        tgUser.id = userData.id;
        tgUser.theme = tg.colorScheme;
        tgUser.photoUrl = userData.photo_url;
      }
    } else {
        tgUser.name = "Vlad";
        tgUser.id = 2;
        tgUser.theme = "dark";
    }
    store.dispatch('SET_TG_USER', tgUser);
    const user = await getUser(tgUser.id)
    await store.dispatch('SET_USER', user);
  };

  export default initUser
