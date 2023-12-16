const makeBid = async (listingId, amount) => {
  const Token = JSON.parse(localStorage.getItem("user")).accessToken;
  try {
    const response = await fetch(
      `${BASE_API_URL}listings/${listingId}/bids?_bids=true`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      }
    );
    const data = await response.json();
    return await data;
  } catch (error) {
    return error;
  }
};

export default makeBid;
