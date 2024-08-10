import Appwrite from '@/assets/appwrite.js'

export default async () => {
    const { documents } = await Appwrite.databases.listDocuments(Appwrite.DB_NAME, 'profiles', [
        Appwrite.Query.orderAsc('profile'),
    ])

    if (!documents.length) return []

    return documents
}
