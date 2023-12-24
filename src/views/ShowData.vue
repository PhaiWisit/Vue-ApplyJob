<template>
  <v-data-table
    :headers="headers"
    :items="applicants"
    :sort-by="[{ key: 'createdDate', order: 'desc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>รายชื่อผู้สมัครงาน</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" @click="addApplicant">
              เพิ่มผู้สมัครใหม่
            </v-btn>
            <v-btn color="primary" dark class="mb-2" @click="exportCsv">
              Export to CSV
            </v-btn>
          </template>

          <v-card>
            <!-- <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title> -->

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fullName"
                      label="Full Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.age"
                      label="Age"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.gender"
                      label="Gender"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.expectedSalary"
                      label="Expected Salary"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.createdDate"
                      label="Created Date"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="openEditItem(item)"
        >mdi-pencil</v-icon
      >
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getApplicants">Reset</v-btn>
    </template>
  </v-data-table>

  <v-dialog v-model="isDialogOpen" @close="closeDialog" style="z-index: 500">
    <ApplyJobForm
      :isAdd="isAdd"
      :item="editItem"
      :onSubmitSuccess="getApplicants"
    />
  </v-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const defaultItem = {
  fullName: "",
  age: 0,
  gender: "",
  address: "",
  email: "",
  phone: "",
  expectedSalary: 0,
  createdDate: "",
};
const editedItem = reactive({ ...defaultItem });

let applicants = ref([]);

const headers = reactive([
  {
    title: "ชื่อ-สกุล",
    align: "start",
    sortable: false,
    key: "fullName",
  },
  { title: "อายุ", key: "age" },
  { title: "เพศ", key: "gender", sortable: false },
  { title: "ที่อยู่", key: "address", sortable: false },
  { title: "อีเมล", key: "email", sortable: false },
  { title: "เบอร์โทร", key: "phone", sortable: false },
  { title: "เงินเดือนที่คาดหวัง", key: "expectedSalary" },
  { title: "วันที่", key: "createdDate" },
  { title: "Actions", key: "actions", sortable: false },
]);

const formTitle = ref("New Applicant");

import ApplyJobForm from "../components/ApplyJobForm.vue";
const isDialogOpen = ref(false);
const editItem = ref(null);
let isAdd = ref();

const addApplicant = () => {
  isAdd = true;
  isDialogOpen.value = true;
};
const openEditItem = (item) => {
  editItem.value = item;
  isAdd = false;
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

const deleteItem = (item) => {
  Swal.fire({
    title: `ต้องการลบผู้สมัคร ${item.fullName} หรือไม่ ?`,

    showCancelButton: true,
    confirmButtonText: "ตกลง",
    cancelButtonText: `ยกเลิก`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await deleteApplicant(item.id);

      await getApplicants();
    }
  });
};

const exportCsv = async () => {
  try {
    // window.open("http://127.0.0.1:8000/get_csv", "");
    window.open("https://fastapi-project-4ybmiu2mlq-uc.a.run.app/get_csv", "");
    // const response = await axios.get(
    //   "http://127.0.0.1:8000/get_csv"
    // {
    //   responseType: "blob",
    // }
    // );
    // console.log(response);
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', 'applicants_list.csv');
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  } catch (error) {
    console.error(error);
  }
};

const accessToken = localStorage.getItem("token");

const getApplicants = async () => {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(
      // "http://127.0.0.1:8000/applicant",
      "https://fastapi-project-4ybmiu2mlq-uc.a.run.app/applicant",
      {
        headers,
      }
    );

    applicants.value = response.data;
  } catch (error) {
    console.error("Failed to fetch applicants:", error);
  }

  closeDialog();
};

const deleteApplicant = async (id) => {
  try {
    // const accessToken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.delete(
      // `http://127.0.0.1:8000/applicant/${id}`,
      `https://fastapi-project-4ybmiu2mlq-uc.a.run.app/applicant/${id}`,
      {
        headers,
      }
    );
    return response.status;
  } catch (error) {
    console.error("Failed to delete applicant:", error);
    return error.response ? error.response.status : 500;
  }
};

onMounted(() => {
  getApplicants();
});
</script>
