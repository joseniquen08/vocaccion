export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(`${process.env.SERVER_URI}/university/upload/image`, {
      method: 'post',
      body: formData,
    });
    const { url } = await response.json();
    return url;
  } catch (error) {
    console.log(error);
  }
}