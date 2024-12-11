import Footer from "../components/Footer";

const EndpointsTable = () => {
  const endpoints = [
    {
      method: 'GET',
      url: '/auth/test',
      requestBody: 'None',
      response: '[ { "status": "OK" } ]',
      error: '{ "status": 404, "msg": "No content found for this request" }',
      authorization: 'None',
    },
    {
      method: 'POST',
      url: '/auth/register/',
      requestBody: `{
        "username": "user",
        "password": "test123"
      }`,
      response: `{ "message": "User registered successfully" }`,
      error: '{ "status": 400, "msg": "Field \'username\' is required" }',
      authorization: 'None',
    },
    {
      method: 'POST',
      url: '/auth/login/',
      requestBody: `{
        "username": "user",
        "password": "test123"
      }`,
      response: `{ "token": "jwt_token" }`,
      error: '{ "status": 401, "msg": "Invalid credentials" }',
      authorization: 'None',
    },
    {
      method: 'POST',
      url: '/auth/user/addrole/',
      requestBody: `{
        "role": "ADMIN"
      }`,
      response: `{ "message": "Role added successfully" }`,
      error: '{ "status": 400, "msg": "Role is required" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'GET',
      url: '/destinations',
      requestBody: 'None',
      response: `[ { "id": 1, "city": "Stuttgart", "country": "Germany" } ]`,
      error: '{ "status": 404, "msg": "No content found for this request" }',
      authorization: 'None',
    },
    {
      method: 'GET',
      url: '/destinations/{id}',
      requestBody: 'None',
      response: `{ "id": 1, "city": "Stuttgart", "country": "Germany" }`,
      error: '{ "status": 404, "msg": "Destination not found" }',
      authorization: 'None',
    },
    {
      method: 'POST',
      url: '/destinations',
      requestBody: `{
        "city": "Stuttgart",
        "country": "Germany"
      }`,
      response: `{ "id": 2, "city": "Stuttgart", "country": "Germany" }`,
      error: '{ "status": 400, "msg": "City and country are required" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'PUT',
      url: '/destinations/{id}',
      requestBody: `{
        "city": "Berlin",
        "country": "Germany"
      }`,
      response: `{ "id": 1, "city": "Berlin", "country": "Germany" }`,
      error: '{ "status": 404, "msg": "Destination not found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'DELETE',
      url: '/destinations/{id}',
      requestBody: 'None',
      response: '{ "message": "Destination deleted successfully" }',
      error: '{ "status": 404, "msg": "Destination not found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'GET',
      url: '/bookings',
      requestBody: 'None',
      response: `[ { "id": 1, "destination": "Stuttgart", "status": "PENDING" } ]`,
      error: '{ "status": 404, "msg": "No bookings found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'GET',
      url: '/bookings/{id}',
      requestBody: 'None',
      response: `{ "id": 1, "destination": "Stuttgart", "status": "PENDING" }`,
      error: '{ "status": 404, "msg": "Booking not found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'POST',
      url: '/bookings',
      requestBody: `{
        "destinationCity": "Tangier",
        "departureDate": "2024-12-03T10:15:30",
        "arrivalDate": "2024-12-04T10:16:30",
        "bookingDate": "2024-02-02",
        "status": "PENDING"
      }`,
      response: `{ "id": 2, "destinationCity": "Tangier", "status": "PENDING" }`,
      error: '{ "status": 400, "msg": "Required fields are missing" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'PUT',
      url: '/bookings/{id}',
      requestBody: `{
        "status": "CANCELLED"
      }`,
      response: `{ "id": 1, "status": "CANCELLED" }`,
      error: '{ "status": 404, "msg": "Booking not found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'DELETE',
      url: '/bookings/{id}',
      requestBody: 'None',
      response: '{ "message": "Booking deleted successfully" }',
      error: '{ "status": 404, "msg": "Booking not found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'GET',
      url: '/reviews',
      requestBody: 'None',
      response: `[ { "id": 1, "destinationId": 4, "rating": 5, "comment": "Great experience!" } ]`,
      error: '{ "status": 404, "msg": "No reviews found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'GET',
      url: '/reviews/{id}',
      requestBody: 'None',
      response: `{ "id": 1, "destinationId": 4, "rating": 5, "comment": "Great experience!" }`,
      error: '{ "status": 404, "msg": "Review not found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'POST',
      url: '/reviews',
      requestBody: `{
        "destinationId": 4,
        "rating": 5,
        "comment": "Great experience!"
      }`,
      response: `{ "id": 2, "destinationId": 4, "rating": 5, "comment": "Great experience!" }`,
      error: '{ "status": 400, "msg": "Required fields are missing" }',
      authorization: 'Bearer {{jwt_token}}',
    },
    {
      method: 'DELETE',
      url: '/reviews/{id}',
      requestBody: 'None',
      response: '{ "message": "Review deleted successfully" }',
      error: '{ "status": 404, "msg": "Review not found" }',
      authorization: 'Bearer {{jwt_token}}',
    },
  ];

  return (
    <div>
      <h2>API Endpoints</h2>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Method</th>
            <th>URL</th>
            <th>Request Body (JSON)</th>
            <th>Response (JSON)</th>
            <th>Error (e)</th>
            <th>Authorization</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((endpoint, index) => (
            <tr key={index}>
              <td>{endpoint.method}</td>
              <td>{endpoint.url}</td>
              <td>
                <pre>{endpoint.requestBody}</pre>
              </td>
              <td>
                <pre>{endpoint.response}</pre>
              </td>
              <td>
                <pre>{endpoint.error}</pre>
              </td>
              <td>{endpoint.authorization}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer isSticky={false} />
    </div>
  );
};

export default EndpointsTable;
