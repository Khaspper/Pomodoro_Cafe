import express from "express";
import cors from "cors";
// Routes
import indexRouter from "./routes";
import loginRouter from "./routes/login";

const app = express();
const PORT = 3000;

// This is so we can send data to our front end
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
// This is so we can send data to our front end

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
