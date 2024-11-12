import {Request, Response} from 'express';
import {OrderService} from '../services/OrderService';
import {OrderRepository} from '../repositories/OrderRepository';
import {UserRepository} from '../repositories/User_repository';
import {AuthService} from '../services/AuthService';
import {AuthRepository} from '../repositories/AuthRepository';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const orderRepository = new OrderRepository();
const user_repository = new UserRepository();
const orderService = new OrderService(orderRepository, user_repository);

export const getAllorders = async (req: Request, res: Response) => {
    try {
        const user = await authService.validateToken(req.body.token);
        if (user.role == 'admin' || user.role == 'employee' || user.role == 'client') {
            const orders = await orderService.getAllOrders();
            res.status(200).json(orders);

        } else {
            res.status(500).json({message: 'usuario no autorizado'});
            throw new Error('Unauthorized');
        }

    } catch (error) {
        res.status(500).json({message: 'Error retrieving orders', error});
    }
};

export const createorder = async (req: Request, res: Response) => {
    try {
        const orderdata = req.body;
        if (!orderdata) {
            console.log('aqui es la cagada');
            res.status(400).json({message: 'Invalid order data'});
            throw new Error('Invalid order data');
        }

        console.log('entra al createorder pero estalla en el createOrder del servicio');
        const newOrder = await orderService.createOrder(orderdata.client, orderdata.product, orderdata.size, orderdata.reference, orderdata.quantity, orderdata.dueDate, orderdata.status, orderdata.progress);
        res.status(201).json('order created' + newOrder._id);
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error});
    }

};

export const getorderById = async (req: Request, res: Response) => {
    try {
        const orderId = req.body.id;
        const order = await orderService.getOrderById(orderId);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: 'Error retrieving order', error});
    }
};

export const updateorder = async (req: Request, res: Response) => {
    try {
        const orderdata = req.body;
        if (!orderdata) {
            res.status(400).json({message: 'Invalid order data'});
            throw new Error('Invalid order data');
        }

        const updatedOrder = await orderService.updateOrder(orderdata);
        res.status(200).json('order updated');
    } catch (error) {
        res.status(500).json({message: 'Error updating order', error});
    }
};

export const deleteorder = async (req: Request, res: Response) => {
    try {
        const orderId = req.body.id;
        await orderService.deleteOrder(orderId);
        res.status(200).json('order deleted');
    } catch (error) {
        res.status(500).json({message: 'Error deleting order', error});
    }
};