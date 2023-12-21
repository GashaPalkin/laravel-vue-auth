<script setup>
const props = defineProps({
  item: Object,
})
</script>
<template>
  <div class="modal fade" :id="'modal' + '-' + item.id" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="ModalLabel">Детальная поста в модальном окне </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column gap-2">
          <div class="card mb-1 px-0">
            <div class="row">
              <div class="col-md-3">
                <img src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg" class="img-fluid rounded-start" alt="cat">
              </div>
              <div class="col-md-9">
                <!-- если не использовать first() в контроллере то возвращает массив и надо v-for -->
                <div class="card-body">
                  <h1 class="card-title">{{ item.title }}</h1>
                  <p>{{ item.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-title {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>