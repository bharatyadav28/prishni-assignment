import { type NextRequest } from "next/server";

const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const min_price = Number(searchParams.get("min_price")) || 0;
    const max_price = Number(searchParams.get("max_price"));
    const limit = Number(searchParams.get("limit"));

    let url = `http://127.0.0.1:8888/products/all?min_price=${min_price}`;
    if (max_price && max_price >= 0) {
      url += `&max_price=${max_price}`;
    }
    if (limit > 0) {
      url += `&limit=${limit}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.detail);
    }
    const data = await response.json();

    return Response.json({ data }, { status: 200 });
  } catch (error: unknown) {
    let msg = "An error occcured";
    if (error instanceof Error) {
      msg = error.message;
    }
    return Response.json({ msg }, { status: 500 });
  }
};

const POST = async (request: NextRequest) => {
  try {
    const incomingData = await request.json();

    const response = await fetch(`http://127.0.0.1:8888/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incomingData),
    });
    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.detail);
    }
    const data = await response.json();

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    let msg = "An error occcured";
    if (error instanceof Error) {
      msg = error.message;
    }
    return Response.json({ msg }, { status: 500 });
  }
};

const PUT = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("id");
    const incomingData = await request.json();

    const response = await fetch(
      `http://127.0.0.1:8888/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomingData),
      }
    );
    if (!response.ok) {
      const error = await response.json();

      throw new Error(error.detail);
    }
    const data = await response.json();

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    let msg = "An error occcured";
    if (error instanceof Error) {
      msg = error.message;
    }
    return Response.json({ msg }, { status: 500 });
  }
};

const DELETE = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("id");

    const response = await fetch(
      `http://127.0.0.1:8888/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const error = await response.json();
      console.log("errro", error, error.detail);
      throw new Error(error.detail);
    }
    const data = await response.json();

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    let msg = "An error occcured";
    if (error instanceof Error) {
      msg = error.message;
    }
    return Response.json({ msg }, { status: 500 });
  }
};

export { GET, DELETE, PUT, POST };
