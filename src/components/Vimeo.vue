<template>
  <div class="vimeo-wrapper">
    <iframe
      :src="`https://www.youtube.com/embed/${props.id}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
const props = defineProps(['id'])
</script>

<style>

.vimeo-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}

.vimeo-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>


<!-- src="https://player.vimeo.com/video/410382524" -->