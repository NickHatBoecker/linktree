import { ID, Account, Databases, Client, Query } from 'appwrite'

export const DB_NAME = process.env.VUE_APP_APPWRITE_DB_ID

const client = (new Client())
    .setEndpoint(process.env.VUE_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.VUE_APP_APPWRITE_PROJECT_ID)

export const databases = new Databases(client)
const account = new Account(client)

export default {
    DB_NAME,
    client,
    databases,
    account,
    Query,
    ID,

    getProfileId: () => process.env.VUE_APP_APPWRITE_PROFILE,

    isLoggedIn: async () => {
        try {
            const user = await account.get()
            return user && user.$id
        } catch (e) {
            return false
        }
    },
}
