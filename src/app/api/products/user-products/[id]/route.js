import { connectDB, isLoggedIn } from "@/lib/config/db";
import { ProductModel } from "@/lib/models/Product";
import { NextResponse } from "next/server";

// get all products for login user's products
export const GET = async (req) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }
    await connectDB();
    const creater = req.url.split("user-products/")[1];

    const products = await ProductModel.find({ creater })
      .populate("category")
      .populate("creater");
    if (!products) {
      return NextResponse.json({ error: "not found products" });
    }

    return NextResponse.json(
      { msg: "user get products success", products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "unable to get user products" },
      { status: 500 }
    );
  }
};

//product update for login user
export const PUT = async (req) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    //get product id from url request
    const productId = req.url.split("user-products/")[1];

    await connectDB();

    const product = await ProductModel.findById(productId).populate("creater");

    if (!product) {
      return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
    }

    if (String(product.creater._id) !== String(userId)) {
      return NextResponse.json(
        { error: "You dont permission to update this product" },
        { status: 403 }
      );
    }

    const { name, desc, price, quantity, sold, shipping, image, category } =
      await req.json();

    const updateProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        $set: {
          name,
          desc,
          price,
          quantity,
          sold,
          shipping,
          image,
          category,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateProduct) {
      return NextResponse.json(
        { error: "product update failed" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { msg: "Your Prouduct updated successfully", updateProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
};

//product delete login user
export const DELETE = async (req) => {
  try {
    //check login user
    const loggedInResponse = await isLoggedIn(req);
    if (loggedInResponse) {
      return loggedInResponse;
    }

    const productId = req.url.split("user-products/")[1];

    const product = await ProductModel.findById(productId).populate("creater");

    if (!product) {
      return NextResponse.json({ error: "Product Not Found" }, { status: 404 });
    }

    if (String(product.creater._id) !== String(userId)) {
      return NextResponse.json(
        { error: "not found user product" },
        { status: 404 }
      );
    }

    await ProductModel.findByIdAndDelete(productId);
    return NextResponse.json(
      { msg: "Your Product Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internel server error" },
      { status: 500 }
    );
  }
};
