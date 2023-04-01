const wallsRouter = require("express").Router();
const helpers = require("./helpers");
var path = require("path");
const fs = require("fs");
const { upload } = require("../util/config");

const Wall = require("../models/Wall");
const WallHolds = require("../models/WallHolds");

/* ROUTES

GET /           Get all routes
GET /:id        GET one route with all info
GET /image/:id  GET image TODO: Not needed ?!
GET /holds/:id  GET image TODO: Not needed ?!
POST /          POST new route, needs image
PUT /:id        Modify everything except image
PUT /image/:id  Modify image
PUT /holds/:id  Modify image
DELETE /:id     Delete wall

TODO: Remove images from the uploads when needed.

*/

wallsRouter.get("/", async (req, res) => {
  const walls = await Wall.find({});
  return walls
    ? res.status(200).json(walls)
    : res.status(404).json({ error: "No walls found" });
});

wallsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const wall = await Wall.findById(id);

  if (!wall) return res.status(404).json({ error: "Invalid id" });
  const holds = await WallHolds.findOne({ wallId: wall._id });

  console.log(holds);

  return res.status(200).json({
    ...wall.toJSON(),
    // image: helpers.getImage(wall.image),
    holds: holds ? holds.holds.map((hold) => hold.toJSON()) : [],
  }); // holds.holds on ne ite otteet
});

wallsRouter.get("/holds/:id", async (req, res) => {
  const { id } = req.params;
  const { holds } = await WallHolds.findOne({ wallId: id });

  return res.status(200).json(holds);
});

wallsRouter.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const wall = await Wall.findById(id);
  if (!wall) res.status(400).json({ error: "No wall found" });

  const image = helpers.getImage(wall.image);
  return res.status(200).json(image);
});

// Holds come at a later stage
wallsRouter.post("/", upload.single("image"), async (req, res) => {
  const { name, description, user } = req.body;
  // const user = helpers.getUserFromToken(req.token);
  // if (!user) return res.status(404).json({ error: "User login required" });

  // Check for image
  if (!req.file.filename) res.status(400).json({ error: "Image needed" });

  const wall = new Wall({
    name,
    user,
    description,
    image: `/uploads/${req.file.filename}`,
  });

  try {
    const newWall = await wall.save();
    const holds = new WallHolds({
      wallId: wall._id,
      holds: [],
    });
    await holds.save();

    return res.status(201).json(newWall.toJSON());
  } catch (error) {
    return res.status(400).json({ error });
  }
});

wallsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, user, description } = req.body;
  const wall = await Wall.findById(id);

  if (!wall) return res.status(404).json({ error: "Wall not found" });

  helpers.updateDocumentValues(wall, { name, user, description });
  const updatedWall = await wall.save();
  return res.status(200).json(updatedWall.toJSON());
});

wallsRouter.put("/holds/:id", async (req, res) => {
  console.log("here");
  const { id } = req.params;
  const { holds } = req.body;
  console.log(req.body);
  console.log("holds", holds);
  const wallHolds = await WallHolds.findOne({ wallId: id });

  if (!wallHolds) return res.status(404).json({ error: "Holds not found" });

  helpers.updateDocumentValues(wallHolds, { holds });
  const updatedHolds = await wallHolds.save({ new: true });
  return res.status(200).json(updatedHolds.toJSON());
});

wallsRouter.post("/holds/:id", async (req, res) => {
  const { id } = req.params;
  const { hold } = req.body;

  const wallHolds = await WallHolds.findOne({ wallId: id });

  if (!wallHolds) return res.status(404).json({ error: "Holds not found" });
  wallHolds.holds.push(hold);
  const updatedHolds = await wallHolds.save({ new: true });
  return res.status(200).json(updatedHolds.toJSON());
});

wallsRouter.put("/image/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const wall = await Wall.findById(id);
  if (!wall) return res.status(404).json({ error: "Wall not found" });
  if (!req.file.filename) res.status(400).json({ error: "Image needed" });

  const image = `/uploads/${req.file.filename}`;
  helpers.updateDocumentValues(wall, { image });
  const updatedWall = await wall.save({ new: true });

  return res.status(200).json(updatedWall.toJSON());
});

wallsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedWall = await Wall.findByIdAndDelete(id);

  if (!deletedWall)
    return res.status(404).json({ error: "Problems removing wall" });

  return res.status(200).json(deletedWall.toJSON());
});

module.exports = wallsRouter;
