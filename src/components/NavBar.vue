<template>
  <div class="topnav">
    <v-row>
      <router-link to="/"> สมัครงาน</router-link>
      <router-link to="/data"> ดูสรุปข้อมูล</router-link>
    </v-row>
    <div v-show="isLogin" style="color: white; margin-right: 20px">
      <button @click="logout">ออกจากระบบ</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, computed, inject, provide } from "vue";

import { useLoginStore } from "../store/appstore";
import { useStore } from "../store/appstore";

const loginStore = useLoginStore();
let isLogin = computed(() => !!localStorage.getItem("token"));

const router = useRouter();

const logout = async () => {
  const accessToken = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(
      // "http://127.0.0.1:8000/auth/logout",
      // `${import.meta.env.FAST_API}/auth/logout`,
      `https://fastapi-project-4ybmiu2mlq-uc.a.run.app/auth/logout`,
      {},
      {
        headers,
      }
    );
    console.log("Logout successful:", response.data);
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    console.log("accesstoken", accessToken);
    localStorage.clear();
    loginStore.loggedOut();
    router.push("/login");
    router.go(0);
    console.log("Logged out");
  }
};
</script>

<style lang="scss" scoped>
.topnav {
  overflow: hidden;
  background-color: #333;
  display: flex;
  justify-content: space-between;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #424242;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.logout-container {
  float: right;
  padding: 14px 16px;
}

.logout-container button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.logout-container button:hover {
  background-color: #d32f2f;
}
</style>
