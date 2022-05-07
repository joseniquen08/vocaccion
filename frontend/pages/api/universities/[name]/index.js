import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase.config";

export default async function getUniversities (req, res) {
  try {
    const { name } = req.query;
    const { docs } = await getDocs(query(collection(db, 'totalUniversidades'), where('tipo', '==', name)));
    const data = docs.map(university => ({ id: university.id, ...university.data() }));
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}
