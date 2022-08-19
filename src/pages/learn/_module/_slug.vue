<template>
  <div class="lesson-wrapper">
    <main :key="frontmatter.blitz">
      <stack-blitz
        :id="frontmatter.blitz"
        :file="frontmatter.file"
        :view="frontmatter.view"
      />
    </main>
    <article>
      <nav>
        <i class="material-icons">menu</i>
        <h4 style="margin-right: 1em;"><RouterLink to="/">Home </RouterLink></h4>
        <h4 style="margin-right: 1em;"><RouterLink to="/learn/bootcamp/sequelize">Sequelize</RouterLink></h4>
        <h4 style="margin-right: 1em;"><RouterLink to="/learn/bootcamp/objects">Objects</RouterLink></h4>
        <h4 style="margin-right: 1em;"><RouterLink to="/learn/bootcamp/callbacks">Callbacks</RouterLink></h4>
        <h4 style="margin-right: 1em;">{{ frontmatter.title }}</h4>
      </nav>
      <Vimeo v-if="frontmatter.video" class="vimeo" :id="frontmatter.video"/>
      <section class="prose">
        <component :is="content" />
      </section>
    </article>
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

nav {
  height: 38px;
  width: 100%;
  z-index: 20;
  display: flex;
  align-items: center;
  position: fixed;
  background: #0f2139;
  box-shadow: 0 4px 4px -4px black;
}

.lesson-wrapper {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: 1fr;
  height: 100%;
  padding: 0px;
  margin: 0px;
  background: #0f2139;

}

.vimeo {
  margin-top: 38px;
}

.prose {
  padding: 0em 3em;
  padding-bottom: 3em;
  font-size: 16px;
}

h1 {
  font-size: 2.2rem !important;
  border-bottom: 1px solid #575859;
}

p, ul, ol {
  line-height: 1.5;
}

article {
  overflow: auto;
  width: 40vw;
  min-width: 250px;
  max-width: 50vw;
}

main {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

</style>
