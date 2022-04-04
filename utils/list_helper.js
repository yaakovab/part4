
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = (sum, post) => {
        console.log(sum, post.likes)
        return sum + post.likes
    }
    return blogs.reduce(total, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    let max = -1
    let i = 0
    if (blogs.length > 1) {
        blogs.forEach((blog, index) => {
            if (blog.likes > max) {
                max = blog.likes
                i = index
            }
        })
    }

    return { title: blogs[i].title, author: blogs[i].author, likes: blogs[i].likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}