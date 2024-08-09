# Documentación general

## Nombres clave

**Este título es aplicable a la documentación del front-end**

1. Cada vez que se quiera 📖 **leer** o 🔎 **encontrar** un dato/documento, se usa la palabra clave *find*. **Ejemplo**:
    - findBought()
    - findComment()
    - findCourse()
    - findFile()
    - findUser()

2. Cada vez que se quiera ➕ **crear** un dato/documento, se usa la palabra clave *register*. **Ejemplo**:
    - registerBuy()
    - registerComment()
    - registerCourse()
    - registerNotification()
    - registerUser()

3. Cada vez que se quiera 🗑 **eliminar** un dato/documento, se usa la palabra clave *remove*. **Ejemplo**:
    - deleteCourse()
    - deleteUser()

4. Cada vez que se quiera ♻ **actualizar** un dato/documento, se usa la palabra clave *patch*. **Ejemplo**:
    - updateBought()
    - updateCourse()
    - updateEmail()
    - updateIndividualBought()
    - updatePassword()
    - updateUser()

5. Cada vez que se quiera ✅ **validar** un dato ingresado por el usuario/cliente, se usa la palabra clave *validate*. **Ejemplo**:
    - validateUser()
    - validatePassword()

6. Cada vez que se quiera 🧮 **calcular** un dato/documento, se usa la palabra clave *calc*. **Ejemplo**:
    - calcExpirationDate()
    - calcSomething()

7. Cada vez que se quiera ⏬ **descargar** un archivo, se usa la palabra clave *download*. **Ejemplo**:
    - downloadFile()

8.  Cada vez que se quiera 〰 **stremear** un archivo, se usa la palabra clave *stream*. **Ejemplo**:
    - streamFile()

9.  Cada vez que se quiera 👓 **traducir** un string, se usa la palabra clave *translate*. **Ejemplo**:
    - translatePaymentMethod()

### Aclaración

Estos helpers no siempre realizan consultas directas con la base de datos. Por ejemplo, **checkUserPassword()** requiere que **findUser()** le pase la compra, *checkUserPassword* no la busca por si solo.
En otros casos, como los de **checkEmail()**, capta el input del usuario (no requiere otro helper previamente), realiza una validación con regex y devuelve si es un email válido.

## 'return' de back-end

Todas las rutas back-end deberán devolver al front-end mediante esta sintáxis:

```js
res.send({
    success: result && result._id ? true : false,
    data: {
        result
    },
    msg: msg
});
```

### Procedimiento de búsqueda en modelos de datos específicos

Los modelos de datos **Bought**, **Comment** y **Notification** deben buscarse con la función **Document**.findOne(), porque solo existe un documento por cada usuario en la Base de datos. Estos modelos contienen un array para guardar más información dentro (llamada *items* en todos los casos). Mediante **items[]**, se pueden guardar todos los datos relacionados a cada modelo de datos (*Bought*, *Comment* y *Notification*) para ese usuario.

### Qué información se filtra al front-end

El front-end puede decidir qué campos del documento consultar, mediante la variable **select** presente en todos los helpers (ejemplo de helper que tiene ésta característica: **findBought()**). El back-end, bajo circunstancias como las mencionadas en el título de arriba, no solo devolverá el array **items[]**, sino también campos como *userID* o *_id*, que están en el mismo nivel jerárquico que el array. (ver imágen)

![imagen](./src/notification-model-back-end-print.jpg)
    
## Métodos HTTP

![#](https://user-images.githubusercontent.com/4013025/48322141-cf7af680-e604-11e8-8a76-ae4d92a83793.png)

- Para **consultar** un dato con la base de datos: *GET*
- Para **registrar** un dato en la base de datos: *POST*
- Para **actualizar** datos, parcial o totalmente, de un registro de la base de datos: *PATCH*
- Para **eliminar** un dato de la base de datos: *DELETE*