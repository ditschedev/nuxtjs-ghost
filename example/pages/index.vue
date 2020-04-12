<template>
  <div>
    Works!
  </div>
</template>

<script>
export default {
  async asyncData ({ $ghost }) {
    const posts = await $ghost.getPosts()
    const authors = await $ghost.getAuthors()
    const tags = await $ghost.getTags()
    const pages = await $ghost.getPages()
    const settings = await $ghost.getSettings()

    return {
      posts,
      authors,
      tags,
      pages,
      settings
    }
  }
}
</script>
