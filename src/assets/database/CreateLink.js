import Appwrite from '@/assets/appwrite'

export const createLink = async (formData) => {
    const id = Appwrite.ID.unique()
    const document = await Appwrite.databases.createDocument(Appwrite.DB_NAME, 'links', id, {
        ...formData,
    })

    return document.$id
}

export const updateLink = async (entityId, formData) => {
    await Appwrite.databases.updateDocument(Appwrite.DB_NAME, 'links', entityId, formData)
}

export default createLink
