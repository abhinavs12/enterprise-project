var request = require("request");

var productsUrl = "https://onlinemobilestore.herokuapp.com/products"
var accessoriesUrl = "https://onlinemobilestore.herokuapp.com/accessories"
var tariffsUrl = "https://onlinemobilestore.herokuapp.com/tariffs"
var productsByIdUrl = "https://onlinemobilestore.herokuapp.com/products/1"


describe("Products", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      request.get(productsUrl, function(error, response, body) {
    
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns error", function() {
        request.get(productsUrl, function(error, response, body) {
          expect(error).toThrowError(Error);
          done();
        });
      });
  });
});

describe("Products By ID", function() {
    describe("GET /", function() {
      it("returns status code 200", function() {
        request.get(productsByIdUrl, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });

      it("returns error", function() {
        request.get(productsByIdUrl, function(error, response, body) {
          expect(error).toThrowError(Error);
          done();
        });
      });

    });
  });

  describe("Accessories", function() {
    describe("GET /", function() {
      it("returns status code 200", function() {
        request.get(accessoriesUrl, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });

      it("returns error", function() {
        request.get(accessoriesUrl, function(error, response, body) {
          expect(error).toThrowError(Error);
          done();
        });
      });
    });
  });

  describe("Tariffs", function() {
    describe("GET /", function() {
      it("returns status code 200", function() {
        request.get(tariffsUrl, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });

      it("returns error", function() {
        request.get(tariffsUrl, function(error, response, body) {
          expect(error).toBe(200);
          done();
        });
      });
    });
  });