"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pool_1 = __importDefault(require("./db/pool"));
// Routes
const routes_1 = __importDefault(require("./routes"));
const login_1 = __importDefault(require("./routes/login"));
const signup_1 = __importDefault(require("./routes/signup"));
const account_1 = __importDefault(require("./routes/account"));
const cafe_1 = __importDefault(require("./routes/cafe"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const health_1 = __importDefault(require("./routes/health"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Trust proxy for accurate IP addresses (important for rate limiting)
app.set("trust proxy", 1);
// This is so we can send data to our front end
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
};
// TODO: Replace hardcoded localhost URLs with environment variables
// TODO: Add production URLs to CORS origins
app.use((0, cors_1.default)(corsOptions));
// This is so we can send data to our front end
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    store: new ((0, connect_pg_simple_1.default)(express_session_1.default))({
        pool: pool_1.default,
        tableName: "session",
    }),
    secret: String(process.env.SECRET_KEY),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // Equals 1 week
    },
}));
app.use(passport_1.default.session());
app.use("/", routes_1.default);
app.use("/login", login_1.default);
app.use("/signup", signup_1.default);
app.use("/account", account_1.default);
app.use("/cafe", cafe_1.default);
app.use("/health", health_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = 500;
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Something went wrong!",
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// // TODO: I have to validate all inputs
// // TODO: Validate the Review cafe section
// // TODO: and the account page
// // TODO: I also have to implement a update account part...
// TODO: Finally style the page professionally...
// // TODO: Make the screen scrollable when it overflows y axis
// // TODO: Date/Time formatting
// // TODO: Change the loading thing
// // TODO: google form
// // TODO: Add rate limiting middleware
// // TODO: Add request logging middleware
// // TODO: Add health check endpoint
// // TODO: Add proper error handling middleware
//# sourceMappingURL=server.js.map