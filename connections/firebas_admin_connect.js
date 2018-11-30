var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(
    {
      "type": "service_account",
      "project_id": "project-0815",
      "private_key_id": "f8cd831aaf1631d944be6194e57f545b4bf59e24",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChGzlhVpxxNMGG\nl++qWzJvviE01tVBFhlnMIQQ6AQx3r5D7cD5EbQuRp79/r9u8yrdA4YJ/j8OjwLx\nbiXHVHDwfWuebelmHlIV4Vg7A0Ev3q3EcW+fLSzgOYqO2KPmgxBy8Y93o8ahl/O9\nt08kDkYhOkEh7MaW6paFQw6Hieo3X/lU5Xs4fTTM5JG+YWZDQD+3qiDuxqapBCt4\nDOVdF4VZgNv42OaA7MPJiOmH8xpst+bL1j7KXZ9tsM77jlYTy1g6lsh6jIMua0fl\nsyuJEzKl/Lnv0P8MmiYMwFANzzPmgzeemszDBQ3l4D+Vd/2txqrsTHWdcLY39eVv\nKbdCm7vPAgMBAAECggEARiPYoPi4xo6d3M/EP6pRtJWV1m/by2joKWVVchjZTq73\nrhJSS/25sNX9PX7N8Gt801lH34zp/hgkQ2FdoEEypHkuQ/z9OwDjYvRHWfXqSQGN\nLLPoUWg1G+/hU5ydCuwv2qMxf3h1r3+81fF7SqrOPIQkvDTeJvE+FAmkRz0zk+SL\nZTCe8EUrd1YzCR978eSpM/RMzcd5duN6P5aBPO0Ze6QCbjj5yAHRg5aUK3lCxu2G\ngdz7cCstYtRYDeg32veRG9KYdO35VYhfssHhsHZ6QzV45bSvkdJJFEWMYQuvn4gi\nCM+59OMwAnMg0kF7mjgDUIYhSos3RvvpD/NPoreoAQKBgQDT97IazeOwBwd0xmsQ\nXM9BalC6tQunL5eXsN7pWvXZU97I6ZXg0Po1GMf1KZ/idbCrI7uWXbX1V8TaBrgq\ndecysSh+7bjm4kFyBLGJptIeQUCRHXOETwXL0Mnh3ywm2+hFcE8G6zRbSjV0FUT5\nb3QrLoJ3YIoopUKHiW+2etVYAQKBgQDCksKfHF2KrA269SY3GFpYu28UEO5m8Xfx\nn1hcngw+HC9S0976NkPpsAWLfwLyRFtt0R7pmzX1eqszbFpo3lSV+3PWrtdHHqCk\nwmIqPZcIE9NrQ5JKv4A4PhDCDuSBnHEl+BHsCEOR68iNqSeeXvnDbXBTjHmmVs4M\nvYg6lpGTzwKBgEoFR5cAqzA/ZCUtXRn7rwyi+coZixY5EnEQfOd0skHQfg4fNA2s\nLJP6MWm1vXWxr54z/kAGPZKNsdqJWirJvZEAOKoKjfVisYQFi5IMRXf3RXrnk/1y\nMw33vWg5LQvs43HMRGygGkp+4afF/a41c5XYygqyFc0X2OHH5tEMmBABAoGAA4DY\n+DxugryuUptvYLaTid12FopngHsAid0wnhpKZiPjxj4CWcb4WhDNSMG0r+ADNWr6\nf4JH6m+W/YoJ5rF6HGk2oLrtLV6jzdOiKNiLC54vxFKnI6lnCZw0eQoDm0HR17kr\nuXA8pzfzmHlfOT7EiHxD9X0mA5S0iQ4wkb18SYkCgYAS3iADSi43o4gtowl/28wz\n+7/EBT9Rq1o904gKgO7l08qlrGVR6W4LC/QVEqL5Kkhcp1/NoXQfjslOfijmA6fC\n/ybXzNMKY/f4xDau/St84vpZv+Hen9A0ey+DVVuulg758uFlRbknWF3adizoE6AR\nzvdSgQ25oLkvHS2uJb/kKg==\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-p86o9@project-0815.iam.gserviceaccount.com",
      "client_id": "110490143847033404313",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p86o9%40project-0815.iam.gserviceaccount.com"
    }
  ),
  databaseURL: "https://project-0815.firebaseio.com"
});

var db = admin.database();

module.exports = db;