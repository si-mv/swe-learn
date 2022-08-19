<template>
    <div
      ref="blitz"
      id="embed"
    />
</template>

<script>
import sdk from '@stackblitz/sdk'

export default {
  props: {
    id: { type: String, default: '' },
    file: { type: String, default: '' },
    view: { type: String, default: '' }
  },

  data () {
    return {
      vm: null,
      url: null,
      files: null
    }
  },

  async mounted () {
    this.files = JSON.parse(localStorage.getItem(this.$route.params.slug + '-files'))

    if (this.files) {
      console.log('Loading from local storage')
      await this.embedFromLocalStorage()
    } else {
      console.log('Loadng from template')
      await this.embedFromTemplate()
    }

    this.handleLoad()
  },

  methods: {

    async embedFromLocalStorage () {
      this.vm = await sdk.embedProject(
        'embed',
        {
          title: this.id,
          description: 'A basic Node.js project',
          template: 'node',
          files: this.files,
          terminalHeight: 0
        },
        {
          openFile: this.file
        }
      )
    },

    async embedFromTemplate () {
      this.vm = await sdk.embedProjectId('embed', this.id, {
        openFile: this.file,
      })
    },

    async getUrl () {
      try {
        const url = new URL(await this.vm.preview.getUrl())
        localStorage.setItem(this.$route.params.slug + '-blitzId', url.host.split('.')[0].split('--')[0])
        this.url = url
      } catch (error) {
        console.error('Error getting url: ', error)
      }
    },

    async getSnapshot () {
      try {
        const files = await this.vm.getFsSnapshot()
        localStorage.setItem(this.$route.params.slug + '-files', JSON.stringify(files))
        this.files = files
      } catch (error) {
        console.error('Error getting snapshot: ', error)
      }
    },

    async handleLoad (t) {
      if (!this.url) this.getUrl()
      this.getSnapshot()
      setTimeout(() => this.handleLoad(), 5 * 1000)
    }
  }
}


</script>

<style>

#embed {
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}

iframe {
  border: none;
  display: block;
  margin: 0px;
  padding: 0px;
}

</style>