<template>
  <div id="app">
    <img src="./assets/logo.png" alt="Logo" class="logo" />
    <div class="button-group">
      <button @click="login">Login</button>
      <button v-if="loginResponse" @click="getAccessToken">
        Get AccessToken
      </button>
      <button v-if="loginResponse" @click="getAccessList">
        Get Access List
      </button>
      <button v-if="loginResponse" @click="fetchNews">Get News</button>
    </div>
    <modal v-if="modalData" @close="modalData = null">
      <template v-slot:header>
        <h3>{{ modalTitle }}</h3>
      </template>
      <pre>{{ modalData }}</pre>
    </modal>
    <p>(Authonomy Demo)</p>
  </div>
</template>


  <script>
import Modal from "./components/Modal.vue";
import { AuthonomySDK } from "authonomysdk";
export default {
  name: "App",
  components: {
    Modal,
  },
  data() {
    return {
      sdk: null,
      loginResponse: null,
      accessToken: null,
      accessList: null,
      newsContent: null,
      modalData: null,
      modalTitle: "",
    };
  },
  methods: {
    login() {
      const CONFIG = {
        appDid: process.env.VUE_APP_AUTHONOMY_APP_DID,
        appSecret: process.env.VUE_APP_AUTHONOMY_APP_SECRET,
        serviceUrl: process.env.VUE_APP_AUTHONOMY_SERVICE_URL,
      };
      this.sdk = new AuthonomySDK(CONFIG);
      this.sdk.signUp((data) => {
        console.log("Received data:", data);
        this.loginResponse = data;
        this.showResponse(this.loginResponse, "Login Response");
      });
    },
    getAccessToken() {
      // Call SDK method to get the access token
      // Example, adjust according to your SDK's actual method
      this.sdk.getAccessToken(
        this.loginResponse.oauth_credential.credentialJwt,
        this.loginResponse.policy_credential.credentialJwt,
        (error, data) => {
          if (error) {
            console.error("Error:", error);
            return;
          }
          console.log("Access token:", data.access_token);
          this.accessToken = data;
          this.showResponse(this.accessToken, "Access Token");
        }
      );
    },
    getAccessList() {
      this.sdk.getAccessList(this.accessToken.access_token, (error, data) => {
        if (error) {
          console.error("Error:", error);
          return;
        }
        console.log("Access List:", data);
        this.accessList = data;
        this.showResponse(this.accessList, "Access List");
      });
    },
    fetchNews() {
      fetch(process.env.VUE_APP_API_SERVICE + "/api/news", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken.access_token}`,
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.newsContent = data;
          this.showResponse(this.newsContent, "News Content");
        })
        .catch((error) => console.error("Error fetching news:", error));
    },
    showResponse(response, title) {
      this.modalData = response;
      this.modalTitle = title;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background: #FF6712; /* Background gradient */
  min-height: 100vh; /* Full height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  color: #fff;
}
.logo {
  max-width: 250px;
  background: white;
}

.button-group button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #FF6712;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
}

.button-group button:hover {
  background-color: #2193b0;
  color: #fff;
}
</style>
