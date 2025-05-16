// callbacks - each function takes a callback parameter which is a 
// function to be called once the async operation completes
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Fetched user");
    callback({ id, name: "Tom" });
  }, 1000);
}

function getOrders(userId, callback) {
  setTimeout(() => {
    console.log("Fetched orders");
    callback([{ orderId: 1, item: "Laptop" }, { orderId: 2, item: "Phone" }]);
  }, 1000);
}

function processPayment(orderId, callback) {
  setTimeout(() => {
    console.log("Processed payment for order", orderId);
    callback(true);
  }, 1000);
}

// Callback Hell Example
getUser(123, (user) => {
  getOrders(user.id, (orders) => {
    processPayment(orders[0].orderId, (success) => {
      if (success) {
        console.log("Payment Successful!");
      }
    });
  });
});

// promises chain

function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetched user");
      resolve({ id, name: "Tom" });
    }, 1000);
  });
}

function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetched orders");
      resolve([{ orderId: 1, item: "Laptop" }, { orderId: 2, item: "Phone" }]);
    }, 1000);
  });
}

function processPayment(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Processed payment for order", orderId);
      resolve(true);
    }, 1000);
  });
}

// Clean Async Flow
getUser(123)
  .then((user) => getOrders(user.id))
  .then((orders) => processPayment(orders[0].orderId))
  .then((success) => {
    if (success) console.log("Payment Successful!");
  })
  .catch((error) => console.error("Error:", error));



