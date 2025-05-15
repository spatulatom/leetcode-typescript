// can we go typeof on promises and see whatr are they - or wht is thier closes prototype ? and the full protot[e chain?

console.log(typeof new Promise(() => {})); // "object"

let promise = new Promise(() => {});
console.log(Object.getPrototypeOf(promise)); // Promise.prototype
console.log(Object.getPrototypeOf(Promise.prototype)); // Object.prototype
console.log(Object.getPrototypeOf(Object.prototype)); // null

console.log(Object.getPrototypeOf(Object.prototype)); // null

// Breakdown of the Prototype Chain
// Instance Level → new Promise() inherits from Promise.prototype.

// Constructor Level → Promise.prototype inherits from Object.prototype.

// Root Level → Object.prototype is the top ancestor, and its prototype is null.

// Closest Prototype
// The closest prototype of a Promise instance is
// Promise.prototype, which provides methods like .then(), .catch(), and .finally().

// lets create an example of an async function that would not utilize promises but callbacks
function asyncFunction(callback: Function) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

// ------------------------------------------------------------------
// COMPARISON: CALLBACKS VS PROMISES
// ------------------------------------------------------------------
console.log("\n--- CALLBACK VS PROMISE EXAMPLES ---\n");

// EXAMPLE 1: Simple async operation
console.log("EXAMPLE 1: Simple async operation");

// Callback style
function fetchDataWithCallback(
  id: string,
  onSuccess: (data: any) => void,
  onError: (error: Error) => void
) {
  console.log(`[Callback] Fetching data for id: ${id}...`);
  setTimeout(() => {
    if (id === "invalid") {
      onError(new Error("Invalid ID"));
    } else {
      onSuccess({ id: id, name: "Example Item" });
    }
  }, 1000);
}

// Promise style - same functionality
function fetchDataWithPromise(id: string): Promise<any> {
  console.log(`[Promise] Fetching data for id: ${id}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === "invalid") {
        reject(new Error("Invalid ID"));
      } else {
        resolve({ id: id, name: "Example Item" });
      }
    }, 1000);
  });
}

// Using the callback version
console.log("Starting callback version...");
fetchDataWithCallback(
  "123",
  (data) => console.log("[Callback] Success:", data),
  (error) => console.error("[Callback] Error:", error.message)
);

// Using the Promise version
console.log("Starting Promise version...");
fetchDataWithPromise("123")
  .then((data) => console.log("[Promise] Success:", data))
  .catch((error) => console.error("[Promise] Error:", error.message));

// EXAMPLE 2: Chaining multiple async operations
console.log("\nEXAMPLE 2: Chaining async operations");

// Callback style - multiple operations in sequence
function getUserByIdCallback(userId: string, callback: (user: any) => void) {
  console.log(`[Callback] Getting user ${userId}`);
  setTimeout(() => {
    callback({ id: userId, name: "John Doe" });
  }, 1000);
}

function getPostsByUserCallback(user: any, callback: (posts: any[]) => void) {
  console.log(`[Callback] Getting posts for user: ${user.name}`);
  setTimeout(() => {
    callback([
      { id: "post1", title: "First Post", userId: user.id },
      { id: "post2", title: "Second Post", userId: user.id },
    ]);
  }, 1000);
}

// Promise style - same operations
function getUserByIdPromise(userId: string): Promise<any> {
  console.log(`[Promise] Getting user ${userId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe" });
    }, 1000);
  });
}

function getPostsByUserPromise(user: any): Promise<any[]> {
  console.log(`[Promise] Getting posts for user: ${user.name}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "post1", title: "First Post", userId: user.id },
        { id: "post2", title: "Second Post", userId: user.id },
      ]);
    }, 1000);
  });
}

// Using callbacks - notice the nesting!
console.log("Starting callback chain...");
getUserByIdCallback("user123", (user) => {
  console.log("[Callback] Got user:", user);

  getPostsByUserCallback(user, (posts) => {
    console.log("[Callback] Got posts:", posts);
  });
});

// Using Promises - cleaner chaining
console.log("Starting Promise chain...");
getUserByIdPromise("user123")
  .then((user) => {
    console.log("[Promise] Got user:", user);
    return getPostsByUserPromise(user);
  })
  .then((posts) => {
    console.log("[Promise] Got posts:", posts);
  });

// EXAMPLE 3: Error handling
console.log("\nEXAMPLE 3: Error handling");

// Callback style with error handling
function processDataCallback(
  data: string,
  onSuccess: (result: string) => void,
  onError: (err: Error) => void
) {
  console.log("[Callback] Processing data...");
  setTimeout(() => {
    try {
      if (data === "") {
        throw new Error("Empty data");
      }
      const result = `Processed: ${data.toUpperCase()}`;
      onSuccess(result);
    } catch (error) {
      onError(error instanceof Error ? error : new Error("Unknown error"));
    }
  }, 1000);
}

// Promise style with error handling
function processDataPromise(data: string): Promise<string> {
  console.log("[Promise] Processing data...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (data === "") {
          throw new Error("Empty data");
        }
        const result = `Processed: ${data.toUpperCase()}`;
        resolve(result);
      } catch (error) {
        reject(error instanceof Error ? error : new Error("Unknown error"));
      }
    }, 1000);
  });
}

// Using callbacks
console.log("Starting callback error example...");
processDataCallback(
  "hello",
  (result) => console.log("[Callback] Process success:", result),
  (error) => console.error("[Callback] Process error:", error.message)
);

// Error case with callbacks
processDataCallback(
  "",
  (result) => console.log("[Callback] This won't run"),
  (error) => console.error("[Callback] Caught error:", error.message)
);

// Using Promises
console.log("Starting Promise error example...");
processDataPromise("hello")
  .then((result) => console.log("[Promise] Process success:", result))
  .catch((error) => console.error("[Promise] Process error:", error.message));

// Error case with Promises
processDataPromise("")
  .then((result) => console.log("[Promise] This won't run"))
  .catch((error) => console.error("[Promise] Caught error:", error.message));

// EXAMPLE 4: Multiple parallel operations
console.log("\nEXAMPLE 4: Parallel operations");

// Helper functions
function fetchItem1(callback: (data: string) => void) {
  setTimeout(() => callback("Item 1 data"), 1000);
}

function fetchItem2(callback: (data: string) => void) {
  setTimeout(() => callback("Item 2 data"), 800);
}

function fetchItem1Promise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Item 1 data"), 1000);
  });
}

function fetchItem2Promise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Item 2 data"), 800);
  });
}

// Callback style parallel operations
console.log("Starting parallel callbacks...");
let item1Data: string | null = null;
let item2Data: string | null = null;

function checkAllDone() {
  if (item1Data !== null && item2Data !== null) {
    console.log("[Callback] All items fetched:", {
      item1: item1Data,
      item2: item2Data,
    });
  }
}

fetchItem1((data) => {
  item1Data = data;
  console.log("[Callback] Item 1 fetched");
  checkAllDone();
});

fetchItem2((data) => {
  item2Data = data;
  console.log("[Callback] Item 2 fetched");
  checkAllDone();
});

// Promise style parallel operations
console.log("Starting parallel Promises...");
Promise.all([fetchItem1Promise(), fetchItem2Promise()]).then(
  ([item1, item2]) => {
    console.log("[Promise] All items fetched:", { item1, item2 });
  }
);

// EXAMPLE 5: Converting from callbacks to Promises
console.log("\nEXAMPLE 5: Converting callback API to Promise");

// Original callback-based API
function legacyApiCall(
  query: string,
  callback: (error: Error | null, results?: string[]) => void
) {
  console.log(`[Legacy API] Searching for: ${query}`);
  setTimeout(() => {
    if (query.length < 3) {
      callback(new Error("Query too short"));
    } else {
      callback(null, [`Result 1 for ${query}`, `Result 2 for ${query}`]);
    }
  }, 1000);
}

// Converting to Promise-based API
function modernApiCall(query: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    legacyApiCall(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results!);
      }
    });
  });
}

// Using the callback API
console.log("Using legacy callback API...");
legacyApiCall("javascript", (error, results) => {
  if (error) {
    console.error("[Legacy] Error:", error.message);
  } else {
    console.log("[Legacy] Results:", results);
  }
});

// Using the Promise-based wrapper
console.log("Using modern Promise API...");
modernApiCall("javascript")
  .then((results) => console.log("[Modern] Results:", results))
  .catch((error) => console.error("[Modern] Error:", error.message));

console.log("\n--- END OF COMPARISON ---\n");

// ------------------------------------------------------------------
// KEY DIFFERENCES EXPLAINED
// ------------------------------------------------------------------
console.log("\n--- KEY DIFFERENCES BETWEEN CALLBACKS AND PROMISES ---\n");

console.log("1. Return values vs Callback parameters:");
console.log("   - Callbacks: Data is passed to callback functions");
console.log("   - Promises: Data is returned via Promise resolution");

console.log("\n2. Error handling:");
console.log("   - Callbacks: Separate error callback or try/catch");
console.log("   - Promises: Unified .catch() method or rejection handler");

console.log("\n3. Flow control:");
console.log("   - Callbacks: Nested functions (pyramid of doom)");
console.log("   - Promises: Flat chaining with .then()");

console.log("\n4. Composition:");
console.log("   - Callbacks: Difficult to compose multiple async operations");
console.log("   - Promises: Easy with Promise.all, Promise.race, etc.");

console.log("\n5. Guarantees:");
console.log("   - Callbacks: Can potentially be called multiple times");
console.log(
  "   - Promises: Always settled exactly once (resolved or rejected)"
);

// ------------------------------------------------------------------
// ASYNC/AWAIT - BUILT ON PROMISES BUT WITH CLEANER SYNTAX
// ------------------------------------------------------------------
console.log("\n--- ASYNC/AWAIT EXAMPLES ---\n");

// The same Promise-based functions can be used with async/await
async function fetchUserAndPosts() {
  console.log("Starting async/await example...");

  try {
    // Await pauses execution until the Promise resolves
    const user = await getUserByIdPromise("user123");
    console.log("[Async/Await] Got user:", user);

    // This doesn't execute until the previous await completes
    const posts = await getPostsByUserPromise(user);
    console.log("[Async/Await] Got posts:", posts);

    return { user, posts };
  } catch (error) {
    console.error(
      "[Async/Await] Error:",
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}

// Run the async/await example
fetchUserAndPosts().then((result) => {
  console.log("[Async/Await] Example completed with result:", result);
});

// Error handling with async/await
async function processWithAsyncAwait(data: string) {
  console.log("[Async/Await] Processing data...");

  try {
    const result = await processDataPromise(data);
    console.log("[Async/Await] Success:", result);
    return result;
  } catch (error) {
    console.error(
      "[Async/Await] Caught error:",
      error instanceof Error ? error.message : String(error)
    );
    return "Default value after error";
  }
}

// Success case
processWithAsyncAwait("hello");

// Error case
processWithAsyncAwait("");

// Parallel operations with async/await
async function fetchItemsInParallel() {
  console.log("[Async/Await] Starting parallel fetch...");

  try {
    // Promise.all lets us await multiple promises simultaneously
    const [item1, item2] = await Promise.all([
      fetchItem1Promise(),
      fetchItem2Promise(),
    ]);

    console.log("[Async/Await] All items fetched:", { item1, item2 });
    return { item1, item2 };
  } catch (error) {
    console.error("[Async/Await] Error in parallel fetch:", error);
    return null;
  }
}

fetchItemsInParallel();

// ------------------------------------------------------------------
// REAL-WORLD SCENARIO: FETCHING DATA FROM AN API
// ------------------------------------------------------------------
console.log("\n--- REAL-WORLD API FETCHING SCENARIO ---\n");

// Simulated API endpoints
type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

// Simulating network delay and responses
function simulateApiRequest(
  endpoint: string,
  succeed: boolean
): Promise<ApiResponse> {
  console.log(`Making API request to ${endpoint}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (succeed) {
        resolve({
          success: true,
          data: {
            endpoint,
            timestamp: Date.now(),
            message: "Request successful",
          },
        });
      } else {
        resolve({
          success: false,
          error: "API request failed",
        });
      }
    }, 1000);
  });
}

// 1. Callback approach (pre-Promises)
function fetchWithCallbacks(
  endpoint: string,
  onSuccess: (data: any) => void,
  onError: (error: string) => void
) {
  console.log(`[Callback] Fetching from ${endpoint}...`);

  setTimeout(() => {
    const succeed = endpoint !== "/api/error";

    if (succeed) {
      onSuccess({
        endpoint,
        timestamp: Date.now(),
        message: "Request successful",
      });
    } else {
      onError("API request failed");
    }
  }, 1000);
}

// 2. Promise approach
function fetchWithPromises(endpoint: string): Promise<any> {
  console.log(`[Promise] Fetching from ${endpoint}...`);
  return simulateApiRequest(endpoint, endpoint !== "/api/error");
}

// 3. Async/await approach
async function fetchWithAsyncAwait(endpoint: string): Promise<any> {
  console.log(`[Async/Await] Fetching from ${endpoint}...`);

  try {
    const response = await simulateApiRequest(
      endpoint,
      endpoint !== "/api/error"
    );

    if (!response.success) {
      throw new Error(response.error || "Unknown error");
    }

    return response.data;
  } catch (error) {
    console.error(
      "[Async/Await] Error:",
      error instanceof Error ? error.message : String(error)
    );
    throw error; // Re-throw to allow caller to handle
  }
}

// Using the callback version
console.log("\nCallback API approach:");
fetchWithCallbacks(
  "/api/data",
  (data) => console.log("[Callback] Success:", data),
  (error) => console.error("[Callback] Error:", error)
);

// Using the Promise version
console.log("\nPromise API approach:");
fetchWithPromises("/api/data")
  .then((response) => {
    if (response.success) {
      console.log("[Promise] Success:", response.data);
    } else {
      console.error("[Promise] Error:", response.error);
    }
  })
  .catch((error) => console.error("[Promise] Network error:", error));

// Using the async/await version
console.log("\nAsync/await API approach:");
(async () => {
  try {
    const data = await fetchWithAsyncAwait("/api/data");
    console.log("[Async/Await] Success:", data);
  } catch (error) {
    console.error(
      "[Async/Await] Error handled by caller:",
      error instanceof Error ? error.message : String(error)
    );
  }
})();

// Error case
(async () => {
  try {
    const data = await fetchWithAsyncAwait("/api/error");
    console.log("[Async/Await] This won't run");
  } catch (error) {
    console.error(
      "[Async/Await] Error case:",
      error instanceof Error ? error.message : String(error)
    );
  }
})();
