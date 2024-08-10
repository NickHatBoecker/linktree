import Appwrite from '@/assets/appwrite'

export const createProfile = async () => {
    const id = Appwrite.ID.unique()
    await Appwrite.databases.createDocument(Appwrite.DB_NAME, 'profiles', id, {
        level: 1,
    })
}

export const updateProfile = async (entityId, formData) => {
    await Appwrite.databases.updateDocument(Appwrite.DB_NAME, 'profiles', entityId, formData)
}

export default createProfile
