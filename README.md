Enterprise E-Commerce Microservices Platform
Project Overview
This project is a highly scalable, distributed e-commerce application built using a modern microservices architecture. It demonstrates enterprise-level patterns for service discovery, API routing, resilient inter-service communication, and stateless security. The platform features a responsive, component-driven Angular frontend and a robust Spring Boot backend ecosystem.

System Architecture
The backend is decoupled into distinct bounded contexts to ensure independent scalability, fault tolerance, and maintainability.

1. Infrastructure & Routing
Service Registry (Netflix Eureka): Acts as the central directory for the microservices ecosystem. All domain services register with Eureka upon startup, enabling dynamic service discovery without hardcoded IP addresses.

API Gateway (Spring Cloud Gateway): Serves as the single entry point for all frontend client requests. It handles dynamic routing to downstream microservices, enforces centralized Cross-Origin Resource Sharing (CORS) policies specifically configured for the Angular client port (4200), and executes global filters for security.

2. Security (Spring Security & JWT)
Stateless Authentication: The system utilizes JSON Web Tokens (JWT) for secure, stateless user sessions.

Centralized Authorization: The API Gateway intercepts incoming requests, validates the JWT signature, and ensures unauthenticated traffic never reaches the internal network. Secure routes (like Cart and Checkout) are protected, while public routes (like Login and the About page) remain accessible.

3. Domain Microservices (Spring Boot)
Auth Service: Manages user registration, secure credential hashing, and JWT generation.

Product Service: Handles catalog management, complex search queries, and advanced filtering logic.

Inventory Service: Tracks real-time stock levels.

Cart & Order Services: Manages the temporary state of user shopping carts, user wishlists, order history tracking, and checkout orchestration.

4. Inter-Service Communication & Resilience
Synchronous Calls (OpenFeign): Microservices communicate cleanly using declarative REST clients via Spring Cloud OpenFeign. For example, the Product Service queries the Inventory Service to determine the "In Stock" status of items before sending data to the frontend.

Fault Tolerance (Resilience4j): Circuit breakers are implemented on all inter-service calls. If a dependent service (e.g., Inventory) experiences downtime, the circuit breaker trips and provides a fallback response. This prevents cascading system failures and ensures the application degrades gracefully rather than crashing.

Frontend Architecture (Angular)
The user interface is a dynamic, multi-module Angular application designed for a seamless, interactive user experience.

Public Layout: Features an informational landing page, a responsive header for Login/Signup navigation, and a comprehensive footer with social links.

Authenticated Shop Layout: Delivers a rich shopping experience featuring:

A dynamic navigation bar with profile management, a dedicated search bar, and interactive cart/wishlist indicators.

A complex sidebar filtering system utilizing Angular Reactive Forms (filtering by clothing types, color swatches, size toggles, dual-handle price range sliders, and an "In Stock Only" toggle).

A responsive product grid displaying data-bound product cards.

Security Integration: An Angular HttpInterceptor automatically intercepts all outgoing HTTP requests to append the JWT Bearer token, ensuring seamless and secure communication with the backend gateway.
