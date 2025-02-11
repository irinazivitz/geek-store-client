<template>
  <div id="register">
    <form v-on:submit.prevent="register">
      <h1 class="form-title">Create Account</h1>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          v-model="user.username"
          required
          autofocus
        />
      </div >

      <div class="form-group">
         <label for="name">Full Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          v-model="user.name"
          required
        />
      </div>

      <div class="form-group">
         <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
      </div>

       <div class="form-group">
         <label for="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          v-model="user.confirmPassword"
          required
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input type="text" id="address" placeholder="Enter your address" v-model="user.address" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="city">City</label>
          <input type="text" id="city" placeholder="City" v-model="user.city" />
        </div>

        <div class="form-group">
          <label for="state">State</label>
          <input type="text" id="state" placeholder="State" v-model="user.stateCode" maxlength="2" required />
        </div>

        <div class="form-group">
          <label for="zip">ZIP</label>
          <input type="number" id="zip" placeholder="ZIP" v-model="user.zip" required minlength="5" maxlength="5" />
        </div>
      </div>

       <button class="btn-submit" type="submit">Create Account</button>

      <hr />
      Have an account?
      <router-link v-bind:to="{ name: 'login' }">Sign in!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        stateCode: "",
        zip: "",
        role: "user",
      },
    };
  },
  methods: {
    error(msg) {
      alert(msg);
    },
    success(msg) {
      alert(msg);
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.error("Password & Confirm Password do not match");
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.success("Thank you for registering, please sign in.");
              this.$router.push({
                path: "/login",
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            if (!response) {
              this.error(error);
            } else if (response.status === 400) {
              if (response.data.errors) {
                let msg = "Validation error: ";
                for (let err of response.data.errors) {
                  msg += `'${err.field}':${err.defaultMessage}. `;
                }
                this.error(msg);
              } else {
                this.error(response.data.message);
              }
            } else {
              this.error(response.data.message);
            }
          });
      }
    },
  },
};
</script>

<style scoped>

#register {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px; 
  background-color: #edede9;
  min-height: 100vh;
}

form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: #f5ebe0;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #6b5b4e;
  font-size: 22px;
  margin-bottom: 15px;
}

#fields {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  color: #4a5759;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #d5bdaf;
  border-radius: 5px;
  background-color: white;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #d5bdaf;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #ba937c;
}

hr {
  border: 0;
  height: 1px;
  background: #e3d5ca;
  margin: 20px 0;
}

router-link {
  color: #6b5b4e;
  font-weight: bold;
  text-decoration: none;
}

router-link:hover {
  color: #4a5759;
  text-decoration: underline;
}
</style>
