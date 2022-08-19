<template>
  <div class="lesson-wrapper">
    <main :key="frontmatter.blitz">
      <stack-blitz
        :id="frontmatter.blitz"
        :file="frontmatter.file"
        :view="frontmatter.view"
      />
    </main>
    <div class="content-wrapper">
      <nav>
        <i class="material-icons nav-btn">chevron_left</i>
        <span>{{ frontmatter.title }}</span>
        <i class="material-icons nav-btn">chevron_right</i>
        <i class="material-icons nav-menu">menu_open</i>
      </nav>
      <article>
        <div>
          <Vimeo v-if="frontmatter.video" class="vimeo" :id="frontmatter.video"/>
        </div>
        <section class="prose">
          <component :is="content" />
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import sidebar from '../../../router/sidebar'

export default {
  data () {
    return {
      sidebar,
      content: null,
      frontmatter: {}
    }
  },
  computed: {
    slug () {
      return this.$route.params.slug
    }
  },
  watch: {
    slug: {
      immediate: true,

      async handler () {
        const content = defineAsyncComponent(() => import(`../../../articles/bootcamp/${this.slug}.md`))
        const { frontmatter } = await import(`../../../articles/bootcamp/${this.slug}.md`)
        this.content = content
        this.frontmatter = frontmatter
      }
    }
  }
}

</script>

<style>

.lesson-wrapper {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: 1fr;
  height: 100%;
  padding: 0px;
  margin: 0px;
  background: #15181e;
}

main {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.content-wrapper {
  width: 40vw;
  min-width: 250px;
  max-width: 50vw;
}

nav {
  height: 38px;
  width: 100%;
  z-index: 20;
  display: flex;
  align-items: center;
  background: #202327;
}

.nav-menu {
  margin-left: auto;
}

.nav-btn {
  cursor: pointer;
}

article {
  overflow: auto;
  display: block;
  background: #15181e;
  height: calc(100vh - 38px);
}

.prose {
  padding: 0em 3em;
  padding-bottom: 3em;
  font-size: 16px;
  border-left: 0.5px solid #2e3138;
  overflow: hidden;
}

h1 {
  font-size: 2.2rem !important;
  border-bottom: 1px solid #575859;
}

p, ul, ol {
  line-height: 1.5;
}

</style>
