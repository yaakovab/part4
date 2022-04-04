
const listHelper = require('../utils/list_helper')

test('dummy returns allways one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('total likes', () => {
    const oneBlogList = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Another Blog',
            author: 'Chaim kanievski',
            url: 'http://www.ChaimKanievsky.co.il',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, it equals the likes of that', () => {
        const result = listHelper.totalLikes(oneBlogList)
        expect(result).toBe(5)
    })

    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]

    test('blog with multiple posts, should equal the sum of all posts', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    const emptyList = []

    test('of empty list, equal zero', () => {
        expect(listHelper.totalLikes(emptyList)).toBe(0)
    })
})


describe('favorite blog tests', () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]

    const result = {
        title: blogs[2].title,
        author: blogs[2].author,
        likes: blogs[2].likes
    }

    test('multple posts, equals the most favorite among them', () => {
        expect(listHelper.favoriteBlog(blogs)).toEqual(result)
    })

    const oneBlogList = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Another Blog',
            author: 'Chaim kanievski',
            url: 'http://www.ChaimKanievsky.co.il',
            likes: 5,
            __v: 0
        }
    ]

    test('of single blog, returns it', () => {
        expect(listHelper.favoriteBlog(oneBlogList)).toEqual({
            title: oneBlogList[0].title,
            author: oneBlogList[0].author,
            likes: oneBlogList[0].likes
        })
    })

    const emptyList = []

    test('of empty list, returns null', () => {
        expect(listHelper.favoriteBlog(emptyList)).toBeNull()
    })
})