<template>
    <ion-card color="light">
        <ion-card-header>
            <ion-card-title>
                <table>
                    <tr>
                        <td><img src="/public/hand-thumbnail.png" class="h-12 default" alt="hand"></td>
                        <td>
                            <img src="/public/Hello.png" class="h-10 default" alt="">
                        </td>
                    </tr>
                </table>
            </ion-card-title>
            <ion-card-subtitle>
                <h1><b>Kak,  {{ user.fullname }} </b></h1>
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <h3>Welcome To
                Sidia (SGS Distribution Application)</h3>
        </ion-card-content>
    </ion-card>
</template>



<script setup>
import { onMounted,ref } from 'vue';

const user = ref(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : "") ;

onMounted(() => {
});
</script>