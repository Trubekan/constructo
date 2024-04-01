const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // Agrega esta línea para procesar el cuerpo de la solicitud JSON

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "naruteros7",
  database: "constructo",
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Rutas
app.get("/api/datos", (req, res) => {
  // Consulta a la base de datos
  db.query("SELECT * FROM clientes", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un cliente
app.post("/api/datos", (req, res) => {
  const nuevoCliente = req.body;

  // Validar y procesar los datos según tus necesidades
  // ...

  // Consulta a la base de datos para agregar el nuevo cliente
  db.query(
    "INSERT INTO clientes (cliente, ruc, razon_social, direccion, contacto, telefono) VALUES (?, ?, ?, ?, ?, ?)",
    [
      nuevoCliente.cliente,
      nuevoCliente.ruc,
      nuevoCliente.razon_social,
      nuevoCliente.direccion,
      nuevoCliente.contacto,
      nuevoCliente.telefono,
    ],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar cliente:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Cliente agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla obra_a
app.get("/api/obras", (req, res) => {
  db.query("SELECT * FROM obra_a", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de obras:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar una obra
app.post("/api/obras", (req, res) => {
  const nuevaObra = req.body;

  // Obtener todos los campos del cuerpo de la solicitud
  const { OBRA, CLIENTE, ESTADO, VALOR, IGV, igv_porcentaje, PRECIO, moneda } =
    nuevaObra;

  // Consulta a la base de datos para agregar la nueva obra
  db.query(
    "INSERT INTO obra_a (OBRA, CLIENTE, ESTADO, VALOR, IGV, igv_porcentaje, PRECIO, moneda) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [OBRA, CLIENTE, ESTADO, VALOR, IGV, igv_porcentaje, PRECIO, moneda],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar obra:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Obra agregada exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla ppto_a
app.get("/api/ppto", (req, res) => {
  db.query("SELECT * FROM ppto_a", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de ppto_a:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un registro en la tabla ppto_a
app.post("/api/ppto", (req, res) => {
  const nuevoRegistroPpto = req.body;

  // Consulta a la base de datos para agregar el nuevo registro en ppto_a
  db.query(
    "INSERT INTO ppto_a (OBRA, TRABAJO, MONEDA, PPTO, PPTO_IGV, PPTO_TOTAL) VALUES (?, ?, ?, ?, ?, ?)",
    [
      nuevoRegistroPpto.OBRA,
      nuevoRegistroPpto.TRABAJO,
      nuevoRegistroPpto.MONEDA,
      nuevoRegistroPpto.PPTO,
      nuevoRegistroPpto.PPTO_IGV,
      nuevoRegistroPpto.PPTO_TOTAL,
    ],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar registro en ppto_a:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Registro agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla compras_a
app.get("/api/compras", (req, res) => {
  db.query("SELECT * FROM compras_a", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de compras_a:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un registro en la tabla compras_a
app.post("/api/compras", (req, res) => {
  const nuevaCompra = req.body;

  // Consulta a la base de datos para agregar el nuevo registro en compras_a
  db.query(
    "INSERT INTO compras_a (OBRA, TRABAJO, PROVEEDOR, MONEDA, FORMA DE PAGO, `% IGV`, `% DTR`, VALOR, IGV, TOTAL, PPP, DTR, `FECHA ENTREGA`, OBSERVACIONES) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nuevaCompra.OBRA,
      nuevaCompra.TRABAJO,
      nuevaCompra.PROVEEDOR,
      nuevaCompra.MONEDA,
      nuevaCompra["FORMA DE PAGO"],
      nuevaCompra["% IGV"],
      nuevaCompra["% DTR"],
      nuevaCompra.VALOR,
      nuevaCompra.IGV,
      nuevaCompra.TOTAL,
      nuevaCompra.PPP,
      nuevaCompra.DTR,
      nuevaCompra["FECHA ENTREGA"],
      nuevaCompra.OBSERVACIONES,
    ],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar registro en compras_a:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Registro de compra agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla facturas_a
app.get("/api/facturas", (req, res) => {
  db.query("SELECT * FROM facturas_a", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de facturas_a:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar una factura
app.post("/api/facturas", (req, res) => {
  const nuevaFactura = req.body;

  // Consulta a la base de datos para agregar la nueva factura
  db.query(
    "INSERT INTO facturas_a (ORDEN, DOCUMENTO, `TIPO DOC`, `FECHA DOC`, `FECHA PAGO`, `% IGV`, `% DTR`, VALOR, IGV, TOTAL, DTR, PPP, OC_DOC, DETALLE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nuevaFactura.ORDEN,
      nuevaFactura.DOCUMENTO,
      nuevaFactura["TIPO DOC"],
      nuevaFactura["FECHA DOC"],
      nuevaFactura["FECHA PAGO"],
      nuevaFactura["% IGV"],
      nuevaFactura["% DTR"],
      nuevaFactura.VALOR,
      nuevaFactura.IGV,
      nuevaFactura.TOTAL,
      nuevaFactura.DTR,
      nuevaFactura.PPP,
      nuevaFactura.OC_DOC,
      nuevaFactura.DETALLE,
    ],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar factura:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Factura agregada exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla proveedor_a
app.get("/api/proveedores", (req, res) => {
  db.query("SELECT * FROM proveedor_a", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de proveedor_a:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un proveedor
app.post("/api/proveedores", (req, res) => {
  const nuevoProveedor = req.body;

  // Consulta a la base de datos para agregar el nuevo proveedor
  db.query(
    "INSERT INTO proveedor_a (RUC, PROVEEDOR, CUENTA, BANCO, CONTACTO, TELEFONO, CORREO, igv) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nuevoProveedor.RUC,
      nuevoProveedor.PROVEEDOR,
      nuevoProveedor.CUENTA,
      nuevoProveedor.BANCO,
      nuevoProveedor.CONTACTO,
      nuevoProveedor.TELEFONO,
      nuevoProveedor.CORREO,
      nuevoProveedor.igv,
    ],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar proveedor:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Proveedor agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla pagos_a
app.get("/api/pagos", (req, res) => {
  db.query("SELECT * FROM pagos_a", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de pagos_a:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un pago
app.post("/api/pagos", (req, res) => {
  const nuevoPago = req.body;

  // Consulta a la base de datos para agregar el nuevo pago
  db.query(
    "INSERT INTO pagos_a (OC_DOC, MONEDA, PAGO, `FECHA PAGO`, `FORMA PAGO`, OPERACION, OBSERVACIONES) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      nuevoPago.OC_DOC,
      nuevoPago.MONEDA,
      nuevoPago.PAGO,
      nuevoPago["FECHA PAGO"],
      nuevoPago["FORMA PAGO"],
      nuevoPago.OPERACION,
      nuevoPago.OBSERVACIONES,
    ],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar pago:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Pago agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla factura_ventas
app.get("/api/factura-ventas", (req, res) => {
  db.query("SELECT * FROM `factura ventas`", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de factura ventas:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar una factura de ventas
app.post("/api/factura-ventas", (req, res) => {
  const nuevaFacturaVenta = req.body;

  // Consulta a la base de datos para agregar la nueva factura de ventas
  db.query(
    "INSERT INTO `factura ventas` (documento, fecha_doc, fecha_pago, oc_doc, detalle, obra, VALOR, IGV, TOTAL, forma_de_pago, tipo_documento, moneda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nuevaFacturaVenta.documento,
      nuevaFacturaVenta.fecha_doc,
      nuevaFacturaVenta.fecha_pago,
      nuevaFacturaVenta.oc_doc,
      nuevaFacturaVenta.detalle,
      nuevaFacturaVenta.obra,
      nuevaFacturaVenta.VALOR,
      nuevaFacturaVenta.IGV,
      nuevaFacturaVenta.TOTAL,
      nuevaFacturaVenta.forma_de_pago,
      nuevaFacturaVenta.tipo_documento,
      nuevaFacturaVenta.moneda,
    ],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar factura de ventas:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Factura de ventas agregada exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla 'pagos ventas'
app.get("/api/pagos-ventas", (req, res) => {
  db.query("SELECT * FROM `pagos ventas`", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de pagos ventas:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un pago de ventas
app.post("/api/pagos-ventas", (req, res) => {
  const nuevoPagoVenta = req.body;

  // Consulta a la base de datos para agregar el nuevo pago de ventas
  db.query(
    "INSERT INTO `pagos ventas` (pago, fecha_pago, operacion, observacion, `factura ventas_id`, moneda) VALUES (?, ?, ?, ?, ?, ?)",
    [
      nuevoPagoVenta.pago,
      nuevoPagoVenta.fecha_pago,
      nuevoPagoVenta.operacion,
      nuevoPagoVenta.observacion,
      nuevoPagoVenta.factura_ventas_id,
      nuevoPagoVenta.moneda,
    ],

    (err, resultado) => {
      if (err) {
        console.error("Error al agregar pago de ventas:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Pago de ventas agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla igv
app.get("/api/igv", (req, res) => {
  db.query("SELECT * FROM igv", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de igv:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un registro en la tabla igv
app.post("/api/igv", (req, res) => {
  const nuevoIGV = req.body;

  // Consulta a la base de datos para agregar el nuevo registro en igv
  db.query(
    "INSERT INTO igv (descripcion, porcentaje) VALUES (?, ?)",
    [nuevoIGV.descripcion, nuevoIGV.porcentaje],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar registro en igv:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Registro de IGV agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla 'forma de pago'
app.get("/api/forma-pago", (req, res) => {
  db.query("SELECT * FROM `forma de pago`", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de forma de pago:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar una forma de pago
app.post("/api/forma-pago", (req, res) => {
  const nuevaFormaPago = req.body;

  // Consulta a la base de datos para agregar la nueva forma de pago
  db.query(
    "INSERT INTO `forma de pago` (codigo, descripcion) VALUES (?, ?)",
    [nuevaFormaPago.codigo, nuevaFormaPago.descripcion],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar forma de pago:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Forma de pago agregada exitosamente");
      }
    }
  );
});
// Ruta para obtener datos de la tabla 'tipo documento'
app.get("/api/tipo-documento", (req, res) => {
  db.query("SELECT * FROM `tipo documento`", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de tipo documento:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar un tipo de documento
app.post("/api/tipo-documento", (req, res) => {
  const nuevoTipoDocumento = req.body;

  // Consulta a la base de datos para agregar el nuevo tipo de documento
  db.query(
    "INSERT INTO `tipo documento` (codigo, descripcion) VALUES (?, ?)",
    [nuevoTipoDocumento.codigo, nuevoTipoDocumento.descripcion],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar tipo de documento:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Tipo de documento agregado exitosamente");
      }
    }
  );
});

// Ruta para obtener datos de la tabla 'moneda'
app.get("/api/moneda", (req, res) => {
  db.query("SELECT * FROM moneda", (err, resultados) => {
    if (err) {
      console.error("Error en la consulta de moneda:", err);
      res.status(500).send("Error en el servidor");
    } else {
      res.json(resultados);
    }
  });
});

// Nueva ruta para agregar una moneda
app.post("/api/moneda", (req, res) => {
  const nuevaMoneda = req.body;

  // Consulta a la base de datos para agregar la nueva moneda
  db.query(
    "INSERT INTO moneda (simbolo, nombre) VALUES (?, ?)",
    [nuevaMoneda.simbolo, nuevaMoneda.nombre],
    (err, resultado) => {
      if (err) {
        console.error("Error al agregar moneda:", err);
        res.status(500).send("Error en el servidor");
      } else {
        res.status(201).send("Moneda agregada exitosamente");
      }
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
