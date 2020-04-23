const blogs = require("./testData.js")
const listHelper = require("../utils/list_helper")

describe('total likes', () => {

    test('empty list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('one blog', () => {
        let list = [blogs[0]]
        const result = listHelper.totalLikes(list)
        expect(result).toBe(7)
    })

    test('all blogs', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

})

describe("favorite blog", () => {

    test('one blog', () => {
        const result = listHelper.favoriteBlog([blogs[0]])
        expect(result).toEqual(blogs[0])
    })

    test('all blogs', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })

})