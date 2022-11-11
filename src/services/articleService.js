/**
 * Author: Kieran Ahn
 *
 * This module handles interfacing with the underlying
 * Firestore database. All reads and writes to the
 * database must go through this service.
 * Adapted from Dr. Toal's notes.
 */

// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from "../firebaseConfig";
import {
    collection,
    query,
    getDocs,
    addDoc,
    deleteDoc,
    orderBy,
    limit,
    Timestamp,
} from "firebase/firestore";

export async function createArticle({ title, body }) {
    const data = { title, body, date: Timestamp.now() };
    const docRef = await addDoc(collection(db, "articles"), data);
    return { id: docRef.id, ref: docRef, ...data };
}

export async function deleteArticle({ article }) {
    console.log(article);
    return await deleteDoc(article.ref);
}

export async function fetchArticles(pageNum) {
    const snapshot = await getDocs(
        query(
            collection(db, "articles"),
            orderBy("date", "desc"),
            limit((pageNum + 1) * 10)
        )
    );
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ref: doc.ref,
        ...doc.data(),
    }));
}
