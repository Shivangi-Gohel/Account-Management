import {User} from '../models/userModel.js';
import {hashPassword, comparePassword} from '../services/hashService.js';
import {generateToken} from '../services/jwtService.js';

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ name, email, password: hashedPassword});
        await user.save();

        res.status(201).json({ message: "User registered successfully" });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }

        const token = generateToken({ id: user._id, email: user.email });

        res.json({ "message": "Login successful!", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        return res.status(200)
        .cookie("token", "", {
            maxAge: 0,
        })
        .json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { registerUser, loginUser, logoutUser };