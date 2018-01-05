
var SERVER_NAME = 'mobile-online-store'
var PORT = process.env.PORT;


var restify = require('restify')

  // Get a persistence engine for the products
  , productsSave = require('save')('products')
  , productAcessoriesSave = require('save')('product_accessories')
  , productTariffsSave = require('save')('product_tariffs')
  , orderSave = require('save')('orders')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /products')
  console.log(' /products/:id')  
  console.log(' /products/screenSize/:size')  
  console.log(' /products/color/:color')  
  console.log(' /products/memory/:memory')  
  console.log(' /products/:id/accessories')  
  console.log(' /products/:id/accessories/:accessoryId')  
  console.log(' /products/:id/tariffs')  
  console.log(' /products/:id/tariffs/:tariffId')  
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
  server.get('/products/:id', function (req, res, next) {
  
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
  server.post('/products', function (req, res, next) {
  
    // Make sure name is defined
    if (req.params.name === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter name of phone.'))
    }
    if (req.params.userName === undefined ) {
      // If there are any errors, pass them to next in the correct format
      return next(new restify.InvalidArgumentError('Please enter User Names.'))
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
      userName: req.params.userName,
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
server.get('/orders/:userName', function (req, res, next) {
  
  // Find a single product by their id within save
  orderSave.find({ _userName: req.params.userName }, function (error, order) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    if (order) {
      // Send the product if no issues
      res.send(order)
    } else {
      // Send 404 header if the product doesn't exist
      res.send(404)
    }
  })
})


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
server.post('/orders', function (req, res, next) {
  
  // Make sure name is defined
  if (req.params.totalCost === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Please enter Total Cost'))
  }
  if (req.params.quantity === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Please enter Quantity'))
  }
  if (req.params.nameOfTariff === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Please enter Name of Tariff'))
  }
  if (req.params.nameOfPhone === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('Please enter Name of Phone'))
  }
  
  var newOrders = {
    totalCost: req.params.totalCost, 
    quantity: req.params.quantity,
    nameOfTariff: req.params.nameOfTariff,
    nameOfAccessory: req.params.nameOfAccessory,
    nameOfPhone: req.params.nameOfPhone
  }

  // Create the order using the persistence engine
  orderSave.create( newOrder, function (error, order) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the product if no issues
    res.send(201, order)
  })
})
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Update a product by their id
  server.put('/products/:id', function (req, res, next) {
  
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
      name: req.params.name,
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
  server.del('/products/:id', function (req, res, next) {
  
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
    productsSave.deleteMany({},function(error,products){
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

      productTariffsSave.deleteMany({},function(error,products){
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send('All Tariffs of Products Deleted')
      })  

      productAcessoriesSave.deleteMany({},function(error,products){
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        res.send('All Accessories of Products Deleted')
      })  
      
        res.send('All Products Deleted')

    })
  
  })
    
    

    // Get all accessories of particular product
server.get('/products/:id/accessories', function (req, res, next) {
  productAcessoriesSave.find({ product_id: req.params.id }, function (error, productAcessories) {
  res.send(productAcessories)
 })
})

  //Create an accessory for a product
server.post('/products/:id/accessories', function (req, res, next) {
  
    if (req.params.cost === undefined ) {
      return next(new restify.InvalidArgumentError('cost must be supplied'))
    }

    if (req.params.name === undefined ) {
      return next(new restify.InvalidArgumentError('name must be supplied'))
    }

    if (req.params.brand === undefined ) {
      return next(new restify.InvalidArgumentError('brand must be supplied'))
    }
    
    var newProductAccessory = {
      product_id: req.params.id,
      cost: req.params.cost, 
      name: req.params.name,
      brand: req.params.brand

    }
  
    productAcessoriesSave.create( newProductAccessory, function (error, product) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
      res.send(201, newProductAccessory)
    })
  })
  
  
  //Delete an accessory of the product
  server.del('/products/:id/accessories/:accesoryId', function (req, res, next) {
    
      // Delete the product with the persistence engine
      productAcessoriesSave.delete(req.params.accesoryId, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send()
      })
    
    })

    
  // Update a accessory of a product by their id
  server.put('/products/:id/accessories/:accessoryId', function (req, res, next) {
    
      // Make sure name is defined
      if (req.params.cost === undefined ) {
        return next(new restify.InvalidArgumentError('cost must be supplied'))
      }
  
      if (req.params.name === undefined ) {
        return next(new restify.InvalidArgumentError('name must be supplied'))
      }
  
      if (req.params.brand === undefined ) {
        return next(new restify.InvalidArgumentError('brand must be supplied'))
      }
            
      var newProductAccessory = {
        _id: req.params.accessoryId,
        product_id: req.params.id, 
        cost: req.params.cost, 
        name: req.params.name,
        brand: req.params.brand
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
server.get('/products/:id/tariffs', function (req, res, next) {
  productTariffsSave.find({ product_id: req.params.id }, function (error, productTariffs) {
  res.send(productTariffs)
 })
})

  //Create an tariff for a product
server.post('/products/:id/tariffs', function (req, res, next) {
  
    if (req.params.upfrontCost === undefined ) {
      return next(new restify.InvalidArgumentError('upfrontCost must be supplied'))
    }

    if (req.params.name === undefined ) {
      return next(new restify.InvalidArgumentError('name must be supplied'))
    }

    if (req.params.data === undefined ) {
      return next(new restify.InvalidArgumentError('data must be supplied'))
    }
    if (req.params.monthly === undefined ) {
      return next(new restify.InvalidArgumentError('monthly must be supplied'))
    }
      
    if (req.params.minutes === undefined ) {
      return next(new restify.InvalidArgumentError('minutes must be supplied'))
    }

    if (req.params.texts === undefined ) {
      return next(new restify.InvalidArgumentError('texts must be supplied'))
    }
    
    var newProductTariff = {
      product_id: req.params.id, 
      upfrontCost: req.params.upfrontCost, 
      name: req.params.name,
      data: req.params.data,
      monthly: req.params.monthly,
      minutes: req.params.minutes,
      texts:req.params.texts
      
      
    }
  
    productTariffsSave.create( newProductTariff, function (error, product) {
      if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
      res.send(201, newProductTariff)
    })
  })
  
  
  //Delete an tariff of the product
  server.del('/products/:id/tariffs/:tariffId', function (req, res, next) {
    
      // Delete the product with the persistence engine
      productTariffsSave.delete(req.params.tariffId, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send()
      })
    
    })

    
  // Update a tariff of a product by their id
  server.put('/products/:id/tariffs/:tariffId', function (req, res, next) {
    
      // Make sure name is defined
      
      if (req.params.upfrontCost === undefined ) {
        return next(new restify.InvalidArgumentError('upfrontCost must be supplied'))
      }
  
      if (req.params.name === undefined ) {
        return next(new restify.InvalidArgumentError('name must be supplied'))
      }
  
      if (req.params.data === undefined ) {
        return next(new restify.InvalidArgumentError('data must be supplied'))
      }
      if (req.params.monthly === undefined ) {
        return next(new restify.InvalidArgumentError('monthly must be supplied'))
      }
        
      if (req.params.minutes === undefined ) {
        return next(new restify.InvalidArgumentError('minutes must be supplied'))
      }
  
      if (req.params.texts === undefined ) {
        return next(new restify.InvalidArgumentError('texts must be supplied'))
      }
            
      var newProductTariff = {
        _id: req.params.tariffId,
        product_id: req.params.id, 
        upfrontCost: req.params.upfrontCost, 
        name: req.params.name,
        data: req.params.data,
        monthly: req.params.monthly,
        minutes: req.params.minutes,
        texts:req.params.texts
  
      }
      
      // Update the product with the persistence engine
      productTariffsSave.update(newProductTariff, function (error, product) {
    
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    
        // Send a 200 OK response
        res.send(200)
      })
    })

     // Get all product using filter size
server.get('/products/screenSize/:size', function (req, res, next) {
  productsSave.find({ screenSize: req.params.size }, function (error, product) {
  res.send(product)
 })
})

// Get all product using filter color
server.get('/products/color/:color', function (req, res, next) {
  productsSave.find({ color: req.params.color }, function (error, product) {
  res.send(product)
 })
})

// Get all product using filter memory
server.get('/products/memory/:memory', function (req, res, next) {
  productsSave.find({ memory: req.params.memory }, function (error, product) {
  res.send(product)
 })
})


server.get('/products/brand/:brand', function (req, res, next) {
  productsSave.find({ brand: req.params.brand}, function (error, product) {
  res.send(product)
 })
})

server.get('/products/name/:name', function (req, res, next) {
  productsSave.find({ name: req.params.name}, function (error, product) {
  res.send(product)
 })
})