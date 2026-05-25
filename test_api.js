const http = require('http');

const creds = { email: 'testadmin99@uni.edu', password: 'Password123!', name: 'TestAdmin', role: 'ADMIN' };
const regData = JSON.stringify(creds);

// 1. Register
const req1 = http.request({ hostname: 'localhost', port: 8080, path: '/api/v1/auth/register', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': regData.length } }, (res1) => {
    res1.on('data', () => { });
    res1.on('end', () => {

        // 2. Login
        const loginData = JSON.stringify({ email: creds.email, password: creds.password });
        const req2 = http.request({ hostname: 'localhost', port: 8080, path: '/api/v1/auth/login', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': loginData.length } }, (res2) => {
            let body2 = '';
            res2.on('data', chunk => body2 += chunk);
            res2.on('end', () => {
                const token = JSON.parse(body2).data.accessToken;

                // 3. POST Item
                const itemData = JSON.stringify({ name: "waf", tag: "LAPTOP", equipId: "123456", status: "AVAILABLE" });
                const req3 = http.request({ hostname: 'localhost', port: 8080, path: '/api/v1/items', method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, 'Content-Length': itemData.length } }, (res3) => {
                    let body3 = '';
                    res3.on('data', chunk => body3 += chunk);
                    res3.on('end', () => {
                        console.log('--- ITEMS POST RESPONSE ---');
                        console.log('Status:', res3.statusCode);
                        console.log('Body:', body3);
                    });
                });
                req3.write(itemData);
                req3.end();
            });
        });
        req2.write(loginData);
        req2.end();
    });
});
req1.write(regData);
req1.end();
