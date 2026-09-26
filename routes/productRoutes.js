const express = require("express")
const protect = require("../middleware/authMiddleware")
const Product = require("../models/Product")

const authorize = require("../middleware/roleMiddleware")

const router = express.Router()

// Obtener todos los productos
router.get("/", protect, async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1
    })

    res.json(products)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Error al obtener los productos."
    })
  }
})

// Obtener un producto
router.get("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    )

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado."
      })
    }

    res.json(product)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Error al obtener el producto."
    })
  }
})

// Crear producto
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      expirationDate
    } = req.body

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      expirationDate
    })

    res.status(201).json(product)
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: "No se pudo crear el producto."
    })
  }
})

// Actualizar producto
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado."
      })
    }

    res.json(product)
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: "No se pudo actualizar el producto."
    })
  }
})

// Eliminar producto
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    )

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado."
      })
    }

    res.json({
      message: "Producto eliminado correctamente."
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "No se pudo eliminar el producto."
    })
  }
})

module.exports = router