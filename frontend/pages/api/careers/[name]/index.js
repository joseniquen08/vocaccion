import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebase.config";

export default async function getCareers (req, res) {
  try {
    const { name } = req.query;
    const { docs } = await getDocs(query(collection(db, 'totalCarreras'), where('divCarrera', '==', name)));
    const data = docs.map(career => ({ id: career.id, ...career.data() }));
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}
