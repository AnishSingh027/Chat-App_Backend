# Chat APP

### Authentication APIs

- **POST** - /user/login
- **POST** - /user/signup
- **POST** - /user/logout

### View all except logged in users, profile, update profile

- **GET** - /view/connections (see all users in app except the logged in one)
- **PATCH** - /view/profile

### Specific user

- **POST** - /message/:userID (see messages of specific user)

## Important notes

#### _Why it is recommended Always use HttpOnly, Secure while setting cookies?_

**Each of these options protects against specific, serious security vulnerabilities like XSS and CSRF.**

- **HttpOnly: Protection from XSS (Cross-Site Scripting)**
- Prevents JavaScript from accessing your cookie. If a hacker injects malicious JavaScript into your site (XSS), they won’t be able to steal your cookie via document.cookie.

- **Secure: Protection from packet sniffing**
- Only sends the cookie over HTTPS, not HTTP.ithout secure: true, the cookie can be sent over unencrypted HTTP, which exposes it to attackers on the network (like public Wi-Fi sniffing).

🔒 Always use HTTPS in production.
