import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {createUser, getUser} from '../helperFunctions'

const axiosMock = new MockAdapter(axios)

afterEach(() => {
    axiosMock.reset()
})

describe("User endpoints", () => {
    it("Test user get", async () => {
        const dummyUser = {
            _id: "000000000000000000000001",
            firebaseUUID: "ID_1",
            displayName: "user1",
            firstName: "first",
            lastName: "user",
            posts: ["000000000000000000000001"],
            favourites: ["000000000000000000000001"],
            followingUsers: ["000000000000000000000001"],
          };

          axiosMock.onGet('http://localhost:3001/api/users/000000000000000000000001').reply(200, dummyUser)

          const user = await getUser("000000000000000000000001")

          expect(axiosMock.history.get[0].url).toEqual('http://localhost:3001/api/users/000000000000000000000001')
          expect(user).toEqual(dummyUser)
    })

    it("Test user post", async () => {
        const dummyUser = {
            _id: "000000000000000000000001",
            firebaseUUID: "ID_1",
            displayName: "user1",
            firstName: "first",
            lastName: "user",
            posts: ["000000000000000000000001"],
            favourites: ["000000000000000000000001"],
            followingUsers: ["000000000000000000000001"],
          };

          axiosMock.onPost("http://localhost:3001/api/users", dummyUser).reply(201, dummyUser, '/api/user/000000000000000000000001')

          const newUser = await createUser(dummyUser)

          expect(axiosMock.history.get[0].url).toEqual("http://localhost:3001/api/users")
          expect(newUser).toEqual(dummyUser)
    })
})