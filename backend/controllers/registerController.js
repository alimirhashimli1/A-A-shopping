import Customer from "./models/customer.js"
const registerCustomer = async(req, res) => {
    const {username, password, emailAddress} = req.body

    const foundUsername = await Customer.findOne({username: username})

    if(!foundUsername){
        const newUser = new User({
            username:username,
            password:password,
            emailAddress: emailAddress
            // products: []
        })
        await newUser.save()
    }

    res.status(201).json(newUser)
}