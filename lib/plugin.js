import GhostContentAPI from '@tryghost/content-api';

class Ghost {
    constructor(url, key, version) {
        this.url = url;
        this.key = key;
        this.version = version;
        this._init();
    }

    _init() {
        this._client = new GhostContentAPI({
            url: '<%= options.url %>',
            key: '<%= options.key %>',
            version: '<%= options.version %>'
        });
    }

    async getPosts(filter = {}) {
        const [posts] = await Promise.all([
            this._client.posts.browse(filter)
        ]);
        return posts;
    }

    async getPost(filter, options = {}) {
        if(!filter) throw new Error('[Ghost] You need to provide a filter to read a post.');
        const [post] = await Promise.all([
            this._client.posts.read(filter, options)
        ]);
        return post;
    }

    async getAuthors(filter) {
        const [authors] = await Promise.all([
            this._client.authors.browse(filter)
        ]);
        return authors;
    }

    async getAuthor(filter, options = {}) {
        if(!filter) throw new Error('[Ghost] You need to provide a filter to read an author.');
        const [author] = await Promise.all([
            this._client.authors.read(filter, options)
        ]);
        return author;
    }

    async getTags(filter) {
        const [tags] = await Promise.all([
            this._client.tags.browse(filter)
        ]);
        return tags;
    }

    async getTag(filter, options = {}) {
        if(!filter) throw new Error('[Ghost] You need to provide a filter to read a tag.');
        const [tag] = await Promise.all([
            this._client.tags.read(filter, options)
        ]);
        return tag;
    }

    async getPages(filter) {
        const [pages] = await Promise.all([
            this._client.pages.browse(filter)
        ]);
        return pages;
    }

    async getPage(filter, options = {}) {
        if(!filter) throw new Error('[Ghost] You need to provide a filter to read a page.');
        const [page] = await Promise.all([
            this._client.pages.read(filter, options)
        ]);
        return page;
    }

    async getSettings() {
        const [settings] = await Promise.all([
            this._client.settings.browse()
        ]);
        return settings;
    }

}

export default async function GhostModule (ctx, inject) {
    const client = new Ghost();
    ctx.$ghost = client;
    inject('ghost', client);
}
