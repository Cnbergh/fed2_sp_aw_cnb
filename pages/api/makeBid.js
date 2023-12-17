const makeBid = async (listingId, amount) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${JSON.stringify(
          errorBody
        )}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in makeBid:", error);
    throw new Error(error);
  }
};

export default makeBid;
