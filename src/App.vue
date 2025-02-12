<template>
  <body class="d-flex flex-column min-vh-100">
    <div id="app">

      <!-- top bar: logo and  navigation -->
      <header class=" py-3">
        <div class="container d-flex align-items-center justify-content-between">
          <!-- logo -->
          <router-link :to ="{ name: 'home'}">
             <img src ="./img/logo_new.jpg" class="img-fluid rounded-circle shadow" alt="Logo" />
          </router-link>
         

        <!-- Navbar -->
          <nav class="navbar navbar-expand-md navbar-dark">
            <button 
              class="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
             
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-link text-black fs-5 fs-md-4 fs-lg-3" v-bind:to="{ name: 'home' }" >Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link text-black fs-5 fs-md-4 fs-lg-3" v-bind:to="{ name: 'cart' }">Cart</router-link>
                </li>
                <li class="nav-item">
                  <router-link 
                    class="nav-link text-black fs-5 fs-md-4 fs-lg-3" 
                    v-bind:to="{ name: 'logout' }" 
                    v-if="$store.state.token"
                  >Logout</router-link>
                  <router-link 
                    class="nav-link text-black fs-5 fs-md-4 fs-lg-3" 
                    v-bind:to="{ name: 'login' }" 
                    v-else
                  >Login</router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

      </header>

      <!-- Main content  -->
      <main class="flex-grow-1 mb-4 d-flex  justify-content-center">
          <div class="container flex-grow-1">  
            <router-view  />
          </div>
      </main>
      <footer class=" text-center py-3 mt-auto">
          &copy; 2025 All rights reserved.
      </footer>
    </div>
  </body>
</template>

<style scoped>

#app {
  background-color: #edede9;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
}
header {
   background-color: #d5bdaf;
}
header img {
    max-width: 80px;
    height: auto;
}
.navbar-toggler-icon {
  filter: invert(1);  /* keep burger icon black color  */
  width: 30px !important;  
  height: 30px !important; 
}
body {
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}
footer{
  color: rgb(24, 28, 34);
  background-color: #e3d5ca;
}
.navbar-nav .nav-link:hover {
  background-color: #f5ebe0; 
  border-radius: 5px;        
  transition: all 0.3s ease-in-out; 
}
</style>