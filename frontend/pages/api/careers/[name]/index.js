import { gql } from "@apollo/client";
import { query } from "firebase/firestore";
import client from "../../../../apollo-client";

const query = gql`
  query GetCareersByType($input: GetCareersByTypeInput) {
    getCareersByType(input: $input) {
      id
      name
      type
      description
      faculty
      idUniversity
      nameUniversity
      imageUniversity
      duration
      lastUpdate
    }
  }
`;

export default async function getCareers (req, res) {
  try {
    const { name } = req.query;
    const { data } = await client.query({ query });
    return res.status(200).json({ data: data.getCareersByType });
  } catch (error) {
    console.log(error);
  }
}
