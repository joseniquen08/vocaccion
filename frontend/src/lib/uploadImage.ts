export const uploadImage = async (image: any) => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/upload/image`, {
      method: 'post',
      body: formData,
    });
    const { url } = await response.json();
    return url;
  } catch (error) {
    console.log(error);
  }
}
