export default async function getRegions (req, res) {
  try {
    const response = await fetch('https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/master/json/ubigeo_peru_2016_departamentos.json');
    const data = await response.json();
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}