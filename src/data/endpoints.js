const ep = {
    base: `http://localhost:9292`,
    login: function() { return `${this.base}/users/login`},
    postsAll: function() { return `${this.base}/posts`},
    postsSingle: function(id) { return `${this.base}/posts/${id}`},
    user: function(id) { return `${this.base}/users/${id}`},
    userPosts: function(id) { return `${this.base}/users/${id}/posts`},
};

export { ep }