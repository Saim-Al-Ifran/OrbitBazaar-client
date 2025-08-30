import { useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useGetSingleUserOrderQuery } from "../../../../features/orders/ordersApi";
import { OrderItem } from "../../../../types/api-types/orders/orders.type";
import { FadeLoader } from "react-spinners";

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return (
        <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
          Confirmed
        </span>
      );
    case "processing":
      return (
        <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">
          Processing
        </span>
      );
    case "delivered":
      return (
        <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <FaCheckCircle /> Delivered
        </span>
      );
    case "cancelled":
      return (
        <span className="text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <FaTimesCircle /> Cancelled
        </span>
      );
    default:
      return (
        <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
          {status}
        </span>
      );
  }
};

const OrderDetails = () => {
  const { id } = useParams();
  const {
    data: orderDetails,
    isLoading,
  } = useGetSingleUserOrderQuery(id ?? "");
 
  if (isLoading){
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <FadeLoader />
        </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white shadow rounded-lg">
 
      <h1 className="text-2xl font-bold mb-4">
        Order #{orderDetails?.order._id.slice(-6).toUpperCase()  }
      </h1>


      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
          <div className="text-sm space-y-1 text-gray-700">
            <p><strong>Name:</strong> {orderDetails?.order.shippingAddress?.fullName}</p>
            <p>
              <strong>Address:</strong>{" "}
              {orderDetails?.order.shippingAddress?.address},{" "}
              {orderDetails?.order.shippingAddress?.city},{" "}
              {orderDetails?.order.shippingAddress?.postalCode}
            </p>
            <p><strong>Country:</strong> {orderDetails?.order.shippingAddress?.countryCode}</p>
            <p><strong>Email:</strong> {orderDetails?.order.userEmail}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Order Info</h2>
          <div className="text-sm space-y-1 text-gray-700">
           {orderDetails?.order.status && <p><strong>Status:</strong> {getStatusBadge(orderDetails?.order.status)}</p>}
            <p>
              <strong>Ordered On:</strong>{" "}
              {new Date(orderDetails?.order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(orderDetails?.order.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p><strong>Total Items:</strong> {orderDetails?.order.totalQuantity}</p>
            <p><strong>Total Price:</strong> ${ orderDetails?.order.totalPrice .toFixed(2) }</p>

          </div>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {(orderDetails?.order.items || []).map((item: OrderItem) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <img
                      src={item.productID?.images?.[0] || "/placeholder.jpg"}
                      alt={item.productID?.name || "Product"}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{item.productID?.name}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-3">${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
