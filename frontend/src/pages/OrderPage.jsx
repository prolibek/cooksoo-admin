import React, { useState, useEffect } from 'react';
import $api from "../http";

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await $api.get('/management/orders/');
            setOrders([...response.data]);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleChangeStatus = async (orderId, newStatus) => {
        try {
            await $api.patch(`/management/orders/${orderId}/`, { status: newStatus });
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        orderItem: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
        clientName: {
            fontWeight: 'bold',
        },
        statusSelector: {
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ddd',
        },
        header: {
            textAlign: 'center',
            color: '#333',
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id} style={styles.orderItem}>
                        <span style={styles.client}>Client: {order.client.name}</span>
                        <select
                            key={order.id}
                            style={styles.statusSelector}
                            value={order.status}
                            onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                        >
                            <option value={1}>Pending</option>
                            <option value={2}>Accepted</option>
                            <option value={3}>Cooked</option>
                            <option value={4}>Being delivered</option>
                            <option value={5}>Delivered</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
