const ep = {
    base: `http://localhost:9292`,
    login: function() { return `${this.base}/users/login`},
    user: function(id) { return `${this.base}/users/${id}`},
    userPosts: function(id) { return `${this.base}/users/${id}/posts`},

    postsAll: function() { return `${this.base}/posts`},
    postsSingle: function(id) { return `${this.base}/posts/${id}`},
    postsNew: function() { return `${this.base}/new/post`},

    viewablesList: function() { return `${this.base}/viewables`},
    

};

export { ep }