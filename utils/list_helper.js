
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

const mostBlogs = blogs => {
    let numBlogsPerAuthor = {}
    for (let i = 0; i < blogs.length; i++) {
        let index = blogs[i].author
        numBlogsPerAuthor[index] ? numBlogsPerAuthor[index] += 1 : numBlogsPerAuthor[index] = 1;
    }
    let max = 0
    let author
    for (const key in numBlogsPerAuthor) {
        if (numBlogsPerAuthor[key] > max) {
            max = numBlogsPerAuthor[key];
            author = key
        }
    }

    return { author, max }
}


const mostLikes = blogs => {
    let numLikesPerAuthor = {}
    for (let i = 0; i < blogs.length; i++) {
        let index = blogs[i].author
        numLikesPerAuthor[index] ? numLikesPerAuthor[index] += blogs[i].likes : numLikesPerAuthor[index] = blogs[i].likes
    }
    let max = 0, author
    for (const key in numLikesPerAuthor) {
        if (numLikesPerAuthor[key] > max) {
            max = numLikesPerAuthor[key]
            author = key
        }
    }
    return { author, max }
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}