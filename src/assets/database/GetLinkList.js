import Appwrite from '@/assets/appwrite.js'

export default async (profileId) => {
    if (!profileId) {
        profileId = Appwrite.getProfileId()
    }

    const { documents } = await Appwrite.databases.listDocuments(Appwrite.DB_NAME, 'links', [
        Appwrite.Query.equal('profile', profileId),
        Appwrite.Query.orderAsc('position'),
    ])

    if (!documents.length) return []

    // Bug in Appwrite, where `Query.notEqual('theme', 'icon-only')` is not working :(
    return documents.filter(x => x.theme !== 'icon-only')
}
