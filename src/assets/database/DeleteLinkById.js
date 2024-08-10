import Appwrite from '@/assets/appwrite'

export default async (id) => {
    await Appwrite.databases.deleteDocument(Appwrite.DB_NAME, 'links', id)
}
