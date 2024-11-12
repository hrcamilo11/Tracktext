'use client';

import React, {useEffect, useState} from 'react';
import {Button} from './ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {Badge} from './ui/badge';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs';


import {
    Bell,
    Clock,
    Eye,
    EyeOff,
    LogOut,
    Package,
    Plus,
    RefreshCw,
    Scissors,
    Search,
    ShoppingBag,
    Users,
    X
} from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select';
import {Checkbox} from './ui/checkbox';
import {Progress} from './ui/progress';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addDays, format} from 'date-fns';


type User = {
    _id: string
    username: string
    password: string
    email: string
    phone: string
    role: 'admin' | 'employee' | 'client'
}

type Notification = {
    _id: number
    type: 'password_change' | 'order_delayed' | 'unassigned_order'
    message: string
    createdAt: Date
    read: boolean
}

type AuthProps = {
    onLogin: (user: User) => void
    onRegister: (username: string, password: string, email: string, phone: string) => void
    onPasswordRecovery: (username: string) => void
    users: User[]
}

interface Order {
    _id: string;
    client: string;
    product: string;
    size: string;
    reference: string;
    quantity: number;
    dueDate: string;
    status: string;
    progress: {
        [key: string]: {
            completed: number;
        };
    };
}

interface NewOrder {
    product: string;
    size: string;
    reference: number;
    quantity: string;
    dueDate: string;
    subtasks: {
        [key: string]: boolean;
    };
}

interface Subtask {
    name: string;
    duration: number;
}

interface DeliveredOrder extends Order {
    deliveredDate: string;
}

interface NewClient {
    username: string;
    password: string;
    email: string;
    phone: string;
}

interface NewEmployee {
    username: string;
    password: string;
    email: string;
    phone: string;
}

const subtasks: Subtask[] = [
    {name: 'Cortar telas y forros', duration: 1},
    {name: 'Aplicar entretela a cuellos', duration: 1},
    {name: 'Aplicar entretela a puños', duration: 1},
    {name: 'Preparar bolsillos', duration: 2},
    {name: 'Preparar tapas', duration: 1},
    {name: 'Preparar almillas', duration: 1},
    {name: 'Preparar espaldas', duration: 2},
    {name: 'Unión de hombros en máquina plana', duration: 1},
    {name: 'Unión de costados en fileteadora', duration: 1},
    {name: 'Colocación de mangas en máquina plana', duration: 2},
    {name: 'Colocación de cuellos en máquina plana', duration: 2},
    {name: 'Colocación de bolsillos en máquina plana', duration: 1},
    {name: 'Colocación de tapas en máquina plana', duration: 1},
    {name: 'Cerrado final de la prenda en fileteadora', duration: 2},
    {name: 'Realizar ojales en ojaladora', duration: 1},
    {name: 'Coser botones en botonadora', duration: 1},
    {name: 'Pulir la prenda', duration: 1},
    {name: 'Revisar calidad', duration: 1},
    {name: 'Planchar la prenda', duration: 1},
    {name: 'Doblar la prenda', duration: 1},
    {name: 'Empacar la prenda', duration: 1},
];

const productList = ['Camisa',
    'Pantalón',
    'Chaqueta',
    'Vestido',
    'Falda'];

const sizeList = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'];


function Auth({onLogin, onPasswordRecovery}: AuthProps) {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [recoveryUsername, setRecoveryUsername] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const token = data.token;
            // Guardar el token en el almacenamiento local
            localStorage.setItem('authToken', token);
            const user: User = {
                _id: data.id,
                username: data.username,
                password: 'null',
                email: data.email,
                phone: data.phone,
                role: data.role
            };
            //al llamar a la función onLogin, se verifica el token y se guarda el usuario en el estado
            await onLogin(user);
            toast.success('Inicio de sesión exitoso');


        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password, email, phone, role: 'client'}),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            toast.success('Registro exitoso');
            setActiveTab('login');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    const handlePasswordRecovery = (e: React.FormEvent) => {
        e.preventDefault();
        onPasswordRecovery(recoveryUsername);
        setRecoveryUsername('');
        toast.success('Solicitud de recuperación enviada');
        toast.info('Un empleado enviará tu nueva contraseña a través de un mensaje o correo electrónico.');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Tracktext</CardTitle>
                    <CardDescription>Inicie sesión o regístrese para continuar</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                            <TabsTrigger value="register">Registrarse</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={handleLogin}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="username">Usuario</Label>
                                        <Input id="username" value={username}
                                               onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input id="password" type="password" value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <Button className="w-full mt-4" type="submit">Iniciar Sesión</Button>
                            </form>
                            <div className="mt-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="link" className="w-full">¿Olvidaste tu contraseña?</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Recuperar Contraseña</DialogTitle>
                                            <DialogDescription>
                                                Ingresa tu nombre de usuario para solicitar una nueva contraseña.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form onSubmit={handlePasswordRecovery}>
                                            <div className="grid w-full items-center gap-4">
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="recovery-username">Nombre de Usuario</Label>
                                                    <Input
                                                        id="recovery-username"
                                                        value={recoveryUsername}
                                                        onChange={(e) => setRecoveryUsername(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter className="mt-4">
                                                <Button type="submit">Solicitar Nueva Contraseña</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </TabsContent>
                        <TabsContent value="register">
                            <form onSubmit={handleRegister}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="register-username">Usuario</Label>
                                        <Input id="register-username" value={username}
                                               onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="register-password">Contraseña</Label>
                                        <Input id="register-password" type="password" value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="register-email">Correo Electrónico</Label>
                                        <Input id="register-email" type="email" value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="register-phone">Teléfono</Label>
                                        <Input id="register-phone" type="tel" value={phone}
                                               onChange={(e) => setPhone(e.target.value)}/>
                                    </div>
                                </div>
                                <Button className="w-full mt-4" type="submit">Registrarse</Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

function Notifications({notifications, onMarkAsRead}: {
    notifications: Notification[],
    onMarkAsRead: (id: number) => void
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Gestiona las notificaciones del sistema</CardDescription>
            </CardHeader>
            <CardContent>
                {notifications.length === 0 ? (
                    <p>No hay notificaciones nuevas.</p>
                ) : (
                    <ul className="space-y-4">
                        {notifications.map((notification) => (
                            <li key={notification._id}
                                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                <div>
                                    <p className="font-medium">{notification.message}</p>
                                    <p className="text-sm text-gray-500">
                                        {notification.createdAt.toLocaleString()}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <Button onClick={() => onMarkAsRead(notification._id)}>
                                        Marcar como leída
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}

export default function TextileDashboard() {

    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [activeSection, setActiveSection] = useState('pedidos');
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [searchTerm, setSearchTerm] = useState('');
    const [newClient, setNewClient] = useState<NewClient>({username: '', password: '', email: '', phone: ''});
    const [newEmployee, setNewEmployee] = useState<NewEmployee>({username: '', password: '', email: '', phone: ''});
    const [newOrder, setNewOrder] = useState<NewOrder>({
        product: '',
        size: '',
        reference: 0,
        quantity: '',
        dueDate: '',
        subtasks: {},
    });
    const [deliveredOrders, setDeliveredOrders] = useState<DeliveredOrder[]>([]);
    const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const today = new Date();
        const delayedOrders = orders.filter(order => new Date(order.dueDate) < today && order.status !== 'Completado');
        delayedOrders.forEach(order => {
            createNotification('order_delayed', `El pedido #${order._id} está retrasado.`);
        });

        const unassignedOrders = orders.filter(order => !order.client && order.status === 'En producción');
        unassignedOrders.forEach(order => {
            createNotification('unassigned_order', `El pedido #${order._id} está en producción pero no tiene cliente asignado.`);
        });
    }, [orders]);

    const createNotification = (type: 'password_change' | 'order_delayed' | 'unassigned_order', message: string) => {
        const newNotification: Notification = {
            _id: notifications.length + 1,
            type,
            message,
            createdAt: new Date(),
            read: false,
        };
        setNotifications(prev => [...prev, newNotification]);
    };

    const handleMarkNotificationAsRead = (id: number) => {
        setNotifications(prev => prev.map(notif =>
            notif._id === id ? {...notif, read: true} : notif
        ));
    };

    const handlelistUsers = async () => {
        // Valida el token antes de listar clientes
        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await fetch('http://localhost:5000/api/user/getAllUsers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch clients');
            }

            // Convierte la respuesta a JSON
            const data: User[] = await response.json();

            // Actualiza el estado con la lista de usuarios
            setUsers(data);
        }
    };

    const handlelistOrders = async () => {
        // Valida el token antes de listar órdenes
        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await fetch('http://localhost:5000/api/order/getAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            // Convierte la respuesta a JSON
            const data: Order[] = await response.json();

            // Filtra las órdenes entregadas y no entregadas
            const delivered = data.filter(order => order.status === 'Entregado') as DeliveredOrder[];
            const notDelivered = data.filter(order => order.status !== 'Entregado');

            // Actualiza el estado con la lista de órdenes
            setOrders(notDelivered);
            setFilteredOrders(notDelivered);
            setDeliveredOrders(delivered);
        }
    };

    const handleLogin = async () => {

        const token = localStorage.getItem('authToken');
        if (token) {
            const response = await fetch('http://localhost:5000/api/auth/validateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            toast.dark('Bienvenido ' + data.user.username);
            setUser(data.user);

            setActiveSection('pedidos');
            await handlelistUsers();
            await handlelistOrders();
        }
    };

    const handleRegister = (username: string, password: string, email: string, phone: string) => {
        const newUser: User = {
            _id: '' + users.length + 1,
            username,
            password,
            email,
            phone,
            role: 'client'
        };
        setUsers([...users, newUser]);
        toast.success('Registro exitoso');
        toast.info('Se ha creado una nueva cuenta de cliente. Por favor, inicie sesión.');
    };

    const handlePasswordRecovery = (username: string) => {
        const user = users.find(u => u.username === username);
        if (user) {
            createNotification('password_change', `El usuario ${username} ha solicitado un cambio de  contraseña.`);
        } else {
            toast.error('Error de recuperación');
            toast.info('No se encontró ningún usuario con ese nombre.');
        }
    };

    const handleLogout = () => {
        setUser(null);
        setActiveSection('pedidos');
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        setSelectedOrder(null);
    };

    const handleOrderSelect = (order: Order | null) => {
        setSelectedOrder(order);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = orders.filter(order =>
            (order.client?.toLowerCase().includes(term) || '') ||
            order.product.toLowerCase().includes(term) ||
            order._id.toString().includes(term)
        );
        setFilteredOrders(filtered);
    };

    const handleFilter = (status: string) => {
        if (status === 'todos') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order => order.status.toLowerCase() === status);
            setFilteredOrders(filtered);
        }
    };

    const handleNewClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewClient({...newClient, [name]: value});
    };

    const handleNewClientSubmit = async () => {
        if (users.some(u => u.username === newClient.username)) {
            toast.error('El nombre de usuario ya existe. Por favor, elija otro.');
            return;
        }
        const newId = users.length + 1;
        const newClientUser: User = {
            _id: '' + newId,
            username: newClient.username,
            password: newClient.password,
            email: newClient.email,
            phone: newClient.phone,
            role: 'client'
        };
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newClient.username,
                password: newClient.password,
                email: newClient.email,
                phone: newClient.phone,
                role: 'client'
            }),
        });

        if (!response.ok) {
            toast.error('error al crear empleado');
        }

        setNewClient({username: '', password: '', email: '', phone: ''});
        toast.success('Cliente creado');
        toast.info('Se ha creado un nuevo cliente exitosamente.');
        handlelistUsers();

    };

    const handleNewEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewEmployee({...newEmployee, [name]: value});
    };

    const handleNewEmployeeSubmit = async () => {
        if (users.some(u => u.username === newEmployee.username)) {
            toast.error('El nombre de usuario ya existe. Por favor, elija otro.');
            return;
        }
        const newId = users.length + 1;
        const newEmployeeUser: User = {
            _id: '' + newId,
            username: newEmployee.username,
            password: newEmployee.password,
            email: newEmployee.email,
            phone: newEmployee.phone,
            role: 'employee'
        };
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newEmployee.username,
                password: newEmployee.password,
                email: newEmployee.email,
                phone: newEmployee.phone,
                role: 'employee'
            }),
        });

        if (!response.ok) {
            toast.error('error al crear empleado');
        }


        setNewEmployee({username: '', password: '', email: '', phone: ''});
        toast.success('Empleado creado');
        toast.info('Se ha creado un nuevo empleado exitosamente.');
        handlelistUsers();
    };

    const handleEmployeeDelete = (employeeId: string) => {
        setUsers(users.filter(user => user._id !== employeeId || user.role !== 'employee'));
        toast.warning('Empleado eliminado');
        toast.info('Se ha eliminado el empleado exitosamente.');
    };

    const handleClientDelete = (clientId: string) => {
        setUsers(users.filter(user => user._id !== clientId || user.role !== 'client'));
        toast.warning('Cliente eliminado');
        toast.info('Se ha eliminado el cliente exitosamente.');
    };

    const handleMarkAsDelivered = async (orderId: string) => {
        const orderToDeliver = orders.find(order => order._id === orderId);
        if (orderToDeliver) {
            const updatedOrder: DeliveredOrder = {
                ...orderToDeliver,
                status: 'Entregado',
                deliveredDate: new Date().toISOString()
            };
            setDeliveredOrders([...deliveredOrders, updatedOrder]);
            const updatedOrders = orders.filter(order => order._id !== orderId);


            try {
                const response = await fetch('http://localhost:5000/api/order/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrder),
                });

                if (!response.ok) {
                    throw new Error('Failed to update order');
                }
                await handlelistOrders();
                toast.success('Pedido entregado');
                toast.info(`El pedido #${orderId} ha sido marcado como entregado.`);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        }
    };

    const togglePasswordVisibility = (id: string) => {
        setShowPasswords(prev => ({...prev, [id]: !prev[id]}));
    };

    const handleAssignOrder = async (clientId: string, orderId: string) => {
        const updatedOrders = orders.map(order =>
            order._id === orderId ? {...order, client: users.find(u => u._id === clientId)?.username || ''} : order
        );

        const updatedOrder = updatedOrders.find(order => order._id === orderId);

        if (updatedOrder) {
            try {
                const response = await fetch('http://localhost:5000/api/order/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrder),
                });

                if (!response.ok) {
                    throw new Error('Failed to update order');
                }

                await handlelistOrders();
                toast.success('Pedido asignado');
                toast.info(`El pedido #${orderId} ha sido asignado exitosamente.`);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/order/getAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: localStorage.getItem('authToken')}),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data: Order[] = await response.json();
            setOrders(data.filter(order => order.status !== 'Entregado'));
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to fetch orders');
        }
    };

    const handleNewOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewOrder({...newOrder, [name]: value});
    };

    const handleSubtaskToggle = (subtaskName: string) => {
        setNewOrder(prev => ({
            ...prev,
            subtasks: {
                ...prev.subtasks,
                [subtaskName]: !prev.subtasks[subtaskName],
            },
        }));
        updateMinDueDate();
    };

    const updateMinDueDate = () => {
        const totalDays = subtasks.reduce((sum, subtask) => {
            return sum + (newOrder.subtasks[subtask.name] ? subtask.duration : 0);
        }, 0);
        const minDueDate = addDays(new Date(), totalDays);
        setNewOrder(prev => ({
            ...prev,
            dueDate: format(minDueDate, 'yyyy-MM-dd'),
        }));
    };

    const handleNewOrderSubmit = async () => {
        const today = new Date();
        const dueDate = new Date(newOrder.dueDate);

        if (dueDate < today) {
            toast.error('La fecha de entrega no puede ser anterior a la fecha actual.');
            return;
        }

        const newOrderData = {
            client: 'sin_asignar',
            product: newOrder.product,
            size: newOrder.size,
            reference: newOrder.reference,
            quantity: parseInt(newOrder.quantity),
            dueDate: newOrder.dueDate,
            status: 'Pendiente',
            progress: Object.fromEntries(
                Object.entries(newOrder.subtasks)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([key]) => [key, {completed: 0}])
            ),
        };

        try {
            const response = await fetch('http://localhost:5000/api/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrderData),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            await fetchOrders();
            setNewOrder({
                product: '',
                size: '',
                reference: 0,
                quantity: '',
                dueDate: '',
                subtasks: {},
            });
            toast.success('Pedido creado exitosamente');
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Error al crear el pedido');
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            const updatedOrder = orders.find(order => order._id === orderId);
            if (updatedOrder) {
                updatedOrder.status = newStatus;
                const response = await fetch('http://localhost:5000/api/order/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrder),
                });

                if (!response.ok) {
                    throw new Error('Failed to update order');
                }

                await fetchOrders();
                toast.success('Estado del pedido actualizado');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Error al actualizar el estado del pedido');
        }
    };

    const handleSubtaskUpdate = async (orderId: string, subtask: string, completed: string) => {
        try {
            const updatedOrder = orders.find(order => order._id === orderId);
            if (updatedOrder && updatedOrder.progress[subtask]) {
                updatedOrder.progress[subtask].completed = parseInt(completed, 10);
                const response = await fetch('http://localhost:5000/api/order/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrder),
                });

                if (!response.ok) {
                    throw new Error('Failed to update order');
                }

                await fetchOrders();
                toast.success('Progreso de la subtarea actualizado');
            }
        } catch (error) {
            console.error('Error updating subtask progress:', error);
            toast.error('Error al actualizar el progreso de la subtarea');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pendiente':
                return 'bg-yellow-500';
            case 'En producción':
                return 'bg-blue-500';
            case 'Completado':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    if (!user) {
        return <Auth onLogin={handleLogin} onRegister={handleRegister} onPasswordRecovery={handlePasswordRecovery}
                     users={users}/>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Tracktext</h2>
                    <nav>
                        <Button
                            variant={activeSection === 'pedidos' ? 'default' : 'ghost'}
                            className="w-full justify-start mb-2"
                            onClick={() => handleSectionChange('pedidos')}
                        >
                            <Package className="mr-2 h-4 w-4"/> Pedidos
                        </Button>
                        {(user.role === 'admin' || user.role === 'employee') && (
                            <Button
                                variant={activeSection === 'clientes' ? 'default' : 'ghost'}
                                className="w-full justify-start mb-2"
                                onClick={() => handleSectionChange('clientes')}
                            >
                                <Users className="mr-2 h-4 w-4"/> Clientes
                            </Button>
                        )}
                        {(user.role === 'admin' || user.role === 'employee') && (
                            <Button
                                variant={activeSection === 'produccion' ? 'default' : 'ghost'}
                                className="w-full justify-start mb-2"
                                onClick={() => handleSectionChange('produccion')}
                            >
                                <Scissors className="mr-2 h-4 w-4"/> Producción
                            </Button>
                        )}
                        {(user.role === 'admin' || user.role === 'employee') && (
                            <Button
                                variant={activeSection === 'inventario' ? 'default' : 'ghost'}
                                className="w-full justify-start mb-2"
                                onClick={() => handleSectionChange('inventario')}
                            >
                                <ShoppingBag className="mr-2 h-4 w-4"/> Inventario
                            </Button>
                        )}
                        <Button
                            variant={activeSection === 'historial' ? 'default' : 'ghost'}
                            className="w-full justify-start mb-2"
                            onClick={() => handleSectionChange('historial')}
                        >
                            <Clock className="mr-2 h-4 w-4"/> Historial
                        </Button>
                        {user.role === 'admin' && (
                            <Button
                                variant={activeSection === 'empleados' ? 'default' : 'ghost'}
                                className="w-full justify-start mb-2"
                                onClick={() => handleSectionChange('empleados')}
                            >
                                <Users className="mr-2 h-4 w-4"/> Empleados
                            </Button>
                        )}
                        {(user.role === 'admin' || user.role === 'employee') && (
                            <Button
                                variant={activeSection === 'notificaciones' ? 'default' : 'ghost'}
                                className="w-full justify-start mb-2"
                                onClick={() => handleSectionChange('notificaciones')}
                            >
                                <Bell className="mr-2 h-4 w-4"/> Notificaciones
                                {notifications.filter(n => !n.read).length > 0 && (
                                    <Badge variant="destructive" className="ml-2">
                                        {notifications.filter(n => !n.read).length}
                                    </Badge>
                                )}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            className="w-full justify-start mt-4"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4"/> Cerrar Sesión
                        </Button>
                    </nav>
                </div>
            </div>

            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-3xl font-bold mb-6">
                    {activeSection === 'pedidos' && 'Dashboard de Pedidos'}
                    {activeSection === 'clientes' && 'Gestión de Clientes'}
                    {activeSection === 'produccion' && 'Control de Producción'}
                    {activeSection === 'inventario' && 'Gestión de Inventario'}
                    {activeSection === 'historial' && 'Historial de Pedidos'}
                    {activeSection === 'empleados' && 'Gestión de Empleados'}
                    {activeSection === 'notificaciones' && 'Notificaciones'}
                </h1>

                {activeSection === 'pedidos' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {user.role === 'client'
                                            ? orders.filter(order => order.client === user.username).length
                                            : orders.length
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">En Producción</CardTitle>
                                    <Scissors className="h-4 w-4 text-muted-foreground"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {user.role === 'client'
                                            ? orders.filter(order => order.client === user.username && order.status === 'En producción').length
                                            : orders.filter(order => order.status === 'En producción').length
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Completados</CardTitle>
                                    <ShoppingBag className="h-4 w-4 text-muted-foreground"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {user.role === 'client'
                                            ? orders.filter(order => order.client === user.username && order.status === 'Completado').length
                                            : orders.filter(order => order.status === 'Completado').length
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Entregados</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground"/>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {user.role === 'client'
                                            ? deliveredOrders.filter(order => order.client === user.username).length
                                            : deliveredOrders.length
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Lista de Pedidos</CardTitle>
                                    <CardDescription>Haga clic en un pedido para ver más detalles</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Search className="h-5 w-5 text-muted-foreground"/>
                                            <Input
                                                placeholder="Buscar pedidos..."
                                                className="flex-1"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                        </div>
                                        <Tabs defaultValue="todos" onValueChange={handleFilter}>
                                            <TabsList>
                                                <TabsTrigger value="todos">Todos</TabsTrigger>
                                                <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
                                                <TabsTrigger value="en producción">En Producción</TabsTrigger>
                                                <TabsTrigger value="completado">Completados</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                        <table className="w-full">
                                            <thead>
                                            <tr>
                                                <th className="text-left p-2">ID</th>
                                                <th className="text-left p-2">Cliente</th>
                                                <th className="text-left p-2">Producto</th>
                                                <th className="text-left p-2">Estado</th>
                                                <th className="text-left p-2">Fecha de Entrega</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredOrders.filter(order => user.role === 'client' ? order.client === user.username : true).map((order) => (
                                                <tr
                                                    key={order._id}
                                                    className="cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleOrderSelect(order)}
                                                >
                                                    <td className="p-2">{order._id}</td>
                                                    <td className="p-2">{order.client || 'Sin asignar'}</td>
                                                    <td className="p-2">{order.product}</td>
                                                    <td className="p-2">
                                                        <Badge
                                                            className={getStatusColor(order.status)}>{order.status}</Badge>
                                                    </td>
                                                    <td className="p-2">{formatDate(order.dueDate)}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Detalles del Pedido</CardTitle>
                                    <CardDescription>Información detallada del pedido seleccionado</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {selectedOrder ? (
                                        <div className="space-y-4">
                                            <div>
                                                <Label>Progreso del Pedido</Label>
                                                <div className="space-y-2 mt-2">
                                                    {Object.entries(selectedOrder.progress).map(([subtask, progress]) => (
                                                        <div key={subtask} className="space-y-1">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm font-medium">{subtask}</span>
                                                                <span className="text-sm text-muted-foreground">
                        {progress.completed} / {selectedOrder.quantity}
                      </span>
                                                            </div>
                                                            <Progress
                                                                value={(progress.completed / selectedOrder.quantity) * 100}
                                                                className="h-2"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted-foreground">
                                            Seleccione un pedido para ver sus detalles
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}

                {activeSection === 'clientes' && (user.role === 'admin' || user.role === 'employee') && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Añadir Nuevo Cliente</CardTitle>
                                <CardDescription>Cree un nuevo cliente</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleNewClientSubmit();
                                }} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Nombre de Usuario</Label>
                                            <Input
                                                id="username"
                                                name="username"
                                                value={newClient.username}
                                                onChange={handleNewClientChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Contraseña</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={newClient.password}
                                                onChange={handleNewClientChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Correo Electrónico</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={newClient.email}
                                                onChange={handleNewClientChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={newClient.phone}
                                                onChange={handleNewClientChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit">Añadir Cliente</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Lista de Clientes</CardTitle>
                                <CardDescription>Gestione los clientes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Nombre de Usuario</th>
                                        <th className="text-left p-2">Correo Electrónico</th>
                                        <th className="text-left p-2">Teléfono</th>
                                        <th className="text-left p-2">Contraseña Actual</th>
                                        <th className="text-left p-2">Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(u => u.role === 'client').map((client) => (
                                        <tr key={client._id}>
                                            <td className="p-2">{client._id}</td>
                                            <td className="p-2">{client.username}</td>
                                            <td className="p-2">{client.email}</td>
                                            <td className="p-2">{client.phone}</td>
                                            <td className="p-2">
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        type={showPasswords[client._id] ? 'text' : 'password'}
                                                        value={client.password}
                                                        readOnly
                                                        className="w-40"
                                                    />
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => togglePasswordVisibility(client._id)}
                                                    >
                                                        {showPasswords[client._id] ? <EyeOff className="h-4 w-4"/> :
                                                            <Eye className="h-4 w-4"/>}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <Button size="sm" onClick={() => {
                                                    const newPassword = Math.random().toString(36).slice(-8);
                                                    setUsers(users.map(u => u._id === client._id ? {
                                                        ...u,
                                                        password: newPassword
                                                    } : u));
                                                    toast.success('Contraseña actualizada');
                                                    toast.info(`Nueva contraseña para ${client.username}: ${newPassword}`);
                                                }}>
                                                    <RefreshCw className="h-4 w-4 mr-2"/>
                                                    Nueva Contraseña
                                                </Button>
                                                <Button size="sm" variant="destructive"
                                                        onClick={() => handleClientDelete(client._id)} className="ml-2">
                                                    <X className="h-4 w-4 mr-2"/>
                                                    Eliminar
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" className="ml-2">
                                                            <Plus className="h-4 w-4 mr-2"/>
                                                            Asignar Pedido
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Asignar Pedido
                                                                a {client.username}</DialogTitle>
                                                            <DialogDescription>
                                                                Seleccione un pedido para asignar a este cliente
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <Select
                                                            onValueChange={(value) => handleAssignOrder(client._id, value)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Seleccione un pedido"/>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {orders.filter(order => order.client === 'sin_asignar').map((order) => (
                                                                    <SelectItem key={order._id}
                                                                                value={order._id.toString()}>
                                                                        Pedido #{order._id} - {order.product}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </DialogContent>
                                                </Dialog>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'produccion' && (user.role === 'admin' || user.role === 'employee') && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Crear Nuevo Pedido</CardTitle>
                                <CardDescription>Añada un nuevo pedido al sistema de producción</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleNewOrderSubmit();
                                }} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="product">Producto</Label>
                                            <Select
                                                value={newOrder.product}
                                                onValueChange={(value) => setNewOrder({...newOrder, product: value})}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione un producto"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {productList.map((product) => (
                                                        <SelectItem key={product} value={product}>{product}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="size">Talla</Label>
                                            <Select
                                                value={newOrder.size}
                                                onValueChange={(value) => setNewOrder({...newOrder, size: value})}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccione una talla"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {sizeList.map((size) => (
                                                        <SelectItem key={size} value={size}>{size}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="reference">Referencia</Label>
                                            <Input
                                                id="reference"
                                                name="reference"
                                                type="number"
                                                value={newOrder.reference}
                                                onChange={handleNewOrderChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="quantity">Cantidad</Label>
                                            <Input
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                min={1}
                                                value={newOrder.quantity}
                                                onChange={handleNewOrderChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dueDate">Fecha de Entrega</Label>
                                        <Input
                                            id="dueDate"
                                            name="dueDate"
                                            type="date"
                                            value={newOrder.dueDate}
                                            onChange={handleNewOrderChange}
                                            min={format(new Date(), 'yyyy-MM-dd')}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Subtareas</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {subtasks.map((subtask) => (
                                                <div key={subtask.name} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={subtask.name}
                                                        checked={newOrder.subtasks[subtask.name] || false}
                                                        onCheckedChange={() => handleSubtaskToggle(subtask.name)}
                                                    />
                                                    <label
                                                        htmlFor={subtask.name}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {subtask.name} ({subtask.duration} {subtask.duration === 1 ? 'día' : 'días'})
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Button type="submit">Crear Pedido</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pedidos en Producción</CardTitle>
                                <CardDescription>Lista de pedidos actualmente en el sistema de
                                    producción</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Cliente</th>
                                        <th className="text-left p-2">Producto</th>
                                        <th className="text-left p-2">Talla</th>
                                        <th className="text-left p-2">Referencia</th>
                                        <th className="text-left p-2">Cantidad</th>
                                        <th className="text-left p-2">Fecha de Entrega</th>
                                        <th className="text-left p-2">Estado</th>
                                        <th className="text-left p-2">Progreso</th>
                                        <th className="text-left p-2">Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map((order) => <tr key={order._id} className="hover:bg-gray-100">
                                        <td className="p-2">{order._id}</td>
                                        <td className="p-2">{order.client || 'Sin asignar'}</td>
                                        <td className="p-2">{order.product}</td>
                                        <td className="p-2">{order.size}</td>
                                        <td className="p-2">{order.reference}</td>
                                        <td className="p-2">{order.quantity}</td>
                                        <td className="p-2">{formatDate(order.dueDate)}</td>
                                        <td className="p-2">
                                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                                        </td>
                                        <td className="p-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm">Actualizar Progreso</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[700px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Progreso del Pedido #{order._id}</DialogTitle>
                                                        <DialogDescription>
                                                            Actualice el progreso de cada subtarea
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div
                                                        className="grid grid-cols-2 gap-4 py-4 max-h-[60vh] overflow-y-auto">
                                                        {Object.entries(order.progress).reduce((acc, [subtask, {completed}], index) => {
                                                            if (index % 20 < 5) {
                                                                acc[0].push({subtask, completed});
                                                            } else {
                                                                acc[1].push({subtask, completed});
                                                            }
                                                            return acc;
                                                        }, [[], []]).map((column, colIndex) => <div
                                                            key={colIndex}
                                                            className="space-y-4">
                                                            {column.map(({subtask, completed}) => (
                                                                <div key={subtask}
                                                                     className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor={`${order._id}-${subtask}`}
                                                                           className="text-right">
                                                                        {subtask}
                                                                    </Label>
                                                                    <Input
                                                                        id={`${order._id}-${subtask}`}
                                                                        type="number"
                                                                        className="col-span-3"
                                                                        value={completed}
                                                                        onChange={(e) => handleSubtaskUpdate(order._id, subtask, e.target.value)}
                                                                        min={0}
                                                                        max={order.quantity}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>)}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </td>
                                        <td className="p-2">
                                            <Select onValueChange={(value) => handleStatusUpdate(order._id, value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Cambiar estado"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                                                    <SelectItem value="En producción">En producción</SelectItem>
                                                    <SelectItem value="Completado">Completado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                    </tr>)}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'inventario' && (user.role === 'admin' || user.role === 'employee') && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pedidos Completados</CardTitle>
                                <CardDescription>Lista de pedidos listos para entrega</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Cliente</th>
                                        <th className="text-left p-2">Producto</th>
                                        <th className="text-left p-2">Cantidad</th>
                                        <th className="text-left p-2">Fecha de Entrega</th>
                                        <th className="text-left p-2">Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.filter(order => order.status === 'Completado').map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-100">
                                            <td className="p-2">{order._id}</td>
                                            <td className="p-2">{order.client || 'Sin asignar'}</td>
                                            <td className="p-2">{order.product}</td>
                                            <td className="p-2">{order.quantity}</td>
                                            <td className="p-2">{formatDate(order.dueDate)}</td>
                                            <td className="p-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleMarkAsDelivered(order._id)}
                                                >
                                                    Marcar como Entregado
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'historial' && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Historial de Pedidos Entregados</CardTitle>
                                <CardDescription>Lista de pedidos que han sido entregados</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Cliente</th>
                                        <th className="text-left p-2">Producto</th>
                                        <th className="text-left p-2">Cantidad</th>
                                        <th className="text-left p-2">Fecha de Entrega</th>
                                        <th className="text-left p-2">Fecha de Entrega Real</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {deliveredOrders.filter(order => user.role === 'client' ? order.client === user.username : true).map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-100">
                                            <td className="p-2">{order._id}</td>
                                            <td className="p-2">{order.client || 'Sin asignar'}</td>
                                            <td className="p-2">{order.product}</td>
                                            <td className="p-2">{order.quantity}</td>
                                            <td className="p-2">{formatDate(order.dueDate)}</td>
                                            <td className="p-2">{formatDate(order.deliveredDate)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'empleados' && user.role === 'admin' && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Añadir Nuevo Empleado</CardTitle>
                                <CardDescription>Cree un nuevo empleado</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleNewEmployeeSubmit();
                                }} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Nombre de Usuario</Label>
                                            <Input
                                                id="username"
                                                name="username"
                                                value={newEmployee.username}
                                                onChange={handleNewEmployeeChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Contraseña</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={newEmployee.password}
                                                onChange={handleNewEmployeeChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Correo Electrónico</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={newEmployee.email}
                                                onChange={handleNewEmployeeChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={newEmployee.phone}
                                                onChange={handleNewEmployeeChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit">Añadir Empleado</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Lista de Empleados</CardTitle>
                                <CardDescription>Gestione los empleados y sus credenciales de acceso</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <table className="w-full">
                                    <thead>
                                    <tr>
                                        <th className="text-left p-2">ID</th>
                                        <th className="text-left p-2">Nombre de Usuario</th>
                                        <th className="text-left p-2">Correo Electrónico</th>
                                        <th className="text-left p-2">Teléfono</th>
                                        <th className="text-left p-2">Contraseña Actual</th>
                                        <th className="text-left p-2">Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.filter(u => u.role === 'employee').map((employee) => (
                                        <tr key={employee._id}>
                                            <td className="p-2">{employee._id}</td>
                                            <td className="p-2">{employee.username}</td>
                                            <td className="p-2">{employee.email}</td>
                                            <td className="p-2">{employee.phone}</td>
                                            <td className="p-2">
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        type={showPasswords[employee._id] ? 'text' : 'password'}
                                                        value={employee.password}
                                                        readOnly
                                                        className="w-40"
                                                    />
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => togglePasswordVisibility(employee._id)}
                                                    >
                                                        {showPasswords[employee._id] ? <EyeOff className="h-4 w-4"/> :
                                                            <Eye className="h-4 w-4"/>}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <Button size="sm" onClick={() => {
                                                    const newPassword = Math.random().toString(36).slice(-8);
                                                    setUsers(users.map(u => u._id === employee._id ? {
                                                        ...u,
                                                        password: newPassword
                                                    } : u));
                                                    toast.success('Contraseña actualizada');
                                                    toast.info(`Nueva contraseña para ${employee.username}: ${newPassword}`);
                                                }}>
                                                    <RefreshCw className="h-4 w-4 mr-2"/>
                                                    Nueva Contraseña
                                                </Button>
                                                <Button size="sm" variant="destructive"
                                                        onClick={() => handleEmployeeDelete(employee._id)}
                                                        className="ml-2">
                                                    <X className="h-4 w-4 mr-2"/>
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'notificaciones' && (user.role === 'admin' || user.role === 'employee') && (
                    <Notifications notifications={notifications} onMarkAsRead={handleMarkNotificationAsRead}/>
                )}
            </div>
        </div>
    );
}