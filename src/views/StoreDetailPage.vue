<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div v-if="store">
                <p>{{ store.store_name }}</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            store: null,
        }
    },
    methods: {
        async storeDetailData(id) {
            await this.$axios.get(`${this.$root.API_URL}/api/v1/stores/${id}`)
            .then((response) => {
                this.store = response.data.resource;

                console.log('Successfully fetch store data', this.store);
                return this.store;
            })
            .catch((error) => {
                console.log('Failed to fetch store data', error.message);
                throw new Error('Failed to fetch store data', error.message);
            });
        }
    },
    mounted() {
        this.storeDetailData(this.id);
    },
}
</script>