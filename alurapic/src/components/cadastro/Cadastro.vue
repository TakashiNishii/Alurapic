<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <validationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="grava()">
        <div class="controle">
          <label for="titulo">TÍTULO</label>
          <validation-provider
            rules="required|minmax:3,20"
            :bails="false"
            v-slot="{ errors }"
          >
            <input
              v-model="foto.titulo"
              id="titulo"
              vid="titulo"
              name="título"
              autocomplete="off"
              style="width: 100%"
            />
            <span class="erro">{{ errors[0] }}</span>
          </validation-provider>
        </div>

        <div class="controle">
          <label for="url">URL</label>
          <validation-provider rules="required" v-slot="{ errors }">
            <input
              v-model.lazy="foto.url"
              id="url"
              autocomplete="off"
              name="url"
              style="width: 100%"
            />
            <span class="erro">{{ errors[0] }}</span>
          </validation-provider>
          <imagem-responsiva
            v-show="foto.url"
            :url="foto.url"
            :titulo="foto.titulo"
          />
        </div>

        <div class="controle">
          <label for="descricao">DESCRIÇÃO</label>
          <textarea
            id="descricao"
            autocomplete="off"
            v-model="foto.descricao"
          ></textarea>
        </div>

        <div class="centralizado">
          <meu-botao rotulo="GRAVAR" tipo="submit" />
          <router-link :to="{ name: 'home' }"
            ><meu-botao rotulo="VOLTAR" tipo="button"
          /></router-link>
        </div>
      </form>
    </validationObserver>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id
    };
  },

  methods: {
    grava() {
      this.service.cadastra(this.foto).then(
        () => {
          if (this.id)
            //se tem id, é pq tratou-se de um update, então, após a gravação, retorne p/ tela inicial
            this.$router.push({ name: "home" }); //O VueRouter disponibiliza no global view instance o objeto $router que possui o push. serve p/ redirecionar p/ alguma pagina

          this.foto = new Foto(); //caso o if de cima for falso, apenas os campos da tela serão zerados e o usuario permanece na pagina.
        },
        err => console.log(err)
      );
    }
  },

  created() {
    this.service = new FotoService(this.$resource);

    if (this.id) {
      this.service.busca(this.id).then(foto => (this.foto = foto));
    }
  }
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}

.erro {
  color: red;
}
</style>
