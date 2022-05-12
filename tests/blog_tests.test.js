
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns allways one', () => {
    const result = listHelper.dummy(testHelper.emptyList)
    expect(result).toBe(1)
})


describe('total likes', () => {
    test('when list has only one blog, it equals the likes of that', () => {
        const result = listHelper.totalLikes(testHelper.oneBlogList)
        expect(result).toBe(5)
    })

    test('blog with multiple posts, should equal the sum of all posts', () => {
        const result = listHelper.totalLikes(testHelper.multipleBlogsList)
        expect(result).toBe(36)
    })

    test('of empty list, equal zero', () => {
        expect(listHelper.totalLikes(testHelper.emptyList)).toBe(0)
    })
})


describe('favorite blog tests', () => {
    const blogs = testHelper.multipleBlogsList

    const result = {
        title: blogs[2].title,
        author: blogs[2].author,
        likes: blogs[2].likes
    }

    test('multple posts, equals the most favorite among them', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual(result)
    })


    test('of single blog, returns it', () => {
        const oneBlogList = testHelper.oneBlogList
        expect(listHelper.favoriteBlog(oneBlogList)).toEqual({
            title: oneBlogList[0].title,
            author: oneBlogList[0].author,
            likes: oneBlogList[0].likes
        })
    })

    test('of empty list, returns null', () => {
        expect(listHelper.favoriteBlog(testHelper.emptyList)).toBeNull()
    })
})

test('returns the author with most blogs', () => {
    const blogs = testHelper.multipleBlogsList
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", max: 3 })
})

test('returns the writer with most likes', () => {
    const blogs = testHelper.multipleBlogsList
    expect(listHelper.mostLikes(blogs)).toEqual({ author: "Edsger W. Dijkstra", max: 17 })
})