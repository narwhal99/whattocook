<template>
  <v-app>
    <v-content>
      <Navbar v-if="this.$store.getters.isLoggedIn" />
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/navbar";
export default {
  components: {
    Navbar,
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