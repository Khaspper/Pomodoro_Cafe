import express from "express";
import cors from "cors";

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

app.get("/", (req, res) => {
  res.json({ message: "We in the BACKEND!!!! OH YEAH" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
