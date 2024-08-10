import Appwrite from '@/assets/appwrite'

export default async (id = null) => {
    if (id === null) {
        id = Appwrite.getProfileId()
    }

    const { documents } = await Appwrite.databases.listDocuments(Appwrite.DB_NAME, 'profiles', [
        Appwrite.Query.equal('profile', id),
    ])

    if (!documents.length) return null

    return documents[0]
}
