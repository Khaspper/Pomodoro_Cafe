"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const login_1 = __importDefault(require("../src/routes/login"));
require("../src/config/passport");
const Q = __importStar(require("../src/db/queries"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: "test-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/login", login_1.default);
describe("Login with valid/invalid credentials", () => {
    test("Should respond with 200 for valid credentials", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "valid@example.com",
            password: "validPassword",
        });
        expect(response.statusCode).toBe(200);
    });
    test("Should respond with 401 for invalid --- Email ---", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "invalid@email.com",
            password: "qweqweqwe",
        });
        expect(response.statusCode).toBe(401);
    });
    test("Should respond with 401 for invalid --- Password ---", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "qwer@example.com",
            password: "IncorrectPassword",
        });
        expect(response.statusCode).toBe(401);
    });
    test("Should respond with 401 for invalid credentials", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "invalid@email.com",
            password: "IncorrectPassword",
        });
        expect(response.statusCode).toBe(401);
    });
});
describe("Validate login input", () => {
    test("Should respond with 'Email not found.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "nonexistent@email.com",
            password: "password",
        });
        expect(response.body.error).toBe("Email not found.");
    });
    test("Should respond with 'Incorrect Password.'", async () => {
        const spy = jest.spyOn(Q, "getUserByEmail");
        spy.mockResolvedValue({
            email: "valid@email.com",
            password: "password",
            id: 0,
            username: "exists",
        });
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "valid@email.com",
            password: "password",
        });
        spy.mockRestore();
        expect(response.body.error).toBe("Incorrect Password.");
    });
    test("Should respond with 'Something went wrong.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "",
            password: "password",
        });
        expect(response.body.error).toBe("Something went wrong.");
    });
    test("Should respond with 'Something went wrong.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "",
            password: "",
        });
        expect(response.body.error).toBe("Something went wrong.");
    });
    test("Should respond with 'Something went wrong.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/login").send({
            email: "valid@email.com",
            password: "",
        });
        expect(response.body.error).toBe("Something went wrong.");
    });
});
//# sourceMappingURL=login.test.js.map