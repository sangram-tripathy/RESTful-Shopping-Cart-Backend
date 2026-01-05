# RESTful Shopping Cart Backend

Developed a CRUD REST API for shopping cart management using Express.js.

Implemented cart generation using UUID v4 for unique identifier assignment.

Built endpoints for adding, updating, retrieving, and deleting cart items.

Managed local file-based storage using a custom utility (LocalFileStorage) to persist cart data.

Employed express.json() middleware to parse and validate JSON request bodies.

Designed endpoint routes with clear HTTP verbs and status codes (GET, POST, DELETE).

Ensured responses conform to REST standards and provided meaningful HTTP status codes (200, 201).

Performed parameter extraction from routes (cartId, itemId) for strong REST routing.

Supported dynamic item updates and deletion with modular storage functions.

Utilized Node.js asynchronous patterns (if LocalFileStorage uses async fs).
