import { IOrderRepository } from "../interfaces/IOrderRepository";
import { IOrder, Order } from "../models/Order"; // Adjust the import path as necessary
import { IUserRepository } from "../interfaces/IUserRepository";
import { log } from "console";

export class OrderService {
    private orderRepository: IOrderRepository;
    private userRepository: IUserRepository;
  
    constructor(orderRepository: IOrderRepository,userRepository: IUserRepository) {
      this.orderRepository = orderRepository
      this.userRepository = userRepository
    };
      

    
    async getAllOrders(): Promise<IOrder[]> {
      
      try {
        return await this.orderRepository.getAll();
      } catch (error) { 
        throw new Error("Error al obtener los pedidos");
      }
    }

    async createOrder(client: string,product: string,quantity: number,dueDate: string,status: string,progress: { [key: string]: { completed: number } } ): Promise<IOrder> {
      if (!product || !quantity || !dueDate || !status ) {
        
        throw new Error("Invalid order data");
        
      }
      
      const order = await new Order({ client, product, quantity, dueDate, status, progress});
      
      return await this.orderRepository.add(order);
    }

    async getOrderById(orderId: string): Promise<IOrder> {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    }

    async updateOrder( updateData: IOrder ) {
      if ( !updateData) {
        throw new Error("Invalid input data");
      }
      const order = await this.orderRepository.findById(updateData._id);
      if (!order) {
        throw new Error("Order not found");
      }
      return await this.orderRepository.update(updateData);
    }

    async deleteOrder(orderId: string): Promise<void> {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      const order = await this.orderRepository.findById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      await this.orderRepository.delete(orderId);
    }
    }



  