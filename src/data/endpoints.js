const ep = {
    base: `http://localhost:9292`,
    postsAll: function() { return `${this.base}/posts`},
    user: function(id) { return `${this.base}/users/${id}`},
};

export { ep }