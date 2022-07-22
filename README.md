# ABOUT THE PROJECT

The goal of this application is to implement RESTful JSON APIs that will enable the management of purchasing groups.

<p align="right">(<a href="#top">back to top</a>)</p>

# DESCRIPTION

The user through the use of our backend will be able to make api calls to our service so that they can add, edit, delete and update products, customers and orders.

<p align="right">(<a href="#top">back to top</a>)</p>

# HOW TO USE THE APPLICATION

The application does not have any front-end, in order to be able to view, add, update and delete data it is advisable to use the service offered by Postman.

The back-end provide for the use of three paths for data manipulation:

1. Products;
2. Users;
3. Orders.

<p align="right">(<a href="#top">back to top</a>)</p>

## PRODUCTS

To perform manipulation of product data you will need to make requests at the following link:

![](img/prodotto-get-url.png)

### POST

To add a new product you will need to use the following schema:

![](img/Prodotto-post-schema.png)

### GET

 Requests for product display will be able to be made generically:

 ![](img/prodotto-get-url.png)
  
Result:

![](img/prodotto-get-full.png)

 or specific using (if you know) the id of the product:

 ![](img/prodotto-get-url-id.png)

 Result:
 
![](img/prodotto-get-id.png)

### PATCH

In order to make the request to edit a product, you will first need to know its ID:
The pattern will be the same as that of a POST call.

If successful, the following message will be displayed:

![](img/prodotto-patch-succes-full.png)

In case of an error this message will be displayed:

![](img/prodotto-patch-error.png)

### DELETE

To be able to carry out the deletion of a product it will be enough to know only its ID:

Display if successful:

![](img/Prodotto-delete-succes.png)

Display in case of error:

![](img/prodotto-delete-error.png)

<p align="right">(<a href="#top">back to top</a>)</p>

## USERS

To carry out manipulation of product data, requests will need to be made at the following link:

![](img/users-url.png)

### POST

To add a new user you will need to use the following scheme:

![](img/users-post-schema.png)

### GET

 Requests for viewing users will be able to be made generically:
 
 ![](img/users-url.png)
 
Result:

![](img/users-get-full.png)

 or specific using (if you know) the user id:
 
![](img/users-url-id.png)

Result:

![](img/users-get-id.png)

### PATCH

In order to make the request to edit a user, you will first need to know the user's id:
The pattern will be the same as that of a POST call.

If successful, the following message will be displayed:

![](img/users-patch-success.png)

In case of an error this message will be displayed:

![](img/users-patch-error.png)

### DELETE

In order to be able to carry out the deletion of a user it will be enough to know only his ID:
Display in case of success:

![](img/users-delete-success.png)

Display in case of error:

![](img/users-delete-error.png)

<p align="right">(<a href="#top">back to top</a>)</p>

## ORDERS

To carry out manipulation of order data, requests will need to be made at the following link:

![](img/orders-url.png)

### POST

To add a new user you will need to use the following scheme:

![](img/orders-post-schema.png)

### GET

 Requests for displaying products may be made generically or using the date and name filter:

 1. GENERIC

 ![](img/orders-url.png)

 Result:

 ![](img/orders-get-full.png)

 1. SPECIFY

 Or specify using (if you know) the product id.

 ![](img/orders-url-id.png)

Result:

 ![](img/order-get-id.png)

 Display in case of error:

![](img/order-get-id-error.png)

3. USING THE FILTER

![](img/orders-get-filter.png)

Result:

![](img/order-get-filter.png)

Display in case of error:

![](img/order-get-filter-error.png)

### PATCH

In order to make the request to the modification of a product, we will first need to know its ID.
The pattern will be the same as that of a POST call.

If successful, the following message will be displayed:

![](img/orders-patch-success.png)

In case of an error this message will be displayed:

![](img/orders-patch-error.png)

### DELETE

To be able to carry out the deletion of a product it will be enough to know only its ID:
Display if successful:

![](img/orders-delete-success.png)

Display in case of error:

![](img/orders-delete-error.png)

<p align="right">(<a href="#top">back to top</a>)</p>

## APPLICATION DEPENDENCIES

### CORS

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

### DOTENV

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

### EXPRESS

Fast, unopinionated, minimalist web framework for node.

### MONGOOSE

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

<p align="right">(<a href="#top">back to top</a>)</p>

 ## CONTACTS

Email: [gennuso.biagio@gmail.com](mailto:gennuso.biagio@gmail.com)

Github: [PoF](https://github.com/bilabixxx/pof)

<p align="right">(<a href="#top">back to top</a>)</p>