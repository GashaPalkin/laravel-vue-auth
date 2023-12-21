<script setup>
import Modal from '@/components/Modal.vue'
const props = defineProps({
	item: Object,
})
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const token = computed(() => store.state.token)
</script>

<template>
	<div class="col d-flex align-items-stretch">
		<div class="card ">
			<img :src="item.image" class="card-img-top" alt="cat">
			<div class="card-body">
				<h5 class="card-title"> {{ item.title }} </h5>
				<p class="card-text"> {{ item.body }} </p>
			</div>
			<!-- TODO: ПРОВЕРКА НА AUTH И ПОКАЗЫВАТЬ ТОЛЬКО ОДНУ КНОПКУ -->
			<div class="btn-group mx-3 mb-2 justify-content-center" role="group" aria-label="Basic outlined">
				<!-- для детальной на отдельной странице -->
				<!-- <router-link class="nav-link" :to="'posts/'+ item.id">
					<button type="button" class="btn btn-outline-primary">Подробнее</button>
				</router-link> -->
				
				<!-- для детальной на в модальном окне -->
				<button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
					:data-bs-target="'#modal' + '-' + item.id">Подробнее</button>
				<router-link class="nav-link" :to="'update-post/' + item.id">
					<button type="button" class="btn btn btn-primary">Изменить</button>
				</router-link>
			</div>
			<teleport to="body">
				<Modal :item="item" :key="item.id" />
			</teleport>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.btn {
	border-radius: 0;
}
img {
	max-height: 320px;
	object-fit: cover;
}
</style>
