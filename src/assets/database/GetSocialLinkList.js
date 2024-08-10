import Appwrite from '@/assets/appwrite.js'

export default async () => {
    const { documents } = await Appwrite.databases.listDocuments(Appwrite.DB_NAME, 'links', [
        Appwrite.Query.equal('theme', 'icon-only'),
        Appwrite.Query.equal('profile', Appwrite.getProfileId()),
        Appwrite.Query.orderAsc('position'),
    ])

    if (!documents.length) return []

    return documents
}
