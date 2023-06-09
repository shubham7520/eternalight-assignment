import User from "../models/userModel.js";

// Register

const Register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields."
            });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({
                success: false,
                message: "User already exist. Please Login."
            });
        }

        const user = await User.create({ name, email, password });

        const Token = await user.getJWTToken()

        res.status(201).json({
            success: true,
            user,
            Token,
            message: "User Registerd successfully.."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }

}

// Login

const Login = async (req, res, next) => {

    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Email & Password."
            });
        }

        const user = await User.findOne({ email: req.body.email }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }

        const isPasswordMatch = await user.comparePassword(req.body.password);

        if (!isPasswordMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password."
            });
        }

        const Token = await user.getJWTToken();

        res.status(200).json({
            success: true,
            user,
            Token,
            message: "User login successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }

}

// User Details


const userDetail = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return req.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        res.status(200).json({
            success: true,
            user,
            message: "User details."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        })

    }
}

//Update Password

const updatePassword = async (req, res, next) => {

    try {

        const user = await User.findById(req.user.id).select("+password");

        if (!req.body.newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter new password."
            })
        }

        user.password = req.body.newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            user,
            message: "Password Update Successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }

}

//Update Profile

const updateProfile = async (req, res, next) => {

    try {
        const newData = {
            name: req.body.name
        }
        const user = await User.findByIdAndUpdate(req.user.id, newData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            user,
            message: "Profile Update Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong."
        })
    }

}


export { Register, Login, updatePassword, updateProfile, userDetail };