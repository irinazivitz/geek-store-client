<template>
  <div id="login" class="d-flex justify-content-center"> 
    <div class="card shadow-lg p-4 w-100 m-3" style="max-width: 400px;">
      <h2 class="text-center mb-4 ">Please Sign In</h2>

      <form v-on:submit.prevent="login">
        <div class ="mb-3">
          <label for="username" class ="form-label fw-bold me-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              v-model="user.username"
              required
              autofocus
            />
        </div>
        <div class ="mb-3">
           <label for="password" class ="form-label fw-bold me-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
        </div >
        <div class="d-grid">
          <button type="submit" class="btn custom-btn btn-lg">Sign in</button>
        </div>
      </form>
            
      <hr class="my-4"/>
      <p class="text-center">
          Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
      </p>
           
          
    </div>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.custom-btn {
  background-color: #d5bdaf;
  border: none;
  transition: all 0.3s ease-in-out;
}
.card{
  background-color: #f5ebe0;
}
</style>
