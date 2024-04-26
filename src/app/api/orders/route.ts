import { type NextRequest } from "next/server";

const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const limit = Number(searchParams.get("limit"));

    let url = `http://127.0.0.1:8888/orders/all`;

    if (limit > 0) {
      url += `?limit=${limit}`;
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

    const response = await fetch(`http://127.0.0.1:8888/orders/create`, {
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
    const orderId = searchParams.get("id");
    const incomingData = await request.json();

    const response = await fetch(`http://127.0.0.1:8888/orders/${orderId}`, {
      method: "PUT",
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

const DELETE = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get("id");

    const response = await fetch(`http://127.0.0.1:8888/orders/${orderId}`, {
      method: "DELETE",
    });
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

export { GET, POST, PUT, DELETE };
