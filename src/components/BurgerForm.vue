<template>
    <div>
        <Message :msg=" msg " v-show="msg"/>
        <div>
            <form id="burger-form" @submit="creatBurger">
                <div class="input-container">
                    <label for="nome">Nome do cliente</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite seu nome">
                </div>
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao">
                        <option value="">Selecione o seu pao</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                            {{ pao.tipo }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha sua carne:</label>
                    <select name="carne" id="carne" v-model="carne">
                        <option value="">Selecione sua carne</option>
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                            {{ carne.tipo }}
                        </option>
                    </select>
                </div>
                <div id="opcionais-container" class="input-container">
                    <label id="opcionais-title" for="opcionais">Selecione os opcionais</label>
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id" >
                        <input type="checkbox" name="opcionais" id="opcionais" v-model="opcionais" :value="opcional.tipo">
                        <span>{{ opcional.tipo }}</span>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" value="Criar meu Burger" class="submit-btn">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Message from "./Message.vue";


export default {
    name: "BurgerForm",
    data() {
        return {
            // dados que vem do servidor
            paes: null,
            carnes: null,
            opcionaisdata: null,
            //dados dos pedidos
            nome: null,
            pao: null,
            carne: null,
            opcionais: [],
            status: "solicitado",
            msg: null
        };
    },
    methods: {
        async getIngredientes() {
            const req = await fetch("https://lukasstranges.github.io/db__ingredientes");
            const data = await req.json();
            this.paes = data.ingredientes.paes;
            this.carnes = data.ingredientes.carnes;
            this.opcionaisdata = data.ingredientes.opcionais;
        },
        async creatBurger(e) {
            e.preventDefault();
            const data = {
                nome: this.nome,
                pao: this.pao,
                carne: this.carne,
                opcionais: Array.from(this.opcionais),
                status: "Solicitado",
            };
            const dataJson = JSON.stringify(data);
            const req = await fetch("https://lukasstranges.github.io/db__ingredientes/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            const res = await req.json();
            //Colocar msg de sistema
            this.msg = `Pedido N° ${res.id} realizado com sucesso`;

            //limpar msg
            setTimeout(() => this.msg = "",2000);
            //limpar os campos
            this.nome = "";
            this.pao = "";
            this.carne = "";
            this.opcionais = "";
        }
    },
    mounted() {
        this.getIngredientes();
    },
    components: { Message }
}
</script>

<style scoped>
    #burger-form {
        max-width: 400px;
        margin: 0 auto;
    }
    .input-container{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label {
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #FCBA03;
    }

    input, select {
        padding: 5px 10px;
        width: 300px;
    }
    #opcionais-container{
        flex-direction: row;
        flex-wrap: wrap;
    }
    #opcionais-title{
        width: 100%;
    }
    .checkbox-container{
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    .checkbox-container span,
    .checkbox-container input {
        width: auto;
    }
    .checkbox-container span{
        margin-left: 6px;
        font-weight: bold;
    }
    .submit-btn {
        background-color: #222;
        color:#FCBA03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        transition: .5s;
    }
    .submit-btn:hover{
        background-color: transparent;
        color: #222;
    }
</style>
