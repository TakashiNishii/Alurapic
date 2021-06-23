<template>
  <div>
    <h1>{{ titulo }}</h1>
    <ul>
      <li v-for="foto of fotos">
        <img :src="foto.url" :alt="foto.titulo" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Alurapic",
      fotos: [
        {
          url:
            "https://www.dicaspetz.com.br/wp-content/uploads/2020/09/ibuprofeno-para-cachorro-pet.jpg",
          titulo: "cachorro"
        },
        {
          url:
            "https://www.dicaspetz.com.br/wp-content/uploads/2020/09/ibuprofeno-para-cachorro-pet.jpg",
          titulo: "Cachorrão"
        }
      ]
    };
  }
};
</script>

<style></style>
