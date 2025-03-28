import Mailgun from "mailgun.js";
import formData from "form-data";
import { TOrder } from "../models/order-model";
import dotenv from "dotenv";

dotenv.config();

const mailgun = new Mailgun(formData);

export const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY as string,
});


// const messageData = {
//   from: "Excited User <mailgun@sandbox-123.mailgun.org>",
// 	to: ["test@example.com"],
// 	subject: "Hello",
// 	text: "Testing some Mailgun awesomeness!",
// 	html: "<h1>Testing some Mailgun awesomeness!</h1>"
// }

// mg.messages.create(process.env.MAILGUN_DOMAIN, messageData).then(msg => console.log(msg)).catch(err => console.log(err));



export const emailTamplateForgotPassword = (name: string, token: string)=> {
  return `
  <h2>Hello ${name},</h2>
  <p>To reset password, please copy the following link</p>
  <p>http://localhost:3000/account/reset-password?token=${token}</p>
  <p>Or, you can click the following link:</p>
  <a href="http://localhost:3000/account/reset-password?token=${token}">Click Here</a>
  `
};

export const emailTemplateOrderCreate = (order: TOrder, username: string) => {
  return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${username},</p>
  <p>We are processing your order. Our agent will call you soon to confirmed your order</p>
  <h2>[Order# ${order.orderNumber}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.productTitle}</td>
    <td align="center">(${item.count})</td>
    <td align="right"> Tk.${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> Tk.${order.itemsPrice.toFixed(2)}</td>
  </tr>

  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> Tk.${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> Tk.${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.email},<br/>
  ${order.shippingAddress.mobile},<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>`;
}