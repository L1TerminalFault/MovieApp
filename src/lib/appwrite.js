import { Client, Databases, ID, Query } from 'node-appwrite'

const PROJECT_ID = process.env.NEXT_APPWRITE_PROJECT_ID
const DATABASE_ID = process.env.NEXT_APPWRITE_DATABASE_ID
const COLLECTION_ID = process.env.NEXT_APPWRITE_COLLECTION_ID

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

const database = new Databases(client)

// const f =async () =>{
//   try {
// const d = await database.listDocuments(DATABASE_ID, COLLECTION_ID)
// console.log('success' ,d)
//   } catch (err) {
//     console.log(err)
//   }

// }
// f()
export const updateSearchCount = async (searchTerm, movie) => {
  
  const PROJECT_ID = process.env.NEXT_APPWRITE_PROJECT_ID
  const DATABASE_ID = process.env.NEXT_APPWRITE_DATABASE_ID
  const COLLECTION_ID = process.env.NEXT_APPWRITE_COLLECTION_ID
  // NOTE: use the appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [ Query.equal('searchTerm', searchTerm) ])

    // NOTE: if it does, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0]

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1
      })
    } else { 
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: movie.title,
        count: 1, 
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ])

    return result.documents
  } catch (error) { 
    console.error(error)
  }
}
