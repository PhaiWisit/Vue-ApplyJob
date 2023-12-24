<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">ใบสมัครงาน</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="fullName"
            label="ชื่อ-นามสกุล"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="age"
            label="อายุ"
            outlined
            type="number"
          ></v-text-field>
          <v-select
            v-model="gender"
            label="เพศ"
            :items="genders"
            outlined
          ></v-select>
          <v-text-field
            v-model="address"
            label="ที่อยู่"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            label="เบอร์โทร"
            outlined
            type="tel"
          ></v-text-field>
          <v-text-field
            v-model="expectedSalary"
            label="เงินเดือนที่คาดหวัง"
            outlined
            type="number"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            @click="submitForm"
            :loading="loadingStore.isLoading"
          >
            <template v-if="!loadingStore.isLoading"> บันทึก </template>
            <template v-else>
              <v-progress-circular
                indeterminate
                size="24"
              ></v-progress-circular>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
export interface ApplyJobFormProps {
  item?: any;
  isAdd: boolean;
  onSubmitSuccess?: () => void;
  // config: {
  //   layer: string;
  //   name: string;
  //   isHTMLOnly: boolean;
  //   chartType?: string;
  // };
}
const props = defineProps<ApplyJobFormProps>();

console.log(props.isAdd);

import axios from "axios";
import { ref } from "vue";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import { useLoadingStore } from "../store/appstore";

const loadingStore = useLoadingStore();

const fullName = ref(null);
const age = ref(null);
const gender = ref(null);
const address = ref(null);
const email = ref(null);
const phone = ref(null);
const expectedSalary = ref(null);

if (!props.isAdd) {
  fullName.value = props.item?.fullName;
  age.value = props.item?.age;
  gender.value = props.item?.gender;
  address.value = props.item?.address;
  email.value = props.item?.email;
  phone.value = props.item?.phone;
  expectedSalary.value = props.item?.expectedSalary;
}

const genders = ["ชาย", "หญิง", "ไม่ระบุ"];

const submitForm = async () => {
  loadingStore.startLoading();

  if (isSomeValueNull()) {
    Swal.fire({
      title: "แจ้งเตือน",
      text: "กรุณากรอกข้อมูลให้ครบ",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
    loadingStore.stopLoading();
    return;
  } else {
    const accessToken = localStorage.getItem("token");

    let config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let postData = {
      fullName: fullName.value,
      age: age.value,
      gender: gender.value,
      address: address.value,
      email: email.value,
      phone: phone.value,
      expectedSalary: expectedSalary.value,
    };

    try {
      if (props.isAdd) {
        await axios
          .post(
            // "http://127.0.0.1:8000/applicant",
            `https://fastapi-project-4ybmiu2mlq-uc.a.run.app/applicant`,
            postData,
            config
          )
          .then((res) => {
            // console.log(res);
            Swal.fire({
              icon: "success",
              title: "บันทึกข้อมูลของท่านเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 1500,
            });

            props.onSubmitSuccess && props.onSubmitSuccess();
          });
      } else {
        await axios
          .put(
            // `http://127.0.0.1:8000/applicant/${props.item.id}`,
            `https://fastapi-project-4ybmiu2mlq-uc.a.run.app/applicant/${props.item.id}`,
            postData,
            config
          )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "แก้ไขข้อมูลของท่านเรียบร้อยแล้ว",
              showConfirmButton: false,
              timer: 1500,
            });

            props.onSubmitSuccess && props.onSubmitSuccess();
          });
      }

      resetValue();
    } catch (error) {
      loadingStore.stopLoading();
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      console.log("stop");
      loadingStore.stopLoading();
    }
  }
};

function isSomeValueNull() {
  if (
    fullName.value == null ||
    age.value == null ||
    gender.value == null ||
    address.value == null ||
    email.value == null ||
    phone.value == null ||
    expectedSalary.value == null
  ) {
    return true;
  } else {
    return false;
  }
}

function resetValue() {
  fullName.value = null;
  age.value = null;
  gender.value = null;
  address.value = null;
  email.value = null;
  phone.value = null;
  expectedSalary.value = null;
}
</script>

<style>
/* สามารถเพิ่มสไตล์เพิ่มเติมตามต้องการ */
</style>
