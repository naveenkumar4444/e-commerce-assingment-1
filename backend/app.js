const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.post('/checkout', (req, res) => {
    const { name, email, cart } = req.body;

    try {
        db.beginTransaction((err) => {
            if (err) throw err;

            const userQuery = 'INSERT INTO Users (name, email) VALUES (?, ?)';
            db.query(userQuery, [name, email], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        throw err;
                    });
                }

                const userId = result.insertId;
                const orderQuery = 'INSERT INTO `Orders` (amount, user_id) VALUES (?, ?)';
                const orderAmount = cart.reduce((sum, item) => sum + item.price, 0);

                db.query(orderQuery, [orderAmount, userId], (err, result) => {
                    if (err) {
                        return db.rollback(() => {
                            throw err;
                        });
                    }

                    const orderId = result.insertId;
                    const categoryQueries = {
                        Chairs: 'INSERT INTO Order_Chairs (order_id, chair_id) VALUES (?, ?)',
                        Table: 'INSERT INTO Order_Tables (order_id, table_id) VALUES (?, ?)',
                        Top: 'INSERT INTO Order_Tops (order_id, top_id) VALUES (?, ?)',
                    };

                    cart.forEach((item) => {
                        const categoryQuery = categoryQueries[item.category];
                        db.query(categoryQuery, [orderId, item.id], (err) => {
                            if (err) {
                                return db.rollback(() => {
                                    throw err;
                                });
                            }
                        });
                    });

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                throw err;
                            });
                        }
                        res.status(200).json({ message: 'Order placed successfully' });
                    });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
