/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server.ts":
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst app_1 = __importDefault(__webpack_require__(/*! ./src/app */ \"./src/app.ts\"));\nconst PORT = process.env.PORT || 5000;\napp_1.default.listen(PORT, () => {\n    console.log(`Server is running on port ${PORT}`);\n});\n\n\n//# sourceURL=webpack://upblioteca/./server.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst authRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/authRoutes */ \"./src/routes/authRoutes.ts\"));\nconst userRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/userRoutes */ \"./src/routes/userRoutes.ts\"));\nconst orderRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/orderRoutes */ \"./src/routes/orderRoutes.ts\"));\nconst database_1 = __importDefault(__webpack_require__(/*! ./config/database */ \"./src/config/database.ts\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst app = (0, express_1.default)();\napp.use((0, cors_1.default)({\n    origin: 'http://localhost:3000', //Origen permitido, que puede ser la URL de tu frontend\n    credentials: true\n}));\n(0, database_1.default)().then(() => { });\napp.use(express_1.default.json());\napp.use('/api/auth', authRoutes_1.default);\napp.use('/api/user', userRoutes_1.default);\napp.use('/api/order', orderRoutes_1.default);\nexports[\"default\"] = app;\n\n\n//# sourceURL=webpack://upblioteca/./src/app.ts?");

/***/ }),

/***/ "./src/config/database.ts":
/*!********************************!*\
  !*** ./src/config/database.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst connectDB = () => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const conn = yield mongoose_1.default.connect('mongodb+srv://hrcamilo11:PhOpXwbuwxeygN0B@cluster0.8kcjg.mongodb.net/TrackTex');\n        console.log(`MongoDB Connected: ${conn.connection.host}`);\n    }\n    catch (error) {\n        if (error instanceof Error) {\n            console.error(`Error: ${error.message}`);\n        }\n        else {\n            console.error('Unknown error');\n        }\n        process.exit(1);\n    }\n});\nexports[\"default\"] = connectDB;\n\n\n//# sourceURL=webpack://upblioteca/./src/config/database.ts?");

/***/ }),

/***/ "./src/controllers/authController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/authController.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validateToken = exports.register = exports.login = void 0;\nconst AuthService_1 = __webpack_require__(/*! ../services/AuthService */ \"./src/services/AuthService.ts\");\nconst AuthRepository_1 = __webpack_require__(/*! ../repositories/AuthRepository */ \"./src/repositories/AuthRepository.ts\");\nconst authRepository = new AuthRepository_1.AuthRepository();\nconst authService = new AuthService_1.AuthService(authRepository);\nconst login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const { username, password } = req.body;\n    console.log(req.body);\n    try {\n        const token = yield authService.login(username, password);\n        res.json({ token });\n    }\n    catch (error) {\n        res.status(400).json({ error: error.message });\n    }\n});\nexports.login = login;\nconst register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const { username, password, email, phone, role } = req.body;\n    console.log(username);\n    console.log(password);\n    console.log(email);\n    console.log(phone);\n    console.log(role);\n    console.log(req.body);\n    try {\n        const user = yield authService.register(username, password, email, phone, role);\n        res.json({ user });\n    }\n    catch (error) {\n        res.status(400).json({ error: error.message });\n    }\n});\nexports.register = register;\nconst validateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const token = req.body.token;\n    try {\n        const user = yield authService.validateToken(token);\n        res.json({ user });\n    }\n    catch (error) {\n        res.status(400).json({ error: error.message });\n    }\n});\nexports.validateToken = validateToken;\n\n\n//# sourceURL=webpack://upblioteca/./src/controllers/authController.ts?");

/***/ }),

/***/ "./src/controllers/ordercontroller.ts":
/*!********************************************!*\
  !*** ./src/controllers/ordercontroller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deleteorder = exports.updateorder = exports.getorderById = exports.createorder = exports.getAllorders = void 0;\nconst OrderService_1 = __webpack_require__(/*! ../services/OrderService */ \"./src/services/OrderService.ts\");\nconst OrderRepository_1 = __webpack_require__(/*! ../repositories/OrderRepository */ \"./src/repositories/OrderRepository.ts\");\nconst User_repository_1 = __webpack_require__(/*! ../repositories/User_repository */ \"./src/repositories/User_repository.ts\");\nconst AuthService_1 = __webpack_require__(/*! ../services/AuthService */ \"./src/services/AuthService.ts\");\nconst AuthRepository_1 = __webpack_require__(/*! ../repositories/AuthRepository */ \"./src/repositories/AuthRepository.ts\");\nconst authRepository = new AuthRepository_1.AuthRepository();\nconst authService = new AuthService_1.AuthService(authRepository);\nconst orderRepository = new OrderRepository_1.OrderRepository();\nconst user_repository = new User_repository_1.UserRepository();\nconst orderService = new OrderService_1.OrderService(orderRepository, user_repository);\nconst getAllorders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const user = yield authService.validateToken(req.body.token);\n        if (user.role == 'admin' || user.role == 'employee' || user.role == 'client') {\n            const orders = yield orderService.getAllOrders();\n            res.status(200).json(orders);\n        }\n        else {\n            res.status(500).json({ message: 'usuario no autorizado' });\n            throw new Error('Unauthorized');\n        }\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error retrieving orders', error });\n    }\n});\nexports.getAllorders = getAllorders;\nconst createorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const orderdata = req.body;\n        if (!orderdata) {\n            console.log(\"aqui es la cagada\");\n            res.status(400).json({ message: 'Invalid order data' });\n            throw new Error('Invalid order data');\n        }\n        ;\n        console.log(\"entra al createorder pero estalla en el createOrder del servicio\");\n        const newOrder = yield orderService.createOrder(orderdata.client, orderdata.product, orderdata.quantity, orderdata.dueDate, orderdata.status, orderdata.progress);\n        res.status(201).json(\"order created\" + newOrder._id);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error creating user', error });\n    }\n});\nexports.createorder = createorder;\nconst getorderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const orderId = req.body.id;\n        const order = yield orderService.getOrderById(orderId);\n        res.status(200).json(order);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error retrieving order', error });\n    }\n});\nexports.getorderById = getorderById;\nconst updateorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const orderdata = req.body;\n        if (!orderdata) {\n            res.status(400).json({ message: 'Invalid order data' });\n            throw new Error('Invalid order data');\n        }\n        ;\n        const updatedOrder = yield orderService.updateOrder(orderdata);\n        res.status(200).json(\"order updated\");\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error updating order', error });\n    }\n});\nexports.updateorder = updateorder;\nconst deleteorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const orderId = req.body.id;\n        yield orderService.deleteOrder(orderId);\n        res.status(200).json(\"order deleted\");\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error deleting order', error });\n    }\n});\nexports.deleteorder = deleteorder;\n\n\n//# sourceURL=webpack://upblioteca/./src/controllers/ordercontroller.ts?");

/***/ }),

/***/ "./src/controllers/userController.ts":
/*!*******************************************!*\
  !*** ./src/controllers/userController.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deleteUser = exports.updateUser = exports.createUser = exports.getUsersByRole = exports.getAllUsers = exports.getUserByUsername = exports.getUserById = void 0;\nconst UserService_1 = __webpack_require__(/*! ../services/UserService */ \"./src/services/UserService.ts\");\nconst User_repository_1 = __webpack_require__(/*! ../repositories/User_repository */ \"./src/repositories/User_repository.ts\");\nconst AuthRepository_1 = __webpack_require__(/*! ../repositories/AuthRepository */ \"./src/repositories/AuthRepository.ts\");\nconst AuthService_1 = __webpack_require__(/*! ../services/AuthService */ \"./src/services/AuthService.ts\");\nconst authRepository = new AuthRepository_1.AuthRepository();\nconst authService = new AuthService_1.AuthService(authRepository);\nconst userRepository = new User_repository_1.UserRepository();\nconst userService = new UserService_1.UserService(userRepository);\nconst getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const userId = req.params.id;\n        const user = yield userService.getUserById(userId);\n        res.status(200).json(user);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error retrieving user', error });\n    }\n});\nexports.getUserById = getUserById;\nconst getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const username = req.body.username;\n        const user = yield userService.getUserByUsername(username);\n        res.status(200).json(user);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error retrieving user by username', error });\n    }\n});\nexports.getUserByUsername = getUserByUsername;\nconst getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const user = yield authService.validateToken(req.body.token);\n        if (user.role !== 'admin' && user.role !== 'employee' && user.role !== 'client') {\n            res.status(500).json({ message: 'usuario no autorizado' });\n            throw new Error('Unauthorized');\n        }\n        else {\n            const users = yield userService.getAllUsers();\n            res.status(200).json(users);\n        }\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error retrieving users', error });\n    }\n});\nexports.getAllUsers = getAllUsers;\nconst getUsersByRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const user = yield authService.validateToken(req.body.token);\n        if (user.role !== 'admin') {\n            res.status(500).json({ message: 'usuario no autorizado' });\n            throw new Error('Unauthorized');\n        }\n        const role = req.body.role;\n        const users = yield userService.getUsersByRole(role);\n        res.status(200).json(users);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error retrieving users by role', error });\n    }\n});\nexports.getUsersByRole = getUsersByRole;\nconst createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const userData = req.body;\n        const newUser = yield userService.createUser(userData);\n        res.status(201).json(newUser);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error creating user', error });\n    }\n});\nexports.createUser = createUser;\nconst updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const userId = req.params.id;\n        const userData = req.body;\n        const updatedUser = yield userService.updateUser(userId, userData);\n        res.status(200).json(updatedUser);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error updating user', error });\n    }\n});\nexports.updateUser = updateUser;\nconst deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        console.log(req.body);\n        const userId = req.body._id;\n        yield userService.deleteUser(userId);\n        res.status(204).send();\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Error deleting user', error });\n    }\n});\nexports.deleteUser = deleteUser;\n\n\n//# sourceURL=webpack://upblioteca/./src/controllers/userController.ts?");

/***/ }),

/***/ "./src/models/Order.ts":
/*!*****************************!*\
  !*** ./src/models/Order.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Order = void 0;\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst OrderSchema = new mongoose_1.Schema({\n    client: { type: String, required: true },\n    product: { type: String, required: true },\n    quantity: { type: Number, required: true },\n    dueDate: { type: String, required: true },\n    deliveredDate: { type: String, required: false },\n    status: { type: String, required: true },\n    progress: {\n        type: Map,\n        of: new mongoose_1.Schema({\n            completed: { type: Number, required: true }\n        }),\n        required: false\n    },\n});\nexports.Order = (0, mongoose_1.model)('Order', OrderSchema);\n\n\n//# sourceURL=webpack://upblioteca/./src/models/Order.ts?");

/***/ }),

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.User = void 0;\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst UserSchema = new mongoose_1.Schema({\n    username: { type: String, required: true, unique: true },\n    password: { type: String, required: true },\n    email: { type: String, required: true, unique: true },\n    phone: { type: String, required: true },\n    role: { type: String, required: true, enum: ['admin', 'employee', 'client'] },\n});\nexports.User = (0, mongoose_1.model)('User', UserSchema);\n\n\n//# sourceURL=webpack://upblioteca/./src/models/User.ts?");

/***/ }),

/***/ "./src/repositories/AuthRepository.ts":
/*!********************************************!*\
  !*** ./src/repositories/AuthRepository.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AuthRepository = void 0;\nconst User_repository_1 = __webpack_require__(/*! ./User_repository */ \"./src/repositories/User_repository.ts\");\nconst User_1 = __webpack_require__(/*! ../models/User */ \"./src/models/User.ts\");\nclass AuthRepository {\n    constructor() {\n        this.userRepository = new User_repository_1.UserRepository();\n    }\n    findByUsername(username) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.userRepository.findByUsername(username);\n        });\n    }\n    createUser(user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newUser = new User_1.User(user);\n            return yield this.userRepository.add(newUser);\n        });\n    }\n    findById(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.userRepository.findById(id);\n        });\n    }\n    ;\n}\nexports.AuthRepository = AuthRepository;\n\n\n//# sourceURL=webpack://upblioteca/./src/repositories/AuthRepository.ts?");

/***/ }),

/***/ "./src/repositories/OrderRepository.ts":
/*!*********************************************!*\
  !*** ./src/repositories/OrderRepository.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderRepository = void 0;\nconst Order_1 = __webpack_require__(/*! ../models/Order */ \"./src/models/Order.ts\");\nclass OrderRepository {\n    getAll() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield Order_1.Order.find().exec();\n        });\n    }\n    findById(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield Order_1.Order.findById(id).exec();\n        });\n    }\n    add(order) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newOrder = new Order_1.Order(order);\n            return yield newOrder.save();\n        });\n    }\n    update(order) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield Order_1.Order.findByIdAndUpdate(order._id, order, { new: true }).exec();\n        });\n    }\n    delete(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield Order_1.Order.findByIdAndDelete(id).exec();\n        });\n    }\n}\nexports.OrderRepository = OrderRepository;\n\n\n//# sourceURL=webpack://upblioteca/./src/repositories/OrderRepository.ts?");

/***/ }),

/***/ "./src/repositories/User_repository.ts":
/*!*********************************************!*\
  !*** ./src/repositories/User_repository.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserRepository = void 0;\nconst User_1 = __webpack_require__(/*! ../models/User */ \"./src/models/User.ts\");\nclass UserRepository {\n    findByEmail(email) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield User_1.User.findOne({ email }).exec();\n        });\n    }\n    getAll() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield User_1.User.find().exec();\n        });\n    }\n    findById(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield User_1.User.findById(id).exec();\n        });\n    }\n    findByUsername(username) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield User_1.User.findOne({ username }).exec();\n        });\n    }\n    findByRole(role) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield User_1.User.find({ role }).exec();\n        });\n    }\n    add(user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newUser = new User_1.User(user);\n            return yield newUser.save();\n        });\n    }\n    update(id, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield User_1.User.findByIdAndUpdate(id, user, { new: true }).exec();\n        });\n    }\n    delete(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield User_1.User.findByIdAndDelete(id).exec();\n        });\n    }\n}\nexports.UserRepository = UserRepository;\n\n\n//# sourceURL=webpack://upblioteca/./src/repositories/User_repository.ts?");

/***/ }),

/***/ "./src/routes/authRoutes.ts":
/*!**********************************!*\
  !*** ./src/routes/authRoutes.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst authController_1 = __webpack_require__(/*! ../controllers/authController */ \"./src/controllers/authController.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/login', authController_1.login);\nrouter.post('/register', authController_1.register);\nrouter.post('/validateToken', authController_1.validateToken);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://upblioteca/./src/routes/authRoutes.ts?");

/***/ }),

/***/ "./src/routes/orderRoutes.ts":
/*!***********************************!*\
  !*** ./src/routes/orderRoutes.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst ordercontroller_1 = __webpack_require__(/*! ../controllers/ordercontroller */ \"./src/controllers/ordercontroller.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/create', ordercontroller_1.createorder);\nrouter.post('/update', ordercontroller_1.updateorder);\nrouter.post('/delete', ordercontroller_1.deleteorder);\nrouter.post('/getById', ordercontroller_1.getorderById);\nrouter.post('/getAll', ordercontroller_1.getAllorders);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://upblioteca/./src/routes/orderRoutes.ts?");

/***/ }),

/***/ "./src/routes/userRoutes.ts":
/*!**********************************!*\
  !*** ./src/routes/userRoutes.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst userController_1 = __webpack_require__(/*! ../controllers/userController */ \"./src/controllers/userController.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/createUser', userController_1.createUser);\nrouter.post('/getByID', userController_1.getUserById);\nrouter.post('/getByName', userController_1.getUserByUsername);\nrouter.post('/getByRole', userController_1.getUsersByRole);\nrouter.put('/updateUser', userController_1.updateUser);\nrouter.post('/deleteUser', userController_1.deleteUser);\nrouter.post('/getAllUsers', userController_1.getAllUsers);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://upblioteca/./src/routes/userRoutes.ts?");

/***/ }),

/***/ "./src/services/AuthService.ts":
/*!*************************************!*\
  !*** ./src/services/AuthService.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AuthService = void 0;\nconst User_1 = __webpack_require__(/*! ../models/User */ \"./src/models/User.ts\");\nconst bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ \"bcryptjs\"));\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nclass AuthService {\n    constructor(authRepository) {\n        this.authRepository = authRepository;\n    }\n    login(username, password) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.authRepository.findByUsername(username);\n            if (!user) {\n                throw new Error('Usuario no encontrado');\n            }\n            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);\n            if (!isPasswordValid) {\n                throw new Error('Contraseña incorrecta');\n            }\n            const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username, role: user.role }, 'clavesita', { expiresIn: '1h' });\n            return token;\n        });\n    }\n    register(username, password, email, phone, role) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (!username || !password || !email || !phone) {\n                throw new Error('No se permiten campos nulos');\n            }\n            // Verificar si el usuario ya existe antes de registrarlo\n            const existingUser = yield this.authRepository.findByUsername(username);\n            if (existingUser) {\n                throw new Error('El usuario ya existe');\n            }\n            // Hash de la contraseña\n            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);\n            // Crear una instancia del modelo User de Mongoose\n            const user = new User_1.User({\n                username,\n                password: hashedPassword,\n                email,\n                phone,\n                role,\n            });\n            return yield this.authRepository.createUser(user);\n        });\n    }\n    validateToken(token) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const decoded = jsonwebtoken_1.default.verify(token, 'clavesita');\n                const user = yield this.authRepository.findById(decoded.id);\n                if (!user) {\n                    throw new Error('Usuario no encontrado');\n                }\n                return user;\n                // eslint-disable-next-line @typescript-eslint/no-unused-vars\n            }\n            catch (error) {\n                throw new Error('Token inválido');\n            }\n        });\n    }\n}\nexports.AuthService = AuthService;\n\n\n//# sourceURL=webpack://upblioteca/./src/services/AuthService.ts?");

/***/ }),

/***/ "./src/services/OrderService.ts":
/*!**************************************!*\
  !*** ./src/services/OrderService.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderService = void 0;\nconst Order_1 = __webpack_require__(/*! ../models/Order */ \"./src/models/Order.ts\"); // Adjust the import path as necessary\nclass OrderService {\n    constructor(orderRepository, userRepository) {\n        this.orderRepository = orderRepository;\n        this.userRepository = userRepository;\n    }\n    ;\n    getAllOrders() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                return yield this.orderRepository.getAll();\n            }\n            catch (error) {\n                throw new Error(\"Error al obtener los pedidos\");\n            }\n        });\n    }\n    createOrder(client, product, quantity, dueDate, status, progress) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (!product || !quantity || !dueDate || !status) {\n                throw new Error(\"Invalid order data\");\n            }\n            const order = yield new Order_1.Order({ client, product, quantity, dueDate, status, progress });\n            return yield this.orderRepository.add(order);\n        });\n    }\n    getOrderById(orderId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (!orderId) {\n                throw new Error(\"Order ID is required\");\n            }\n            const order = yield this.orderRepository.findById(orderId);\n            if (!order) {\n                throw new Error(\"Order not found\");\n            }\n            return order;\n        });\n    }\n    updateOrder(updateData) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (!updateData) {\n                throw new Error(\"Invalid input data\");\n            }\n            const order = yield this.orderRepository.findById(updateData._id);\n            if (!order) {\n                throw new Error(\"Order not found\");\n            }\n            return yield this.orderRepository.update(updateData);\n        });\n    }\n    deleteOrder(orderId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (!orderId) {\n                throw new Error(\"Order ID is required\");\n            }\n            const order = yield this.orderRepository.findById(orderId);\n            if (!order) {\n                throw new Error(\"Order not found\");\n            }\n            yield this.orderRepository.delete(orderId);\n        });\n    }\n}\nexports.OrderService = OrderService;\n\n\n//# sourceURL=webpack://upblioteca/./src/services/OrderService.ts?");

/***/ }),

/***/ "./src/services/UserService.ts":
/*!*************************************!*\
  !*** ./src/services/UserService.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserService = void 0;\nclass UserService {\n    constructor(userRepository) {\n        this.userRepository = userRepository;\n    }\n    ;\n    getUsersByRole(role) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (role === 'admin' || role === 'employee' || role === 'client') {\n                return yield this.userRepository.findByRole(role);\n            }\n            else {\n                throw new Error('Usuario no encontrado');\n            }\n            ;\n        });\n    }\n    getUserById(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.userRepository.findById(id);\n            if (!user) {\n                throw new Error('Usuario no encontrado');\n            }\n            return this.userRepository.findById(id);\n        });\n    }\n    getUserByUsername(username) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.userRepository.findByUsername(username);\n            if (!user) {\n                throw new Error('Usuario no encontrado');\n            }\n        });\n    }\n    getAllUsers() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                return yield this.userRepository.getAll();\n            }\n            catch (error) {\n                throw new Error('Error al obtener los usuarios');\n            }\n        });\n    }\n    createUser(user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const existingUserByUsername = yield this.userRepository.findByUsername(user.username);\n            if (existingUserByUsername) {\n                throw new Error('El nombre de usuario ya está en uso');\n            }\n            const existingUserByEmail = yield this.userRepository.findByEmail(user.email);\n            if (existingUserByEmail) {\n                throw new Error('El correo electrónico ya está en uso');\n            }\n            return yield this.userRepository.add(user);\n        });\n    }\n    deleteUser(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.userRepository.findById(id);\n            if (!user) {\n                throw new Error('Usuario no encontrado');\n            }\n            return yield this.userRepository.delete(id);\n        });\n    }\n    updateUser(id, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const existingUser = yield this.userRepository.findById(id);\n            if (!existingUser) {\n                throw new Error('Usuario no encontrado');\n            }\n            return yield this.userRepository.update(id, user);\n        });\n    }\n}\nexports.UserService = UserService;\n\n\n//# sourceURL=webpack://upblioteca/./src/services/UserService.ts?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./server.ts");
/******/ 	
/******/ })()
;