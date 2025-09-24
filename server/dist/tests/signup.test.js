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
const signup_1 = __importDefault(require("../src/routes/signup"));
// Things to mock
const queries_1 = require("../src/db/queries");
const SC = __importStar(require("../src/controllers/signupController"));
require("../src/config/passport");
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
app.use("/signup", signup_1.default);
jest.mock("../src/db/queries", () => ({
    postNewUser: jest.fn().mockResolvedValue(null),
    getUserByEmail: jest.fn().mockResolvedValue(false),
    getUserByUsername: jest.fn().mockResolvedValue(false),
}));
describe("Sign up with valid credentials", () => {
    test("should respond with 201 for valid credentials", async () => {
        const spy = jest.spyOn(SC, "checkForErrors");
        spy.mockReturnValue({
            isEmpty: () => true,
        });
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "valid@email.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        spy.mockRestore();
        expect(response.statusCode).toBe(201);
    });
});
describe("Sign up with invalid credentials for username", () => {
    beforeEach(() => {
        queries_1.postNewUser.mockResolvedValue(null);
        queries_1.getUserByEmail.mockResolvedValue(false);
        queries_1.getUserByUsername.mockResolvedValue(false);
    });
    test("should respond with 'Username cannot be empty.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "",
            email: "valid@email.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response.body.errors[0].msg).toBe("Username cannot be empty.");
    });
    test("should respond with 'Username cannot contain spaces.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "no spaces",
            email: "valid@email.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response.body.errors[0].msg).toBe("Username cannot contain spaces.");
    });
    test("should respond with 'Username can only contain Alphanumeric characters.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "%%%%%%!)(*!)*#)(@**#_$(_!$*()@",
            email: "valid@email.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response.body.errors[0].msg).toBe("Username can only contain Alphanumeric characters.");
    });
    test("should respond with 'User already exists'", async () => {
        queries_1.getUserByUsername.mockResolvedValue(true);
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "khaspper",
            email: "valid@email.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response.body.errors[0].msg).toBe("User already exists");
    });
    test("should respond with 'Username must be between 5 and 12 characters'", async () => {
        const response1 = await (0, supertest_1.default)(app).post("/signup").send({
            username: "kh",
            email: "valid@email.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        const response2 = await (0, supertest_1.default)(app).post("/signup").send({
            username: "overTwelveCharacters",
            email: "valid@email.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response1.body.errors[0].msg).toBe("Username must be between 5 and 12 characters");
        expect(response2.body.errors[0].msg).toBe("Username must be between 5 and 12 characters");
    });
});
describe("Sign up with invalid credentials for email", () => {
    beforeEach(() => {
        queries_1.postNewUser.mockResolvedValue(null);
        queries_1.getUserByEmail.mockResolvedValue(false);
        queries_1.getUserByUsername.mockResolvedValue(false);
    });
    test("Should respond with 'Email cannot be empty.", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response.body.errors[0].msg).toBe("Email cannot be empty.");
    });
    test("Should respond with 'Email must be in this format 'abc@xyz.com''", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "notValidEmail",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response.body.errors[0].msg).toBe("Email must be in this format 'abc@xyz.com'");
    });
    test("Should respond with 'Email already exists.'", async () => {
        queries_1.getUserByEmail.mockReturnValue(true);
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "email@exists.com",
            password: "validPassword",
            confirmPassword: "validPassword",
        });
        expect(response.body.errors[0].msg).toBe("Email already exists.");
    });
});
describe("Sign up with invalid credentials for password", () => {
    beforeEach(() => {
        queries_1.postNewUser.mockResolvedValue(null);
        queries_1.getUserByEmail.mockResolvedValue(false);
        queries_1.getUserByUsername.mockResolvedValue(false);
    });
    test("Should respond with 'Password cannot be empty.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "email@exists.com",
            password: "",
            confirmPassword: "",
        });
        expect(response.body.errors[0].msg).toBe("Password cannot be empty.");
    });
    test("Should respond with 'Password cannot contain spaces.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "email@exists.com",
            password: "Has Spaces",
            confirmPassword: "Has Spaces",
        });
        expect(response.body.errors[0].msg).toBe("Passwords cannot contain spaces.");
    });
    test("Should respond with 'Password be at least 8 characters long.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "email@exists.com",
            password: "123",
            confirmPassword: "123",
        });
        expect(response.body.errors[0].msg).toBe("Password be at least 8 characters long.");
    });
    test("Should respond with 'Passwords do not match.'", async () => {
        const response = await (0, supertest_1.default)(app).post("/signup").send({
            username: "validUser",
            email: "email@exists.com",
            password: "doNotMatch",
            confirmPassword: "doMatch",
        });
        expect(response.body.errors[0].msg).toBe("Passwords do not match.");
    });
});
//# sourceMappingURL=signup.test.js.map