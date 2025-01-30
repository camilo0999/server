# API - GESTION DE PRODUCTOS

## 📌 Descripción

Este proyecto es una API desarrollada en Node.js con Express que gestiona [descripción breve de la funcionalidad de la API]. Está diseñada para ser escalable y fácil de mantener.

## ⚙️ Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

```bash
# Clonar el repositorio
git clone https://github.com/camilo0999/server.git

# Acceder al directorio del proyecto
cd server

# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

## 🌐 Rutas de acceso a la API

La API expone las siguientes rutas:

### 🔐 Autenticación

- `POST /api/auth/login` - Inicia sesión en la aplicación.
- `POST /api/auth/register` - Registra un nuevo usuario.

### 👥 Usuarios

- `GET /api/users` - Obtiene la lista de usuarios.
- `GET /api/users/:id` - Obtiene la información de un usuario específico.
- `PUT /api/users/:id` - Actualiza la información de un usuario.
- `DELETE /api/users/:id` - Elimina un usuario.

### 📦 Inventario

- `GET /api/inventory/` - Obtiene todos los productos en inventario.
- `GET /api/inventory/output` - Obtiene los productos de salida.
- `GET /api/inventory/input` - Obtiene los productos de entrada.
- `GET /api/inventory/product/:id` - Obtiene un producto por su ID.
- `GET /api/inventory/:id` - Obtiene un inventario por su ID.

### 🧾 Facturas

- `GET /api/invoices/:id` - Descarga la factura correspondiente al ID.

### 🛒 Productos

- `GET /api/products/` - Obtiene la lista de productos.
- `GET /api/products/:id` - Obtiene un producto por su ID.
- `POST /api/products/` - Crea un nuevo producto.
- `PUT /api/products/:id` - Actualiza un producto por su ID.
- `DELETE /api/products/:id` - Elimina un producto por su ID.

### 🛍️ Compras

- `POST /api/shopping/` - Crea una nueva compra.
- `GET /api/shopping/` - Obtiene todas las compras.
- `GET /api/shopping/:id` - Obtiene una compra por su ID.
- `GET /api/shopping/search/:status` - Obtiene compras por estado.
- `GET /api/shopping/user/:id` - Obtiene todas las compras de un usuario.
- `DELETE /api/shopping/:id` - Elimina una compra por su ID.
  
## 🚀 Servicio en Render

La API está desplegada en Render y puede ser accedida desde la siguiente URL:

[**https://server-clce.onrender.com**]

