<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">เข้าสู่ระบบ</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="username"
                label="ชื่อผู้ใช้"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="รหัสผ่าน"
                outlined
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="login">เข้าสู่ระบบ</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, inject } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useLoginStore } from "../store/appstore";

const loginStore = useLoginStore();

const router = useRouter();

const username = ref("test");
const password = ref("1234");

const login = async () => {
  try {
    const response = await axios.post(
      // "http://127.0.0.1:8000/auth/login",
      // `${import.meta.env.FAST_API}/auth/login`,
      `https://fastapi-project-4ybmiu2mlq-uc.a.run.app/auth/login`,
      {
        username: username.value,
        password: password.value,
      }
    );
    const accessToken = response.data.access_token;
    localStorage.setItem("token", accessToken);
    router.push("/data");

    loginStore.loggedIn();
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<style></style>
