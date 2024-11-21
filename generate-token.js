const express = require("express");
const app = express();
const { google } = require("googleapis");

// Service account credentials
const credentials = {
  type: "service_account",
  project_id: "ecommercebot-a076f",
  private_key_id: "a32e33e9ffc56c51c958af5d0abc56598c7b772a",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5JZYH8LlicNj1\ncR8aBc1U6VpBwkrkIlI3gAEcvsNZ5v5LquP4XvyCq2tqOUcnGblHqWB3B5JzOYSd\nXgvOUEBsxGaMBgq8fRb3nhof9XaG2JzW/FRY8jzzW0NxY6fsLSZNdtLO0CNSHsXd\n9h9IN4gcq5qRzMSCtkb/MpJWuJdO9Hjz7Fj0Z7ogd0FJGsGhJXjGXvIUySN2VIor\nMrn/4996qtlcvyvVzb3GQKVgbdMU7lkR4KzrAVYAhBdAAkelr6GLrxLKtrL1azsU\nQObIs/8N5QpbdS0nhcZVaCyLOP1z2z2vub+d+T2wkxz/lEw55EgL3KlsX88v99DD\nF7kEsY43AgMBAAECggEAEez3rheHSDN3OtxG9jTVmoECKH4joU7i+VVyLIXm60KY\nIFwqHxcwCR67rNjHpAHmx6Ke7Y27U8VsqsFuQ/1oUp+S8vLeAaRC0wECgOs56V7G\nxwtxk/yjT64bke2wiaDqP0Ass0vBMudtbn4XE6p8vS0U/BGaFrKIBGR+RdmXAyFl\nOwZXrF4fmrYW8uI4Zj/KymiPGxovIKlAYQSAppSwkFQjaGpaCnj4VvEWRGKcxGRi\nqye+n4W6LEL48Hkwu0FkmVRTqzl/hS2bdvT+bBEEk4xyFXo3TltGJ/DRLM8RPZ4m\nZqTa0bLCggNdmSyANk4ux1U8YpCB7HsdWqr69efUgQKBgQDtlo1aOAbXKGsFBW2s\nmV4vjJ/IIAYILPtiYEm46UWzDklxrDu16wFj+ZrmCbb492n4dnk3hmQz/ycy+TwB\n1KG7TAYsqsELAfe3DkKnHPJclsKE9mo35gh2hKXJ/c6vd3SzzgDU8V8CJ/4qKHY4\n95HjKWT5EhegzvNWqixy+oXFVwKBgQDHfqpMyKKzAT4l/Jax9IzXCjKWbzsueRX6\nh8GC6JosaiAGFF7ClrW1WtkVJo4CGPOwI26uaBHCd70XZG5mbhcF+r6hCguXDy33\na8IYL7mKI27q/Ne0LgDhwKFaf5dYJDjNXzHH9G8zKK1+iv1bCpzw5yWjOWedYsyY\n2W8fFCUSIQKBgHXTBNSqFlJbe/9oesRu5rOkBJVltDgXvq9B2y21mdg7jJav+Ii2\nO+FNptDQHoqHgGk0r9amckkLD3CLA4RQ48gT4rgCEmwYFLYWf12K0HK0XVE9Nt3z\n2VyVWfa7ROXl0t1cmzL/ZMOX+8cCe+ayeAn0vFt86nTYTPs8t4Bp1y9PAoGAV//C\nxX4XbtjUflMuci9K1Sy1ZfCI7ZYSIOIzdTh/kan6mFPx/OoYG3iIm7DXIYu6Ku9m\nSl6zvtGswp3VqS9Uzplt74GL3UWf5C1Pf/XFZW795YBE8kD8uJiNVGtF6maH++fL\nAMYNK0b9SP2shrVmx0lfK+INl7pWP/Jh9xaex6ECgYAWqjyZ27fl10JGuVze7qcu\n6jerFDfHGm9ENpAcjYs8Xk/lkIDY4/qw7uiaQ8nChvuedKBYVn/U0ox1jtO24PW6\nOOl11k3H2rIUxezTYEt1VmllzftrwABSF9r0L/U0UGuzx0TMQhD9lTzCc50SpWQC\nbxjyYl2J7j2oe1KGERDR+g==\n-----END PRIVATE KEY-----\n",
  client_email: "n8n-service-3@ecommercebot-a076f.iam.gserviceaccount.com",
  client_id: "102106911097376808970",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/n8n-service-3%40ecommercebot-a076f.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

app.get("/generate-token", async (req, res) => {
  try {
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      [
        "https://www.googleapis.com/auth/datastore",
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/firebase",
      ]
    );

    const token = await jwtClient.authorize();
    console.log("Complete Token Response:", JSON.stringify(token, null, 2));
    res.json({ token: token.access_token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
