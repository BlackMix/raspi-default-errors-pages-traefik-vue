<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
    background-color: #111;
    color: #FFFFFF;
    overflow: hidden;
    display: flex;
    justify-content: center;
}

a:link {
  text-decoration: none;
}

.vertical-center {
    min-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

h1, h2, h3, h4, h5 {
  color: #FFFFFF;
}

p {
  color: #FFFFFF;
}

.img-raspberry {
    padding: 10px;
    max-height: 240px;
}

.rasp-image {
  position: relative;
  right: 200px;
}

.text-error {
  position: relative;
  bottom: 200px;
  left: 50px;
}

.btn {
  position: absolute;
  width: 150px;
  height: 50px;
  text-align: center;
  display: block;
  margin: 0 auto;
  padding: 0;
  line-height: 45px;
}

.btn-raspberry {
  color: #FFFFFF;
  border: 2px solid rgb(192, 6, 6);
  transition-duration: 0.4s;
}

.btn-raspberry:hover {
    color: #FFFFFF;
    border: 2px solid rgb(25, 119, 7);
}

.btn-raspberry:focus {
    color: #FFFFFF;
}
</style>
