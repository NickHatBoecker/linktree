import Appwrite from '@/assets/appwrite'

export default async (id) => {
    return await Appwrite.databases.getDocument(Appwrite.DB_NAME, 'links', id)
}
