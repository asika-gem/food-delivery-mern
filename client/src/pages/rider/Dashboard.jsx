       import { useEffect, useState } from "react";
       import { api } from "../../services/api";

       import {
         User,
         Phone,
         MapPin,
         Store,
         CheckCircle,
         XCircle,
         Truck,
         Clock,
         PackageCheck,
       } from "lucide-react";

       const menu = [
         { name: "Dashboard", path: "/rider/dashboard" },
         { name: "Deliveries", path: "/rider/orders" },
         { name: "Profile", path: "/rider/profile" },
       ];

       const RiderDashboard = () => {
         const [stats, setStats] = useState({
           totalDeliveries: 0,
           activeDeliveries: 0,
           deliveredOrders: 0,
           available: false,
         });

         const [orders, setOrders] = useState([]);
         const [loading, setLoading] = useState(true);

         useEffect(() => {
           fetchDashboard();
           fetchOrders();
         }, []);

         const fetchDashboard = async () => {
           try {
             const res = await api.get("/rider/dashboard");
             setStats(res.data.stats);
           } catch (err) {
             console.log(err);
           }
         };

         const fetchOrders = async () => {
           try {
             const res = await api.get("/rider/orders");
             setOrders(res.data.orders || []);
           } catch (err) {
             console.log(err);
           } finally {
             setLoading(false);
           }
         };

         const toggleAvailability = async () => {
           try {
             await api.put("/rider/availability");
             fetchDashboard();
           } catch (err) {
             console.log(err);
           }
         };

         const acceptOrder = async (id) => {
           try {
             await api.put(`/orders/${id}/accept`);
             fetchDashboard();
             fetchOrders();
           } catch (err) {
             console.log(err);
           }
         };

         const rejectOrder = async (id) => {
           try {
             await api.put(`/orders/${id}/reject`);
             fetchOrders();
           } catch (err) {
             console.log(err);
           }
         };

         const markDelivered = async (id) => {
           try {
             await api.put(`/orders/${id}/delivered`);
             fetchDashboard();
             fetchOrders();
           } catch (err) {
             console.log(err);
           }
         };

         if (loading) {
           return (
             
               <div className="h-96 flex items-center justify-center text-slate-500">
                 Loading...
               </div>
            
           );
         }

         const requests = orders.filter(
           (order) => order.status === "waiting for pickup",
         );

         const activeOrder = orders.find(
           (order) => order.status === "accepted" || order.status === "picked",
         );

         return (
           
             <div className="bg-slate-50 min-h-screen p-2">
               {/* Header */}
               <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                 <div className="flex justify-between items-center">
                   <div>
                     <p className="text-sm text-slate-500">Good Morning 👋</p>

                     <h1 className="text-3xl font-bold text-slate-900">
                       Rider Dashboard
                     </h1>

                     <p className="text-slate-500 mt-1">
                       Manage your deliveries
                     </p>
                   </div>

                   <button
                     onClick={toggleAvailability}
                     className={`px-6 py-3 rounded-full text-white font-semibold ${
                       stats.available ? "bg-green-500" : "bg-slate-700"
                     }`}
                   >
                     {stats.available ? "Online" : "Offline"}
                   </button>
                 </div>
               </div>
               {/* Stats */}
               <div className="grid md:grid-cols-3 gap-5 mb-6">
                 <div className="bg-white rounded-3xl p-6 shadow-sm">
                   <div className="flex justify-between">
                     <div>
                       <p className="text-slate-500">Total Deliveries</p>

                       <h2 className="text-4xl font-bold mt-3">
                         {stats.totalDeliveries}
                       </h2>
                     </div>

                     <div className="bg-slate-100 p-4 rounded-2xl">
                       <Truck />
                     </div>
                   </div>
                 </div>

                 <div className="bg-white rounded-3xl p-6 shadow-sm">
                   <div className="flex justify-between">
                     <div>
                       <p className="text-slate-500">Active Orders</p>

                       <h2 className="text-4xl font-bold mt-3">
                         {stats.activeDeliveries}
                       </h2>
                     </div>

                     <div className="bg-green-100 p-4 rounded-2xl">
                       <Clock className="text-green-600" />
                     </div>
                   </div>
                 </div>

                 <div className="bg-white rounded-3xl p-6 shadow-sm">
                   <div className="flex justify-between">
                     <div>
                       <p className="text-slate-500">Completed</p>

                       <h2 className="text-4xl font-bold mt-3">
                         {stats.deliveredOrders}
                       </h2>
                     </div>

                     <div className="bg-emerald-100 p-4 rounded-2xl">
                       <PackageCheck className="text-emerald-600" />
                     </div>
                   </div>
                 </div>
               </div>
               {/* Current Delivery */}
               {activeOrder && (
                 <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
                   <div className="flex justify-between mb-6">
                     <h2 className="text-xl font-bold">Current Delivery</h2>

                     <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                       Active
                     </span>
                   </div>

                   <div className="space-y-4">
                     <div className="flex items-center gap-3">
                       <Store className="text-slate-600" />
                       <p>{activeOrder.restaurant?.name}</p>
                     </div>

                     <div className="flex items-center gap-3">
                       <User className="text-slate-600" />
                       <p>{activeOrder.customer?.name}</p>
                     </div>

                     <div className="flex items-center gap-3">
                       <MapPin className="text-slate-600" />
                       <p>{activeOrder.address}</p>
                     </div>

                     <button
                       onClick={() => markDelivered(activeOrder._id)}
                       className="bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"
                     >
                       <Truck size={18} />
                       Mark Delivered
                     </button>
                   </div>
                 </div>
               )}
               {/* Delivery Requests */}
               <div className="bg-white rounded-3xl p-6 shadow-sm">
                 <h2 className="text-xl font-bold mb-6">Delivery Requests</h2>

                 {requests.length === 0 ? (
                   <div className="text-slate-500 text-center py-8">
                     No delivery requests available
                   </div>
                 ) : (
                   <div className="space-y-5">
                     {requests.map((order) => (
                       <div
                         key={order._id}
                         className="bg-slate-50 rounded-2xl p-5"
                       >
                         <div className="flex justify-between items-start">
                           <div>
                             <h3 className="text-lg font-bold text-slate-900">
                               {order.restaurant?.name}
                             </h3>

                             <p className="text-sm text-slate-500">
                               New pickup request
                             </p>
                           </div>

                           <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
                             Waiting
                           </span>
                         </div>

                         <div className="mt-5 space-y-4">
                           <div className="flex items-center gap-3">
                             <div className="bg-white p-2 rounded-xl shadow-sm">
                               <User size={18} />
                             </div>

                             <div>
                               <p className="text-xs text-slate-500">
                                 Customer
                               </p>

                               <p className="font-medium">
                                 {order.customer?.name}
                               </p>
                             </div>
                           </div>

                           <div className="flex items-center gap-3">
                             <div className="bg-white p-2 rounded-xl shadow-sm">
                               <Phone size={18} />
                             </div>

                             <div>
                               <p className="text-xs text-slate-500">Phone</p>

                               <p className="font-medium">{order.phone}</p>
                             </div>
                           </div>

                           <div className="flex items-center gap-3">
                             <div className="bg-white p-2 rounded-xl shadow-sm">
                               <MapPin size={18} />
                             </div>

                             <div>
                               <p className="text-xs text-slate-500">
                                 Delivery Address
                               </p>

                               <p className="font-medium">{order.address}</p>
                             </div>
                           </div>

                           <div className="flex items-center gap-3">
                             <div className="bg-white p-2 rounded-xl shadow-sm">
                               <Store size={18} />
                             </div>

                             <div>
                               <p className="text-xs text-slate-500">Amount</p>

                               <p className="font-bold">
                                 Rs. {order.totalAmount}
                               </p>
                             </div>
                           </div>
                         </div>

                         <div className="flex gap-3 mt-6">
                           <button
                             onClick={() => acceptOrder(order._id)}
                             className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition"
                           >
                             <CheckCircle size={18} />
                             Accept
                           </button>

                           <button
                             onClick={() => rejectOrder(order._id)}
                             className="flex-1 bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition"
                           >
                             <XCircle size={18} />
                             Decline
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             </div>
         );
       };


export default RiderDashboard;