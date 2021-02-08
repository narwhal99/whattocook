<template>
  <v-app>
    <v-main>
      <Navbar v-if="this.$store.getters.isLoggedIn" />
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </v-main>
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