<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="3">
      <settingsMenu></settingsMenu>
    </v-col>
    <v-col cols="12" sm="9">
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-col>
  </v-row>
</template>

<script>
import settingsMenu from "../components/Settings/menu";
export default {
  components: {
    settingsMenu,
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(30%);
}
</style>