const express = require('express')
const app = express()
app.use(express.json())

const customers = [
    {firstName: 'John', age: 27},
    {firstName: 'James', age: 32},
    {firstName: 'Robert', age: 45},
    {firstName: 'Kalyani', age: 21},
]

app.get('/',(req, resp) =>{
    resp.send("Welcome to Customers API")
})

app.get('/customers', (req,resp) =>{
    resp.send(customers)
})

app.get('/customers/:age', (req,resp) =>{
    const customer = customers.find(k => k.age === parseInt(req.params.age) )
    if (!customer) resp.status(404).send("Customer not found")
    resp.send(customer)
})

app.get('/findFirstName/:firstName', (req,resp) =>{
    console.log(req.params.firstName)
    const customername = customers.find(k => k.firstName === (req.params.firstName))
    if (!customername) resp.status(404).send("Customer not found")
    resp.send(customername) 
})

app.post('/customers/addCustomer',(req, resp) =>{
    const newCustomer ={
        firstName: req.body.firstName,
        age: req.body.age
    }
    customers.push(newCustomer)
    resp.send(newCustomer)
})

app.put('/customers/:age', (req,resp) =>{
    const customer = customers.find(k => k.age === parseInt(req.params.age))
    if (!customer) resp.status(404).send("Customer not found")
    customer.firstName = req.body.firstName
    resp.send(customer)
})

app.delete('/customers/:age', (req,resp)=>{
    const customer = customers.find(k => k.age === parseInt(req.params.age))
    if (!customer) resp.status(404).send("Customer not found")
    const index = customers.indexOf(customer)
    customers.splice(index,1)
    resp.send(customer)
})

app.listen(3000)
