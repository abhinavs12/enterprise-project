
var SERVER_NAME = 'mobile-online-store'
var PORT = 4005;
var HOST = '127.0.0.1';


var restify = require('restify')

  // Get a persistence engine for the products
  , productsSave = require('save')('products')
  , productAcessoriesSave = require('save')('product_accessories')
  , productTariffsSave = require('save')('product_tariffs')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /products')
  console.log(' /products/:id')  
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

  
// Get all products in the system
server.get('/products', function (req, res, next) {
  
    // Find every entity within the given collection
    productsSave.find({}, function (error, products) {
  
      // Return all of the products in the system
      res.send(products)
    })
  })
  
  // Get a single product by their product id
  server.get('/product/:id', function (req, res, next) {
  
    // Find a single product by their id within save
    productsSave.findOne({ _id: req.params.id }, function (error, product) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      if (product) {
        // Send the product if no issues
        res.send(product)
      } else {
        // Send 404 header if the product doesn't exist
        res.send(404)
      }
    })
  })
  
  // Create a new product
  server.post('/product', function (req, res, next) {
  
    // Make sure name is defined
    if (req.params.name === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter name of phone.'))
    }
    if (req.params.brand === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter brand of phone.'))
    }
    if (req.params.memory === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter memory of the phone.'))
    }
    if (req.params.color === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter color of the phone.'))
    }
    if (req.params.screenSize === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter screen size of the phone'))
    }
    var newProduct = {
      name: req.params.name, 
      brand: req.params.brand,
      memory: req.params.memory,
      color: req.params.color,
      screenSize: req.params.screenSize
    }
  
    // Create the product using the persistence engine
    productsSave.create( newProduct, function (error, product) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send the product if no issues
      res.send(201, product)
    })
  })
  
  // Update a product by their id
  server.put('/product/:id', function (req, res, next) {
  
    // Make sure name is defined
    if (req.params.name === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter the name of the phone.'))
    }
    if (req.params.brand === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter the brand of the phone.'))
    }
    if (req.params.memory === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter memory of the phone.'))
    }
    if (req.params.color === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter color of the phone.'))
    }
    if (req.params.screenSize === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter screen size of the phone'))
    }
    
    var newProduct = {
      _id: req.params.id,
      brand: req.params.brand,
      memory: req.params.memory,
      color: req.params.color,
      screenSize: req.params.screenSize
    }
    
    // Update the product with the persistence engine
    productsSave.update(newProduct, function (error, product) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send a 200 OK response
      res.send(200)
    })
  })
  
  // Delete product with the given id
  server.del('/product/:id', function (req, res, next) {
  
    // Delete the product with the persistence engine
  productsSave.delete(req.params.id, function (error, product) {
  
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
  
      // Send a 200 OK response
      res.send()
    })
  
  })
  
  //Delete all products
  server.del('/products', function(req,res,next){
    
    productsSave.delete(any,function(error,products){
    
    if(error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
    res.send()
    
    })
    
    })

    // Get all accessories of particular product
server.get('/product/:id/accessories', function (req, res, next) {
  productAcessoriesSave.find({ product_id: req.params.id }, function (error, productAcessories) {
  res.send(productAcessories)
 })
})

  //Create an accessory for a product
server.post('/product/:id/accessory', function (req, res, next) {
  
    if (req.params.name === undefined ) {
      return next(new restify.InvalidArgumentError('name must be supplied'))
    }
      
    
    var newProductAccessory = {
      product_id: req.params.id, 
      name: req.params.name
    }
  
    productAcessoriesSave.create( newProductAccessory, function (error, product) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
      res.send(201, newProductAccessory)
    })
  })
  
  
  //Delete an accessory of the product
  server.del('/product/:id/accessory/:accesoryId', function (req, res, next) {
    
      // Delete the product with the persistence engine
      productAcessoriesSave.delete(req.params.accesoryId, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send()
      })
    
    })

    
  // Update a accessory of a product by their id
  server.put('/product/:id/accessory/:accessoryId', function (req, res, next) {
    
      // Make sure name is defined
      if (req.params.name === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('enter name.'))
      }
            
      var newProductAccessory = {
        _id: req.params.accessoryId,
        product_id: req.params.id, 
        name: req.params.name
      }
      
      // Update the product with the persistence engine
      productAcessoriesSave.update(newProductAccessory, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send(200)
      })
    })

    // Get all tariffs of particular product
server.get('/product/:id/tariffs', function (req, res, next) {
  productTariffsSave.find({ product_id: req.params.id }, function (error, productTariffs) {
  res.send(productTariffs)
 })
})

  //Create an tariff for a product
server.post('/product/:id/tariff', function (req, res, next) {
  
    if (req.params.name === undefined ) {
      return next(new restify.InvalidArgumentError('name must be supplied'))
    }
      
    
    var newProductTariff = {
      product_id: req.params.id, 
      name: req.params.name
    }
  
    productTariffsSave.create( newProductTariff, function (error, product) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
      res.send(201, newProductTariff)
    })
  })
  
  
  //Delete an accessory of the product
  server.del('/product/:id/tariff/:tariffId', function (req, res, next) {
    
      // Delete the product with the persistence engine
      productTariffsSave.delete(req.params.tariffId, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send()
      })
    
    })

    
  // Update a accessory of a product by their id
  server.put('/product/:id/tariff/:tariffId', function (req, res, next) {
    
      // Make sure name is defined
      if (req.params.name === undefined ) {
        // If there are any errors, pass them to next in the correct format
        return next(new restify.InvalidArgumentError('enter name.'))
      }
            
      var newProductTariff = {
        _id: req.params.tariffId,
        product_id: req.params.id, 
        name: req.params.name
      }
      
      // Update the product with the persistence engine
      productTariffsSave.update(newProductTariff, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send(200)
      })
    })

    