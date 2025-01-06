# Proyecto DID con Algorand

Este proyecto demuestra cómo crear y resolver Identificadores Descentralizados (DID) utilizando cuentas de Algorand y notas en transacciones.

## Requisitos

- Node.js
- npm

## Instalación

1. Clona este repositorio:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Crea un archivo  en la raíz del proyecto con el siguiente contenido:
    ```env
    DEPLOYER_MNEMONIC="tu_mnemonico_aqui"
    ```

## Uso

### Generar y Registrar un DID



1. Ejecuta el script:
    ```sh
    node index.js
    ```

   Esto generará una nueva cuenta de Algorand, construirá un DID y registrará el documento DID en una transacción.

### Resolver un DID

1. Ejecuta el script :
    ```sh
    node resolver.js
    ```

   Esto resolverá el DID especificado y mostrará los documentos DID almacenados en las notas de las transacciones.

## Estructura del Proyecto

- : Genera una cuenta de Algorand, construye un DID y registra el documento DID en una transacción.
- : Resuelve un DID extrayendo y decodificando las notas de las transacciones de una cuenta de Algorand.
- : Archivo de configuración para almacenar el mnemónico del desplegador.
- : Archivo de configuración del proyecto y dependencias.

## Dependencias

- : SDK de Algorand para interactuar con la blockchain de Algorand.
- `dotenv`: Carga variables de entorno desde un archivo .

## Licencia

Este proyecto está licenciado bajo la Licencia ISC.
---
## Autor 
Dimar Borda