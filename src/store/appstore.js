import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed, reactive } from "vue";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
});

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    isLogin: false,
  }),
  actions: {
    loggedIn() {
      this.isLogin = true;
    },
    loggedOut() {
      this.isLogin = false;
    },
  },
});

export const useStore = defineStore("store", {
  state: () => ({
    isBooleanVariable: false,
  }),
  actions: {
    toggleBooleanVariable() {
      this.isBooleanVariable = !this.isBooleanVariable;
    },
  },
});

// export const useApplicantStore = defineStore("useApplicantStore", () => {
//   // const applicants = ref({});
//   const applicants = reactive([]);

//   const list_applicants = computed(() => applicants.value);

//   const load_applicants = computed(() => applicants.value.length > 0);

//   const fetch_applicants = async () => {
//     await axios
//       .get(`http://127.0.0.1:8000/applicant`)
//       .then((res) => {
//         applicants.value = res.data;
//         console.log(applicants.value);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return { fetch_applicants, list_applicants, load_applicants };
// });
